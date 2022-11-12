import React, { FC } from 'react';
import styles from './CancelButton.module.css';
import buttonsStyles from '../buttons.module.css';

interface PropsType {
  handleClick: () => void;
}

const CancelButton: FC<PropsType> = ({ handleClick }) => {
  return (
    <input
      className={`${buttonsStyles.button} ${styles.button}`}
      type="button"
      value="Cancel"
      onClick={handleClick}
    />
  );
};

export default CancelButton;
