import React, { FC, useEffect } from 'react';
import styles from './Board.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { deleteTask, getColumnTasks } from '../../../../api/taskApi';
import { Draggable, DraggingStyle, NotDraggingStyle } from 'react-beautiful-dnd';

interface TypeProps {
  _id: string;
}

const TasksPreview: FC<TypeProps> = ({ _id }) => {
  const tasks = useAppSelector((store) => store.boardReducer.tasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getColumnTasks({ _id }));
  }, [dispatch, _id]);

  return (
    <>
      {tasks[_id]?.map((task, index) => (
        <Draggable key={task._id} draggableId={task._id as string} index={index}>
          {(provided) => (
            <div
              style={{ backgroundColor: task.color }}
              className={styles.task}
              draggable={true}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
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
          )}
        </Draggable>
      ))}
    </>
  );
};

export default TasksPreview;
