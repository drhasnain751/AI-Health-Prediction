import React, { useEffect, useState } from 'react';
import { Search, Filter, Download, Activity, ExternalLink } from 'lucide-react';
import api from '../../../lib/api';

const PatientHistory = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get(`/api/predict/history/${user.profileId}`);
        setHistory(data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user.profileId) fetchHistory();
  }, [user.profileId]);

  const filtered = history.filter(p =>
    p.disease.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const rows = ['Date,Disease,Confidence,Symptoms'];
    history.forEach(p => {
      rows.push(`${new Date(p.createdAt).toLocaleDateString()},${p.disease},${p.confidence}%,"${JSON.parse(p.symptoms).join('; ')}"`);
    });
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'prediction_history.csv';
    a.click();
  };

  return (
    <div className="animate-fade-in">
      <header style={{marginBottom: '40px'}}>
        <h1 style={{fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px'}}>Prediction History</h1>
        <p style={{color: 'var(--text-muted)'}}>Review all your past AI health analyses and doctor recommendations.</p>
      </header>

      <div style={{display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', gap: '15px'}}>
          <div style={{position: 'relative'}}>
            <Search style={{position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)'}} size={18} />
            <input 
              type="text" 
              placeholder="Filter by disease..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{padding: '10px 15px 10px 40px', borderRadius: '10px', border: '1px solid var(--border)', outline: 'none', width: '250px'}}
            />
          </div>
          <button style={{padding: '10px 20px', borderRadius: '10px', border: '1px solid var(--border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', cursor: 'pointer'}}>
            <Filter size={18} /> Filters
          </button>
        </div>
        <button onClick={exportCSV} className="btn-hover" style={{padding: '10px 20px', borderRadius: '10px', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', border: 'none', cursor: 'pointer'}}>
          <Download size={18} /> Export CSV
        </button>
      </div>

      <div className="glass-card" style={{borderRadius: '24px', overflowX: 'auto'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px'}}>
          <thead style={{backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border)'}}>
            <tr>
              <th style={{padding: '20px', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.85rem'}}>Analysis Date</th>
              <th style={{padding: '20px', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.85rem'}}>Detected Condition</th>
              <th style={{padding: '20px', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.85rem'}}>AI Confidence</th>
              <th style={{padding: '20px', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.85rem'}}>Symptoms Reported</th>
              <th style={{padding: '20px', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.85rem'}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? filtered.map((p) => (
              <tr key={p.id} style={{borderBottom: '1px solid var(--border)'}}>
                <td style={{padding: '20px', fontWeight: '500'}}>{new Date(p.createdAt).toLocaleDateString()}</td>
                <td style={{padding: '20px'}}>
                  <span style={{padding: '4px 12px', backgroundColor: '#eff6ff', color: 'var(--primary)', borderRadius: '6px', fontWeight: '700', fontSize: '0.9rem'}}>
                    {p.disease}
                  </span>
                </td>
                <td style={{padding: '20px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <div style={{flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', width: '60px'}}>
                      <div style={{width: `${p.confidence}%`, height: '100%', backgroundColor: 'var(--success)', borderRadius: '3px'}}></div>
                    </div>
                    <span style={{fontWeight: '700'}}>{p.confidence}%</span>
                  </div>
                </td>
                <td style={{padding: '20px'}}>
                   <div style={{display: 'flex', gap: '5px', flexWrap: 'wrap'}}>
                     {JSON.parse(p.symptoms).slice(0, 2).map((s: string) => (
                       <span key={s} style={{fontSize: '0.75rem', backgroundColor: '#f1f5f9', padding: '2px 8px', borderRadius: '4px'}}>{s.replace(/_/g, ' ')}</span>
                     ))}
                     {JSON.parse(p.symptoms).length > 2 && <span style={{fontSize: '0.75rem'}}>+{JSON.parse(p.symptoms).length - 2} more</span>}
                   </div>
                </td>
                <td style={{padding: '20px'}}>
                  <button style={{color: 'var(--primary)', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600'}}>
                    <ExternalLink size={16} /> Details
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} style={{padding: '60px', textAlign: 'center', color: 'var(--text-muted)'}}>
                   <Activity size={48} style={{opacity: 0.1, marginBottom: '20px'}} />
                   <p>No health analyses found yet. Start your first prediction today!</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientHistory;
