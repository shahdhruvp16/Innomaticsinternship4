import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);

  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-gray-100 border-r shadow-lg p-4'>
      {aToken && (
        <ul className='text-gray-700 mt-5 space-y-2'>
          {[
            { to: '/admin-dashboard', icon: assets.home_icon, label: 'Dashboard' },
            { to: '/all-appointments', icon: assets.appointment_icon, label: 'Appointments' },
            { to: '/add-doctor', icon: assets.add_icon, label: 'Add Doctor' },
            { to: '/doctor-list', icon: assets.people_icon, label: 'Doctor List' },
          ].map(({ to, icon, label }) => (
            <NavLink
              key={to}
              className={({ isActive }) =>
                `flex items-center gap-4 py-3.5 px-5 rounded-lg transition-all duration-300 hover:bg-gray-200 ${
                  isActive ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-500' : ''
                }`
              }
              to={to}
            >
              <img src={icon} alt={label} className='w-6 h-6' />
              <p className='font-medium'>{label}</p>
            </NavLink>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
