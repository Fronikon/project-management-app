import React, { FC, useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import CancelButton from '../../../../componentsUtils/buttons/CancelButton/CancelButton';
import ConfirmButton from '../../../../componentsUtils/buttons/ConfirmButton/ConfirmButton';
import textData from '../../../../data/textData';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import {
  decreaseColumnCount,
  deleteColumnTAC,
  getAllColumnsTAC,
  setCurrentColumnId,
  setTitle,
  toggleModal,
  toggleTask,
  updateColumnTAC,
} from '../../../../store/reducers/boardReducer';
import styles from './Board.module.css';
import TasksPreview from './TasksPreview';
import TextInputForm from '../../../../componentsUtils/customInputsForm/TextInputForm/TextInputForm';

const Column: FC = () => {
  const column = useAppSelector((store) => store.boardReducer.columns);
  const boardId = useAppSelector((store) => store.boardReducer.columns[0].boardId);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const language = useAppSelector((store) => store.language.value);
  const [currentId, setCurrentId] = useState('');
  const [currentOrder, setCurrentOrder] = useState(0);

  const {
    handleSubmit,
    control,
    formState: { isDirty },
  } = useForm<{ title: string }>();

  const cancel = () => {
    setIsEditing(false);
  };

  const onClick = (columnId: string, index: number) => {
    setCurrentId(columnId);
    setCurrentOrder(index);
    setIsEditing(true);
  };

  const onSubmit = (data: { title: string }) => {
    dispatch(setTitle(data.title));
    const columnData = {
      title: data.title,
      order: currentOrder,
    };
    dispatch(updateColumnTAC({ columnData, boardId, id: currentId }));
    setIsEditing(false);
  };

  useEffect(() => {
    dispatch(getAllColumnsTAC({ boardId: id as string }));
  }, [dispatch, id, isEditing]);

  return (
    <>
      {column.map((column, index) => (
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
                  {isEditing && currentId === column._id ? (
                    <form className={styles.columnForm} onSubmit={handleSubmit(onSubmit)}>
                      <Controller
                        name="title"
                        control={control}
                        defaultValue={column.title}
                        render={({ field: { onChange, value } }) => (
                          <TextInputForm
                            onChangeText={onChange}
                            value={value}
                            type={'text'}
                            label={''}
                            placeholder={''}
                          />
                        )}
                      />
                      <div className={styles.buttons}>
                        <ConfirmButton
                          name={textData.boardsPage.editBoard.confirmButton[language]}
                          disabled={!isDirty}
                        />
                        <CancelButton
                          name={textData.boardsPage.createBoard.cancelButton[language]}
                          handleClick={cancel}
                        />
                      </div>
                    </form>
                  ) : (
                    <h2 className={styles.titleColumn} onClick={() => onClick(column._id, index)}>
                      {column.title}
                    </h2>
                  )}
                  <button
                    className={styles.delete}
                    onClick={() => {
                      dispatch(decreaseColumnCount());
                      dispatch(deleteColumnTAC({ id: column._id, boardId: id as string }));
                    }}
                  ></button>
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
      ))}
    </>
  );
};

export default Column;
