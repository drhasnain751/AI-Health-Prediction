import React, { useEffect, useState } from 'react';
import { ClipboardList, Plus, Search, Trash2, Clock, AlertCircle } from 'lucide-react';
import api from '../../../lib/api';

const Medications = () => {
  const [meds, setMeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', dosage: '', frequency: '' });
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchMeds = async () => {
      try {
        const { data } = await api.get(`/api/patients/${user.profileId}/medications`);
        setMeds(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user.profileId) fetchMeds();
  }, [user.profileId]);

  const handleAddMedication = async () => {
    if (!newMed.name || !newMed.dosage || !newMed.frequency) return alert("Please fill all fields");
    try {
      const { data } = await api.post('/api/patients/medications', 
        { ...newMed, patientId: user.profileId }
      );
      setMeds([data, ...meds]);
      setIsAdding(false);
      setNewMed({ name: '', dosage: '', frequency: '' });
    } catch (err) {
      console.error(err);
      alert("Failed to add medication.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this medication?")) return;
    try {
      await api.delete(`/api/patients/medications/${id}`);
      setMeds(meds.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete medication.");
    }
  };

  return (
    <div className="animate-fade-in">
      <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px'}}>
        <div>
          <h1 style={{fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px'}}>My Medications</h1>
          <p style={{color: 'var(--text-muted)'}}>Manage your current prescriptions and supplements.</p>
        </div>
        <button className="btn-hover" onClick={() => setIsAdding(true)} style={{
          padding: '12px 24px', backgroundColor: 'var(--primary)', color: 'white', 
          borderRadius: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <Plus size={20} /> Add Medication
        </button>
      </header>

      {isAdding && (
        <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: '24px', marginBottom: '30px', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '20px' }}>New Medication</h3>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <input placeholder="Name (e.g. Lisinopril)" value={newMed.name} onChange={e => setNewMed({...newMed, name: e.target.value})} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--border)' }} />
            <input placeholder="Dosage (e.g. 10mg)" value={newMed.dosage} onChange={e => setNewMed({...newMed, dosage: e.target.value})} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--border)' }} />
            <input placeholder="Frequency (e.g. Daily)" value={newMed.frequency} onChange={e => setNewMed({...newMed, frequency: e.target.value})} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--border)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button onClick={() => setIsAdding(false)} style={{ padding: '10px 20px', backgroundColor: 'transparent', fontWeight: '600', color: 'var(--text-muted)' }}>Cancel</button>
            <button onClick={handleAddMedication} className="btn-hover" style={{ padding: '10px 20px', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '12px', fontWeight: '600' }}>Save</button>
          </div>
        </div>
      )}

      {meds.length === 0 && !loading ? (
        <div className="glass-card" style={{padding: '60px', borderRadius: '32px', textAlign: 'center'}}>
          <ClipboardList size={64} color="var(--primary)" style={{marginBottom: '20px', opacity: 0.3}} />
          <h3 style={{marginBottom: '10px'}}>No Medications Found</h3>
          <p style={{color: 'var(--text-muted)', maxWidth: '400px', margin: '0 auto'}}>
            You don't have any medications listed. Add your first prescription using the button above.
          </p>
        </div>
      ) : (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px'}}>
          {meds.map((m) => (
            <div key={m.id} className="glass-card card-hover" style={{padding: '25px', borderRadius: '24px', border: '1px solid var(--border)'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                <h3 style={{fontWeight: '800', fontSize: '1.2rem'}}>{m.name}</h3>
                <button onClick={() => handleDelete(m.id)} style={{color: 'var(--error)', backgroundColor: 'transparent', cursor: 'pointer'}}><Trash2 size={18} /></button>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
                  <AlertCircle size={16} color="var(--primary)" />
                  <span><strong>Dosage:</strong> {m.dosage}</span>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.9rem'}}>
                  <Clock size={16} color="var(--secondary)" />
                  <span><strong>Frequency:</strong> {m.frequency}</span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Demo/Example Med if empty for wow factor */}
          {meds.length === 0 && (
            <div className="glass-card" style={{padding: '25px', borderRadius: '24px', opacity: 0.5, border: '1px dashed var(--border)'}}>
              <h3 style={{fontWeight: '800', fontSize: '1.2rem'}}>Example: Aspirin</h3>
              <p style={{fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '5px'}}>Add your real medications to see them here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Medications;
