import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, Calendar, Activity } from 'lucide-react';
import api from '../../lib/api';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'PATIENT',
    age: '',
    gender: 'Male'
  });
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/auth/signup', formData);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate(formData.role === 'DOCTOR' ? '/doctor' : '/patient');
    } catch (error: any) {
      const message = error.response?.data?.error || "Signup failed. Ensure all fields are filled correctly.";
      alert(message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
      padding: '40px 20px'
    }}>
      <div className="glass animate-fade-in" style={{
        width: '100%', 
        maxWidth: '500px', 
        padding: '50px', 
        borderRadius: '32px', 
        boxShadow: 'var(--shadow-lg)',
        backgroundColor: 'white',
        border: '1px solid var(--border)'
      }}>
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <h1 style={{fontSize: '2rem', fontWeight: '800', marginBottom: '10px'}}>Join HealthAI</h1>
          <p style={{color: 'var(--text-muted)'}}>Create your account to start your health journey</p>
        </div>

        <form onSubmit={handleSignup}>
          <div style={{display: 'flex', gap: '15px', marginBottom: '20px'}}>
            <button 
              type="button"
              onClick={() => setFormData({...formData, role: 'PATIENT'})}
              style={{
                flex: 1, padding: '12px', borderRadius: '12px', 
                backgroundColor: formData.role === 'PATIENT' ? 'var(--primary)' : '#f8fafc',
                color: formData.role === 'PATIENT' ? 'white' : 'var(--text-main)',
                fontWeight: '600', border: '1px solid var(--border)'
              }}
            >
              Patient
            </button>
            <button 
              type="button"
              onClick={() => setFormData({...formData, role: 'DOCTOR'})}
              style={{
                flex: 1, padding: '12px', borderRadius: '12px', 
                backgroundColor: formData.role === 'DOCTOR' ? 'var(--primary)' : '#f8fafc',
                color: formData.role === 'DOCTOR' ? 'white' : 'var(--text-main)',
                fontWeight: '600', border: '1px solid var(--border)'
              }}
            >
              Doctor
            </button>
          </div>

          <div style={{marginBottom: '15px'}}>
            <label style={{display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600'}}>Full Name</label>
            <div style={{position: 'relative'}}>
              <User style={{position: 'absolute', left: '15px', top: '12px', color: 'var(--text-muted)'}} size={18} />
              <input 
                type="text" required placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                style={{width: '100%', padding: '12px 12px 12px 45px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none'}}
              />
            </div>
          </div>

          <div style={{marginBottom: '15px'}}>
            <label style={{display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600'}}>Email Address</label>
            <div style={{position: 'relative'}}>
              <Mail style={{position: 'absolute', left: '15px', top: '12px', color: 'var(--text-muted)'}} size={18} />
              <input 
                type="email" required placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={{width: '100%', padding: '12px 12px 12px 45px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none'}}
              />
            </div>
          </div>

          <div style={{marginBottom: formData.role === 'PATIENT' ? '15px' : '30px'}}>
            <label style={{display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600'}}>Password</label>
            <div style={{position: 'relative'}}>
              <Lock style={{position: 'absolute', left: '15px', top: '12px', color: 'var(--text-muted)'}} size={18} />
              <input 
                type="password" required placeholder="Min 8 characters"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                style={{width: '100%', padding: '12px 12px 12px 45px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none'}}
              />
            </div>
          </div>

          {formData.role === 'PATIENT' && (
            <div style={{display: 'flex', gap: '15px', marginBottom: '30px'}}>
              <div style={{flex: 1}}>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600'}}>Age</label>
                <input 
                  type="number" required placeholder="25"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  style={{width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none'}}
                />
              </div>
              <div style={{flex: 1}}>
                <label style={{display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600'}}>Gender</label>
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  style={{width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none', backgroundColor: 'white'}}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          )}

          <button type="submit" style={{
            width: '100%', padding: '15px', 
            backgroundColor: 'var(--primary)', color: 'white', 
            borderRadius: '12px', fontWeight: '700', fontSize: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            marginBottom: '20px'
          }}>
            Create Account <UserPlus size={20} />
          </button>

          <p style={{textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
            Already have an account? <Link to="/login" style={{color: 'var(--primary)', fontWeight: '600'}}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
