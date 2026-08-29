'use client';

/**
 * @typedef {Object} AlertProps
 * @property {'success'|'error'|'info'} [type]
 * @property {string} [message]
 * @property {string} [className]
 * @property {React.HTMLAttributes<HTMLDivElement>} rest
 */
const Alert = ({
  type = 'info',
  message = '',
  className = '',
  ...rest
}) => {
  if (!message) return null;

  return (
    <div className={`alert ${type} ${className}`.trim()} {...rest}>
      {message}
    </div>
  );
};

export { Alert };
