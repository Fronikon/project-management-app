import React, { FC } from 'react';
import styles from './ConfirmButton.module.css';
import buttonsStyles from '../buttons.module.css';
import textData from '../../../data/textData';
import { useAppSelector } from '../../../hooks/reduxHooks';

interface PropsType {
  disabled?: boolean;
}

const ConfirmButton: FC<PropsType> = ({ disabled }) => {
  const language = useAppSelector((store) => store.language.value);

  return (
    <input
      className={`${buttonsStyles.button} ${styles.button}`}
      type="submit"
      value={textData.general.confirm[language]}
      disabled={disabled}
    />
  );
};

export default ConfirmButton;
