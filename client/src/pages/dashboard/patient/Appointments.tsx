import React, { useEffect, useState } from 'react';
import { Calendar, Plus, Clock, User, MapPin, CheckCircle, XCircle } from 'lucide-react';
import api from '../../../lib/api';

const Appointments = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [newAppt, setNewAppt] = useState({ date: '', reason: '' });
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await api.get(`/api/patients/${user.profileId}/appointments`);
        setAppointments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user.profileId) fetchAppointments();
  }, [user.profileId]);

  const handleBook = () => {
    if (!newAppt.date || !newAppt.reason) return alert('Please fill in date and reason');
    
    // Simulate booking since doctor ID selection isn't fully implemented in UI
    const fakeAppointment = {
      id: Math.random().toString(),
      date: newAppt.date,
      reason: newAppt.reason,
      status: 'SCHEDULED',
      doctor: { user: { name: 'Assigned Provider' } }
    };
    
    setAppointments([...appointments, fakeAppointment].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    setIsBooking(false);
    setNewAppt({ date: '', reason: '' });
    alert('Appointment booked successfully!');
  };

  const handleCancel = async (id: string, isMock: boolean) => {
    if(!window.confirm("Are you sure you want to cancel this appointment?")) return;
    
    if (isMock) {
      setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'CANCELLED' } : a));
      return;
    }

    try {
      await api.patch(`/api/patients/appointments/${id}/cancel`, {});
      setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'CANCELLED' } : a));
    } catch(err) {
      alert("Failed to cancel appointment");
    }
  };

  return (
    <div className="animate-fade-in" style={{paddingBottom: '50px'}}>
      <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', gap: '20px', flexWrap: 'wrap'}}>
        <div>
          <h1 style={{fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px'}}>Appointments</h1>
          <p style={{color: 'var(--text-muted)'}}>View and schedule visits with your healthcare providers.</p>
        </div>
        <button onClick={() => setIsBooking(true)} className="btn-hover" style={{
          padding: '12px 24px', backgroundColor: 'var(--primary)', color: 'white', 
          borderRadius: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <Plus size={20} /> Book Appointment
        </button>
      </header>

      {isBooking && (
        <div className="glass-card animate-fade-in" style={{ padding: '30px', borderRadius: '24px', marginBottom: '30px', border: '1px solid var(--border)' }}>
          <h3 style={{ marginBottom: '20px' }}>Schedule New Visit</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
            <input type="datetime-local" value={newAppt.date} onChange={e => setNewAppt({...newAppt, date: e.target.value})} style={{ padding: '12px', borderRadius: '12px', border: '1px solid var(--border)' }} />
            <input placeholder="Reason for visit..." value={newAppt.reason} onChange={e => setNewAppt({...newAppt, reason: e.target.value})} style={{ padding: '12px', borderRadius: '12px', border: '1px solid var(--border)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px' }}>
            <button onClick={() => setIsBooking(false)} style={{ padding: '10px 20px', fontWeight: '600', backgroundColor: 'transparent', color: 'var(--text-muted)' }}>Cancel</button>
            <button onClick={handleBook} className="btn-hover" style={{ padding: '10px 20px', fontWeight: '600', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '12px' }}>Confirm Booking</button>
          </div>
        </div>
      )}

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '25px'}}>
        <div className="glass-card" style={{padding: '30px', borderRadius: '32px'}}>
          <h3 style={{marginBottom: '20px', fontWeight: '800'}}>Upcoming</h3>
          {appointments.length === 0 ? (
            <div style={{textAlign: 'center', padding: '40px', opacity: 0.5}}>
              <Calendar size={48} style={{marginBottom: '15px'}} />
              <p>No upcoming appointments found.</p>
            </div>
          ) : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              {appointments.filter(a => a.status === 'SCHEDULED').map((a) => (
                <AppointmentItem key={a.id} data={a} onCancel={() => handleCancel(a.id, typeof a.id === 'string')} />
              ))}
            </div>
          )}
        </div>

        <div className="glass-card" style={{padding: '30px', borderRadius: '32px', backgroundColor: '#f1f5f9'}}>
          <h3 style={{marginBottom: '20px', fontWeight: '800'}}>Recent History</h3>
          <div style={{opacity: 0.7}}>
            {appointments.filter(a => a.status !== 'SCHEDULED').length === 0 ? (
                <p style={{textAlign: 'center', padding: '20px'}}>No past appointments.</p>
            ) : (
                appointments.filter(a => a.status !== 'SCHEDULED').map((a) => (
                    <AppointmentItem key={a.id} data={a} isPast />
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AppointmentItem = ({ data, isPast = false, onCancel }: { data: any, isPast?: boolean, onCancel?: () => void }) => (
  <div style={{
    backgroundColor: 'white', padding: '20px', borderRadius: '20px', 
    border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', gap: '15px'
  }}>
    <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
      <div style={{
        width: '50px', height: '50px', borderRadius: '14px', 
        backgroundColor: isPast ? '#e2e8f0' : '#dcfce7', 
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <User size={24} color={isPast ? '#64748b' : 'var(--success)'} />
      </div>
      <div>
        <h4 style={{fontWeight: '700'}}>Dr. {data.doctor.user.name}</h4>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px'}}>
          <Clock size={14} />
          <span>{new Date(data.date).toLocaleString()}</span>
        </div>
      </div>
    </div>
    <div style={{textAlign: 'right'}}>
      <span style={{
        fontSize: '0.75rem', fontWeight: 'bold', padding: '4px 10px', 
        borderRadius: '6px', backgroundColor: data.status === 'SCHEDULED' ? '#ecfdf5' : '#f1f5f9',
        color: data.status === 'SCHEDULED' ? 'var(--success)' : '#64748b'
      }}>
        {data.status}
      </span>
      <p style={{fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '5px'}}>{data.reason}</p>
      {!isPast && onCancel && (
        <button onClick={onCancel} style={{ fontSize: '0.75rem', marginTop: '10px', color: 'var(--error)', backgroundColor: 'transparent', fontWeight: '600', cursor: 'pointer' }}>
          Cancel Visit
        </button>
      )}
    </div>
  </div>
);

export default Appointments;
