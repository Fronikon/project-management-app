import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import ConfirmAction from '../../../../../../componentsUtils/forms/ConfirmActionForm/ConfirmActionForm';
import textData from '../../../../../../data/textData';
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/reduxHooks';
import {
  decreaseTasksCount,
  deleteTaskTAC,
  resetColumnId,
  resetTaskId,
  TaskType,
  updateTaskTAC,
} from '../../../../../../store/reducers/boardReducer';

interface PropsType {
  closeModal: () => void;
}

const DeleteTask: FC<PropsType> = ({ closeModal }) => {
  const language = useAppSelector((store) => store.language.value);
  const tasks = useAppSelector((store) => store.boardReducer.tasks);
  const columnId = useAppSelector((store) => store.boardReducer.columnId);
  const taskId = useAppSelector((store) => store.boardReducer.taskId);
  const tasksLength = useAppSelector((store) => store.boardReducer.tasksLength);
  const dispatch = useAppDispatch();
  const { id } = useParams();

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

  const deleteConfirm = () => {
    dispatch(decreaseTasksCount(columnId));
    dispatch(deleteTaskTAC({ columnId: columnId, taskId: taskId, boardId: id as string })).finally(
      () => updateSpecialTasksOrder(tasks[columnId], columnId)
    );
    dispatch(resetColumnId());
    dispatch(resetTaskId());
    closeModal();
  };

  const deleteCancel = () => {
    dispatch(resetColumnId());
    dispatch(resetTaskId());
    closeModal();
  };

  return (
    <ConfirmAction
      question={textData.boardsPage.questionConfirmingDeleteTask[language]}
      confirm={deleteConfirm}
      cancel={deleteCancel}
    />
  );
};

export default DeleteTask;
