import React, { FC } from 'react';
import styles from './ConfirmButton.module.css';
import buttonsStyles from '../buttons.module.css';

interface PropsType {
  disabled?: boolean;
  name: string;
}

const ConfirmButton: FC<PropsType> = ({ disabled, name }) => {
  return (
    <input
      className={`${buttonsStyles.button} ${styles.button}`}
      type="submit"
      value={name}
      disabled={disabled}
    />
  );
};

export default ConfirmButton;
