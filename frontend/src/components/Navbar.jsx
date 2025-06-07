import React, { useState, useContext } from 'react';
import profileIcon from '../assets/profile-icon.svg';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setDropdownOpen(false);
  };

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-background text-text shadow-lg flex flex-col justify-between p-6">
      {/* Logo */}
      <div className="mb-8">
        <a href="/" className="text-primary font-bold text-2xl">FinSync</a>
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-col gap-4 text-lg">
        <li><a href="/expenses" className="hover:text-primary transition">Expenses</a></li>
        <li><a href="/account-statement" className="hover:text-primary transition">Account Statement</a></li>
        <li><a href="/reports" className="hover:text-primary transition">Reports</a></li>
        <li><a href="/settings" className="hover:text-primary transition">Settings</a></li>
      </ul>

      {/* Theme Switcher */}
      <div className="relative mt-6">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full text-left text-secondary hover:text-primary transition"
        >
          Theme
        </button>

        {dropdownOpen && (
          <div className="absolute left-0 mt-2 w-full bg-background border border-secondary rounded shadow">
            {['light', 'dark', 'sunset', 'forest'].map(t => (
              <button
                key={t}
                onClick={() => handleThemeChange(t)}
                className={`block w-full px-4 py-2 text-left hover:bg-primary hover:text-white transition ${
                  theme === t ? 'font-bold underline' : ''
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-4 mt-auto pt-6">
        <img src={profileIcon} alt="User" className="w-10 h-10 rounded-full" />
        <span className="text-secondary">John Doe</span>
      </div>
    </nav>
  );
};

export default Navbar;
