import React, { FC, FormEvent } from 'react';
import formsStyles from '../forms.module.css';
import CancelButton from '../../buttons/CancelButton/CancelButton';
import ConfirmButton from '../../buttons/ConfirmButton/ConfirmButton';
import { useAppSelector } from '../../../hooks/reduxHooks';
import textData from './../../../data/textData';

interface PropsType {
  confirm: () => void;
  cancel: () => void;
}

const ConfirmAction: FC<PropsType> = ({ confirm, cancel }) => {
  const language = useAppSelector((store) => store.language.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    confirm();
  };

  const fixedText = textData.general.confirmModal;

  return (
    <form onSubmit={handleSubmit} className={formsStyles.form}>
      <h3 className={formsStyles.title}>{fixedText.title[language]}</h3>
      <div className={formsStyles.buttons}>
        <ConfirmButton name={fixedText.confirmButton[language]} />
        <CancelButton name={fixedText.cancelButton[language]} handleClick={cancel} />
      </div>
    </form>
  );
};

export default ConfirmAction;
