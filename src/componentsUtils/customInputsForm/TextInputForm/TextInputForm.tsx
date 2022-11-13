import React, { ChangeEventHandler, FC, useId } from 'react';
import styles from './TextInputForm.module.css';
import InputFormWrapper from '../InputFormWrapper/InputFormWrapper';

interface PropsType {
  onChangeText: ChangeEventHandler;
  value: string;
  label: string;
  placeholder: string;
  type: 'text' | 'password' | 'email';
  error?: string;
}

const TextInputForm: FC<PropsType> = (props) => {
  const { onChangeText, value, error, label, placeholder, type } = props;

  const id = useId();

  return (
    <InputFormWrapper error={error}>
      <div className={styles.field}>
        <label className={styles.labelfield} htmlFor={id}>
          {label}
        </label>
        <input
          onChange={onChangeText}
          value={value}
          className={styles.inputfield}
          id={id}
          type={type}
          placeholder={placeholder}
        />
      </div>
    </InputFormWrapper>
  );
};

export default TextInputForm;
