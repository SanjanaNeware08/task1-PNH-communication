import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createTask, getTasks, deleteTask, updateTask } from '../api/task';
import Navbar from '../components/Navbar';

const ProjectPage = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchTasks = async () => {
    const { data } = await getTasks(projectId);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async () => {
    await createTask(projectId, { title, description });
    fetchTasks();
    setTitle('');
    setDescription('');
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  const handleUpdateStatus = async (id, status) => {
    await updateTask(id, { status });
    fetchTasks();
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Project Tasks</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 mr-2"
          />
          <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2">Create Task</button>
        </div>
        <ul>
          {tasks.map(task => (
            <li key={task._id} className="flex justify-between items-center border-b py-2">
              <span>{task.title} - {task.status}</span>
              <div>
                {task.status !== 'completed' && (
                  <button onClick={() => handleUpdateStatus(task._id, 'completed')} className="bg-green-500 text-white px-2 py-1 mr-2">Complete</button>
                )}
                <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white px-2 py-1">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProjectPage;

