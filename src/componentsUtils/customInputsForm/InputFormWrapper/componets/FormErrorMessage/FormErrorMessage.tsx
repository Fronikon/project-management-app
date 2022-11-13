import React, { FC } from 'react';
import styles from './FormErrorMessage.module.css';

interface PropsType {
  message: string;
}

const FormErrorMessage: FC<PropsType> = ({ message }) => {
  return <span className={styles.errorMessage}>{message}</span>;
};

export default FormErrorMessage;
