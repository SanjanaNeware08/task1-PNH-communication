import { useState } from 'react';
import { signup } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', country: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(form);
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-1/3 bg-white p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        {['name', 'email', 'password', 'country'].map((field) => (
          <input
            key={field}
            type={field === 'password' ? 'password' : 'text'}
            placeholder={field}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
