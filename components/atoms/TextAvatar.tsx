'use client';
import React from 'react';

export const AVATAR_PALETTE = [
  { bg: 'bg-emerald-600', text: 'text-white' },
  { bg: 'bg-indigo-600', text: 'text-white' },
  { bg: 'bg-rose-600', text: 'text-white' },
  { bg: 'bg-amber-600', text: 'text-white' },
  { bg: 'bg-sky-600', text: 'text-white' },
  { bg: 'bg-violet-600', text: 'text-white' },
  { bg: 'bg-teal-600', text: 'text-white' },
  { bg: 'bg-orange-600', text: 'text-white' },
  { bg: 'bg-purple-600', text: 'text-white' },
  { bg: 'bg-pink-600', text: 'text-white' },
  { bg: 'bg-cyan-600', text: 'text-white' },
  { bg: 'bg-blue-600', text: 'text-white' },
];

/**
 * Deterministically generates a color scheme based on input string hash.
 * Always produces the exact same color for the same input string.
 */
export function getDeterministicColor(str?: string | null) {
  if (!str || !str.trim()) return AVATAR_PALETTE[0];
  const cleaned = str.trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < cleaned.length; i++) {
    hash = cleaned.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  const index = Math.abs(hash) % AVATAR_PALETTE.length;
  return AVATAR_PALETTE[index];
}

/**
 * Extracts 1 or 2 uppercase initials from flexible name, firstName/lastName, or email variables.
 */
export function extractInitials(
  name?: string | null,
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null
): string {
  const fn = (firstName || '').trim();
  const ln = (lastName || '').trim();

  if (fn && ln) {
    return `${fn[0]}${ln[0]}`.toUpperCase();
  }

  const combined = fn || ln || (name || '').trim();
  if (combined) {
    const parts = combined.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
  }

  const rawEmail = (email || '').trim();
  if (rawEmail) {
    const handle = rawEmail.split('@')[0];
    if (handle) return handle.slice(0, 2).toUpperCase();
  }

  return '?';
}

export interface TextAvatarProps {
  name?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  size?: number;
  className?: string;
  colorClass?: string;
  textClassName?: string;
  title?: string;
}

const TextAvatar: React.FC<TextAvatarProps> = ({
  name,
  firstName,
  lastName,
  email,
  size = 36,
  className = '',
  colorClass,
  textClassName = '',
  title,
}) => {
  const initials = extractInitials(name, firstName, lastName, email);
  const identifier = (name || `${firstName || ''} ${lastName || ''}`).trim() || email || initials;
  const colorScheme = getDeterministicColor(identifier);
  const bgClass = colorClass || colorScheme.bg;
  const fontColor = colorScheme.text;

  const displayTitle = title || identifier || 'User';
  const fontSize = Math.max(10, Math.round(size * 0.38));

  return (
    <div
      className={`relative flex items-center justify-center rounded-full shadow-2xs flex-shrink-0 select-none ${bgClass} ${className}`}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
      title={displayTitle}
    >
      <span
        className={`font-bold uppercase tracking-wider ${fontColor} ${textClassName}`}
        style={{ fontSize }}
      >
        {initials}
      </span>
    </div>
  );
};

export default TextAvatar;
