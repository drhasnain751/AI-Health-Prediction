import React, { useEffect, useState } from 'react';
import { Search, User, Activity, Users, ClipboardList, Calendar, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../../lib/api';

const DoctorOverview = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await api.get('/api/doctors/patients');
        setPatients(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(p => 
    p.user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
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

      {/* Stats Summary */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px'}}>
        <div className="glass-card card-hover" style={{padding: '25px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '15px'}}>
          <div style={{width: '45px', height: '45px', borderRadius: '12px', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Users size={20} color="var(--secondary)" />
          </div>
          <div>
            <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Active Patients</p>
            <h3 style={{fontSize: '1.2rem', fontWeight: '800'}}>{patients.length}</h3>
          </div>
        </div>
        <div className="glass-card card-hover" style={{padding: '25px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '15px'}}>
          <div style={{width: '45px', height: '45px', borderRadius: '12px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <ClipboardList size={20} color="var(--primary)" />
          </div>
          <div>
            <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Total Reports</p>
            <h3 style={{fontSize: '1.2rem', fontWeight: '800'}}>124</h3>
          </div>
        </div>
      </div>

      {/* Patient Table Container */}
      <div className="glass-card" style={{borderRadius: '24px', overflowX: 'auto', boxShadow: 'var(--shadow-sm)'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px'}}>
          <thead style={{backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border)'}}>
            <tr>
              <th style={{padding: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Patient Name</th>
              <th style={{padding: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Contact</th>
              <th style={{padding: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Last Prediction</th>
              <th style={{padding: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map(patient => (
              <tr key={patient.id} style={{borderBottom: '1px solid var(--border)'}}>
                <td style={{padding: '20px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <User size={16} color="#64748b" />
                    </div>
                    <span style={{fontWeight: '600'}}>{patient.user.name}</span>
                  </div>
                </td>
                <td style={{padding: '20px', color: 'var(--text-muted)'}}>{patient.user.email}</td>
                <td style={{padding: '20px'}}>
                  {patient.predictions?.[0] ? (
                    <span style={{padding: '4px 10px', backgroundColor: '#fef3c7', color: '#92400e', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600'}}>
                      {patient.predictions[0].disease}
                    </span>
                  ) : <span style={{color: 'var(--text-muted)'}}>No data</span>}
                </td>
                <td style={{padding: '20px'}}>
                  <button onClick={() => navigate('/doctor/patients')} style={{padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', cursor: 'pointer'}} className="btn-hover">
                    <ExternalLink size={14} /> View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorOverview;
