import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { Users, Activity, PieChart, Shield, Search, MoreHorizontal } from 'lucide-react';
import api from '../lib/api';

const AdminDashboard = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/api/admin/stats');
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar role="ADMIN" />
      
      <main className="dashboard-main">
        <header style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center', marginBottom: '40px', gap: '20px'}}>
          <div>
            <span style={{backgroundColor: 'var(--text-main)', color: 'white', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', display: 'inline-block'}}>
               System Control Center
            </span>
            <h1 style={{fontSize: '2.5rem', fontWeight: '800'}}>Admin Analytics</h1>
            <p style={{color: 'var(--text-muted)'}}>Monitor system health and manage user accessibility.</p>
          </div>
          <button style={{
            padding: '10px 20px', backgroundColor: 'white', border: '1px solid var(--border)',
            borderRadius: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <Shield size={18} color="var(--primary)" /> Security Logs
          </button>
        </header>

        {/* Admin Stats Grid */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px'}}>
          <StatBox title="Total Users" value={data?.stats?.totalUsers || '0'} color="#3b82f6" icon={<Users size={20} />} />
          <StatBox title="Active Doctors" value={data?.stats?.totalDoctors || '0'} color="#10b981" icon={<Users size={20} />} />
          <StatBox title="AI Predictions" value={data?.stats?.totalPredictions || '0'} color="#8b5cf6" icon={<Activity size={20} />} />
          <StatBox title="System Uptime" value="99.9%" color="#f59e0b" icon={<Activity size={20} />} />
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '40px'}}>
          {/* Recent Registrations */}
          <div className="glass-card" style={{padding: '30px', borderRadius: '24px'}}>
            <h3 style={{fontWeight: '800', marginBottom: '25px'}}>Recent Registrations</h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              {data?.recentUsers?.map((u: any) => (
                <div key={u.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 15px', backgroundColor: '#f8fafc', borderRadius: '12px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{width: '35px', height: '35px', borderRadius: '8px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'}}>
                      {u.name[0]}
                    </div>
                    <div>
                      <p style={{fontWeight: '700', fontSize: '0.9rem'}}>{u.name}</p>
                      <p style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>{u.email}</p>
                    </div>
                  </div>
                  <span style={{
                    fontSize: '0.7rem', fontWeight: '800', padding: '4px 8px', borderRadius: '6px',
                    backgroundColor: u.role === 'DOCTOR' ? '#e0f2fe' : '#f0fdf4',
                    color: u.role === 'DOCTOR' ? '#0369a1' : '#15803d'
                  }}>
                    {u.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Model Analytics */}
          <div className="glass-card" style={{padding: '30px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <PieChart size={100} color="var(--primary)" style={{opacity: 0.1, position: 'absolute'}} />
            <h3 style={{fontWeight: '800', marginBottom: '10px'}}>AI Optimization</h3>
            <p style={{textAlign: 'center', color: 'var(--text-muted)', marginBottom: '20px', maxWidth: '300px'}}>The current model is performing with 94% accuracy based on synthetic Kaggle data training.</p>
            <div style={{width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '99px', overflow: 'hidden'}}>
              <div style={{width: '94%', height: '100%', backgroundColor: 'var(--primary)'}}></div>
            </div>
            <span style={{marginTop: '10px', fontWeight: '700', color: 'var(--primary)'}}>94% Model Accuracy</span>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatBox = ({ title, value, color, icon }) => (
  <div className="glass-card card-hover" style={{padding: '25px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '15px'}}>
    <div style={{width: '40px', height: '40px', borderRadius: '12px', backgroundColor: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', color: color}}>
      {icon}
    </div>
    <div>
      <h3 style={{fontSize: '1.8rem', fontWeight: '800', lineHeight: '1'}}>{value}</h3>
      <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px'}}>{title}</p>
    </div>
  </div>
);

export default AdminDashboard;
