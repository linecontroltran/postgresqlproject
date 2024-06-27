import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('/api/tasks');
    setTasks(response.data);
  };

  const addTask = async () => {
    const response = await axios.post('/api/tasks', { title, description });
    setTasks([...tasks, response.data]);
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>{task.title}: {task.description}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
}

export default App;
