import React, { MouseEvent, ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

interface PropsType {
  closeModal: () => void;
  children: ReactNode;
}

const Modal: React.FC<PropsType> = ({ closeModal, children }) => {
  const element = document.createElement('div');
  const modal = useRef(null);

  const onClick = (e: MouseEvent): void => {
    if (e.target === modal.current) {
      closeModal();
    }
  };

  useEffect(() => {
    modalRoot!.appendChild(element);
    document.body.style.overflow = 'hidden';

    return () => {
      modalRoot!.removeChild(element);
      document.body.style.overflow = 'auto';
    };
  }, [element]);

  return ReactDOM.createPortal(
    <div ref={modal} onClick={onClick} className={styles.modal}>
      {children}
    </div>,
    element
  );
};

export default Modal;
