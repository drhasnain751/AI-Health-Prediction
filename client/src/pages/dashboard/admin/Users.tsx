import React, { useEffect, useState } from 'react';
import { Search, User, Mail, Shield, Trash2, Edit2, Filter, MoreVertical } from 'lucide-react';
import api from '../../lib/api';

const AdminUsers = () => {
  const [data, setData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/api/admin/stats');
        setData(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const allUsers = data?.recentUsers || [];
  const filteredUsers = allUsers.filter((u: any) => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const impersonate = async (userId: string) => {
    try {
      const { data } = await api.get(`/api/admin/impersonate/${userId}`);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.location.href = data.user.role === 'DOCTOR' ? '/doctor' : '/patient';
    } catch (err) {
      console.error(err);
      alert('Failed to login as user');
    }
  };

  return (
    <div className="animate-fade-in">
      <header style={{marginBottom: '40px'}}>
        <h1 style={{fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px'}}>User Administration</h1>
        <p style={{color: 'var(--text-muted)'}}>Monitor and manage all system users, account types, and accessibility permissions.</p>
      </header>

      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px', flexWrap: 'wrap', gap: '20px'}}>
        <div style={{position: 'relative', width: '350px'}}>
          <Search style={{position: 'absolute', left: '15px', top: '12px', color: 'var(--text-muted)'}} size={20} />
          <input 
            type="text" 
            placeholder="Search by name, email, or role..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{padding: '12px 15px 12px 45px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none', width: '100%'}}
          />
        </div>
        <div style={{display: 'flex', gap: '15px'}}>
          <button style={{padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--border)', backgroundColor: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600'}}>
             <Filter size={18} /> Role: All
          </button>
        </div>
      </div>

      <div className="glass-card" style={{borderRadius: '24px', overflowX: 'auto'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '900px'}}>
          <thead style={{backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border)'}}>
            <tr>
              <th style={{padding: '20px', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.85rem'}}>User Information</th>
              <th style={{padding: '20px', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.85rem'}}>Access Role</th>
              <th style={{padding: '20px', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.85rem'}}>Account Status</th>
              <th style={{padding: '20px', color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.85rem'}}>Management</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u: any) => (
              <tr key={u.id} style={{borderBottom: '1px solid var(--border)'}}>
                <td style={{padding: '20px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                    <div style={{width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <User size={20} />
                    </div>
                    <div>
                      <h4 style={{fontWeight: '700'}}>{u.name}</h4>
                      <p style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>{u.email}</p>
                    </div>
                  </div>
                </td>
                <td style={{padding: '20px'}}>
                  <span style={{
                    padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '800', 
                    backgroundColor: u.role === 'ADMIN' ? 'var(--text-main)' : (u.role === 'DOCTOR' ? 'var(--secondary)' : 'var(--primary)'),
                    color: 'white'
                  }}>
                    {u.role}
                  </span>
                </td>
                <td style={{padding: '20px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <div style={{width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)'}}></div>
                    <span style={{fontSize: '0.9rem', fontWeight: '600'}}>Active</span>
                  </div>
                </td>
                <td style={{padding: '20px'}}>
                  <div style={{display: 'flex', gap: '10px'}}>
                    {u.role !== 'ADMIN' && (
                      <button 
                         onClick={() => impersonate(u.id)}
                         title="Login As User"
                         style={{padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--primary)', backgroundColor: 'var(--primary)', color: 'white', fontSize: '0.8rem', fontWeight: 'bold'}} className="btn-hover">
                        Login As
                      </button>
                    )}
                    <button style={{padding: '8px', borderRadius: '8px', border: '1px solid var(--error)', backgroundColor: 'white', color: 'var(--error)'}} className="btn-hover">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
