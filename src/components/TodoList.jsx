// src/components/TodoList.js
import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskInput('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === 'alphabetical') return a.text.localeCompare(b.text);
    if (sort === 'completed') return b.completed - a.completed;
    return 0;
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <div className="max-w-lg w-full mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">To-Do List</h1>
        <div className="mb-4">
          <input 
            type="text"
            className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <button
            className="mt-2 p-2 w-full bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>
        <div className="flex justify-between mb-4">
          <select 
            className="p-2 border rounded w-1/2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <select 
            className="p-2 border rounded w-1/2 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Default</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <ul>
          {sortedTasks.map(task => (
            <li 
              key={task.id}
              className={`flex justify-between items-center p-2 mb-2 border rounded ${task.completed ? 'bg-green-200' : ''}`}
            >
              <span
                className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
                onClick={() => toggleCompletion(task.id)}
              >
                {task.text}
              </span>
              <button
                className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => removeTask(task.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
