'use client';

import Link from 'next/link';


const Button = ({
  children,
  variant = 'ghost',
  size = 'md',
  asLink = false,
  href = '',
  className = '',
  type = 'button',
  ...rest
}) => {
  const SIZE_CLASSES = { sm: 'btn-sm', md: '', lg: 'btn-lg' };
  const VARIANT_CLASSES = { primary: 'btn-primary', ghost: 'btn-ghost', danger: 'btn-danger' };

  const classes = `btn ${SIZE_CLASSES[size] || ''} ${VARIANT_CLASSES[variant] || 'btn-ghost'} ${className}`.trim();

  if (asLink && href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
};

export { Button };
