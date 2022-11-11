import React, { ReactNode, FC } from 'react';
import styles from './InputFormWrapper.module.css';
import { FormErrorMessage } from './componets/index';

interface PropsType {
  children: ReactNode;
  error?: string;
}

const InputFormWrapper: FC<PropsType> = ({ children, error }) => {
  return (
    <div className={styles.wrapper}>
      {children}
      {error && <FormErrorMessage message={error} />}
    </div>
  );
};

export default InputFormWrapper;
