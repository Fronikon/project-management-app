import React, { FC, useEffect } from 'react';
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

interface TypeProps {
  _id: string;
}

const TasksPreview: FC<TypeProps> = ({ _id }) => {
  const tasks = useAppSelector((store) => store.boardReducer.tasks);
  const tasksLength = useAppSelector((store) => store.boardReducer.tasksLength);
  const { id } = useParams();
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(getColumnTasksTAC({ columnId: _id, boardId: id as string }));
  }, [dispatch, _id, id]);

  return (
    <>
      {tasks[_id]?.map((task, index) => (
        <Draggable key={task._id} draggableId={task._id as string} index={index}>
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
                    onClick={async () => {
                      if (task._id !== undefined) {
                        dispatch(decreaseTasksCount(_id));
                        dispatch(
                          deleteTaskTAC({ columnId: _id, taskId: task._id, boardId: id as string })
                        ).finally(() => updateSpecialTasksOrder(tasks[_id], _id));
                      }
                    }}
                  ></button>
                </div>
                <div className={styles.descriptionWrapper}>
                  <p className={styles.descriptionTask}>{task.description}</p>
                </div>
              </div>
            );
          }}
        </Draggable>
      ))}
    </>
  );
};

export default TasksPreview;
