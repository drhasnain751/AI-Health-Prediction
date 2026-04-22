import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, History, Settings, User, LogOut, Activity, Menu, X, Users, ClipboardList, BarChart, Calendar } from 'lucide-react';

interface SidebarProps {
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const patientLinks = [
    { name: 'Overview', path: '/patient', icon: <LayoutDashboard size={20} /> },
    { name: 'AI Analysis', path: '/patient/predict', icon: <Activity size={20} /> },
    { name: 'Medications', path: '/patient/medications', icon: <ClipboardList size={20} /> },
    { name: 'Appointments', path: '/patient/appointments', icon: <Calendar size={20} /> },
    { name: 'Lab Results', path: '/patient/results', icon: <BarChart size={20} /> },
    { name: 'History', path: '/patient/history', icon: <History size={20} /> },
    { name: 'Notifications', path: '/patient/notifications', icon: <Activity size={20} /> },
    { name: 'Profile', path: '/patient/profile', icon: <User size={20} /> },
  ];

  const doctorLinks = [
    { name: 'Dashboard', path: '/doctor', icon: <LayoutDashboard size={20} /> },
    { name: 'My Schedule', path: '/doctor/schedule', icon: <Calendar size={20} /> },
    { name: 'My Patients', path: '/doctor/patients', icon: <Users size={20} /> },
    { name: 'Medical Records', path: '/doctor/records', icon: <ClipboardList size={20} /> },
    { name: 'Lab Reports', path: '/doctor/reports', icon: <BarChart size={20} /> },
    { name: 'Consultations', path: '/doctor/consults', icon: <Activity size={20} /> },
    { name: 'Profile', path: '/doctor/profile', icon: <User size={20} /> },
  ];

  const adminLinks = [
    { name: 'Analytics', path: '/admin', icon: <BarChart size={20} /> },
    { name: 'Manage Users', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'AI Monitor', path: '/admin/ai', icon: <Activity size={20} /> },
    { name: 'Reports', path: '/admin/reports', icon: <ClipboardList size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  const links = role === 'ADMIN' ? adminLinks : role === 'DOCTOR' ? doctorLinks : patientLinks;

  return (
    <>
      <button 
        className="mobile-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', top: '20px', left: '20px', zIndex: 110,
          padding: '10px', backgroundColor: 'white', border: '1px solid var(--border)',
          borderRadius: '8px', boxShadow: 'var(--shadow-sm)'
        }}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside 
        className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}
        style={{
          height: '100vh', backgroundColor: 'white', borderRight: '1px solid var(--border)',
          display: 'flex', flexDirection: 'column', padding: '40px 20px',
        }}
      >
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', marginBottom: '50px', padding: '0 10px'}}>
          <Activity size={32} />
          <span style={{fontSize: '1.5rem', fontWeight: 'bold'}}>HealthAI</span>
        </div>

        <nav style={{flex: 1}}>
          {links.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
                borderRadius: '12px', marginBottom: '8px',
                color: location.pathname === link.path ? 'white' : 'var(--text-muted)',
                backgroundColor: location.pathname === link.path ? 'var(--primary)' : 'transparent',
                fontWeight: '600', transition: 'all 0.2s ease'
              }}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          
          <div style={{margin: '20px 0', borderTop: '1px solid var(--border)'}}></div>
          
          <Link 
            to="/"
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
              borderRadius: '12px', marginBottom: '8px', color: 'var(--text-muted)',
              fontWeight: '600', transition: 'all 0.2s ease'
            }}
          >
            <Activity size={20} />
            Home Page
          </Link>
        </nav>

        <button onClick={() => { localStorage.clear(); window.location.href = '/login'; }} style={{
          display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px',
          borderRadius: '12px', color: 'var(--error)', fontWeight: '600', backgroundColor: 'transparent'
        }}>
          <LogOut size={20} />
          Log Out
        </button>
      </aside>

      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40
          }}
        />
      )}
    </>
  );
};

export default Sidebar;
