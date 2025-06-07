import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { getUserProfile, updateUserPreferences, logoutUser } from '../api/users';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState({
    language: 'en',
    currency: 'INR',
    notifications: true,
    theme: 'light',
  });

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const { data } = await getUserProfile();
        setPreferences(data);
        setTheme(data.theme);
        localStorage.setItem('theme', data.theme);
      } catch (error) {
        console.error('Failed to fetch preferences', error);
      }
    };
    fetchPreferences();
  }, [setTheme]);

  const handleThemeChange = newTheme => {
    setTheme(newTheme);
    setPreferences(prev => ({ ...prev, theme: newTheme }));
    localStorage.setItem('theme', newTheme);
  };

  const handleSave = async () => {
    try {
      await updateUserPreferences(preferences);
      localStorage.setItem('theme', preferences.theme);
      alert('Preferences saved!');
    } catch (error) {
      console.error('Error saving preferences', error);
    }
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('theme');
      navigate('/login');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 bg-background text-text">
      <h1 className="text-3xl font-bold mb-8 text-primary">Settings</h1>

      {/* Theme Selector */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Theme</label>
        <div className="flex flex-wrap gap-3">
          {['light', 'dark', 'sunset', 'forest'].map(t => (
            <button
              key={t}
              onClick={() => handleThemeChange(t)}
              className={`px-4 py-2 rounded border transition-colors ${
                preferences.theme === t
                  ? 'bg-primary text-white font-bold'
                  : 'bg-background text-text border-secondary'
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Language Selector */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Language</label>
        <select
          name="language"
          value={preferences.language}
          onChange={handleChange}
          className="w-full p-2 border border-secondary rounded bg-background text-text"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>
      </div>

      {/* Currency Selector */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Currency</label>
        <select
          name="currency"
          value={preferences.currency}
          onChange={handleChange}
          className="w-full p-2 border border-secondary rounded bg-background text-text"
        >
          <option value="INR">INR - ₹</option>
          <option value="USD">USD - $</option>
          <option value="EUR">EUR - €</option>
        </select>
      </div>

      {/* Notifications Toggle */}
      <div className="mb-6">
        <label className="inline-flex items-center gap-2 font-semibold">
          <input
            type="checkbox"
            name="notifications"
            checked={preferences.notifications}
            onChange={handleChange}
            className="accent-primary"
          />
          Enable Notifications
        </label>
      </div>

      {/* Actions */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleSave}
          className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
        >
          Save Preferences
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
