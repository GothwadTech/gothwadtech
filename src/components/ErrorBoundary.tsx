import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches render/chunk-loading failures so a stale deploy can never leave the
 * user on a blank page.
 */
export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Gothwad site render error:', error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    return (
      <div className="max-w-[640px] mx-auto px-4 py-20 text-center" role="alert">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Something went wrong</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          The page failed to load, usually because a new version was deployed. Reload to get the latest one.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 px-5 py-2 rounded-full bg-[#0494f4] hover:bg-[#0077cd] text-white text-sm font-medium cursor-pointer"
        >
          Reload page
        </button>
      </div>
    );
  }
}
