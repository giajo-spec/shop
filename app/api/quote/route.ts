import { NextResponse, type NextRequest } from "next/server";
import { createQuoteInNotion, isNotionConfigured } from "@/lib/notion";
import { rateLimit } from "@/lib/rate-limit";
import {
  HONEYPOT_FIELD,
  MIN_FILL_TIME_MS,
  STARTED_AT_FIELD,
  parseQuoteInput,
  validateQuote,
} from "@/lib/quote-schema";

export const runtime = "nodejs";

type ErrorCode = "invalid" | "rate_limited" | "not_configured" | "server";

const fail = (code: ErrorCode, status: number, extra: Record<string, unknown> = {}) =>
  NextResponse.json({ ok: false, error: code, ...extra }, { status });

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const limit = rateLimit(`quote:${ip}`);
  if (!limit.ok) {
    return fail("rate_limited", 429, { retryAfter: limit.retryAfter });
  }

  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return fail("invalid", 400);
  }
  if (!raw || typeof raw !== "object") return fail("invalid", 400);

  // Honeypot filled or form submitted inhumanly fast: pretend success, store nothing.
  const startedAt = Number(raw[STARTED_AT_FIELD]);
  const tooFast = !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_TIME_MS;
  if (raw[HONEYPOT_FIELD] || tooFast) {
    return NextResponse.json({ ok: true });
  }

  const input = parseQuoteInput(raw);
  const errors = validateQuote(input);
  if (Object.keys(errors).length > 0) {
    return fail("invalid", 422, { fields: errors });
  }

  if (!isNotionConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[quote] Notion not configured — submission logged locally only:", input);
      return NextResponse.json({ ok: true, mode: "development" });
    }
    console.error("[quote] NOTION_API_KEY / NOTION_DATABASE_ID missing.");
    return fail("not_configured", 503);
  }

  try {
    await createQuoteInNotion(input);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[quote] Failed to create Notion page:", error);
    return fail("server", 502);
  }
}
