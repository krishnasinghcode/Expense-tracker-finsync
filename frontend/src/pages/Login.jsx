import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth.js';
import FormInput from '../components/FormInput.jsx';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await loginUser(formData);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-background text-text p-6 rounded-lg shadow-md flex flex-col gap-4 border border-secondary"
      >
        <h2 className="text-2xl font-bold text-center text-primary mb-2">Login</h2>

        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <button
          type="submit"
          className="bg-primary text-background font-bold text-base py-2 rounded hover:bg-secondary transition-colors"
        >
          Login
        </button>

        <p className="text-center text-sm text-text-secondary mt-2">
          Don't have an account?{' '}
          <span
            className="text-primary hover:underline cursor-pointer"
            onClick={() => navigate('/signup')}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}
