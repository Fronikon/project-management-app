import React, { FC, FormEvent } from 'react';
import formsStyles from '../forms.module.css';
import CancelButton from '../../buttons/CancelButton/CancelButton';
import ConfirmButton from '../../buttons/ConfirmButton/ConfirmButton';

interface PropsType {
  confirm: () => void;
  cancel: () => void;
}

const ConfirmAction: FC<PropsType> = ({ confirm, cancel }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    confirm();
  };

  return (
    <form onSubmit={handleSubmit} className={formsStyles.form}>
      <h3 className={formsStyles.title}>Are you sure?</h3>
      <div className={formsStyles.buttons}>
        <ConfirmButton />
        <CancelButton handleClick={cancel} />
      </div>
    </form>
  );
};

export default ConfirmAction;
