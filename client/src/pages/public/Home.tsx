import React from 'react';
import { ArrowRight, Shield, Activity, Users, Database, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero" style={{
        padding: '160px 0 100px',
        background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)',
        textAlign: 'center'
      }}>
        <div className="container animate-fade-in">
          <h1 style={{fontSize: '4rem', fontWeight: '800', marginBottom: 'var(--spacing-md)', color: 'var(--text-main)', lineHeight: '1.2'}}>
            AI-Powered <span style={{color: 'var(--primary)'}}>Healthcare</span> <br /> Prediction System
          </h1>
          <p style={{fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: 'var(--spacing-xl)', maxWidth: '700px', margin: '0 auto var(--spacing-xl)'}}>
            Leveraging advanced machine learning to detect diseases early and provide personalized health recommendations for a better tomorrow.
          </p>
          <div style={{display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center'}}>
            <Link to="/prediction" style={{
              padding: '1rem 2rem',
              backgroundColor: 'var(--primary)',
              color: 'white',
              borderRadius: '12px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              boxShadow: 'var(--shadow-lg)'
            }}>
              Start Prediction <ArrowRight size={20} />
            </Link>
            <Link to="/about" style={{
              padding: '1rem 2rem',
              backgroundColor: 'white',
              color: 'var(--text-main)',
              borderRadius: '12px',
              fontWeight: '600',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" style={{padding: '100px 0', backgroundColor: 'white'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '60px'}}>
            <h2 style={{fontSize: '2.5rem', fontWeight: '700', marginBottom: 'var(--spacing-md)'}}>Core Features</h2>
            <p style={{color: 'var(--text-muted)'}}>Cutting-edge technology meets healthcare expertise.</p>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-xl)'}}>
            <FeatureCard 
              icon={<Database color="var(--primary)" />} 
              title="AI Predictions" 
              desc="Accurate disease forecasting based on comprehensive symptom analysis."
            />
            <FeatureCard 
              icon={<Activity color="var(--primary)" />} 
              title="Real-time Monitoring" 
              desc="Track your health metrics and receive alerts on significant changes."
            />
            <FeatureCard 
              icon={<Shield color="var(--primary)" />} 
              title="Secure Records" 
              desc="Your medical data is encrypted and stored with the highest security standards."
            />
            <FeatureCard 
              icon={<Users color="var(--primary)" />} 
              title="Doctor Support" 
              desc="Integrated communication platform for seamless patient-doctor interaction."
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section style={{padding: '100px 0', backgroundColor: '#fdfdfd'}}>
        <div className="container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: '700', marginBottom: '60px'}}>How It Works</h2>
          <div style={{display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center'}}>
            <Step number="1" title="Input Data" desc="Safe and secure symptom input." />
            <Step number="2" title="AI Analysis" desc="Our model processes your health data." />
            <Step number="3" title="Get Results" desc="Receive predictions and expert advice." />
          </div>
        </div>
      </section>
      {/* stats Section */}
      <section style={{padding: '60px 0', backgroundColor: 'var(--primary)', color: 'white'}}>
        <div className="container" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px'}}>
          <div className="stat-item animate-fade-in">
            <h3 style={{fontSize: '3rem', fontWeight: '800'}}>94%</h3>
            <p style={{fontSize: '1.1rem', opacity: 0.9}}>Model Accuracy</p>
          </div>
          <div className="stat-item animate-fade-in">
            <h3 style={{fontSize: '3rem', fontWeight: '800'}}>10k+</h3>
            <p style={{fontSize: '1.1rem', opacity: 0.9}}>Predictions Made</p>
          </div>
          <div className="stat-item animate-fade-in">
            <h3 style={{fontSize: '3rem', fontWeight: '800'}}>50+</h3>
            <p style={{fontSize: '1.1rem', opacity: 0.9}}>Symptom Markers</p>
          </div>
          <div className="stat-item animate-fade-in">
            <h3 style={{fontSize: '3rem', fontWeight: '800'}}>24/7</h3>
            <p style={{fontSize: '1.1rem', opacity: 0.9}}>AI Availability</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits" style={{padding: '100px 0', backgroundColor: '#ffffff'}}>
        <div className="container">
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center'}} className="grid-cols-2">
            <div>
              <h2 style={{fontSize: '2.5rem', fontWeight: '700', marginBottom: 'var(--spacing-md)'}}>Why Early Prediction <br/><span style={{color: 'var(--primary)'}}>Matters?</span></h2>
              <p style={{color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.1rem'}}>Early detection of diseases can significantly improve treatment outcomes and reduce healthcare costs.</p>
              <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px'}}>
                <li style={{display: 'flex', gap: '15px', alignItems: 'start'}}>
                  <div style={{width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#dcfce7', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Check size={14} /></div>
                  <div><strong>Reduce Medical Errors:</strong> AI analysis provides a second opinion that minimizes diagnostic oversight.</div>
                </li>
                <li style={{display: 'flex', gap: '15px', alignItems: 'start'}}>
                  <div style={{width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#dcfce7', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Check size={14} /></div>
                  <div><strong>Personalized Care:</strong> Get recommendations tailored specifically to your unique symptom profile.</div>
                </li>
                <li style={{display: 'flex', gap: '15px', alignItems: 'start'}}>
                  <div style={{width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#dcfce7', color: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Check size={14} /></div>
                  <div><strong>Peace of Mind:</strong> Instant preliminary assessments reduce anxiety while waiting for clinical visits.</div>
                </li>
              </ul>
            </div>
            <div style={{position: 'relative', height: '400px', backgroundColor: '#f1f5f9', borderRadius: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}}>
               <Activity size={120} color="var(--primary)" style={{opacity: 0.1}} />
               <h3 style={{position: 'absolute', bottom: '40px', left: '40px', fontWeight: '800', fontSize: '1.5rem'}}>Smart Diagnostics</h3>
            </div>
          </div>
        </div>
      </section>

      {/* AI Model & Process Section */}
      <section style={{padding: '100px 0', backgroundColor: 'white'}}>
        <div className="container">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'center'}}>
            <div>
              <span style={{color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem'}}>The Technology</span>
              <h2 style={{fontSize: '2.5rem', fontWeight: '800', margin: '20px 0'}}>Powered by Advanced Machine Learning</h2>
              <p style={{color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '30px'}}>
                Our system uses a sophisticated Decision Tree algorithm trained on over 5,000 verified clinical cases from Kaggle datasets. 
                By analyzing cross-symptom correlations, the AI can detect patterns invisible to the human eye, providing diagnostic support with high precision.
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                  <div style={{width: '30px', height: '30px', backgroundColor: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Check size={16} color="var(--primary)" />
                  </div>
                  <span style={{fontWeight: '600'}}>Real-time Symptom Correlation</span>
                </div>
                <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                  <div style={{width: '30px', height: '30px', backgroundColor: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Check size={16} color="var(--primary)" />
                  </div>
                  <span style={{fontWeight: '600'}}>Precision Risk Calculation</span>
                </div>
              </div>
            </div>
            <div className="glass-card" style={{padding: '40px', borderRadius: '32px', border: '1px solid var(--border)', position: 'relative'}}>
              <div style={{position: 'absolute', top: '-15px', right: '40px', backgroundColor: 'var(--secondary)', color: 'white', padding: '6px 15px', borderRadius: '99px', fontSize: '0.8rem', fontWeight: '700'}}>
                LIVE ML ENGINE
              </div>
              <Activity color="var(--primary)" size={48} style={{marginBottom: '20px'}} />
              <h3 style={{fontSize: '1.5rem', fontWeight: '800', marginBottom: '15px'}}>Instant Diagnosis</h3>
              <p style={{color: 'var(--text-muted)', marginBottom: '30px'}}>
                Ready to see our AI in action? Input your current symptoms and let our model analyze your health risk in seconds.
              </p>
              <Link to="/prediction" className="btn-hover" style={{
                display: 'block', textAlign: 'center', padding: '15px', backgroundColor: 'var(--primary)', 
                color: 'white', fontWeight: '700', borderRadius: '12px'
              }}>
                Try AI Prediction Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{padding: '100px 0', backgroundColor: '#f8fafc'}}>
        <div className="container">
          <h2 style={{textAlign: 'center', fontSize: '2.5rem', fontWeight: '700', marginBottom: '60px'}}>Trusted by Patients</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
             <TestimonialCard quote="The accuracy is mind-blowing. It caught my symptoms before I even felt really sick." author="David Miller" role="Verified Patient" />
             <TestimonialCard quote="As a doctor, I use this as a preliminary tool to prioritize patient urgencies. Highly effective." author="Dr. Emily Chen" role="Medical Advisor" />
             <TestimonialCard quote="Simple, fast, and incredibly intuitive. Every clinic should have this integration." author="James Wilson" role="Clinic Manager" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{padding: '80px 0'}}>
        <div className="container">
          <div style={{
            backgroundColor: 'var(--text-main)', padding: '60px', borderRadius: '32px', textAlign: 'center', color: 'white'
          }}>
            <h2 style={{fontSize: '2.5rem', fontWeight: '800', marginBottom: '20px'}}>Ready to protect your health?</h2>
            <p style={{marginBottom: '40px', opacity: 0.8}}>Join thousands of users who trust HealthAI for their daily wellness monitoring.</p>
            <Link to="/signup" style={{padding: '15px 40px', backgroundColor: 'var(--secondary)', color: 'white', borderRadius: '12px', fontWeight: '700', display: 'inline-block'}}>Create Account Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const TestimonialCard = ({ quote, author, role }) => (
  <div className="glass-card card-hover" style={{padding: '40px', borderRadius: '24px'}}>
    <p style={{fontStyle: 'italic', marginBottom: '20px', color: 'var(--text-muted)'}}>"{quote}"</p>
    <h4 style={{fontWeight: '700'}}>{author}</h4>
    <p style={{fontSize: '0.8rem', color: 'var(--primary)'}}>{role}</p>
  </div>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="glass-card card-hover" style={{
    padding: '40px',
    borderRadius: '24px',
    transition: 'all 0.3s ease',
    textAlign: 'center'
  }}>
    <div style={{marginBottom: '20px', display: 'flex', justifyContent: 'center'}}>{icon}</div>
    <h3 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '10px'}}>{title}</h3>
    <p style={{color: 'var(--text-muted)', fontSize: '0.95rem'}}>{desc}</p>
  </div>
);

const Step = ({ number, title, desc }) => (
  <div style={{textAlign: 'center', maxWidth: '200px'}}>
    <div style={{
      width: '60px', height: '60px', 
      borderRadius: '50%', 
      backgroundColor: 'var(--primary)', 
      color: 'white', 
      display: 'flex', alignItems: 'center', justifyContent: 'center', 
      margin: '0 auto 20px', 
      fontSize: '1.5rem', fontWeight: 'bold'
    }}>
      {number}
    </div>
    <h3 style={{marginBottom: '10px'}}>{title}</h3>
    <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>{desc}</p>
  </div>
);

export default Home;
