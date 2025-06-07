import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../api/auth.js';
import FormInput from '../components/FormInput.jsx';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await signupUser(formData);
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-background text-text p-6 rounded-lg shadow-md flex flex-col gap-4 border border-secondary"
      >
        <h2 className="text-2xl font-bold text-center text-primary mb-2">
          Signup
        </h2>

        <FormInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
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
          Create Account
        </button>

        <p className="text-center text-sm text-text-secondary mt-2">
          Already have an account?{' '}
          <span
            className="text-primary hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
