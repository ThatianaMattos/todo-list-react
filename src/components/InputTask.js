import React from 'react';

const InputTask = ({ newTask, handleInputChange, addTask }) => {
  return (
    <div id="input-container">
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Adicione uma nova tarefa"
      />
      <button onClick={addTask}>Adicionar Tarefa</button>
    </div>
  );
};

export default InputTask;
