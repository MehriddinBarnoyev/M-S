/**
 * Birthday helpers — the whole site is a birthday site, so "birthday mode"
 * is on by default; the date is still used for the live counters and for
 * knowing whether today is the day itself. Everything is local-time based
 * (her phone's clock is what matters, not the server's).
 */

import { content } from "./content";

/** "08-19" for the current local date. */
function todayMonthDay(now = new Date()): string {
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${mm}-${dd}`;
}

/** [month, day] parsed out of content.birthday.monthDay. */
function birthdayParts(): [number, number] {
  const [mm, dd] = content.birthday.monthDay.split("-").map(Number);
  return [mm - 1, dd];
}

/**
 * The site always opens in birthday mode — the cake, the gifts and the
 * whole story are the point of it. `?nobday` turns it off so the plain
 * intro can still be previewed.
 */
export function isBirthdayMode(): boolean {
  if (typeof window === "undefined") return true;
  return !window.location.search.includes("nobday");
}

/** True only on the calendar day itself — used to soften a few sentences. */
export function isTheDayItself(): boolean {
  if (typeof window === "undefined") return false;
  if (window.location.search.includes("bday")) return true;
  return todayMonthDay() === content.birthday.monthDay;
}

/** Midnight at the start of today — the moment her birthday began. */
export function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Midnight at the start of the most recent birthday (today, if it is one). */
export function lastBirthday(now = new Date()): Date {
  const [m, d] = birthdayParts();
  const candidate = new Date(now.getFullYear(), m, d, 0, 0, 0, 0);
  if (candidate.getTime() > now.getTime()) candidate.setFullYear(candidate.getFullYear() - 1);
  return candidate;
}

/** Midnight at the start of the next birthday (a year out, on the day itself). */
export function nextBirthday(now = new Date()): Date {
  const [m, d] = birthdayParts();
  const candidate = new Date(now.getFullYear(), m, d, 0, 0, 0, 0);
  if (candidate.getTime() <= now.getTime()) candidate.setFullYear(candidate.getFullYear() + 1);
  return candidate;
}

export type Elapsed = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function split(ms: number): Elapsed {
  const safe = Math.max(0, ms);
  return {
    days: Math.floor(safe / 86400000),
    hours: Math.floor((safe % 86400000) / 3600000),
    minutes: Math.floor((safe % 3600000) / 60000),
    seconds: Math.floor((safe % 60000) / 1000),
  };
}

export function elapsedSince(from: Date, now = Date.now()): Elapsed {
  return split(now - from.getTime());
}

export function remainingUntil(until: Date, now = Date.now()): Elapsed {
  return split(until.getTime() - now);
}

/** Whole days she has been alive — only if birthDate is filled in. */
export function daysLived(now = Date.now()): number | null {
  const raw = content.birthday.birthDate;
  if (!raw) return null;
  const born = new Date(raw);
  if (Number.isNaN(born.getTime())) return null;
  return Math.floor((now - born.getTime()) / 86400000);
}

/** Age she turns today — from `turning`, or derived from birthDate. */
export function turningAge(now = new Date()): number | null {
  const { turning, birthDate } = content.birthday;
  if (typeof turning === "number") return turning;
  if (!birthDate) return null;
  const born = new Date(birthDate);
  if (Number.isNaN(born.getTime())) return null;
  const bday = lastBirthday(now);
  return bday.getFullYear() - born.getFullYear();
}
