import type { PopupHistory } from "./types";

/**
 * What the browser remembers about popups: how often each one opened (kept
 * between visits) and what happened during the current visit.
 *
 * Storage can be missing or throw (private windows, blocked cookies), so every
 * access is guarded and falls back to memory for the life of the page. A
 * visitor with storage disabled simply gets "once per page load" behaviour
 * rather than an error.
 */

const HISTORY_KEY = "bvk-popups:v1";
const FIRST_SEEN_KEY = "bvk-popups:first-seen";
const SESSION_KEY = "bvk-popups:session";

interface SessionState {
  shown: string[];
  views: number;
  returning: boolean | null;
}

const memory = {
  history: {} as Record<string, PopupHistory>,
  session: { shown: [], views: 0, returning: null } as SessionState,
  firstSeen: null as string | null,
};

function read(store: "local" | "session", key: string): string | null {
  try {
    return (store === "local" ? window.localStorage : window.sessionStorage).getItem(key);
  } catch {
    return null;
  }
}

function write(store: "local" | "session", key: string, value: string): boolean {
  try {
    (store === "local" ? window.localStorage : window.sessionStorage).setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function parse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// ---------------------------------------------------------------------------
// Per-popup history (persists across visits)
// ---------------------------------------------------------------------------

function readHistory(): Record<string, PopupHistory> {
  const stored = parse<Record<string, PopupHistory> | null>(read("local", HISTORY_KEY), null);
  return stored && typeof stored === "object" ? { ...memory.history, ...stored } : memory.history;
}

export function getHistory(key: string): PopupHistory | undefined {
  return readHistory()[key];
}

function saveHistory(key: string, next: PopupHistory) {
  const all = { ...readHistory(), [key]: next };
  memory.history = all;
  write("local", HISTORY_KEY, JSON.stringify(all));
}

export function recordShown(key: string, now: number) {
  const prev = getHistory(key);
  saveHistory(key, { ...prev, count: (prev?.count ?? 0) + 1, last: now });
}

export function recordClick(key: string, now: number) {
  const prev = getHistory(key);
  saveHistory(key, { count: prev?.count ?? 0, last: prev?.last ?? 0, ...prev, clicked: now });
}

// ---------------------------------------------------------------------------
// Visit state (this tab, this session)
// ---------------------------------------------------------------------------

function readSession(): SessionState {
  const stored = parse<Partial<SessionState> | null>(read("session", SESSION_KEY), null);
  if (!stored) return memory.session;
  return {
    shown: Array.isArray(stored.shown) ? stored.shown : memory.session.shown,
    views: typeof stored.views === "number" ? stored.views : memory.session.views,
    returning: typeof stored.returning === "boolean" ? stored.returning : memory.session.returning,
  };
}

function saveSession(next: SessionState) {
  memory.session = next;
  write("session", SESSION_KEY, JSON.stringify(next));
}

export function shownThisSession(key: string): boolean {
  return readSession().shown.includes(key);
}

export function markShownThisSession(key: string) {
  const s = readSession();
  if (!s.shown.includes(key)) saveSession({ ...s, shown: [...s.shown, key] });
}

/** Counts a page view and returns the running total for this visit. */
export function countPageView(): number {
  const s = readSession();
  const views = s.views + 1;
  saveSession({ ...s, views });
  return views;
}

/**
 * New vs returning is decided once per visit, on its first page: if this
 * browser has been here before the visit began, the visitor is returning.
 */
export function isReturningVisitor(now: number): boolean {
  const s = readSession();
  if (s.returning !== null) return s.returning;

  const seen = read("local", FIRST_SEEN_KEY) ?? memory.firstSeen;
  const returning = seen !== null;
  if (!returning) {
    memory.firstSeen = String(now);
    write("local", FIRST_SEEN_KEY, String(now));
  }
  saveSession({ ...s, returning });
  return returning;
}
