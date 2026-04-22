import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  return (
    <div className="dashboard-container">
      <Sidebar role={role} />
      <main className="dashboard-main">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
