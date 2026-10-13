import React, { useEffect, useRef, useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';

interface SearchBoxProps {
  /** Pre-fill (used on the results page). */
  defaultValue?: string;
  placeholder?: string;
  autoFocus?: boolean;
  busy?: boolean;
  /** 'hero' = large centred box. 'bar' = compact, used in the results header. */
  variant?: 'hero' | 'bar';
  onSubmitQuery: (q: string) => void;
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  defaultValue = '',
  placeholder = 'Search the web with Gothwad AI',
  autoFocus = false,
  busy = false,
  variant = 'hero',
  onSubmitQuery,
  className = '',
}) => {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the box in sync when the URL query changes (back/forward, new search).
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (q) onSubmitQuery(q);
  };

  const isHero = variant === 'hero';

  return (
    <form
      onSubmit={submit}
      role="search"
      className={`w-full ${isHero ? 'max-w-2xl' : 'max-w-xl'} ${className}`}
    >
      <div
        className={`flex items-center gap-2 w-full rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-sm transition-shadow focus-within:shadow-md focus-within:border-[#0494f4] ${
          isHero ? 'px-4 sm:px-5 py-3 sm:py-3.5' : 'px-3.5 py-2.5'
        }`}
      >
        <Search
          className={`shrink-0 text-zinc-400 ${isHero ? 'w-5 h-5' : 'w-4 h-4'}`}
          aria-hidden="true"
        />

        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Search"
          enterKeyHint="search"
          className={`flex-1 bg-transparent outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 [&::-webkit-search-cancel-button]:appearance-none ${
            isHero ? 'text-base sm:text-lg' : 'text-sm'
          }`}
        />

        {busy && (
          <Loader2 className="w-4 h-4 shrink-0 animate-spin text-[#0494f4]" aria-hidden="true" />
        )}

        {!busy && value && (
          <button
            type="button"
            onClick={() => {
              setValue('');
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="shrink-0 p-1 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </form>
  );
};
