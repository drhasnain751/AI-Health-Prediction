import React, { useEffect, useState } from 'react';
import { BarChart3, FileText, Download, Calendar, ExternalLink, Search } from 'lucide-react';
import api from '../../../lib/api';

const LabResults = () => {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const { data } = await api.get(`/api/patients/${user.profileId}/results`);
        setResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user.profileId) fetchResults();
  }, [user.profileId]);

  return (
    <div className="animate-fade-in">
      <header style={{marginBottom: '40px'}}>
        <h1 style={{fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px'}}>Lab Results</h1>
        <p style={{color: 'var(--text-muted)'}}>Access and track your medical test reports securely.</p>
      </header>

      <div className="glass-card" style={{padding: '30px', borderRadius: '32px'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px'}}>
          <h3 style={{fontWeight: '800'}}>Recent Tests</h3>
          <div style={{position: 'relative', width: '300px'}}>
            <Search style={{position: 'absolute', left: '15px', top: '12px', color: 'var(--text-muted)'}} size={18} />
            <input 
              type="text" 
              placeholder="Filter by test name..."
              style={{width: '100%', padding: '12px 12px 12px 45px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none'}}
            />
          </div>
        </div>

        {results.length === 0 ? (
          <div style={{textAlign: 'center', padding: '60px', opacity: 0.5}}>
            <BarChart3 size={64} color="var(--primary)" style={{marginBottom: '20px'}} />
            <p>No lab results uploaded yet.</p>
          </div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            {results.map((r) => (
              <div key={r.id} style={{
                padding: '20px', borderRadius: '16px', backgroundColor: '#f8fafc', 
                border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
                  <div style={{width: '45px', height: '45px', borderRadius: '12px', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)'}}>
                    <FileText size={20} color="var(--primary)" />
                  </div>
                  <div>
                    <h4 style={{fontWeight: '700'}}>{r.testName}</h4>
                    <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>Reported on {new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                  <div style={{textAlign: 'right'}}>
                    <span style={{fontWeight: '800', color: 'var(--primary)'}}>{r.result}</span>
                    <p style={{fontSize: '0.7rem', color: 'var(--text-muted)'}}>{r.unit} (Normal: {r.range})</p>
                  </div>
                  <button onClick={() => {
                    const blob = new Blob(['Mock Lab Report Content for ' + r.testName], { type: 'text/plain' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${r.testName.replace(/\s+/g, '_')}_Report.txt`;
                    a.click();
                  }} className="btn-hover" style={{padding: '10px', backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-main)', cursor: 'pointer'}}>
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LabResults;
