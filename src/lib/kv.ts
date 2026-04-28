import { kv } from "@vercel/kv";
import { defaultContent } from "./config";
import type { SiteContent } from "./types";

const CONTENT_KEY = "site:content";
const CMS_ACTIVE_KEY = "cms_active";
const CMS_PIN_KEY = "cms_pin";

export async function getContent(): Promise<SiteContent> {
  try {
    const data = await kv.get<SiteContent>(CONTENT_KEY);
    if (!data) return defaultContent;
    // Merge with defaults to handle missing keys
    return { ...defaultContent, ...data };
  } catch {
    // KV not configured yet — use defaults
    return defaultContent;
  }
}

export async function setContent(content: SiteContent): Promise<void> {
  await kv.set(CONTENT_KEY, content);
}

export async function isCmsActive(): Promise<boolean> {
  try {
    const active = await kv.get<boolean>(CMS_ACTIVE_KEY);
    // If key doesn't exist, CMS is active by default
    return active !== false;
  } catch {
    return true;
  }
}

export async function verifyPin(pin: string): Promise<boolean> {
  try {
    const storedPin = await kv.get<string>(CMS_PIN_KEY);
    if (storedPin) return pin === storedPin;
    // Fallback to env var
    return pin === process.env.ADMIN_PIN;
  } catch {
    return pin === process.env.ADMIN_PIN;
  }
}
