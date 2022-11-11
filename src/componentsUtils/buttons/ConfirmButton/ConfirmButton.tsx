import React, { FC } from 'react';
import styles from './ConfirmButton.module.css';
import buttonsStyles from '../buttons.module.css';

interface PropsType {
  disabled?: boolean;
}

const ConfirmButton: FC<PropsType> = ({ disabled }) => {
  return (
    <input
      className={`${buttonsStyles.button} ${styles.button}`}
      type="submit"
      value="Confirm"
      disabled={disabled}
    />
  );
};

export default ConfirmButton;
