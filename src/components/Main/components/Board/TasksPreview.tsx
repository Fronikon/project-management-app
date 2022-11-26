import React, { FC, useEffect } from 'react';
import styles from './Board.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { deleteTask, getColumnTasks } from '../../../../api/taskApi';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

interface TypeProps {
  _id: string;
}

const TasksPreview: FC<TypeProps> = ({ _id }) => {
  const tasks = useAppSelector((store) => store.board.tasks);
  const dispatch = useAppDispatch();

  // const handleOnDragEnd = (result: DropResult) => {
  //   if (!result.destination) return;
  //   const items = Array.from(tasks);
  //   const [reorderedItem] = items.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);
  // };

  useEffect(() => {
    dispatch(getColumnTasks({ _id }));
  }, [dispatch, _id]);

  return (
    <>
      <ul>
        {tasks[_id]?.map((task, id) => (
          <li style={{ backgroundColor: task.color }} className={styles.task} key={task._id}>
            <div className={styles.titleWrapper}>
              <h3 className={styles.titleTask}>{task.title}</h3>
              <button
                className={`${styles.delete} ${styles.deleteTask}`}
                onClick={() => {
                  if (task._id !== undefined) {
                    dispatch(deleteTask({ columnId: _id, taskId: task._id }));
                    dispatch(getColumnTasks({ _id: _id }));
                  }
                }}
              ></button>
            </div>
            <p className={styles.descriptionTask}>{task.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TasksPreview;
