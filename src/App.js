import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    const taskText = newTask.trim();

    if (taskText === "") {
      alert("Por favor, insira uma tarefa.");
      return;
    }

    const isDuplicate = tasks.some(
      (task) => task.text.toLowerCase() === taskText.toLowerCase()
    );
    if (isDuplicate) {
      alert("Esta tarefa já foi adicionada.");
      return;
    }

    setTasks([...tasks, { text: taskText, completed: false }]);
    setNewTask("");
  };

  const completeTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    const newTaskText = prompt("Edite a tarefa:", tasks[index].text);
    if (newTaskText) {
      const updatedTasks = tasks.map((task, i) =>
        i === index ? { ...task, text: newTaskText } : task
      );
      setTasks(updatedTasks);
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const clearCompletedTasks = () => {
    const pendingTasks = tasks.filter((task) => !task.completed);
    setTasks(pendingTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

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

      <div id="filters">
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("pending")}>Pendentes</button>
        <button onClick={() => setFilter("completed")}>Concluídas</button>
      </div>

      <p id="task-counter">
        Pendentes: {tasks.filter((task) => !task.completed).length} |
        Concluídas: {tasks.filter((task) => task.completed).length}
      </p>

      <ul id="task-list">
        {filteredTasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            {task.text}
            <div className="task-actions">
              <button
                className="complete-btn"
                onClick={() => completeTask(index)}
              >
                {task.completed ? "Desfazer" : "Concluir"}
              </button>
              <button className="edit-btn" onClick={() => editTask(index)}>
                Editar
              </button>
              <button className="delete-btn" onClick={() => deleteTask(index)}>
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>

      <button id="clear-completed" onClick={clearCompletedTasks}>
        Limpar Concluídas
      </button>
    </div>
  );
}

export default App;
