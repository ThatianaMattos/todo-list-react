import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, toggleComplete, editTask, deleteTask }) => {
  return (
    <ul id="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          toggleComplete={toggleComplete}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
