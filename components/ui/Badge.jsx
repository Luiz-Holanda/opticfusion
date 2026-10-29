
export function Badge({
  children,
  variant = 'default',
  className = '',
  ...props
}) {
  const variantClass = {
    default: 'pill--default',
    cyan: 'pill--cyan',
    purple: 'pill--purple',
    success: 'pill--success',
    outline: 'pill--outline',
  }[variant] || '';

  return (
    <span className={`pill ${variantClass} ${className}`} {...props}>
      {children}
    </span>
  );
}
