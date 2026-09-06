/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent } from 'react';
import { Image as ImageIcon, Check, ExternalLink, HelpCircle } from 'lucide-react';
import { formatDriveImageUrl } from '../utils/imageUtils';

interface ImageDriveInputProps {
  id?: string;
  label: string;
  value: string;
  onChange: (formattedUrl: string) => void;
  placeholder?: string;
  helperText?: string;
  helpText?: string;
  previewHeight?: string;
  isGlobalIcon?: boolean;
}

export function ImageDriveInput({
  id,
  label,
  value,
  onChange,
  placeholder = 'গুগল ড্রাইভ ইমেজ আইডি বা লিংক দিন...',
  helperText,
  helpText,
  previewHeight = 'h-20',
  isGlobalIcon = false
}: ImageDriveInputProps) {
  const [loadError, setLoadError] = useState(false);
  const formattedUrl = formatDriveImageUrl(value);
  const resolvedHelper = helperText || helpText;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const formatted = formatDriveImageUrl(rawVal);
    setLoadError(false);
    onChange(formatted);
  };

  return (
    <div className="space-y-2 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
          <span>{label}</span>
          {isGlobalIcon && (
            <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 px-1.5 py-0.2 rounded font-normal">
              গ্লোবাল অটো-আপডেট
            </span>
          )}
        </label>
        {formattedUrl && (
          <a
            href={formattedUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-emerald-700 hover:underline flex items-center gap-0.5"
            title="ছবি নতুন ট্যাবে দেখুন"
          >
            <span>ছবি দেখুন</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-start">
        {/* Preview Container */}
        <div className={`w-20 ${previewHeight} shrink-0 bg-white rounded-lg border border-slate-300 overflow-hidden flex items-center justify-center relative shadow-2xs`}>
          {formattedUrl && !loadError ? (
            <img
              src={formattedUrl}
              alt="Preview"
              onError={() => setLoadError(true)}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="text-center p-1 text-slate-400 text-[10px]">
              <ImageIcon className="w-5 h-5 mx-auto mb-0.5 opacity-40" />
              <span>{loadError ? 'ছবি ত্রুটি' : 'প্রিভিউ'}</span>
            </div>
          )}
        </div>

        {/* Input & Helper Info */}
        <div className="flex-1 w-full space-y-1.5">
          <input
            id={id}
            type="text"
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-mono bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-2xs"
          />

          <div className="flex items-start gap-1 text-[11px] text-slate-500 leading-snug">
            <HelpCircle className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
            <span>
              {resolvedHelper || 'Google Drive ফাইলের আইডি বা লিংক পেস্ট করুন। এটি স্বয়ংক্রিয়ভাবে https://lh3.googleusercontent.com/d/ID ফরম্যাটে রূপান্তরিত হবে।'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
