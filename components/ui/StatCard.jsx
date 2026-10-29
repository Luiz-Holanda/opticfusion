
export function StatCard({ value, label, unit = '', className = '' }) {
  return (
    <article className={`stat-card ${className}`}>
      <span className="stat-number" aria-live="polite" aria-atomic="true">
        {value}{unit}
      </span>
      <p className="stat-label">{label}</p>
    </article>
  );
}
