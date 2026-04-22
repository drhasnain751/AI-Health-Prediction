import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--text-main)',
      color: 'white',
      padding: '80px 0 40px',
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '60px',
          marginBottom: '60px'
        }}>
          {/* Brand Section */}
          <div>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px'}}>
              <Activity color="var(--primary)" size={32} />
              <span style={{fontSize: '1.5rem', fontWeight: '800'}}>HealthAI</span>
            </div>
            <p style={{opacity: 0.7, lineHeight: '1.8', marginBottom: '25px'}}>
              Pioneering the future of predictive healthcare with advanced AI solutions for early disease detection and personalized wellness.
            </p>
            <div style={{display: 'flex', gap: '15px'}}>
              <a href="#" style={{color: 'white', opacity: 0.7}}><Twitter size={20} /></a>
              <a href="#" style={{color: 'white', opacity: 0.7}}><Linkedin size={20} /></a>
              <a href="#" style={{color: 'white', opacity: 0.7}}><Github size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{fontSize: '1.2rem', marginBottom: '25px'}}>Quick Links</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <Link to="/" style={{color: 'white', opacity: 0.7, textDecoration: 'none'}}>Home</Link>
              <Link to="/about" style={{color: 'white', opacity: 0.7, textDecoration: 'none'}}>About Us</Link>
              <Link to="/services" style={{color: 'white', opacity: 0.7, textDecoration: 'none'}}>Services</Link>
              <Link to="/prediction" style={{color: 'white', opacity: 0.7, textDecoration: 'none'}}>AI Prediction</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{fontSize: '1.2rem', marginBottom: '25px'}}>Contact</h4>
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <div style={{display: 'flex', gap: '15px', alignItems: 'center', opacity: 0.7}}>
                <Mail size={18} color="var(--primary)" />
                <span>support@healthai.com</span>
              </div>
              <div style={{display: 'flex', gap: '15px', alignItems: 'center', opacity: 0.7}}>
                <Phone size={18} color="var(--primary)" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div style={{display: 'flex', gap: '15px', alignItems: 'center', opacity: 0.7}}>
                <MapPin size={18} color="var(--primary)" />
                <span>123 Health Tech Lane, Silicon Valley, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: '40px',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{opacity: 0.5, fontSize: '0.9rem'}}>© 2026 AI Healthcare Prediction System. All rights reserved.</p>
          <div style={{display: 'flex', gap: '30px', opacity: 0.5, fontSize: '0.9rem'}}>
            <a href="#" style={{color: 'white'}}>Privacy Policy</a>
            <a href="#" style={{color: 'white'}}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
