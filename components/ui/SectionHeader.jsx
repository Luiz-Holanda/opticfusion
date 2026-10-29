'use client';


export function SectionHeader({
  kicker,
  title,
  titleHighlight,
  description,
  align = 'center',
  id,
  extra,
  className = '',
}) {
  return (
    <header className={`section-head ${align === 'left' ? 'section-head--left' : ''} ${className}`}>
      {kicker && <p className="kicker reveal">{kicker}</p>}
      {title && (
        <h2 id={id} className="reveal">
          {title}
          {titleHighlight && (
            <>
              {' '}
              <span className="grad">{titleHighlight}</span>
            </>
          )}
        </h2>
      )}
      {description && <p className="muted reveal">{description}</p>}
      {extra}
    </header>
  );
}
