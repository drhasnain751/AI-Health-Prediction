import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { Activity, History, Calendar, Heart, ShieldCheck } from 'lucide-react';
import api from '../lib/api';

const PatientDashboard = () => {
  const [data, setData] = useState<any>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/api/patients/${user.profileId}`);
        setData(data);
      } catch (error) {
        console.error(error);
      }
    };
    if (user.profileId) fetchData();
  }, [user.profileId]);

  return (
    <div className="dashboard-container">
      <Sidebar role="PATIENT" />
      
      <main className="dashboard-main">
        <header style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center', marginBottom: '40px', gap: '20px'}}>
          <div>
            <span style={{backgroundColor: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', display: 'inline-block'}}>
              Patient Portal
            </span>
            <h1 style={{fontSize: '2.5rem', fontWeight: '800'}}>Hello, {user.name} 👋</h1>
            <p style={{color: 'var(--text-muted)'}}>Manage your symptoms and view health predictions.</p>
          </div>
          <div style={{backgroundColor: 'white', padding: '10px 20px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px'}}>
            <Calendar size={20} color="var(--primary)" />
            <span style={{fontWeight: '600'}}>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </header>

        {/* Stats Grid */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px'}}>
          <StatCard title="Age" value={data?.age || '25'} icon={<User size={20} color="var(--primary)" />} />
          <StatCard title="Gender" value={data?.gender || 'Male'} icon={<Heart size={20} color="var(--error)" />} />
          <StatCard title="Total Predictions" value={data?.predictions?.length || '0'} icon={<Activity size={20} color="var(--secondary)" />} />
          <StatCard title="Medical Reports" value={data?.records?.length || '0'} icon={<ShieldCheck size={20} color="var(--accent)" />} />
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px'}}>
          {/* Recent Predictions */}
          <div className="glass-card" style={{padding: '30px', borderRadius: '24px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
              <h3 style={{fontWeight: '700'}}>Recent Predictions</h3>
              <button style={{color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '600', backgroundColor: 'transparent'}}>View All</button>
            </div>
            {data?.predictions?.length > 0 ? (
              <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                {data.predictions.map((p: any) => (
                  <div key={p.id} style={{padding: '15px', border: '1px solid var(--border)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                      <h4 style={{fontWeight: '700', color: 'var(--text-main)'}}>{p.disease}</h4>
                      <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{new Date(p.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <span style={{
                        padding: '4px 12px', borderRadius: '99px', 
                        backgroundColor: p.confidence > 70 ? '#dcfce7' : '#fef9c3',
                        color: p.confidence > 70 ? '#166534' : '#854d0e',
                        fontSize: '0.8rem', fontWeight: '700'
                      }}>
                        {p.confidence}% Confidence
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{color: 'var(--text-muted)', textAlign: 'center', padding: '40px'}}>No predictions yet. Try the AI Engine!</p>
            )}
          </div>

          {/* Quick Actions / Notifications */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <div style={{backgroundColor: 'var(--primary)', padding: '30px', borderRadius: '24px', color: 'white'}}>
              <h3 style={{marginBottom: '15px'}}>Need a checkup?</h3>
              <p style={{fontSize: '0.9rem', marginBottom: '20px', opacity: 0.9}}>Contact your primary doctor for a detailed consultation.</p>
              <button style={{width: '100%', padding: '12px', backgroundColor: 'white', color: 'var(--primary)', borderRadius: '10px', fontWeight: '700'}}>Find Doctor</button>
            </div>
            
            <div style={{backgroundColor: 'white', padding: '30px', borderRadius: '24px', border: '1px solid var(--border)'}}>
              <h4 style={{marginBottom: '15px', fontWeight: '700'}}>Health Alerts</h4>
              <div style={{padding: '12px', backgroundColor: '#fff7ed', borderRadius: '12px', borderLeft: '4px solid var(--accent)'}}>
                <p style={{fontSize: '0.85rem', color: '#9a3412'}}>Remember to update your symptom log regularly for better accuracy.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="glass-card card-hover" style={{padding: '25px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '15px'}}>
    <div style={{width: '45px', height: '45px', borderRadius: '12px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {icon}
    </div>
    <div>
      <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>{title}</p>
      <h3 style={{fontSize: '1.2rem', fontWeight: '800'}}>{value}</h3>
    </div>
  </div>
);

// Dummy icon
const User = ({ size, color }) => <History size={size} color={color} />;

export default PatientDashboard;
