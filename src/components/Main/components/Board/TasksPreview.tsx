import React, { FC, useEffect, useState } from 'react';
import styles from './Board.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { Draggable } from 'react-beautiful-dnd';
import {
  decreaseTasksCount,
  deleteTaskTAC,
  getColumnTasksTAC,
  setColor,
  setCurrentTaskId,
  setDescription,
  setOrder,
  setTitle,
  TaskType,
  toggleModal,
  toggleTaskChange,
  updateTaskTAC,
} from '../../../../store/reducers/boardReducer';
import { useParams } from 'react-router-dom';
import Modal from '../../../../componentsUtils/Modal/Modal';
import ConfirmAction from './../../../../componentsUtils/forms/ConfirmActionForm/ConfirmActionForm';
import textData from './../../../../data/textData';

interface TypeProps {
  _id: string;
}

const TasksPreview: FC<TypeProps> = ({ _id }) => {
  const tasks = useAppSelector((store) => store.boardReducer.tasks);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getColumnTasksTAC({ columnId: _id, boardId: id as string }));
  }, [dispatch, _id, id]);

  return (
    <>
      {tasks[_id]?.map((task, index) => (
        <TaskItem key={task._id} _id={_id} task={task} id={id} index={index} />
      ))}
    </>
  );
};

interface TaskItemPropsType {
  task: TaskType;
  index: number;
  id: string | undefined;
  _id: string;
}

const TaskItem: FC<TaskItemPropsType> = ({ _id, id, index, task }) => {
  const tasks = useAppSelector((store) => store.boardReducer.tasks);
  const tasksLength = useAppSelector((store) => store.boardReducer.tasksLength);
  const language = useAppSelector((state) => state.language.value);
  const dispatch = useAppDispatch();

  const [statusDeleteBoardModal, setStatusDeleteBoardModal] = useState(false);

  const closeDeleteModal = () => setStatusDeleteBoardModal(false);
  const openDeleteModal = () => setStatusDeleteBoardModal(true);

  const deleteTask = async () => {
    if (task._id !== undefined) {
      dispatch(decreaseTasksCount(_id));
      dispatch(deleteTaskTAC({ columnId: _id, taskId: task._id, boardId: id as string })).finally(
        () => updateSpecialTasksOrder(tasks[_id], _id)
      );
    }
  };

  const renderDeleteTaskModal = () => {
    if (statusDeleteBoardModal) {
      return (
        <Modal closeModal={closeDeleteModal}>
          <ConfirmAction
            question={textData.boardsPage.questionConfirmingDeleteTask[language]}
            confirm={() => deleteTask()}
            cancel={closeDeleteModal}
          />
        </Modal>
      );
    }
  };

  const updateSpecialTasksOrder = (tasks: TaskType[], columnId: string) => {
    for (let i = 0; i < tasksLength[columnId]; i++) {
      const taskData = {
        title: tasks[i].title,
        order: i,
        description: tasks[i].description,
        color: tasks[i].color,
        columnId: columnId,
        userId: tasks[i].userId,
        users: tasks[i].users,
        boardId: id as string,
        _id: tasks[i]._id,
      };

      dispatch(updateTaskTAC({ taskData }));
    }
  };

  return (
    <>
      <Draggable draggableId={task._id as string} index={index}>
        {(provided) => {
          const style = {
            ...provided.draggableProps.style,
            backgroundColor: task.color,
          };
          return (
            <div
              className={styles.task}
              draggable={true}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              style={style}
            >
              <div className={styles.titleWrapper}>
                <h3 className={styles.titleTask}>{task.title}</h3>
                <button
                  className={styles.edit}
                  onClick={() => {
                    dispatch(
                      setCurrentTaskId({ taskId: task._id as string, columnId: task.columnId })
                    );
                    dispatch(setTitle(task.title));
                    dispatch(setDescription(task.description));
                    dispatch(setColor(task.color));
                    dispatch(setOrder(task.order));
                    dispatch(toggleModal());
                    dispatch(toggleTaskChange());
                  }}
                ></button>
                <button
                  className={`${styles.delete} ${styles.deleteTask}`}
                  onClick={openDeleteModal}
                ></button>
              </div>
              <div className={styles.descriptionWrapper}>
                <p className={styles.descriptionTask}>{task.description}</p>
              </div>
            </div>
          );
        }}
      </Draggable>
      {renderDeleteTaskModal()}
    </>
  );
};

export default TasksPreview;
