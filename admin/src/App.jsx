import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom';  // ✅ Don't import BrowserRouter here
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Admin/Dashboard.jsx'
import AllApointments from './pages/Admin/AllApointments.jsx'
import AddDoctor from './pages/Admin/AddDoctor.jsx'
import Doctorslist from './pages/Admin/Doctorslist.jsx'

const App = () => {
  const { aToken } = useContext(AdminContext);

  return (
    aToken ? (
      <div className='bg-[F8F9FD]'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <div className='flex-1 p-4'>
            <Routes>  {/* ✅ Use <Routes> directly */}
              <Route path='/' element={<Dashboard />} />
              <Route path='/admin-dashboard' element={<Dashboard />} />
              <Route path='/all-appointments' element={<AllApointments />} />
              <Route path='/add-doctor' element={<AddDoctor />} />
              <Route path='/doctor-list' element={<Doctorslist />} />
            </Routes>
          </div>
        </div>
      </div>
    ) : (
      <>
        <Login />
        <ToastContainer />
      </>
    )
  );
};

export default App;
