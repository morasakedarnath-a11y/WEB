export function LoadingSkeleton({ rows = 3 }: { rows?: number }) {
  return <div className="skeleton-stack" aria-label="Loading">{Array.from({ length: rows }, (_, index) => <span className="skeleton" key={index} />)}</div>;
}
