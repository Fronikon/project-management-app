import React, { FC, useEffect } from 'react';
import styles from './Board.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { deleteTask, getColumnTasks } from '../../../../api/taskApi';

interface TypeProps {
  _id: string;
}

const TasksPreview: FC<TypeProps> = ({ _id }) => {
  const tasks = useAppSelector((store) => store.board.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getColumnTasks({ _id }));
  }, [dispatch, _id]);

  return (
    <>
      {tasks[_id]?.map((task) => (
        <div
          key={task._id}
          style={{ backgroundColor: task.color }}
          className={styles.task}
          draggable={true}
        >
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
        </div>
      ))}
    </>
  );
};

export default TasksPreview;
