import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import { Search, User, MoreVertical, ExternalLink, Calendar } from 'lucide-react';
import api from '../../lib/api';

const DoctorDashboard = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await api.get('/api/doctors');
        setPatients(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(p => 
    p.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <Sidebar role="DOCTOR" />
      
      <main className="dashboard-main">
        <header style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center', marginBottom: '40px', gap: '20px'}}>
          <div>
            <span style={{backgroundColor: 'var(--secondary)', color: 'white', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '10px', display: 'inline-block'}}>
              Doctor Medical Center
            </span>
            <h1 style={{fontSize: '2.5rem', fontWeight: '800'}}>Clinical Overview</h1>
            <p style={{color: 'var(--text-muted)'}}>Manage your patients and review AI prediction results.</p>
          </div>
          <div style={{display: 'flex', gap: '15px', flexWrap: 'wrap'}}>
            <div style={{position: 'relative'}}>
              <Search style={{position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)'}} size={18} />
              <input 
                type="text" 
                placeholder="Search patients..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '10px 15px 10px 40px', borderRadius: '10px', 
                  border: '1px solid var(--border)', width: '100%', minWidth: '200px', outline: 'none'
                }}
              />
            </div>
          </div>
        </header>

        {/* Patient Table Container */}
        <div className="glass-card" style={{borderRadius: '24px', overflowX: 'auto', boxShadow: 'var(--shadow-sm)'}}>
          <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px'}}>
            <thead style={{backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border)'}}>
              <tr>
                <th style={{padding: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Patient Name</th>
                <th style={{padding: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Age / Gender</th>
                <th style={{padding: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Last Prediction</th>
                <th style={{padding: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Status</th>
                <th style={{padding: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p) => (
                <tr key={p.id} style={{borderBottom: '1px solid var(--border)'}}>
                  <td style={{padding: '20px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                      <div style={{width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <User size={18} />
                      </div>
                      <div>
                        <p style={{fontWeight: '700', color: 'var(--text-main)'}}>{p.user.name}</p>
                        <p style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>{p.user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{padding: '20px', fontWeight: '500'}}>{p.age}y / {p.gender}</td>
                  <td style={{padding: '20px', color: 'var(--text-muted)'}}>2 days ago</td>
                  <td style={{padding: '20px'}}>
                    <span style={{padding: '4px 10px', borderRadius: '8px', backgroundColor: '#ecfdf5', color: '#065f46', fontSize: '0.75rem', fontWeight: '700'}}>Active</span>
                  </td>
                  <td style={{padding: '20px'}}>
                    <button style={{backgroundColor: 'transparent', color: 'var(--primary)'}}>
                      <ExternalLink size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan={5} style={{padding: '40px', textAlign: 'center', color: 'var(--text-muted)'}}>No patients found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
