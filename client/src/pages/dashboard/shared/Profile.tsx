import React, { useState } from 'react';
import { User, Mail, Shield, Save, Edit3 } from 'lucide-react';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: user.name || '', email: user.email || '' });

  const handleSave = () => {
    // Simulated API call to update profile
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '40px' }}>
      <header style={{ marginBottom: '40px' }}>
        <span style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', display: 'inline-block' }}>
          My Account
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Profile Details</h1>
        <p style={{ color: 'var(--text-muted)' }}>View and manage your personal information.</p>
      </header>

      <div className="glass-card" style={{ maxWidth: '600px', padding: '40px', borderRadius: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <User size={40} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>{user.name}</h2>
              <p style={{ color: 'var(--text-muted)' }}>{user.role}</p>
            </div>
          </div>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="btn-hover" style={{ padding: '10px 20px', borderRadius: '12px', backgroundColor: '#f1f5f9', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
              <Edit3 size={18} /> Edit
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Full Name</label>
            <div style={{ display: 'flex', alignItems: 'center', padding: '15px', borderRadius: '12px', backgroundColor: isEditing ? 'white' : '#f8fafc', border: `1px solid ${isEditing ? 'var(--primary)' : 'var(--border)'}` }}>
              <User size={20} color="var(--text-muted)" style={{ marginRight: '15px' }} />
              {isEditing ? (
                <input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '1rem' }} />
              ) : (
                <span style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{user.name}</span>
              )}
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Email Address</label>
            <div style={{ display: 'flex', alignItems: 'center', padding: '15px', borderRadius: '12px', backgroundColor: isEditing ? 'white' : '#f8fafc', border: `1px solid ${isEditing ? 'var(--primary)' : 'var(--border)'}` }}>
              <Mail size={20} color="var(--text-muted)" style={{ marginRight: '15px' }} />
              {isEditing ? (
                <input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '1rem' }} />
              ) : (
                <span style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{user.email}</span>
              )}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Account Role</label>
            <div style={{ display: 'flex', alignItems: 'center', padding: '15px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid var(--border)' }}>
              <Shield size={20} color="var(--text-muted)" style={{ marginRight: '15px' }} />
              <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>{user.role} (Cannot be changed)</span>
            </div>
          </div>
        </div>

        {isEditing && (
          <div style={{ display: 'flex', gap: '15px', marginTop: '30px', justifyContent: 'flex-end' }}>
            <button onClick={() => setIsEditing(false)} style={{ padding: '12px 24px', borderRadius: '12px', backgroundColor: 'transparent', color: 'var(--text-muted)', fontWeight: '600' }}>Cancel</button>
            <button onClick={handleSave} className="btn-hover" style={{ padding: '12px 24px', borderRadius: '12px', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Save size={18} /> Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
