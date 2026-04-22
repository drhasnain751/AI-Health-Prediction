import React from 'react';

const SystemReports = () => {
  const reports = [
    { name: 'Monthly Patient Growth', date: 'Oct 2023', type: 'Growth', size: '1.2 MB' },
    { name: 'AI Prediction Accuracy Audit', date: 'Sept 2023', type: 'Audit', size: '2.4 MB' },
    { name: 'Doctor Consultation Metrics', date: 'Aug 2023', type: 'Performance', size: '0.8 MB' },
    { name: 'System Resource Utilization', date: 'July 2023', type: 'Technical', size: '1.5 MB' },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '5px' }}>System Reports</h1>
          <p style={{ color: 'var(--text-muted)' }}>Generate and download comprehensive system-wide performance reports.</p>
        </div>
        <button className="btn-hover" style={{ 
          padding: '12px 24px', 
          backgroundColor: 'var(--primary)', 
          color: 'white', 
          borderRadius: '12px', 
          fontWeight: '600' 
        }}>
          Generate New Report
        </button>
      </div>

      <div className="glass-card" style={{ padding: '0', borderRadius: '24px', overflow: 'hidden' }}>
        <div style={{ padding: '25px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: '0' }}>Recent Reports</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'white' }}>Filter</button>
            <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'white' }}>Sort</button>
          </div>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '20px' }}>Report Name</th>
                <th style={{ padding: '20px' }}>Date Generated</th>
                <th style={{ padding: '20px' }}>Category</th>
                <th style={{ padding: '20px' }}>Size</th>
                <th style={{ padding: '20px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '20px', fontWeight: '600' }}>{report.name}</td>
                  <td style={{ padding: '20px', color: 'var(--text-muted)' }}>{report.date}</td>
                  <td style={{ padding: '20px' }}>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      backgroundColor: 'rgba(52, 211, 153, 0.1)', 
                      color: '#10b981',
                      fontSize: '0.8rem',
                      fontWeight: '600'
                    }}>
                      {report.type}
                    </span>
                  </td>
                  <td style={{ padding: '20px', color: 'var(--text-muted)' }}>{report.size}</td>
                  <td style={{ padding: '20px' }}>
                    <button className="btn-hover" style={{ color: 'var(--primary)', fontWeight: '700', border: 'none', background: 'none', cursor: 'pointer' }}>
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemReports;
