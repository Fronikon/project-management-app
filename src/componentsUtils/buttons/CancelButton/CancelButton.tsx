import React, { FC } from 'react';
import styles from './CancelButton.module.css';
import buttonsStyles from '../buttons.module.css';

interface PropsType {
  handleClick: () => void;
  name: string;
}

const CancelButton: FC<PropsType> = ({ handleClick, name }) => {
  return (
    <input
      className={`${buttonsStyles.button} ${styles.button}`}
      type="button"
      value={name}
      onClick={handleClick}
    />
  );
};

export default CancelButton;
