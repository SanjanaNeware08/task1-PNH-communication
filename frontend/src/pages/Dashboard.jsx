import { useState } from 'react';
import { createProject } from '../api/project';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [title, setTitle] = useState('');

  const handleCreate = async () => {
    await createProject(title);
    alert('Project created!');
    setTitle('');
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <input
          type="text"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <button onClick={handleCreate} className="bg-green-500 text-white px-4 py-2">Create Project</button>
      </div>
    </>
  );
};

export default Dashboard;

