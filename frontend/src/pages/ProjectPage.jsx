import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createTask, getTasks, deleteTask, updateTask } from '../api/task';
import Navbar from '../components/Navbar';

const ProjectPage = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const { data } = await getTasks(projectId);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const handleCreate = async () => {
    if (!title || !description) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      await createTask(projectId, { title, description });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateTask(id, { status });
      fetchTasks();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Project Tasks</h1>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 mr-2 rounded w-64"
          />
          <input
            type="text"
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 mr-2 rounded w-64"
          />
          <button
            onClick={handleCreate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create Task
          </button>
        </div>

        {loading ? (
          <div className="text-center">Loading tasks...</div>
        ) : (
          <ul className="space-y-4">
            {tasks.length > 0 ? (
              tasks.map(task => (
                <li key={task._id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h2 className="text-lg font-semibold">{task.title}</h2>
                    <p className="text-gray-600">{task.description}</p>
                    <p className="text-sm text-gray-500">Status: {task.status}</p>
                  </div>
                  <div className="flex gap-2">
                    {task.status !== 'completed' && (
                      <button
                        onClick={() => handleUpdateStatus(task._id, 'completed')}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500">No tasks found. Start by creating one!</p>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default ProjectPage;
