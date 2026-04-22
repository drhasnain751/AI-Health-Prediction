import React, { useEffect, useState } from 'react';
import { Search, User, Mail, Calendar, ChevronRight, Filter, MoreVertical, X, Activity, FileText } from 'lucide-react';
import api from '../../../lib/api';
import { useNavigate } from 'react-router-dom';

const DoctorPatients = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
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
      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass-card animate-fade-in" style={{ maxWidth: '500px', width: '100%', borderRadius: '24px', padding: '40px', backgroundColor: 'white', position: 'relative' }}>
            <button onClick={() => setSelectedPatient(null)} style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: '#f1f5f9', border: 'none', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}><X size={18} /></button>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '25px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={32} color="var(--primary)" />
              </div>
              <div>
                <h2 style={{ fontWeight: '800', fontSize: '1.4rem' }}>{selectedPatient.user.name}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{selectedPatient.user.email}</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
              {[
                { label: 'Gender', value: selectedPatient.gender || 'Not Set' },
                { label: 'Age', value: selectedPatient.age || 'Not Set' },
                { label: 'Total Predictions', value: selectedPatient.predictions?.length || 0 },
                { label: 'AI Reports', value: selectedPatient.records?.length || 0 },
              ].map(item => (
                <div key={item.label} style={{ padding: '15px', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '5px' }}>{item.label}</p>
                  <p style={{ fontWeight: '700' }}>{item.value}</p>
                </div>
              ))}
            </div>
            {selectedPatient.predictions?.length > 0 && (
              <div style={{ padding: '15px', backgroundColor: '#fef3c7', borderRadius: '12px', marginBottom: '20px' }}>
                <h4 style={{ fontWeight: '700', fontSize: '0.85rem', color: '#92400e', marginBottom: '5px' }}>Latest AI Prediction</h4>
                <p style={{ fontWeight: '800' }}>{selectedPatient.predictions[0].disease}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Confidence: {selectedPatient.predictions[0].confidence}%</p>
              </div>
            )}
            <button onClick={() => setSelectedPatient(null)} style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}
      <header style={{marginBottom: '40px'}}>
        <h1 style={{fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px'}}>Patient Directory</h1>
        <p style={{color: 'var(--text-muted)'}}>Manage your assigned patients, review their history, and update medical notes.</p>
      </header>

      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px', flexWrap: 'wrap', gap: '20px'}}>
        <div style={{position: 'relative', width: '350px'}}>
          <Search style={{position: 'absolute', left: '15px', top: '12px', color: 'var(--text-muted)'}} size={20} />
          <input 
            type="text" 
            placeholder="Search patients by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{padding: '12px 15px 12px 45px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none', width: '100%'}}
          />
        </div>
        <div style={{display: 'flex', gap: '15px'}}>
          <button style={{ padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', cursor: 'pointer' }}>
            <Filter size={18} /> Group by Risk
          </button>
          <button onClick={() => alert('To assign a new patient, ask them to register via the Patient Portal and create an account.')} className="btn-hover" style={{ padding: '12px 20px', borderRadius: '12px', backgroundColor: 'var(--secondary)', color: 'white', fontWeight: '700', border: 'none', cursor: 'pointer' }}>
            Assign New Patient
          </button>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px'}}>
        {filteredPatients.map((p) => (
          <div key={p.id} className="glass-card card-hover" style={{padding: '30px', borderRadius: '24px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px'}}>
              <div style={{width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <User size={30} color="var(--primary)" />
              </div>
              <button style={{backgroundColor: 'transparent', color: 'var(--text-muted)'}}><MoreVertical size={20} /></button>
            </div>
            
            <h3 style={{fontSize: '1.25rem', fontWeight: '800', marginBottom: '5px'}}>{p.user.name}</h3>
            <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
              <Mail size={14} /> {p.user.email}
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', padding: '15px', backgroundColor: '#f8fafc', borderRadius: '12px', marginBottom: '20px'}}>
              <div>
                <p style={{fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Predictions</p>
                <p style={{fontWeight: '700'}}>{p.predictions?.length || 0}</p>
              </div>
              <div>
                <p style={{fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase'}}>Gender</p>
                <p style={{fontWeight: '700'}}>{p.gender || 'Not set'}</p>
              </div>
            </div>

            <button onClick={() => setSelectedPatient(p)} style={{
              width: '100%', padding: '12px', backgroundColor: 'transparent', 
              border: '2px solid var(--primary)', color: 'var(--primary)', 
              borderRadius: '12px', fontWeight: '700', display: 'flex', 
              alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer'
            }} className="btn-hover">
              Full Health Record <ChevronRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorPatients;
