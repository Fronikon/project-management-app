import React, { ChangeEventHandler, FC, useId } from 'react';
import styles from './ColorInputForm.module.css';
import InputFormWrapper from '../InputFormWrapper/InputFormWrapper';

interface PropsType {
  onChangeColor: ChangeEventHandler;
  value: string;
  label: string;
  error?: string;
}

const ColorInputForm: FC<PropsType> = (props) => {
  const { onChangeColor, value, error, label } = props;

  const id = useId();

  return (
    <InputFormWrapper error={error}>
      <div className={styles.field}>
        <label className={styles.labelfield} htmlFor={id}>
          {label}
        </label>
        <input
          onChange={onChangeColor}
          value={value}
          className={styles.inputfield}
          id={id}
          type="color"
        />
      </div>
    </InputFormWrapper>
  );
};

export default ColorInputForm;
