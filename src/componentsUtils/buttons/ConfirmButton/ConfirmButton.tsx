import React, { FC } from 'react';
import styles from './ConfirmButton.module.css';
import buttonsStyles from '../buttons.module.css';
import textData from '../../../data/textData';
import { useAppSelector } from '../../../hooks/reduxHooks';

interface PropsType {
  disabled?: boolean;
  name: string;
}

<<<<<<< HEAD
const ConfirmButton: FC<PropsType> = ({ disabled }) => {
  const language = useAppSelector((store) => store.language.value);

=======
const ConfirmButton: FC<PropsType> = ({ disabled, name }) => {
>>>>>>> 74b1a6c (feat: add translate for modal, and buttons in header)
  return (
    <input
      className={`${buttonsStyles.button} ${styles.button}`}
      type="submit"
<<<<<<< HEAD
      value={textData.general.confirm[language]}
=======
      value={name}
>>>>>>> 74b1a6c (feat: add translate for modal, and buttons in header)
      disabled={disabled}
    />
  );
};

export default ConfirmButton;
