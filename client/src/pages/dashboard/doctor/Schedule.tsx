import React, { useEffect, useState } from 'react';
import { Calendar, Clock, User, Phone, Video, CalendarCheck } from 'lucide-react';
import api from '../../../lib/api';

const DoctorSchedule = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    // We can reuse the appointment fetching endpoint we created for the patient, 
    // it handles PATIENT/DOCTOR role logic inherently via the auth middleware.
    const fetchSchedule = async () => {
      try {
        const { data } = await api.get(`/api/patients/${user.profileId}/appointments`);
        setAppointments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user.profileId) fetchSchedule();
  }, [user.profileId]);

  return (
    <div className="animate-fade-in" style={{paddingBottom: '50px'}}>
      <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px'}}>
        <div>
          <h1 style={{fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px'}}>My Schedule</h1>
          <p style={{color: 'var(--text-muted)'}}>Manage your daily appointments and consultations.</p>
        </div>
      </header>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px'}}>
        {loading ? (
          <p>Loading schedule...</p>
        ) : appointments.filter(a => a.status === 'SCHEDULED').length === 0 ? (
          <div className="glass-card" style={{padding: '50px', textAlign: 'center', gridColumn: '1 / -1', borderRadius: '24px'}}>
            <CalendarCheck size={48} color="var(--primary)" style={{marginBottom: '20px', opacity: 0.5}} />
            <h3>No Appointments Today</h3>
            <p style={{color: 'var(--text-muted)'}}>Enjoy your free time or manage patient records.</p>
          </div>
        ) : (
          appointments.filter(a => a.status === 'SCHEDULED').map((a) => (
            <div key={a.id} className="glass-card" style={{padding: '25px', borderRadius: '24px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                <div style={{display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--primary)', fontWeight: '700'}}>
                  <Clock size={16} />
                  <span>{new Date(a.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <span style={{padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: '#e0f2fe', color: '#0369a1'}}>
                  Upcoming
                </span>
              </div>

              <div style={{display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px'}}>
                <div style={{width: '50px', height: '50px', borderRadius: '12px', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <User size={24} color="var(--text-main)" />
                </div>
                <div>
                  <h3 style={{fontWeight: '700', fontSize: '1.2rem'}}>{a.patient.user.name}</h3>
                  <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Reason: {a.reason}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => alert(`Starting video consultation with ${a.patient.user.name}...

In production, this would launch a WebRTC session.`)} className="btn-hover" style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid var(--primary)', backgroundColor: 'transparent', color: 'var(--primary)', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}>
                  <Video size={16} /> Consult
                </button>
                <button onClick={() => setAppointments(prev => prev.map((apt: any) => apt.id === a.id ? {...apt, status: 'COMPLETED'} : apt))} className="btn-hover" style={{ flex: 1, padding: '10px', borderRadius: '10px', backgroundColor: 'var(--secondary)', color: 'white', fontWeight: '600', cursor: 'pointer', border: 'none' }}>
                  Mark Done
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorSchedule;
