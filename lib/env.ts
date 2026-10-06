import "server-only";

/** Prototype guard: everything is noindex until SITE_INDEXABLE=true. */
export const isIndexable = process.env.SITE_INDEXABLE === "true";

export const notionConfig = {
  apiKey: process.env.NOTION_API_KEY || "",
  databaseId: process.env.NOTION_DATABASE_ID || "",
};
