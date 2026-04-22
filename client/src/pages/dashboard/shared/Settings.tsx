import React, { useState } from 'react';
import { Settings as SettingsIcon, Shield, Globe, Power, CheckCircle, XCircle } from 'lucide-react';

const Settings = () => {
  const [systemName, setSystemName] = useState('HealthAI Prediction System');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('System configuration updated successfully!');
    }, 1000);
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>System Configuration</h1>
        <p style={{ color: 'var(--text-muted)' }}>Master controls for the AI Healthcare platform.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
        
        {/* Branding & Identity */}
        <div className="glass-card" style={{ padding: '30px', borderRadius: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(37, 99, 235, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <Globe size={24} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Platform Identity</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>System Display Name</label>
              <input 
                type="text" 
                value={systemName}
                onChange={(e) => setSystemName(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: '12px', 
                  border: '1px solid var(--border)', 
                  outline: 'none',
                  backgroundColor: '#f8fafc'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '0.9rem' }}>Primary Support Email</label>
              <input 
                type="email" 
                defaultValue="admin@healthai.com"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  borderRadius: '12px', 
                  border: '1px solid var(--border)', 
                  outline: 'none',
                  backgroundColor: '#f8fafc'
                }}
              />
            </div>
          </div>
        </div>

        {/* Access Controls */}
        <div className="glass-card" style={{ padding: '30px', borderRadius: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
              <Shield size={24} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Access & Security</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontWeight: '600' }}>Public Registration</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Allow new patients to create accounts.</p>
              </div>
              <button onClick={() => setAllowRegistration(!allowRegistration)} style={{ width: '50px', height: '26px', borderRadius: '13px', backgroundColor: allowRegistration ? 'var(--primary)' : '#e2e8f0', position: 'relative', transition: '0.3s' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'white', position: 'absolute', top: '2px', left: allowRegistration ? '26px' : '2px', transition: '0.3s' }} />
              </button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontWeight: '600' }}>Maintenance Mode</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Restrict access while performing updates.</p>
              </div>
              <button onClick={() => setMaintenanceMode(!maintenanceMode)} style={{ width: '50px', height: '26px', borderRadius: '13px', backgroundColor: maintenanceMode ? '#ef4444' : '#e2e8f0', position: 'relative', transition: '0.3s' }}>
                <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'white', position: 'absolute', top: '2px', left: maintenanceMode ? '26px' : '2px', transition: '0.3s' }} />
              </button>
            </div>
          </div>
        </div>

        {/* System Health Status */}
        <div className="glass-card" style={{ padding: '30px', borderRadius: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
              <Power size={24} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>API Engine Status</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ padding: '15px', borderRadius: '16px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckCircle size={20} color="#10b981" />
              <div>
                <p style={{ fontWeight: '700', fontSize: '0.9rem', color: '#064e3b' }}>Backend Server</p>
                <p style={{ fontSize: '0.8rem', color: '#065f46' }}>Connected and operational (42ms latency)</p>
              </div>
            </div>
            <div style={{ padding: '15px', borderRadius: '16px', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <CheckCircle size={20} color="#10b981" />
              <div>
                <p style={{ fontWeight: '700', fontSize: '0.9rem', color: '#064e3b' }}>AI Prediction Engine</p>
                <p style={{ fontSize: '0.8rem', color: '#065f46' }}>Ready for inference</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className="btn-hover" 
          style={{ 
            padding: '15px 40px', 
            borderRadius: '12px', 
            backgroundColor: isSaving ? '#94a3b8' : 'var(--primary)', 
            color: 'white', 
            fontWeight: '700', 
            fontSize: '1rem',
            transition: '0.3s'
          }}
        >
          {isSaving ? 'Updating...' : 'Apply System Changes'}
        </button>
      </div>

    </div>
  );
};

export default Settings;
