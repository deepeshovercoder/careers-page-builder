'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface DropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}

export default function Dropdown({
  value,
  onChange,
  options,
  placeholder,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between
          rounded-xl border border-gray-300 bg-white
          px-4 py-3 text-sm text-gray-800
          shadow-sm hover:shadow-md transition focus-ring"
      >
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {value || placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute z-20 mt-2 w-full
          rounded-xl bg-white shadow-xl border border-gray-200
          overflow-hidden transition-all duration-200 origin-top
          ${
            open
              ? 'scale-100 opacity-100'
              : 'scale-95 opacity-0 pointer-events-none'
          }`}
      >
        {options.map(option => (
          <button
            key={option}
            onClick={() => {
              onChange(option);
              setOpen(false);
            }}
            className={`w-full text-left px-4 py-3 text-sm
              hover:bg-gray-100 transition
              ${value === option ? 'bg-gray-100 font-medium' : ''}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
