import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask, updateTask, deleteTask } from '../api/task';
import Navbar from '../components/Navbar';

const TaskPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      const { data } = await getTask(taskId);
      setTask(data);
      setTitle(data.title);
      setDescription(data.description);
      setStatus(data.status);
    };

    fetchTask();
  }, [taskId]);

  const handleUpdate = async () => {
    await updateTask(taskId, { title, description, status });
    alert('Task updated successfully!');
  };

  const handleDelete = async () => {
    await deleteTask(taskId);
    alert('Task deleted!');
    navigate('/');
  };

  if (!task) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Edit Task</h1>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="border p-2 rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="border p-2 rounded"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex justify-between mt-4">
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
              Update Task
            </button>
            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
              Delete Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskPage;
