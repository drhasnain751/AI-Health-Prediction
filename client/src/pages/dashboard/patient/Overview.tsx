import React, { useEffect, useState } from 'react';
import { Activity, Calendar, User, Heart, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../lib/api';

const PatientOverview = () => {
  const [data, setData] = useState<any>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/api/patients/${user.profileId}`);
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user.profileId) fetchData();
  }, [user.profileId]);

  return (
    <div className="animate-fade-in">
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
            <button onClick={() => navigate('/patient/history')} style={{color: 'var(--primary)', fontSize: '0.9rem', fontWeight: '600', backgroundColor: 'transparent'}}>View All</button>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            {data?.predictions?.map((p: any) => (
              <div key={p.id} style={{display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '12px'}}>
                <div>
                  <h4 style={{fontWeight: '700'}}>{p.disease}</h4>
                  <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{new Date(p.createdAt).toLocaleDateString()}</p>
                </div>
                <div style={{textAlign: 'right'}}>
                  <span style={{color: 'var(--success)', fontWeight: 'bold'}}>{p.confidence}%</span>
                  <p style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Confidence</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Cards */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div onClick={() => navigate('/patient/predict')} className="glass-card btn-hover" style={{padding: '30px', borderRadius: '24px', backgroundColor: 'var(--primary)', color: 'white', cursor: 'pointer'}}>
            <ArrowUpRight size={24} style={{float: 'right'}} />
            <h3 style={{marginBottom: '10px'}}>New Analysis</h3>
            <p style={{fontSize: '0.9rem', opacity: 0.8}}>Input your symptoms and get an AI health report instantly.</p>
          </div>
          <div className="glass-card btn-hover" style={{padding: '30px', borderRadius: '24px', backgroundColor: 'white', border: '1px solid var(--border)', cursor: 'pointer'}}>
            <h3 style={{marginBottom: '10px'}}>Emergency Contact</h3>
            <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>Call your primary physician or hospital immediately.</p>
            <p style={{marginTop: '15px', fontWeight: 'bold', color: 'var(--error)'}}>+1 (555) 911-0000</p>
          </div>
        </div>
      </div>
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

export default PatientOverview;
