import { useState } from 'react';
import { login } from '../api/auth';
import { setToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await login(form);
    setToken(data.token);
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-1/3 bg-white p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {['email', 'password'].map((field) => (
          <input
            key={field}
            type={field}
            placeholder={field}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full mb-4 p-2 border rounded"
          />
        ))}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
