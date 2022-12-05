// import React, { FC } from 'react';
// import { useParams } from 'react-router-dom';
// import ConfirmAction from '../../../../../../componentsUtils/forms/ConfirmActionForm/ConfirmActionForm';
// import textData from '../../../../../../data/textData';
// import { useAppDispatch, useAppSelector } from '../../../../../../hooks/reduxHooks';
// import {
//   decreaseColumnCount,
//   deleteColumnTAC,
//   resetColumnId,
//   toggleColumnDelete,
// } from '../../../../../../store/reducers/boardReducer';

// interface PropsType {
//   closeModal: () => void;
// }

// const DeleteTask: FC<PropsType> = ({ closeModal }) => {
//   const language = useAppSelector((store) => store.language.value);
//   const columnId = useAppSelector((store) => store.boardReducer.columnId);
//   const dispatch = useAppDispatch();
//   const { id } = useParams();

//   const deleteConfirm = () => {
//     dispatch(decreaseColumnCount());
//     dispatch(deleteColumnTAC({ id: columnId, boardId: id as string }));
//     dispatch(resetColumnId());
//     dispatch(toggleColumnDelete());
//     closeModal();
//   };

//   const deleteCancel = () => {
//     dispatch(resetColumnId());
//     dispatch(toggleColumnDelete());
//     closeModal();
//   };

//   return (
//     <ConfirmAction
//       question={textData.boardsPage.questionConfirmingDeleteBoard[language]}
//       confirm={deleteConfirm}
//       cancel={deleteCancel}
//     />
//   );
// };

// export default DeleteTask;
