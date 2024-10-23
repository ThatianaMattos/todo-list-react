import React from 'react';

const TaskItem = ({ task, index, toggleComplete, editTask, deleteTask }) => {
  return (
    <li className={task.completed ? 'completed' : ''}>
      {task.text}
      <div className="task-actions">
        <button onClick={() => toggleComplete(index)}>
          {task.completed ? 'Desfazer' : 'Concluir'}
        </button>
        <button onClick={() => editTask(index)}>Editar</button>
        <button onClick={() => deleteTask(index)}>Excluir</button>
      </div>
    </li>
  );
};

export default TaskItem;
