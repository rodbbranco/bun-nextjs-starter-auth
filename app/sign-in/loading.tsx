export default function SignInLoading() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="h-7 w-32 animate-pulse rounded bg-muted" />
          <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-10 w-full animate-pulse rounded bg-muted" />
        <div className="flex w-full items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <div className="h-3 w-28 animate-pulse rounded bg-muted" />
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="h-10 w-full animate-pulse rounded bg-muted" />
          <div className="h-10 w-full animate-pulse rounded bg-muted" />
          <div className="h-10 w-full animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  )
}
