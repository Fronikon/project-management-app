import React, { FC, useEffect } from 'react';
import styles from './Board.module.css';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { deleteTask, getColumnTasks, updateTasks } from '../../../../api/taskApi';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { setTasks } from '../../../../store/reducers/boardReducer';

interface TypeProps {
  _id: string;
}

const TasksPreview: FC<TypeProps> = ({ _id }) => {
  const tasks = useAppSelector((store) => store.board.tasks);
  const dispatch = useAppDispatch();

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(tasks[_id]);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(setTasks({ items: items, id: _id }));
    for (let i = 0; i < tasks[_id].length; i++) {
      dispatch(
        updateTasks({
          title: items[i].title,
          order: i,
          columnId: items[i].columnId,
          description: items[i].description,
          color: items[i].color,
          userId: items[i].userId,
          users: items[i].users,
          _id: items[i]._id,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getColumnTasks({ _id }));
  }, [dispatch, _id]);

  return (
    <>
      <ul>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {tasks[_id]?.map((task, id) => (
                  <Draggable key={task._id} draggableId={task._id as string} index={id}>
                    {(provided) => (
                      <li
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
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ul>
    </>
  );
};

export default TasksPreview;
