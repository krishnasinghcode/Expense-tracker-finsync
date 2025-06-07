import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4">
      <div className="text-center space-y-4 max-w-xl">
        <h1 className="text-4xl font-bold">Welcome to Expense Tracker</h1>
        <p className="text-lg text-gray-700">
          Manage your income and expenses efficiently with our user-friendly app.
        </p>
      </div>
    </div>
  );
}
