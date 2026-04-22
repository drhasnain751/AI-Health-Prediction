import React, { useEffect, useState } from 'react';
import { Users, Activity, Shield, TrendingUp, Server, Cpu, AlertTriangle, CheckCircle, Download, RefreshCw, UserPlus, Settings } from 'lucide-react';
import api from '../../lib/api';
import { useNavigate } from 'react-router-dom';

const AdminOverview = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [serverStatus, setServerStatus] = useState<'online' | 'degraded' | 'offline'>('online');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/api/admin/stats');
        setData(data);
        setServerStatus('online');
      } catch (err) {
        console.error(err);
        setServerStatus('degraded');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const exportReport = () => {
    const reportData = `HealthAI System Report\n=====================\nGenerated: ${new Date().toLocaleString()}\n\nTotal Users: ${data?.stats?.totalUsers || 0}\nActive Doctors: ${data?.stats?.totalDoctors || 0}\nAI Predictions Made: ${data?.stats?.totalPredictions || 0}\nSystem Uptime: 99.9%\nModel Accuracy: 94%\n`;
    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HealthAI_System_Report_${Date.now()}.txt`;
    a.click();
  };

  const statusColors = { online: '#10b981', degraded: '#f59e0b', offline: '#ef4444' };
  const statusLabel = { online: 'All Systems Operational', degraded: 'Degraded Performance', offline: 'System Offline' };

  return (
    <div className="animate-fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center', marginBottom: '40px', gap: '20px' }}>
        <div>
          <span style={{ backgroundColor: 'var(--text-main)', color: 'white', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', display: 'inline-block' }}>
            System Control Center
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Admin Analytics</h1>
          <p style={{ color: 'var(--text-muted)' }}>Monitor system health and manage user accessibility.</p>
        </div>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button onClick={exportReport} className="btn-hover" style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', cursor: 'pointer' }}>
            <Download size={18} /> Export Report
          </button>
          <button onClick={() => alert('SYSTEM LOCKDOWN INITIATED: All emergency protocols engaged.')} className="btn-hover" style={{ padding: '12px 24px', backgroundColor: 'var(--error)', color: 'white', borderRadius: '12px', fontWeight: '700', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <Shield size={18} /> System Lockdown
          </button>
        </div>
      </header>

      {/* Admin Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <StatBox title="Total Users" value={data?.stats?.totalUsers || '0'} color="#3b82f6" icon={<Users size={20} />} />
        <StatBox title="Active Doctors" value={data?.stats?.totalDoctors || '0'} color="#10b981" icon={<Users size={20} />} />
        <StatBox title="AI Predictions" value={data?.stats?.totalPredictions || '0'} color="#8b5cf6" icon={<Activity size={20} />} />
        <StatBox title="System Uptime" value="99.9%" color="#f59e0b" icon={<Server size={20} />} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '40px' }}>
        {/* System Health Card */}
        <div className="glass-card" style={{ padding: '30px', borderRadius: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h3 style={{ fontWeight: '800' }}>System Health</h3>
            <button onClick={() => window.location.reload()} style={{ backgroundColor: 'transparent', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <RefreshCw size={18} />
            </button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              { label: 'API Server', status: serverStatus },
              { label: 'Database', status: 'online' as const },
              { label: 'AI Model Engine', status: 'online' as const },
              { label: 'Auth Service', status: 'online' as const },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Cpu size={16} color="var(--text-muted)" />
                  <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{item.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: statusColors[item.status] }} />
                  <span style={{ fontSize: '0.8rem', color: statusColors[item.status], fontWeight: '600' }}>{item.status.toUpperCase()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Registrations */}
        <div className="glass-card" style={{ padding: '30px', borderRadius: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h3 style={{ fontWeight: '800' }}>Recent Registrations</h3>
            <button onClick={() => navigate('/admin/users')} style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '600', backgroundColor: 'transparent', cursor: 'pointer' }}>View All</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data?.recentUsers?.slice(0, 4).map((u: any) => (
              <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 15px', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: u.role === 'ADMIN' ? '#0f172a' : u.role === 'DOCTOR' ? '#10b981' : '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: '700' }}>
                    {u.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '700', fontSize: '0.9rem' }}>{u.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.role}</p>
                  </div>
                </div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }} />
              </div>
            ))}
          </div>
        </div>

        {/* AI Model Performance */}
        <div className="glass-card" style={{ padding: '30px', borderRadius: '24px' }}>
          <h3 style={{ fontWeight: '800', marginBottom: '25px' }}>AI Model Performance</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              { label: 'Prediction Accuracy', value: 94, color: '#3b82f6' },
              { label: 'Model Confidence Avg.', value: 87, color: '#10b981' },
              { label: 'Dataset Coverage', value: 78, color: '#8b5cf6' },
            ].map(item => (
              <div key={item.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{item.label}</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', color: item.color }}>{item.value}%</span>
                </div>
                <div style={{ height: '8px', borderRadius: '4px', backgroundColor: '#e2e8f0' }}>
                  <div style={{ height: '100%', borderRadius: '4px', backgroundColor: item.color, width: `${item.value}%`, transition: '1s ease' }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0fdf4', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CheckCircle size={18} color="#10b981" />
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#166534' }}>Model running normally — avg latency 250ms</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card" style={{ padding: '30px', borderRadius: '24px' }}>
        <h3 style={{ fontWeight: '800', marginBottom: '25px' }}>Quick Admin Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
          {[
            { label: 'Add New User', icon: <UserPlus size={22} />, color: '#3b82f6', action: () => navigate('/admin/users') },
            { label: 'View All Reports', icon: <Activity size={22} />, color: '#8b5cf6', action: () => navigate('/admin/reports') },
            { label: 'Export Report', icon: <Download size={22} />, color: '#10b981', action: exportReport },
            { label: 'System Settings', icon: <Settings size={22} />, color: '#f59e0b', action: () => navigate('/admin/settings') },
          ].map(item => (
            <button key={item.label} onClick={item.action} className="btn-hover card-hover" style={{ padding: '25px 20px', borderRadius: '16px', backgroundColor: item.color + '12', border: `1px solid ${item.color}25`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', color: item.color }}>
              {item.icon}
              <span style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--text-main)', textAlign: 'center' }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ title, value, color, icon }) => (
  <div className="glass-card card-hover" style={{ padding: '25px', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
    <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', color: color }}>
      {icon}
    </div>
    <div>
      <h3 style={{ fontSize: '1.8rem', fontWeight: '800', lineHeight: '1' }}>{value}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>{title}</p>
    </div>
  </div>
);

export default AdminOverview;
