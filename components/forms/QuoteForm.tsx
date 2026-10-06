"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { Dictionary } from "@/content/dictionaries";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import {
  HONEYPOT_FIELD,
  STARTED_AT_FIELD,
  budgetOptions,
  parseQuoteInput,
  sectorOptions,
  serviceOptions,
  validateQuote,
  type QuoteErrors,
  type QuoteInput,
} from "@/lib/quote-schema";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/Icon";

type FormValues = Omit<QuoteInput, "locale">;
type Status = "idle" | "submitting" | "success" | "error";
type ServerError = "rate_limited" | "not_configured" | "server" | "network";

const initialValues: FormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  sector: "",
  service: "",
  budget: "",
  objectives: "",
  message: "",
  contactConsent: false,
};

const serviceIcons: Record<(typeof serviceOptions)[number], IconName> = {
  website: "layout",
  seo: "search",
  reviews: "star",
  multiple: "layers",
};

const fieldOrder: (keyof FormValues)[] = [
  "name",
  "company",
  "email",
  "phone",
  "website",
  "sector",
  "service",
  "budget",
  "objectives",
  "message",
  "contactConsent",
];

export function QuoteForm({
  locale,
  t,
  privacyHref,
  consultationHref,
  consultationLabel,
}: {
  locale: "fr" | "en";
  t: Dictionary["form"];
  privacyHref: string;
  consultationHref: string;
  consultationLabel: string;
}) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<ServerError | null>(null);
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    // Preselect a service from ?service=… (links from service pages).
    const preset = new URLSearchParams(window.location.search).get("service");
    if (preset && (serviceOptions as readonly string[]).includes(preset)) {
      setValues((v) => ({ ...v, service: preset as FormValues["service"] }));
    }
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const validate = (next: FormValues) => validateQuote(parseQuoteInput({ ...next, locale }));

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key] || errors[key]) {
      const fieldError = validate(next)[key];
      setErrors((e) => ({ ...e, [key]: fieldError }));
    }
  };

  const blur = (key: keyof FormValues) => {
    setTouched((tch) => ({ ...tch, [key]: true }));
    const fieldError = validate(values)[key];
    setErrors((e) => ({ ...e, [key]: fieldError }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const found = validate(values);
    setErrors(found);
    setTouched(Object.fromEntries(fieldOrder.map((k) => [k, true])));
    const firstInvalid = fieldOrder.find((k) => found[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const honeypot = (formRef.current?.elements.namedItem(HONEYPOT_FIELD) as HTMLInputElement | null)?.value ?? "";

    setStatus("submitting");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale, [HONEYPOT_FIELD]: honeypot, [STARTED_AT_FIELD]: startedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: QuoteErrors };

      if (res.ok && data.ok) {
        setStatus("success");
        track("Quote Submitted", { service: values.service || "unknown" });
        return;
      }
      if (data.fields) setErrors(data.fields);
      setServerError(data.error === "rate_limited" || data.error === "not_configured" ? data.error : "server");
      setStatus("error");
    } catch {
      setServerError("network");
      setStatus("error");
    }
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  if (status === "success") {
    return (
      <div className="card noise relative overflow-hidden p-8 text-center sm:p-14" role="status" aria-live="polite">
        <div className="absolute left-1/2 top-0 h-48 w-2/3 -translate-x-1/2 rounded-full bg-accent/20 blur-[90px]" aria-hidden="true" />
        <div className="relative">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full border border-accent/40 bg-accent-soft text-accent">
            <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m5 12.5 4.5 4.5L19 7.5" pathLength={1} className="[stroke-dasharray:1] [stroke-dashoffset:1] animate-[draw_0.8s_0.2s_cubic-bezier(0.16,1,0.3,1)_forwards]" />
            </svg>
          </span>
          <h2 ref={successRef} tabIndex={-1} className="display mx-auto mt-8 max-w-md text-3xl outline-none sm:text-4xl">
            {t.success.title}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">{t.success.text}</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-subtle">{t.success.next}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={consultationHref} icon="calendar">
              {consultationLabel}
            </ButtonLink>
            <Button
              variant="secondary"
              icon={false}
              onClick={() => {
                setValues(initialValues);
                setErrors({});
                setTouched({});
                setStatus("idle");
                startedAt.current = Date.now();
              }}
            >
              {t.success.again}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const err = (key: keyof FormValues) => (errors[key] ? t.errors[errors[key]!] : undefined);
  const hasErrors = Object.values(errors).some(Boolean);
  const submitting = status === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card p-6 sm:p-10" aria-busy={submitting}>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-2xl font-medium tracking-tight">{t.title}</h2>
        <p className="text-xs text-subtle">
          <span className="text-accent">*</span> {t.required}
        </p>
      </div>

      {(serverError || (hasErrors && Object.keys(touched).length === fieldOrder.length)) && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-400/[0.06] p-4 text-sm text-red-200 outline-none"
        >
          <svg viewBox="0 0 20 20" className="mt-0.5 size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <circle cx="10" cy="10" r="7.5" />
            <path d="M10 6v4.5M10 13.5v.01" strokeLinecap="round" />
          </svg>
          {serverError ? t.errors[serverError] : t.errors.summary}
        </div>
      )}

      {/* Honeypot — invisible to humans, tempting for bots. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor={HONEYPOT_FIELD}>Website</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <Fieldset legend={t.sections.about} index="01">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField name="name" label={t.fields.name.label} placeholder={t.fields.name.placeholder} required autoComplete="name" value={values.name} error={err("name")} onChange={(v) => update("name", v)} onBlur={() => blur("name")} />
          <TextField name="company" label={t.fields.company.label} placeholder={t.fields.company.placeholder} optional={t.optional} autoComplete="organization" value={values.company} error={err("company")} onChange={(v) => update("company", v)} onBlur={() => blur("company")} />
          <TextField name="email" type="email" inputMode="email" label={t.fields.email.label} placeholder={t.fields.email.placeholder} required autoComplete="email" value={values.email} error={err("email")} onChange={(v) => update("email", v)} onBlur={() => blur("email")} />
          <TextField name="phone" type="tel" inputMode="tel" label={t.fields.phone.label} placeholder={t.fields.phone.placeholder} optional={t.optional} autoComplete="tel" value={values.phone} error={err("phone")} onChange={(v) => update("phone", v)} onBlur={() => blur("phone")} />
        </div>
      </Fieldset>

      <Fieldset legend={t.sections.project} index="02">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField name="website" inputMode="url" label={t.fields.website.label} placeholder={t.fields.website.placeholder} optional={t.optional} autoComplete="url" value={values.website} error={err("website")} onChange={(v) => update("website", v)} onBlur={() => blur("website")} />
          <Field name="sector" label={t.fields.sector.label} optional={t.optional} error={err("sector")}>
            <select
              id="sector"
              name="sector"
              value={values.sector}
              onChange={(e) => update("sector", e.target.value as FormValues["sector"])}
              onBlur={() => blur("sector")}
              aria-invalid={Boolean(err("sector"))}
              aria-describedby={err("sector") ? "sector-error" : undefined}
              className={cn("field", !values.sector && "text-muted/70")}
            >
              <option value="">{t.fields.sector.placeholder}</option>
              {sectorOptions.map((s) => (
                <option key={s} value={s}>
                  {t.options.sector[s]}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <ChoiceGroup legend={t.fields.service.label} required error={err("service")} name="service">
          <div className="grid gap-3 sm:grid-cols-2">
            {serviceOptions.map((s) => {
              const checked = values.service === s;
              return (
                <label
                  key={s}
                  className={cn(
                    "group relative flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent",
                    checked ? "border-accent bg-accent-soft" : "border-line hover:border-line-strong hover:bg-white/[0.02]",
                  )}
                >
                  <input
                    type="radio"
                    name="service"
                    value={s}
                    checked={checked}
                    onChange={() => update("service", s)}
                    onBlur={() => blur("service")}
                    className="sr-only"
                  />
                  <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl border transition-colors", checked ? "border-accent/50 text-accent" : "border-line text-muted")}>
                    <Icon name={serviceIcons[s]} className="size-[1.1rem]" />
                  </span>
                  <span className="font-medium">{t.options.service[s]}</span>
                  <span className={cn("ml-auto flex size-5 items-center justify-center rounded-full border transition-all", checked ? "border-accent bg-accent-strong" : "border-line-strong")} aria-hidden="true">
                    {checked && <Icon name="check" className="size-3 text-white" />}
                  </span>
                </label>
              );
            })}
          </div>
        </ChoiceGroup>

        <ChoiceGroup legend={t.fields.budget.label} hint={t.fields.budget.hint} optional={t.optional} error={err("budget")} name="budget">
          <div className="flex flex-wrap gap-2">
            {budgetOptions.map((b) => {
              const checked = values.budget === b;
              return (
                <label
                  key={b}
                  className={cn(
                    "cursor-pointer rounded-full border px-4 py-2.5 text-sm transition-all duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent",
                    checked ? "border-fg bg-fg text-ink" : "border-line text-muted hover:border-line-strong hover:text-fg",
                  )}
                >
                  <input type="radio" name="budget" value={b} checked={checked} onChange={() => update("budget", b)} className="sr-only" />
                  {t.options.budget[b]}
                </label>
              );
            })}
          </div>
        </ChoiceGroup>
      </Fieldset>

      <Fieldset legend={t.sections.details} index="03">
        <div className="grid gap-5">
          <TextArea name="objectives" rows={3} label={t.fields.objectives.label} placeholder={t.fields.objectives.placeholder} optional={t.optional} value={values.objectives} error={err("objectives")} onChange={(v) => update("objectives", v)} onBlur={() => blur("objectives")} />
          <TextArea name="message" rows={5} label={t.fields.message.label} placeholder={t.fields.message.placeholder} required value={values.message} error={err("message")} onChange={(v) => update("message", v)} onBlur={() => blur("message")} />
        </div>
      </Fieldset>

      <div className="mt-8">
        <label className={cn("flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition-colors", err("contactConsent") ? "border-red-400/60" : "border-line hover:border-line-strong")}>
          <span className="relative mt-0.5 flex size-5 shrink-0">
            <input
              type="checkbox"
              name="contactConsent"
              checked={values.contactConsent}
              onChange={(e) => update("contactConsent", e.target.checked)}
              aria-invalid={Boolean(err("contactConsent"))}
              aria-describedby={err("contactConsent") ? "contactConsent-error consent-hint" : "consent-hint"}
              className="peer size-5 cursor-pointer appearance-none rounded-md border border-line-strong bg-transparent transition-colors checked:border-accent checked:bg-accent-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            />
            <Icon name="check" className="pointer-events-none absolute inset-0.5 size-4 text-white opacity-0 peer-checked:opacity-100" />
          </span>
          <span>
            <span className="font-medium">
              {t.fields.contactConsent.label} <span className="text-accent">*</span>
            </span>
            <span id="consent-hint" className="mt-1 block text-sm text-subtle">
              {t.fields.contactConsent.hint}{" "}
              <Link href={privacyHref} className="text-muted underline underline-offset-4 hover:text-fg">
                {t.fields.contactConsent.privacyLink}
              </Link>
              .
            </span>
          </span>
        </label>
        {err("contactConsent") && <ErrorText id="contactConsent-error">{err("contactConsent")}</ErrorText>}
      </div>

      <div className="mt-10 flex flex-col-reverse items-stretch gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-subtle">
          <Icon name="shield" className="size-4" />
          {t.secureNote}
        </p>
        <Button type="submit" size="lg" disabled={submitting} icon={submitting ? false : "arrowRight"}>
          {submitting && <span className="mr-1 inline-block size-4 animate-spin rounded-full border-2 border-white/30 border-t-white align-[-3px]" aria-hidden="true" />}
          {submitting ? t.submitting : t.submit}
        </Button>
      </div>
    </form>
  );
}

/* ───────────── Field primitives ───────────── */

function Fieldset({ legend, index, children }: { legend: string; index: string; children: ReactNode }) {
  return (
    <fieldset className="mt-10 border-t border-line pt-8 first-of-type:mt-8">
      <legend className="float-left mb-6 flex w-full items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
        <span className="text-accent">{index}</span>
        {legend}
      </legend>
      <div className="clear-left space-y-7">{children}</div>
    </fieldset>
  );
}

function Label({ htmlFor, label, required, optional }: { htmlFor?: string; label: string; required?: boolean; optional?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between gap-2 text-sm font-medium">
      <span>
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {optional && <span className="text-xs font-normal text-subtle">{optional}</span>}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm text-red-300">
      <span className="inline-block size-1 rounded-full bg-red-300" aria-hidden="true" />
      {children}
    </p>
  );
}

function Field({ name, label, required, optional, error, children }: { name: string; label: string; required?: boolean; optional?: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <Label htmlFor={name} label={label} required={required} optional={optional} />
      {children}
      {error && <ErrorText id={`${name}-error`}>{error}</ErrorText>}
    </div>
  );
}

type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  error?: string;
  required?: boolean;
  optional?: string;
  onChange: (value: string) => void;
  onBlur: () => void;
};

function TextField({
  type = "text",
  inputMode,
  autoComplete,
  ...p
}: InputProps & { type?: string; inputMode?: "email" | "tel" | "url" | "text"; autoComplete?: string }) {
  return (
    <Field name={p.name} label={p.label} required={p.required} optional={p.optional} error={p.error}>
      <input
        id={p.name}
        name={p.name}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={p.placeholder}
        value={p.value}
        required={p.required}
        aria-required={p.required}
        aria-invalid={Boolean(p.error)}
        aria-describedby={p.error ? `${p.name}-error` : undefined}
        onChange={(e) => p.onChange(e.target.value)}
        onBlur={p.onBlur}
        className="field"
      />
    </Field>
  );
}

function TextArea({ rows, ...p }: InputProps & { rows: number }) {
  return (
    <Field name={p.name} label={p.label} required={p.required} optional={p.optional} error={p.error}>
      <textarea
        id={p.name}
        name={p.name}
        rows={rows}
        placeholder={p.placeholder}
        value={p.value}
        required={p.required}
        aria-required={p.required}
        aria-invalid={Boolean(p.error)}
        aria-describedby={p.error ? `${p.name}-error` : undefined}
        onChange={(e) => p.onChange(e.target.value)}
        onBlur={p.onBlur}
        className="field resize-y"
      />
    </Field>
  );
}

function ChoiceGroup({
  legend,
  name,
  hint,
  required,
  optional,
  error,
  children,
}: {
  legend: string;
  name: string;
  hint?: string;
  required?: boolean;
  optional?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div role="radiogroup" aria-labelledby={`${name}-label`} aria-required={required} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined}>
      <div id={`${name}-label`} className="mb-3 flex items-baseline justify-between gap-2 text-sm font-medium">
        <span>
          {legend} {required && <span className="text-accent">*</span>}
          {hint && <span className="ml-2 text-xs font-normal text-subtle">· {hint}</span>}
        </span>
        {optional && <span className="text-xs font-normal text-subtle">{optional}</span>}
      </div>
      {children}
      {error && <ErrorText id={`${name}-error`}>{error}</ErrorText>}
    </div>
  );
}
