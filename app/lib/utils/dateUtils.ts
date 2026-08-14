/**
 * Centralized date/time utilities for consistent, locale-safe date handling
 * across the app. Built on date-fns so parsing/formatting/comparisons share
 * one well-tested implementation instead of ad-hoc `new Date()` arithmetic
 * duplicated across components (term-sessions, academic years, holidays,
 * attendance, date pickers, etc. all need the same handful of operations).
 *
 * Every helper here is null/undefined/invalid-input safe: pass whatever a
 * form field, API response, or Mongo timestamp gives you and get back a
 * sane empty/false/null result instead of "Invalid Date" leaking into the UI.
 */
import {
  format,
  parseISO,
  isValid as isValidDateFns,
  isToday as _isToday,
  isPast as _isPast,
  isFuture as _isFuture,
  isSameDay,
  isWithinInterval,
  areIntervalsOverlapping,
  differenceInCalendarDays,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from 'date-fns';

export type DateInput = string | number | Date | null | undefined;

/** Safely coerce any date-ish input into a valid Date, or null if it can't be parsed. */
export function toDate(value: DateInput): Date | null {
  if (value === null || value === undefined || value === '') return null;
  const date =
    value instanceof Date
      ? value
      : typeof value === 'number'
      ? new Date(value)
      : parseISO(value);
  return isValidDateFns(date) ? date : null;
}

export function isValidDate(value: DateInput): boolean {
  return toDate(value) !== null;
}

/** Default format: "Oct 15, 2025". Pass any date-fns format string to override. */
export function formatDate(date: DateInput, pattern = 'MMM d, yyyy'): string {
  const d = toDate(date);
  return d ? format(d, pattern) : '';
}

export function formatDateTime(date: DateInput): string {
  return formatDate(date, 'MMM d, yyyy · h:mm a');
}

export function formatDateLong(date: DateInput): string {
  return formatDate(date, 'EEEE, MMMM d, yyyy');
}

export function formatDateShort(date: DateInput): string {
  return formatDate(date, 'M/d/yy');
}

/** "yyyy-MM-dd" — safe for <input type="date"> values and API payloads. */
export function toDateInputValue(date: DateInput): string {
  return formatDate(date, 'yyyy-MM-dd');
}

/**
 * "Oct 15, 2025 - Dec 20, 2025". Falls back gracefully if only one side is
 * a valid date (returns just that side) or neither is (returns '').
 */
export function formatDateRange(
  start: DateInput,
  end: DateInput,
  pattern = 'MMM d, yyyy'
): string {
  const s = formatDate(start, pattern);
  const e = formatDate(end, pattern);
  if (!s && !e) return '';
  if (!e) return s;
  if (!s) return e;
  return `${s} - ${e}`;
}

/**
 * "2 days ago" / "in 3 hours" — for activity feeds, audit logs, "last
 * updated" labels, notifications, etc.
 */
export function formatRelativeTime(
  date: DateInput,
  options?: { addSuffix?: boolean; strict?: boolean }
): string {
  const d = toDate(date);
  if (!d) return '';
  const { addSuffix = true, strict = false } = options || {};
  return strict
    ? formatDistanceToNowStrict(d, { addSuffix })
    : formatDistanceToNow(d, { addSuffix });
}

export function isToday(date: DateInput): boolean {
  const d = toDate(date);
  return d ? _isToday(d) : false;
}

export function isPastDate(date: DateInput): boolean {
  const d = toDate(date);
  return d ? _isPast(d) : false;
}

export function isFutureDate(date: DateInput): boolean {
  const d = toDate(date);
  return d ? _isFuture(d) : false;
}

export function isSameCalendarDay(a: DateInput, b: DateInput): boolean {
  const da = toDate(a);
  const db = toDate(b);
  return !!da && !!db && isSameDay(da, db);
}

/** Inclusive day-count between two dates — e.g. term/holiday length. */
export function daysBetween(start: DateInput, end: DateInput): number | null {
  const s = toDate(start);
  const e = toDate(end);
  if (!s || !e) return null;
  return Math.abs(differenceInCalendarDays(e, s));
}

/**
 * Whether `date` falls within [start, end] inclusive — e.g. "is this
 * attendance date inside the active term?"
 */
export function isWithinDateRange(
  date: DateInput,
  start: DateInput,
  end: DateInput
): boolean {
  const d = toDate(date);
  const s = toDate(start);
  const e = toDate(end);
  if (!d || !s || !e) return false;
  return isWithinInterval(d, { start: s, end: e });
}

/**
 * Whether two [start, end] ranges overlap — e.g. validating that two term
 * sessions or academic years don't clash before letting a user save one.
 */
export function doDateRangesOverlap(
  aStart: DateInput,
  aEnd: DateInput,
  bStart: DateInput,
  bEnd: DateInput
): boolean {
  const as = toDate(aStart);
  const ae = toDate(aEnd);
  const bs = toDate(bStart);
  const be = toDate(bEnd);
  if (!as || !ae || !bs || !be) return false;
  return areIntervalsOverlapping(
    { start: as, end: ae },
    { start: bs, end: be },
    { inclusive: true }
  );
}

/**
 * Human-readable duration between two dates, e.g. "3 months" — for term
 * length / academic year summaries where a raw day count is too granular.
 */
export function formatDuration(start: DateInput, end: DateInput): string {
  const days = daysBetween(start, end);
  if (days === null) return '';
  if (days === 0) return 'Same day';
  if (days === 1) return '1 day';
  if (days < 30) return `${days} days`;
  const months = Math.round(days / 30);
  if (months < 12) return months === 1 ? '1 month' : `${months} months`;
  const years = Math.round(days / 365);
  return years === 1 ? '1 year' : `${years} years`;
}
