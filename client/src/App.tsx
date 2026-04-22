import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/public/Home';
import AIPrediction from './pages/public/AIPrediction';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import DashboardLayout from './components/layout/DashboardLayout';

// Patient Pages
import PatientOverview from './pages/dashboard/patient/Overview';
import PatientHistory from './pages/dashboard/patient/History';
import PatientPredict from './pages/dashboard/patient/Predict';
import PatientMedications from './pages/dashboard/patient/Medications';
import PatientAppointments from './pages/dashboard/patient/Appointments';
import PatientLabResults from './pages/dashboard/patient/LabResults';
import PatientNotifications from './pages/dashboard/patient/Notifications';

// Doctor Pages
import DoctorOverview from './pages/dashboard/doctor/Overview';
import DoctorPatients from './pages/dashboard/doctor/Patients';
import DoctorSchedule from './pages/dashboard/doctor/Schedule';
import DoctorRecords from './pages/dashboard/doctor/Records';

// Admin Pages
import AdminOverview from './pages/dashboard/admin/Overview';
import AdminUsers from './pages/dashboard/admin/Users';

// Shared Pages
import Profile from './pages/dashboard/shared/Profile';
import Settings from './pages/dashboard/shared/Settings';

// Simple Section-based Pages
const About = () => (
  <div className="animate-fade-in" style={{paddingTop: '160px', paddingBottom: '100px'}}>
    <div className="container" style={{maxWidth: '800px'}}>
      <h1 style={{fontSize: '3rem', fontWeight: '800', marginBottom: '30px'}}>About Our System</h1>
      <p style={{fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '30px'}}>
        The AI Healthcare Prediction System is a bridge between advanced machine learning and modern clinical practice. 
        Developed with the goal of reducing medical errors and improving patient outcomes through early detection.
      </p>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px'}}>
        <div className="glass-card card-hover" style={{padding: '30px', borderRadius: '24px'}}>
          <h3 style={{marginBottom: '15px'}}>Our Mission</h3>
          <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>To democratize healthcare intelligence and provide every patient with personalized predictive insights.</p>
        </div>
        <div className="glass-card card-hover" style={{padding: '30px', borderRadius: '24px'}}>
          <h3 style={{marginBottom: '15px'}}>The Technology</h3>
          <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>Powered by Scikit-Learn Random Forest models and modern React/Node infrastructure.</p>
        </div>
      </div>
    </div>
  </div>
);

const Services = () => (
  <div className="animate-fade-in" style={{paddingTop: '160px', paddingBottom: '100px'}}>
    <div className="container">
      <h1 style={{fontSize: '3rem', fontWeight: '800', marginBottom: '50px', textAlign: 'center'}}>Our Services</h1>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
        {['Disease Prediction', 'Risk Assessment', 'Monitoring', 'Doctor Support', 'Analytics'].map(s => (
          <div key={s} className="glass-card card-hover" style={{padding: '40px', borderRadius: '24px', textAlign: 'center'}}>
            <h3 style={{marginBottom: '15px'}}>{s}</h3>
            <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>Advanced {s.toLowerCase()} solutions tailored for modern healthcare needs.</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Contact = () => (
  <div className="animate-fade-in" style={{paddingTop: '160px', paddingBottom: '100px'}}>
    <div className="container" style={{maxWidth: '600px', textAlign: 'center'}}>
      <h1 style={{fontSize: '3rem', fontWeight: '800', marginBottom: '30px'}}>Get In Touch</h1>
      <p style={{color: 'var(--text-muted)', marginBottom: '50px'}}>Have questions? We're here to help.</p>
      <form className="glass-card" style={{display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', padding: '40px', borderRadius: '32px'}}>
        <input type="text" placeholder="Your Name" style={{padding: '15px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none', backgroundColor: '#f8fafc'}} />
        <input type="email" placeholder="Email Address" style={{padding: '15px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none', backgroundColor: '#f8fafc'}} />
        <textarea placeholder="Message" rows={5} style={{padding: '15px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none', backgroundColor: '#f8fafc'}}></textarea>
        <button className="btn-hover" style={{padding: '15px', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', borderRadius: '12px'}}>Send Message</button>
      </form>
    </div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children, role }: { children: JSX.Element, role: string }) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== role) {
    if (user.role === 'ADMIN') return <Navigate to="/admin" replace />;
    if (user.role === 'DOCTOR') return <Navigate to="/doctor" replace />;
    return <Navigate to="/patient" replace />;
  }
  
  return children;
};

// Placeholder for missing pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="animate-fade-in">
    <h1 style={{fontSize: '2rem', fontWeight: '800', marginBottom: '20px'}}>{title}</h1>
    <div className="glass-card" style={{padding: '40px', borderRadius: '24px'}}>
      <p style={{color: 'var(--text-muted)'}}>This module is currently under development. Please check back later.</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/prediction" element={<AIPrediction />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Patient Routes */}
            <Route path="/patient" element={<ProtectedRoute role="PATIENT"><DashboardLayout role="PATIENT" /></ProtectedRoute>}>
              <Route index element={<PatientOverview />} />
              <Route path="predict" element={<PatientPredict />} />
              <Route path="history" element={<PatientHistory />} />
              <Route path="medications" element={<PatientMedications />} />
              <Route path="appointments" element={<PatientAppointments />} />
              <Route path="results" element={<PatientLabResults />} />
              <Route path="notifications" element={<PatientNotifications />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Doctor Routes */}
            <Route path="/doctor" element={<ProtectedRoute role="DOCTOR"><DashboardLayout role="DOCTOR" /></ProtectedRoute>}>
              <Route index element={<DoctorOverview />} />
              <Route path="schedule" element={<DoctorSchedule />} />
              <Route path="patients" element={<DoctorPatients />} />
              <Route path="records" element={<DoctorRecords />} />
              <Route path="reports" element={<DoctorRecords />} /> {/* Reusing records for reports */}
              <Route path="consults" element={<PlaceholderPage title="Consultations" />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute role="ADMIN"><DashboardLayout role="ADMIN" /></ProtectedRoute>}>
              <Route index element={<AdminOverview />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="ai" element={<PlaceholderPage title="AI Model Monitor" />} />
              <Route path="reports" element={<PlaceholderPage title="System Reports" />} />
              <Route path="settings" element={<Settings />} />
            </Route>

          </Routes>
        </main>
        <div className="public-only-footer">
          <FooterWrapper />
        </div>
      </div>
    </Router>
  );
}

const FooterWrapper = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/patient') || 
      location.pathname.startsWith('/doctor') || 
      location.pathname.startsWith('/admin')) {
    return null;
  }
  return <Footer />;
};

export default App;
