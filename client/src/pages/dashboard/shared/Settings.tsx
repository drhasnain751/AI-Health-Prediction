import React, { useState, useEffect } from 'react';
import { Bell, Lock, Moon, Sun, Monitor, AlertCircle } from 'lucide-react';

const Settings = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'ADMIN';

  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    // Apply theme to document body
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--bg-main', '#0f172a');
      document.documentElement.style.setProperty('--text-main', '#f8fafc');
      document.documentElement.style.setProperty('--border', 'rgba(255, 255, 255, 0.1)');
      document.body.style.backgroundColor = '#0f172a';
      document.body.style.color = '#f8fafc';
    } else {
      document.documentElement.style.setProperty('--bg-main', '#ffffff');
      document.documentElement.style.setProperty('--text-main', '#1e293b');
      document.documentElement.style.setProperty('--border', '#e2e8f0');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#1e293b';
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleSave = () => {
    alert('Settings preferences updated successfully!');
  };

  const handlePasswordChange = () => {
    alert('A password reset link has been sent to your email.');
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>System Settings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Configure your application preferences.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        
        {/* Notifications - Hidden for Admin */}
        {!isAdmin && (
          <div className="glass-card" style={{ padding: '30px', borderRadius: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <Bell size={24} />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Notifications</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontWeight: '600' }}>Push Notifications</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Receive alerts for new reports and appointments.</p>
                </div>
                <button onClick={() => setNotifications(!notifications)} style={{ width: '50px', height: '26px', borderRadius: '13px', backgroundColor: notifications ? 'var(--primary)' : '#e2e8f0', position: 'relative', transition: '0.3s' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'white', position: 'absolute', top: '2px', left: notifications ? '26px' : '2px', transition: '0.3s' }} />
                </button>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontWeight: '600' }}>Email Alerts</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Weekly account summaries and security alerts.</p>
                </div>
                <button onClick={() => setEmailAlerts(!emailAlerts)} style={{ width: '50px', height: '26px', borderRadius: '13px', backgroundColor: emailAlerts ? 'var(--primary)' : '#e2e8f0', position: 'relative', transition: '0.3s' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'white', position: 'absolute', top: '2px', left: emailAlerts ? '26px' : '2px', transition: '0.3s' }} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security / Password - Hidden for Admin */}
        {!isAdmin && (
          <div className="glass-card" style={{ padding: '30px', borderRadius: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--error)' }}>
                <Lock size={24} />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Security</h2>
            </div>
            
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Ensure your account is using a long, random password to stay secure.
            </p>

            <button onClick={handlePasswordChange} className="btn-hover" style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid var(--border)', fontWeight: '600', color: 'var(--text-main)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={18} /> Request Password Reset
            </button>
          </div>
        )}

        {/* Theme Preferences */}
        <div className="glass-card" style={{ padding: '30px', borderRadius: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
              <Sun size={24} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Appearance</h2>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { id: 'light', icon: <Sun size={20} />, label: 'Light' }, 
              { id: 'dark', icon: <Moon size={20} />, label: 'Dark' }
            ].map(t => (
              <button 
                key={t.id} 
                onClick={() => setTheme(t.id)} 
                style={{ 
                  flex: 1, 
                  padding: '15px', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '8px', 
                  border: `2px solid ${theme === t.id ? 'var(--primary)' : 'var(--border)'}`, 
                  backgroundColor: theme === t.id ? 'rgba(37, 99, 235, 0.05)' : 'transparent', 
                  cursor: 'pointer', 
                  transition: '0.2s',
                  color: 'inherit'
                }}
              >
                {t.icon}
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={handleSave} className="btn-hover" style={{ padding: '15px 30px', borderRadius: '12px', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', fontSize: '1rem' }}>
          Save All Preferences
        </button>
      </div>

    </div>
  );
};

export default Settings;
