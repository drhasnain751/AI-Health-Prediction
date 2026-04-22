import React from 'react';

const AIModelMonitor = () => {
  const stats = [
    { label: 'Model Accuracy', value: '94.2%', trend: '+0.5%', status: 'optimal' },
    { label: 'Avg Inference Time', value: '42ms', trend: '-2ms', status: 'optimal' },
    { label: 'Daily Predictions', value: '1,284', trend: '+12%', status: 'optimal' },
    { label: 'Error Rate', value: '0.04%', trend: '-0.01%', status: 'optimal' },
  ];

  const recentLogs = [
    { id: 1, time: '2 mins ago', event: 'Model Re-trained', status: 'success' },
    { id: 2, time: '15 mins ago', event: 'Batch Prediction Completed', status: 'success' },
    { id: 3, time: '1 hour ago', event: 'Optimization Sweep', status: 'success' },
    { id: 4, time: '3 hours ago', event: 'Resource Scaling', status: 'warning' },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '5px' }}>AI Model Monitor</h1>
          <p style={{ color: 'var(--text-muted)' }}>Real-time health and performance metrics of the prediction engine.</p>
        </div>
        <button className="btn-hover" style={{ 
          padding: '12px 24px', 
          backgroundColor: 'var(--primary)', 
          color: 'white', 
          borderRadius: '12px', 
          fontWeight: '600' 
        }}>
          Retrain Model
        </button>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        {stats.map((s, i) => (
          <div key={i} className="glass-card card-hover" style={{ padding: '24px', borderRadius: '24px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '10px' }}>{s.label}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '800' }}>{s.value}</h2>
              <span style={{ color: s.trend.startsWith('+') ? '#10b981' : '#ef4444', fontSize: '0.8rem', fontWeight: '600' }}>
                {s.trend}
              </span>
            </div>
            <div style={{ 
              marginTop: '15px', 
              height: '4px', 
              width: '100%', 
              backgroundColor: '#f1f5f9', 
              borderRadius: '2px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                height: '100%', 
                width: '70%', 
                backgroundColor: 'var(--primary)',
                borderRadius: '2px'
              }}></div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        {/* Performance Graph Placeholder */}
        <div className="glass-card" style={{ padding: '30px', borderRadius: '24px' }}>
          <h3 style={{ marginBottom: '20px' }}>Accuracy Over Time</h3>
          <div style={{ 
            height: '300px', 
            width: '100%', 
            backgroundColor: '#f8fafc', 
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '15px',
            padding: '20px'
          }}>
            {[40, 60, 45, 80, 55, 90, 75, 95, 85, 100].map((h, i) => (
              <div key={i} style={{ 
                flex: 1, 
                height: `${h}%`, 
                backgroundColor: 'var(--primary)', 
                opacity: 0.2 + (i * 0.08),
                borderRadius: '8px 8px 0 0'
              }}></div>
            ))}
          </div>
        </div>

        {/* Live Logs */}
        <div className="glass-card" style={{ padding: '30px', borderRadius: '24px' }}>
          <h3 style={{ marginBottom: '20px' }}>System Logs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {recentLogs.map(log => (
              <div key={log.id} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                <div style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  backgroundColor: log.status === 'success' ? '#10b981' : '#f59e0b',
                  marginTop: '6px'
                }}></div>
                <div>
                  <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>{log.event}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIModelMonitor;
