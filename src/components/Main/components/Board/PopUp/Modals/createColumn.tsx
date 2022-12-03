// import React, { FC, useState } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import CancelButton from '../../../../../../componentsUtils/buttons/CancelButton/CancelButton';
// import ConfirmButton from '../../../../../../componentsUtils/buttons/ConfirmButton/ConfirmButton';
// import TextInputForm from '../../../../../../componentsUtils/customInputsForm/TextInputForm/TextInputForm';
// import textData from '../../../../../../data/textData';
// import { useAppDispatch } from '../../../../../../hooks/reduxHooks';
// import { PopUpType } from '../PopUp';
// import styles from './PopUp.module.css';

// const createColumn: FC = () => {
//   const dispatch = useAppDispatch();
//   const {
//     handleSubmit,
//     control,
//     formState: { errors, isDirty },
//   } = useForm<PopUpType>();

//   const columnConfirm = (data: PopUpType) => {
//     dispatch(createColumn({ title: data.title, order: columnLength, boardId: id as string }));
//     dispatch(toggleColumn());
//     dispatch(toggleModal());
//     dispatch(resetColumnId());
//     dispatch(setTitle(''));
//     dispatch(setOrder(0));
//     dispatch(increaseColumnCount());
//   };

//   const columnCancel = () => {
//     dispatch(toggleColumn());
//     dispatch(toggleModal());
//     dispatch(resetColumnId());
//     dispatch(setTitle(''));
//     dispatch(setOrder(0));
//   };

//   return (
//     <form className={styles.newColumnModal} onSubmit={handleSubmit(columnConfirm)}>
//       <h2 className={styles.modalHeading}>{textData.boardsPage.newColumn[language]}</h2>
//       <Controller
//         name="title"
//         control={control}
//         rules={{
//           required: '1',
//         }}
//         render={({ field: { onChange, value }, fieldState: { error } }) => (
//           <TextInputForm
//             onChangeText={onChange}
//             value={value}
//             error={!error?.message ? '' : textData.errors.required[language]}
//             type={'text'}
//             label={textData.boardsPage.title[language]}
//             placeholder={textData.boardsPage.createBoard.inputTitle.placeholder[language]}
//           />
//         )}
//       />
//       <div className={styles.btnsWrapper}>
//         <ConfirmButton
//           disabled={!isDirty || !!Object.keys(errors).length}
//           name={textData.general.confirmModal.confirmButton[language]}
//         />
//         <CancelButton
//           handleClick={columnCancel}
//           name={textData.general.confirmModal.cancelButton[language]}
//         />
//       </div>
//     </form>
//   );
// };

// export default createColumn;
