import React, { FC, useEffect } from 'react';
import styles from './Board.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { Draggable } from 'react-beautiful-dnd';
import {
  decreaseTasksCount,
  deleteTaskTAC,
  getColumnTasksTAC,
  TaskType,
  updateTaskTAC,
} from '../../../../store/reducers/boardReducer';
import { useParams } from 'react-router-dom';
import useToken from '../../../../hooks/useToken';

interface TypeProps {
  _id: string;
}

const TasksPreview: FC<TypeProps> = ({ _id }) => {
  const tasks = useAppSelector((store) => store.boardReducer.tasks);
  const tasksLength = useAppSelector((store) => store.boardReducer.tasksLength);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const token = useToken();

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

      dispatch(updateTaskTAC({ taskData, token }));
    }
  };

  useEffect(() => {
    dispatch(getColumnTasksTAC({ columnId: _id, boardId: id as string, token }));
  }, [dispatch, _id, id, token]);

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
                  <button className={styles.edit}></button>
                  <button
                    className={`${styles.delete} ${styles.deleteTask}`}
                    onClick={() => {
                      if (task._id !== undefined) {
                        dispatch(decreaseTasksCount(_id));
                        dispatch(
                          deleteTaskTAC({
                            columnId: _id,
                            taskId: task._id,
                            boardId: id as string,
                            token,
                          })
                        );
                        updateSpecialTasksOrder(tasks[_id], _id);
                      }
                    }}
                  ></button>
                </div>
                <p className={styles.descriptionTask}>{task.description}</p>
              </div>
            );
          }}
        </Draggable>
      ))}
    </>
  );
};

export default TasksPreview;
