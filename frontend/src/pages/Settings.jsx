import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { getUserProfile, updateUserPreferences } from '../api/users';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LoginButton';

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
        document.documentElement.setAttribute('data-theme', data.theme); // ⭐ Update HTML theme
      } catch (error) {
        console.error('Failed to fetch preferences', error);
        if (error.response?.status === 401) {
          navigate('/login', { replace: true });
        }
      }
    };

    fetchPreferences();
  }, [setTheme, navigate]);

  const handleThemeChange = newTheme => {
    setTheme(newTheme);
    setPreferences(prev => ({ ...prev, theme: newTheme }));
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme); // ⭐ Dynamically apply theme
  };

  const handleSave = async () => {
    try {
      await updateUserPreferences(preferences);
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-primary">Settings</h1>

      {/* Theme Selector */}
      <div className="mb-6">
        <label className="block mb-2 font-semibold">Theme</label>
        <div className="flex flex-wrap gap-3">
          {['light', 'dark','forest','sunset','corporate','emerald'].map(t => (
            <button
              key={t}
              onClick={() => handleThemeChange(t)}
              className={`btn ${preferences.theme === t ? 'btn-primary' : 'btn-outline'}`}
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
          className="select select-bordered w-full"
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
          className="select select-bordered w-full"
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
            className="toggle toggle-primary"
          />
          Enable Notifications
        </label>
      </div>

      {/* Actions */}
      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleSave}
          className="btn btn-primary"
        >
          Save Preferences
        </button>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Settings;
