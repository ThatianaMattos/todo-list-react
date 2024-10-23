import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const completeTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    const newText = prompt("Editar tarefa:", tasks[index].text);
    if (newText) {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, text: newText } : task
      );
      setTasks(updatedTasks);
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="App">
      <h1>Minha Lista de Tarefas</h1>
      <div id="input-container">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Adicione uma nova tarefa"
        />
        <button onClick={addTask}>Adicionar Tarefa</button>
      </div>

      <ul id="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span>{task.text}</span>
            <div className="task-actions">
              <button className="complete-btn" onClick={() => completeTask(index)}>
                {task.completed ? 'Desfazer' : 'Concluir'}
              </button>
              <button className="edit-btn" onClick={() => editTask(index)}>Editar</button>
              <button className="delete-btn" onClick={() => deleteTask(index)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
