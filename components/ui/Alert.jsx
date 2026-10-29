'use client';


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
