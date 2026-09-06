/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Utility to process image URLs.
 * Automatically converts Google Drive links or IDs to:
 * https://lh3.googleusercontent.com/d/{IMAGE_ID}
 */
export function extractDriveId(input: string | undefined): string | null {
  if (!input || !input.trim()) return null;
  const trimmed = input.trim();

  // If already in lh3.googleusercontent.com/d/ID format
  const lh3Match = trimmed.match(/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]{15,60})/);
  if (lh3Match && lh3Match[1]) return lh3Match[1];

  // drive.google.com/file/d/ID/...
  const fileDMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]{15,60})/);
  if (fileDMatch && fileDMatch[1]) return fileDMatch[1];

  // drive.google.com/(open|uc|thumbnail)?id=ID
  const paramMatch = trimmed.match(/drive\.google\.com\/(?:open|uc|thumbnail)\?(?:[a-zA-Z0-9_=&-]+)?id=([a-zA-Z0-9_-]{15,60})/);
  if (paramMatch && paramMatch[1]) return paramMatch[1];

  // Generic ?id= or &id= on google domain
  const genericGoogleMatch = trimmed.match(/google\.com\/.*?[\?&]id=([a-zA-Z0-9_-]{15,60})/);
  if (genericGoogleMatch && genericGoogleMatch[1]) return genericGoogleMatch[1];

  // Raw Google Drive ID string (typical length 25-50 characters)
  const rawIdRegex = /^[a-zA-Z0-9_-]{20,50}$/;
  if (rawIdRegex.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export function formatDriveImageUrl(input: string | undefined, fallback: string = ''): string {
  if (!input || !input.trim()) {
    return fallback;
  }

  const trimmed = input.trim();

  // If already exactly in desired format
  if (trimmed.startsWith('https://lh3.googleusercontent.com/d/')) {
    return trimmed;
  }

  // Try extracting drive ID
  const driveId = extractDriveId(trimmed);
  if (driveId) {
    return `https://lh3.googleusercontent.com/d/${driveId}`;
  }

  // Regular standard URL (http / https / data:)
  return trimmed;
}

/**
 * Theme color palette definitions
 */
export type ThemePaletteKey = 'emerald' | 'navy' | 'maroon' | 'teal' | 'forest';
export type ThemeKey = ThemePaletteKey;

export interface ThemeColors {
  id: ThemePaletteKey;
  name: string;
  nameBn: string;
  colorHex: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryBadge: string;
  accent: string;
  heroGradient: string;
  borderActive: string;
  buttonBg: string;
}

export const THEME_PALETTES: Record<ThemePaletteKey, ThemeColors> = {
  emerald: {
    id: 'emerald',
    name: 'ইসলামিক এমারেল্ড (শান্ত সবুজ)',
    nameBn: 'ইসলামিক এমারেল্ড (শান্ত সবুজ)',
    colorHex: '#064e3b',
    primary: 'text-emerald-900',
    primaryHover: 'hover:bg-emerald-800',
    primaryLight: 'bg-emerald-50',
    primaryBadge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    accent: 'text-amber-500',
    heroGradient: 'from-emerald-950 via-emerald-900 to-emerald-950',
    borderActive: 'border-emerald-700',
    buttonBg: 'bg-emerald-800 hover:bg-emerald-900 text-white'
  },
  navy: {
    id: 'navy',
    name: 'অভিজাত রয়্যাল নেভি ব্লু',
    nameBn: 'অভিজাত রয়্যাল নেভি ব্লু',
    colorHex: '#082f49',
    primary: 'text-sky-950',
    primaryHover: 'hover:bg-sky-900',
    primaryLight: 'bg-sky-50',
    primaryBadge: 'bg-sky-100 text-sky-950 border-sky-300',
    accent: 'text-amber-400',
    heroGradient: 'from-slate-950 via-sky-950 to-indigo-950',
    borderActive: 'border-sky-700',
    buttonBg: 'bg-sky-900 hover:bg-sky-950 text-white'
  },
  maroon: {
    id: 'maroon',
    name: 'মার্জিত রুবি ও মেরুন',
    nameBn: 'মার্জিত রুবি ও মেরুন',
    colorHex: '#881337',
    primary: 'text-rose-950',
    primaryHover: 'hover:bg-rose-900',
    primaryLight: 'bg-rose-50',
    primaryBadge: 'bg-rose-100 text-rose-950 border-rose-300',
    accent: 'text-amber-500',
    heroGradient: 'from-stone-950 via-rose-950 to-stone-950',
    borderActive: 'border-rose-700',
    buttonBg: 'bg-rose-900 hover:bg-rose-950 text-white'
  },
  teal: {
    id: 'teal',
    name: 'আধুনিক টিল ও ফিরোজা',
    nameBn: 'আধুনিক টিল ও ফিরোজা',
    colorHex: '#134e4a',
    primary: 'text-teal-950',
    primaryHover: 'hover:bg-teal-800',
    primaryLight: 'bg-teal-50',
    primaryBadge: 'bg-teal-100 text-teal-950 border-teal-300',
    accent: 'text-amber-400',
    heroGradient: 'from-teal-950 via-teal-900 to-slate-950',
    borderActive: 'border-teal-700',
    buttonBg: 'bg-teal-800 hover:bg-teal-900 text-white'
  },
  forest: {
    id: 'forest',
    name: 'ঐতিহ্যবাহী বনানী সবুজ ও গোল্ড',
    nameBn: 'ঐতিহ্যবাহী বনানী সবুজ ও গোল্ড',
    colorHex: '#14532d',
    primary: 'text-green-950',
    primaryHover: 'hover:bg-green-900',
    primaryLight: 'bg-green-50',
    primaryBadge: 'bg-green-100 text-green-950 border-green-300',
    accent: 'text-yellow-500',
    heroGradient: 'from-zinc-950 via-green-950 to-emerald-950',
    borderActive: 'border-green-700',
    buttonBg: 'bg-green-900 hover:bg-green-950 text-white'
  }
};
