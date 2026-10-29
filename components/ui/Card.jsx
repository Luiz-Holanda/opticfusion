
export function Card({
  children,
  variant = 'glass',
  hoverable = true,
  className = '',
  ...props
}) {
  const variantClass = {
    glass: 'glass-panel',
    solid: 'solid-panel',
    glow: 'glass-panel glow-panel',
  }[variant] || 'glass-panel';

  return (
    <div
      className={`${variantClass} ${hoverable ? 'card-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
