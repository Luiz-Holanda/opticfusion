'use client';


const Modal = ({
  isOpen,
  onClose,
  title = '',
  children,
  className = '',
  ...rest
}) => {
  return (
    <div
      className={`modal ${isOpen ? 'open' : ''} ${className}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      {...rest}
    >
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-card">
        <div className="modal-head">
          <strong>{title}</strong>
          <button className="icon-btn" aria-label="Fechar" onClick={onClose}>
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export { Modal };
