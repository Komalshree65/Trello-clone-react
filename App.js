
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Task 1', column: 'todo' },
    { id: 2, text: 'Task 2', column: 'inProgress' },
    { id: 3, text: 'Task 3', column: 'done' },
  ]);

  const [draggedTask, setDraggedTask] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');
  const [showNewTaskForm, setShowNewTaskForm] = useState(null); // State to track which "New" button was clicked

  const handleDragStart = (taskId) => {
    setDraggedTask(taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (newColumn) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === draggedTask ? { ...task, column: newColumn } : task
      )
    );
    setDraggedTask(null);
  };

  const addNewTask = (column, text) => {
    if (text.trim() !== '') {
      const newTask = {
        id: tasks.length + 1,
        text: text,
        column: column,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setShowNewTaskForm(null); // Reset the state to close the form
    }
  };

  return (
    <div className="App">
      <h1>Trello Clone</h1>
      <div className="board-container">
        <div className="board" onDragOver={handleDragOver} onDrop={() => handleDrop('todo')}>
          <h2>To Do ({tasks.filter((task) => task.column === 'todo').length})</h2>
          <div className="task-list">
            {tasks.filter((task) => task.column === 'todo').map((task) => (
              <Task key={task.id} task={task} onDragStart={handleDragStart} />
            ))}
          </div>
          <button onClick={() => setShowNewTaskForm('todo')}>New</button> {/* Pass 'todo' as argument */}
          {showNewTaskForm === 'todo' && (
            <TaskForm
              onSave={(text) => addNewTask('todo', text)}
              onCancel={() => setShowNewTaskForm(null)}
            />
          )}
        </div>

        <div className="board" onDragOver={handleDragOver} onDrop={() => handleDrop('inProgress')}>
          <h2>In Progress ({tasks.filter((task) => task.column === 'inProgress').length})</h2>
          <div className="task-list">
            {tasks.filter((task) => task.column === 'inProgress').map((task) => (
              <Task key={task.id} task={task} onDragStart={handleDragStart} />
            ))}
          </div>
          <button onClick={() => setShowNewTaskForm('inProgress')}>New</button> {/* Pass 'inProgress' as argument */}
          {showNewTaskForm === 'inProgress' && (
            <TaskForm
              onSave={(text) => addNewTask('inProgress', text)}
              onCancel={() => setShowNewTaskForm(null)}
            />
          )}
        </div>

        <div className="board" onDragOver={handleDragOver} onDrop={() => handleDrop('done')}>
          <h2>Done ({tasks.filter((task) => task.column === 'done').length})</h2>
          <div className="task-list">
            {tasks.filter((task) => task.column === 'done').map((task) => (
              <Task key={task.id} task={task} onDragStart={handleDragStart} />
            ))}
          </div>
          <button onClick={() => setShowNewTaskForm('done')}>New</button> {/* Pass 'done' as argument */}
          {showNewTaskForm === 'done' && (
            <TaskForm
              onSave={(text) => addNewTask('done', text)}
              onCancel={() => setShowNewTaskForm(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Task = ({ task, onDragStart }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.id);
    onDragStart(task.id);
  };

  return (
    <div className="task" draggable onDragStart={handleDragStart}>
      {task.text}
    </div>
  );
};

const TaskForm = ({ onSave, onCancel }) => {
  const [newTaskText, setNewTaskText] = useState('');

  const handleSave = () => {
    onSave(newTaskText);
    setNewTaskText('');
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Enter task text"
        value={newTaskText}
        onChange={(e) => setNewTaskText(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default App;