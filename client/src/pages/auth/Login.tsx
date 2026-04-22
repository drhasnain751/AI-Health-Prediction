import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import api from '../../lib/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Navigate based on role
      if (data.user.role === 'ADMIN') navigate('/admin');
      else if (data.user.role === 'DOCTOR') navigate('/doctor');
      else navigate('/patient');
    } catch (error) {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)',
      padding: '20px'
    }}>
      <div className="glass animate-fade-in" style={{
        width: '100%', 
        maxWidth: '450px', 
        padding: '50px', 
        borderRadius: '32px', 
        boxShadow: 'var(--shadow-lg)',
        backgroundColor: 'white',
        border: '1px solid var(--border)'
      }}>
        <div style={{textAlign: 'center', marginBottom: '40px'}}>
          <h1 style={{fontSize: '2rem', fontWeight: '800', marginBottom: '10px', color: 'var(--text-main)'}}>Welcome Back</h1>
          <p style={{color: 'var(--text-muted)'}}>Log in to access your healthcare portal</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600'}}>Email Address</label>
            <div style={{position: 'relative'}}>
              <Mail style={{position: 'absolute', left: '15px', top: '12px', color: 'var(--text-muted)'}} size={18} />
              <input 
                type="email" 
                required 
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%', padding: '12px 12px 12px 45px', 
                  borderRadius: '12px', border: '1px solid var(--border)', 
                  outline: 'none', fontSize: '1rem'
                }}
              />
            </div>
          </div>

          <div style={{marginBottom: '30px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '8px'}}>
              <label style={{fontSize: '0.9rem', fontWeight: '600'}}>Password</label>
              <Link to="/forgot" style={{fontSize: '0.85rem', color: 'var(--primary)'}}>Forgot password?</Link>
            </div>
            <div style={{position: 'relative'}}>
              <Lock style={{position: 'absolute', left: '15px', top: '12px', color: 'var(--text-muted)'}} size={18} />
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%', padding: '12px 12px 12px 45px', 
                  borderRadius: '12px', border: '1px solid var(--border)', 
                  outline: 'none', fontSize: '1rem'
                }}
              />
            </div>
          </div>

          <button type="submit" style={{
            width: '100%', padding: '15px', 
            backgroundColor: 'var(--primary)', color: 'white', 
            borderRadius: '12px', fontWeight: '700', fontSize: '1rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            marginBottom: '20px'
          }}>
            Login <LogIn size={20} />
          </button>

          <p style={{textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
            Don't have an account? <Link to="/signup" style={{color: 'var(--primary)', fontWeight: '600'}}>Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
