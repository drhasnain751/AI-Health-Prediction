import React, { useState } from 'react';
import { Activity, Search, AlertCircle, ChevronRight, CheckCircle2, RefreshCw } from 'lucide-react';
import api from '../../../lib/api';

const PatientPredict = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const symptomsList = [
    'itching', 'skin_rash', 'fatigue', 'cough', 'high_fever', 'headache', 'nausea', 
    'loss_of_appetite', 'vomiting', 'joint_pain', 'stomach_pain', 'breathlessness', 
    'sweating', 'chest_pain', 'diarrhoea', 'chills', 'muscle_pain', 'malaise', 
    'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 
    'congestion', 'fast_heart_rate', 'dizziness', 'abdominal_pain', 'mild_fever'
  ];

  const filteredSymptoms = symptomsList.filter(s => 
    s.replace(/_/g, ' ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSymptom = (s: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(s) ? prev.filter(i => i !== s) : [...prev, s]
    );
  };

  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) return;
    setLoading(true);
    try {
      const { data } = await api.post('/api/predict', 
        { symptoms: selectedSymptoms }
      );
      setPrediction(data);
    } catch (err) {
      console.error(err);
      alert("Failed to get prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <header style={{marginBottom: '40px'}}>
        <h1 style={{fontSize: '2.5rem', fontWeight: '800', marginBottom: '10px'}}>AI Health Analysis</h1>
        <p style={{color: 'var(--text-muted)'}}>Select your symptoms and let our AI provide a preliminary assessment.</p>
      </header>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
        {/* Selection Area */}
        <div className="glass-card" style={{padding: '30px', borderRadius: '24px'}}>
          <div style={{position: 'relative', marginBottom: '20px'}}>
            <Search style={{position: 'absolute', left: '15px', top: '12px', color: 'var(--text-muted)'}} size={18} />
            <input 
              type="text" 
              placeholder="Search symptoms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{width: '100%', padding: '12px 12px 12px 45px', borderRadius: '12px', border: '1px solid var(--border)', outline: 'none'}}
            />
          </div>

          <div style={{maxHeight: '400px', overflowY: 'auto', paddingRight: '10px', display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
            {filteredSymptoms.map((s) => (
              <button
                key={s}
                onClick={() => toggleSymptom(s)}
                style={{
                  padding: '8px 16px', borderRadius: '20px', border: '1px solid var(--border)',
                  backgroundColor: selectedSymptoms.includes(s) ? 'var(--primary)' : 'white',
                  color: selectedSymptoms.includes(s) ? 'white' : 'var(--text-main)',
                  fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s'
                }}
              >
                {s.replace(/_/g, ' ')}
              </button>
            ))}
          </div>

          <button 
            onClick={handlePredict}
            disabled={selectedSymptoms.length === 0 || loading}
            style={{
              width: '100%', marginTop: '30px', padding: '15px', 
              backgroundColor: 'var(--primary)', color: 'white', border: 'none',
              borderRadius: '12px', fontWeight: '700', fontSize: '1rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              opacity: (selectedSymptoms.length === 0 || loading) ? 0.6 : 1, cursor: 'pointer'
            }}
          >
            {loading ? <RefreshCw className="animate-spin" size={20} /> : <Activity size={20} />}
            {loading ? 'Analyzing...' : 'Run Analysis'}
          </button>
        </div>

        {/* Result Area */}
        <div className="glass-card" style={{padding: '30px', borderRadius: '24px', backgroundColor: '#f8fafc'}}>
          {!prediction && !loading && (
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: 0.5}}>
              <AlertCircle size={48} style={{marginBottom: '20px'}} />
              <h3>No Analysis Run Yet</h3>
              <p>Select symptoms on the left to begin.</p>
            </div>
          )}

          {loading && (
            <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
              <div className="animate-spin" style={{marginBottom: '20px'}}><RefreshCw size={48} color="var(--primary)" /></div>
              <h3>Analyzing Symptoms</h3>
              <p>Our AI is processing your input...</p>
            </div>
          )}

          {prediction && !loading && (
            <div className="animate-fade-in">
              <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px'}}>
                <div style={{width: '64px', height: '64px', borderRadius: '16px', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>
                  <CheckCircle2 size={32} />
                </div>
                <div>
                  <h2 style={{fontSize: '1.8rem', fontWeight: '800'}}>{prediction.disease}</h2>
                  <p style={{color: 'var(--success)', fontWeight: '700'}}>{prediction.confidence}% Confidence</p>
                </div>
              </div>

              <div style={{padding: '20px', backgroundColor: 'white', borderRadius: '16px', marginBottom: '20px', borderLeft: '4px solid var(--primary)'}}>
                <h4 style={{marginBottom: '10px', fontWeight: '700'}}>Recommendations</h4>
                <p style={{fontSize: '0.95rem', lineHeight: '1.6'}}>{prediction.recommendations}</p>
              </div>

              <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '16px'}}>
                <h4 style={{marginBottom: '15px', fontWeight: '700'}}>Disclaimer</h4>
                <p style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>
                  This prediction is based on a machine learning model and is for informational purposes only. 
                  It is not a substitute for professional medical advice, diagnosis, or treatment. 
                  Always seek the advice of your physician.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientPredict;
