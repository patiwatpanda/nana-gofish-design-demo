"use client";

import { useEffect, useSyncExternalStore } from "react";
import type { Lang } from "./content";

const LANG_KEY = "nana-lang";

/* The visitor's language lives in a tiny external store so it survives reloads without a hydration mismatch.
   Shared by every design (/ and /v2) so a choice made on one carries to the other. */
const langListeners = new Set<() => void>();
let langMemory: Lang | null = null;

function readLang(): Lang {
  if (langMemory) return langMemory;
  try {
    const saved = window.localStorage.getItem(LANG_KEY);
    if (saved === "th" || saved === "en") return saved;
  } catch {
    /* storage unavailable */
  }
  return "en";
}

export function setLang(next: Lang) {
  langMemory = next;
  try {
    window.localStorage.setItem(LANG_KEY, next);
  } catch {
    /* storage unavailable: keep it for this visit only */
  }
  langListeners.forEach((fn) => fn());
}

function subscribeLang(fn: () => void) {
  langListeners.add(fn);
  return () => langListeners.delete(fn);
}

/** Current language, kept in sync with <html lang>. */
export function useLang(): Lang {
  const lang = useSyncExternalStore(subscribeLang, readLang, () => "en" as Lang);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return lang;
}
