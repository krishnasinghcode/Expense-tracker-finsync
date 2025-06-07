import React from 'react';
import profileIcon from '../assets/profile-icon.svg';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 h-screen w-64 bg-background text-text flex flex-col p-6 shadow-lg">
      
      {/* Logo + Navigation Links Container */}
      <div>
        {/* Logo */}
        <div>
          <a href="/" className="text-2xl font-bold text-primary">FinSync</a>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-4 mt-6 text-base">
          {[
            { label: 'Dashboard', href: '/' },
            { label: 'Expenses', href: '/expenses' },
            { label: 'Account Statement', href: '/account-statement' },
            { label: 'Settings', href: '/settings' },
          ].map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="transition-colors hover:text-primary"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* User Profile */}
      <div className="flex items-center gap-3 pt-6 border-t border-secondary mt-auto">
        <img src={profileIcon} alt="User" className="w-10 h-10 rounded-full" />
        <span className="text-secondary text-sm">John Doe</span>
      </div>
    </nav>
  );
};

export default Navbar;
