import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hide Navbar if on a dashboard route
  if (location.pathname.startsWith('/patient') || 
      location.pathname.startsWith('/doctor') || 
      location.pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'AI Prediction', path: '/prediction' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 200,
      padding: scrolled ? '15px 0' : '25px 0',
      transition: 'all 0.3s ease',
      backgroundColor: scrolled || isOpen ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
      backdropFilter: 'blur(10px)',
      boxShadow: scrolled || isOpen ? 'var(--shadow-sm)' : 'none',
      borderBottom: scrolled || isOpen ? '1px solid var(--border)' : 'none'
    }}>
      <div className="container" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        {/* Logo */}
        <Link to="/" style={{display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none'}}>
          <Activity color="var(--primary)" size={32} />
          <span style={{fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)'}}>HealthAI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{display: 'flex', gap: 'var(--spacing-xl)', alignItems: 'center'}}>
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              style={{
                textDecoration: 'none',
                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-main)',
                fontWeight: '600',
                fontSize: '0.95rem',
                transition: 'color 0.2s'
              }}
            >
              {link.name}
            </Link>
          ))}
          
          {localStorage.getItem('token') ? (
            <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
              <Link to={
                JSON.parse(localStorage.getItem('user') || '{}').role === 'ADMIN' ? '/admin' :
                JSON.parse(localStorage.getItem('user') || '{}').role === 'DOCTOR' ? '/doctor' : '/patient'
              } style={{
                color: 'var(--primary)', fontWeight: '700', textDecoration: 'none', fontSize: '0.9rem'
              }}>
                Dashboard
              </Link>
              <button 
                onClick={() => { localStorage.clear(); window.location.href = '/'; }}
                style={{
                  padding: '8px 16px', backgroundColor: 'transparent', border: '1px solid var(--border)',
                  color: 'var(--text-main)', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" style={{
              padding: '10px 20px', backgroundColor: 'var(--primary)', color: 'white', 
              borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              Login <ArrowRight size={16} />
            </Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: 'none', padding: '10px', backgroundColor: 'transparent', 
            border: 'none', color: 'var(--text-main)', cursor: 'pointer'
          }}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div style={{
        position: 'absolute', top: '100%', left: 0, width: '100%', 
        backgroundColor: 'white', borderBottom: '1px solid var(--border)',
        display: isOpen ? 'block' : 'none', padding: '20px 0',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div className="container" style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
          {navLinks.map(link => (
            <Link 
              key={link.path} 
              to={link.path} 
              onClick={() => setIsOpen(false)}
              style={{
                textDecoration: 'none',
                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-main)',
                fontWeight: '600', fontSize: '1.1rem', padding: '10px 0'
              }}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/login" 
            onClick={() => setIsOpen(false)}
            style={{
              padding: '15px', backgroundColor: 'var(--primary)', color: 'white', 
              borderRadius: '12px', textDecoration: 'none', fontWeight: '700', textAlign: 'center',
              marginTop: '10px'
            }}
          >
            Login / Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
