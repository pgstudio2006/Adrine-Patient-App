return (
  <div className="min-h-screen flex items-center justify-center bg-surface-secondary px-4">
    <div className="w-full max-w-sm">
      {/* Logo & branding */}
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-primary-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-200">
          <span className="text-white text-2xl font-bold">A</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Adrine Patient</h1>
        <p className="text-sm text-muted mt-1">
          Sign in to manage your healthcare
        </p>
      </div>

      {/* Login form */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700"
            >
              Full name
            </label>
            <input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Priya Sharma"
              required
              autoComplete="name"
              autoFocus
              className="input"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-700 text-sm">
              <svg
                className="w-4 h-4 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              {error}
            </div>
          )}

          <Button
            type="submit"
            loading={submitting}
            disabled={!fullName.trim()}
            className="w-full"
          >
            {submitting ? 'Signing in…' : 'Continue'}
          </Button>
        </form>
      </div>

      {/* Runtime Info */}
      <div className="mt-6 text-xs text-muted text-center leading-relaxed">
        {isPlatformRuntimeEnabled() ? (
          <>
            Live mode: calls kernel at{' '}
            <code className="text-primary-600 bg-primary-50 px-1 rounded">
              {kernelBase() ?? '(set NEXT_PUBLIC_KERNEL_API_URL)'}
            </code>
            .
          </>
        ) : (
          <>
            Demo mode. Set{' '}
            <code className="text-primary-600 bg-primary-50 px-1 rounded">
              NEXT_PUBLIC_PLATFORM_RUNTIME=true
            </code>{' '}
            for live APIs.
          </>
        )}
      </div>
    </div>
  </div>
);