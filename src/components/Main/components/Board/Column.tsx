import React, { FC, useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import ConfirmAction from '../../../../componentsUtils/forms/ConfirmActionForm/ConfirmActionForm';
import Modal from '../../../../componentsUtils/Modal/Modal';
import textData from '../../../../data/textData';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import {
  ColumnType,
  decreaseColumnCount,
  deleteColumnTAC,
  getAllColumnsTAC,
  setCurrentColumnId,
  setOrder,
  setTitle,
  toggleColumnChange,
  toggleModal,
  toggleTask,
} from '../../../../store/reducers/boardReducer';
import styles from './Board.module.css';
import TasksPreview from './TasksPreview';

const Column: FC = () => {
  const columns = useAppSelector((store) => store.boardReducer.columns);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllColumnsTAC({ boardId: id as string }));
  }, [dispatch, id]);

  return (
    <>
      {columns.map((column, index) => (
        <ColumnItem key={column._id} id={id} column={column} index={index} />
      ))}
    </>
  );
};

interface ColumnItemPropsType {
  column: ColumnType;
  index: number;
  id: string | undefined;
}

const ColumnItem: FC<ColumnItemPropsType> = ({ column, index, id }) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language.value);
  const [statusDeleteBoardModal, setStatusDeleteBoardModal] = useState(false);

  const closeDeleteModal = () => setStatusDeleteBoardModal(false);
  const openDeleteModal = () => setStatusDeleteBoardModal(true);

  const deleteColumn = async (columnId: string) => {
    dispatch(decreaseColumnCount());
    await dispatch(deleteColumnTAC({ id: columnId, boardId: id as string }));
  };

  const renderDeleteBoardModal = (columnId: string) => {
    if (statusDeleteBoardModal) {
      return (
        <Modal closeModal={closeDeleteModal}>
          <ConfirmAction
            question={textData.boardsPage.questionConfirmingDeleteColumn[language]}
            confirm={() => deleteColumn(columnId)}
            cancel={closeDeleteModal}
          />
        </Modal>
      );
    }
  };

  return (
    <>
      <Draggable key={column._id} draggableId={column._id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            draggable={true}
          >
            <div className={styles.column}>
              <div className={styles.headingWrapper}>
                <h2 className={styles.titleColumn}>{column.title}</h2>
                <button
                  className={styles.edit}
                  onClick={() => {
                    dispatch(setCurrentColumnId(column._id));
                    dispatch(setTitle(column.title));
                    dispatch(setOrder(column.order));
                    dispatch(toggleModal());
                    dispatch(toggleColumnChange());
                  }}
                ></button>
                <button className={styles.delete} onClick={openDeleteModal}></button>
              </div>
              <Droppable droppableId={column._id} type="task">
                {(provided) => (
                  <div
                    className={styles.tasksWrapper}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <TasksPreview _id={column._id} />
                    {provided.placeholder}
                    <button
                      className={styles.addButton}
                      onClick={() => {
                        dispatch(setCurrentColumnId(column._id));
                        dispatch(toggleModal());
                        dispatch(toggleTask());
                      }}
                    ></button>
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        )}
      </Draggable>
      {renderDeleteBoardModal(column._id)}
    </>
  );
};

export default Column;
