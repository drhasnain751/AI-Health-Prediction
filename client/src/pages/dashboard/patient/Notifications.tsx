import React, { useEffect, useState } from 'react';
import { Bell, Check, Trash2, MailOpen, Activity, AlertCircle } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([
    { id: 1, title: 'Welcome to HealthAI', message: 'Your health journey starts here. Explore our AI prediction tools.', read: false, createdAt: new Date() },
    { id: 2, title: 'Profile Updated', message: 'Your patient profile has been successfully updated.', read: true, createdAt: new Date(Date.now() - 86400000) }
  ]);

  const markRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotif = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="animate-fade-in">
      <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px'}}>
        <div>
          <h1 style={{fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px'}}>Notifications</h1>
          <p style={{color: 'var(--text-muted)'}}>Stay updated with your latest health reports and system alerts.</p>
        </div>
        <button onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))} style={{color: 'var(--primary)', fontWeight: '700', backgroundColor: 'transparent', cursor: 'pointer'}}>Mark all as read</button>
      </header>

      <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
        {notifications.length === 0 ? (
          <div className="glass-card" style={{padding: '60px', borderRadius: '32px', textAlign: 'center'}}>
            <Bell size={64} style={{marginBottom: '20px', opacity: 0.2}} />
            <h3>All Caught Up!</h3>
            <p style={{color: 'var(--text-muted)'}}>No new notifications at the moment.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="glass-card" style={{
              padding: '20px 30px', borderRadius: '24px', position: 'relative',
              backgroundColor: n.read ? 'white' : '#f0f9ff',
              borderLeft: n.read ? '1px solid var(--border)' : '4px solid var(--primary)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div style={{display: 'flex', gap: '20px', alignItems: 'center'}}>
                <div style={{width: '40px', height: '40px', borderRadius: '50%', backgroundColor: n.read ? '#f1f5f9' : '#dbefe3', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {n.read ? <MailOpen size={18} color="#64748b" /> : <Bell size={18} color="var(--primary)" />}
                </div>
                <div>
                  <h4 style={{fontWeight: '800', marginBottom: '4px'}}>{n.title}</h4>
                  <p style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>{n.message}</p>
                  <span style={{fontSize: '0.75rem', color: '#94a3b8', marginTop: '8px', display: 'block'}}>
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <div style={{display: 'flex', gap: '10px'}}>
                {!n.read && (
                  <button onClick={() => markRead(n.id)} style={{padding: '8px', color: 'var(--primary)', backgroundColor: 'transparent'}} title="Mark as read">
                    <Check size={20} />
                  </button>
                )}
                <button onClick={() => deleteNotif(n.id)} style={{padding: '8px', color: 'var(--text-muted)', backgroundColor: 'transparent'}} title="Delete">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
