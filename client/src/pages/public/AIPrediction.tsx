import React, { useState } from 'react';
import { SYMPTOMS } from '../../constants/symptoms';
import { Activity, Search, Check, Brain, ShieldAlert, FileText } from 'lucide-react';
import api from '../../lib/api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AIPrediction = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const filteredSymptoms = SYMPTOMS.filter(s => 
    s.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedSymptoms.includes(s)
  );

  const handlePredict = async () => {
    if (selectedSymptoms.length === 0) return alert("Please select at least one symptom");
    
    setLoading(true);
    try {
      const { data } = await api.post('/api/predict', {
        symptoms: selectedSymptoms
      });
      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Error processing prediction. Ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const chartData = result ? {
    labels: [result.disease, 'Other Factors'],
    datasets: [
      {
        label: 'Risk %',
        data: [result.confidence, 100 - result.confidence],
        backgroundColor: ['var(--primary)', '#e2e8f0'],
        borderRadius: 8,
      },
    ],
  } : null;

  return (
    <div style={{paddingTop: '120px', paddingBottom: '100px'}}>
      <div className="container">
        <div style={{textAlign: 'center', marginBottom: '60px'}}>
          <h1 style={{fontSize: '2.5rem', fontWeight: '800', marginBottom: 'var(--spacing-sm)'}}>AI Disease Prediction</h1>
          <p style={{color: 'var(--text-muted)'}}>Select your symptoms below for an instant AI-powered health assessment.</p>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: result ? '1fr' : '1fr', gap: '40px', maxWidth: '800px', margin: '0 auto'}}>
          {/* Input Section */}
          {!result && (
            <div className="glass-card animate-fade-in" style={{padding: '40px', borderRadius: '24px', boxShadow: 'var(--shadow-lg)'}}>
              <div style={{marginBottom: '30px', position: 'relative'}}>
                <Search style={{position: 'absolute', left: '15px', top: '12px', color: 'var(--text-muted)'}} size={20} />
                <input 
                  type="text" 
                  placeholder="Search symptoms (e.g., fever, headache)..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 12px 12px 45px', 
                    borderRadius: '12px', border: '1px solid var(--border)', 
                    fontSize: '1rem', outline: 'none'
                  }}
                />
              </div>

              <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px', maxHeight: '200px', overflowY: 'auto', padding: '10px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid var(--border)'}}>
                {filteredSymptoms.length > 0 ? filteredSymptoms.map(s => (
                  <button 
                    key={s} 
                    onClick={() => toggleSymptom(s)}
                    className="card-hover"
                    style={{
                      padding: '8px 16px', borderRadius: '99px', 
                      backgroundColor: 'white', border: '1px solid var(--border)',
                      fontSize: '0.85rem', color: 'var(--text-main)', cursor: 'pointer'
                    }}
                  >
                    + {s.replace(/_/g, ' ')}
                  </button>
                )) : <p style={{color: 'var(--text-muted)', fontSize: '0.9rem'}}>No symptoms found or all selected.</p>}
              </div>

              {selectedSymptoms.length > 0 && (
                <div style={{marginBottom: '30px'}}>
                  <h4 style={{marginBottom: '15px', fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px'}}>Selected Symptoms</h4>
                  <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
                    {selectedSymptoms.map(s => (
                      <div key={s} style={{
                        padding: '8px 16px', borderRadius: '99px', 
                        backgroundColor: 'var(--primary)', color: 'white',
                        fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px'
                      }}>
                        {s.replace(/_/g, ' ')} <Check size={14} onClick={() => toggleSymptom(s)} style={{cursor: 'pointer'}} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button 
                onClick={handlePredict}
                disabled={loading || selectedSymptoms.length === 0}
                className="btn-hover"
                style={{
                  width: '100%', padding: '15px', backgroundColor: 'var(--secondary)',
                  color: 'white', borderRadius: '12px', fontWeight: '700',
                  fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer', border: 'none'
                }}
              >
                {loading ? 'Analyzing...' : <><Brain size={20} /> Analyze with AI</>}
              </button>
            </div>
          )}

          {/* Result Section */}
          {result && (
            <div className="animate-fade-in glass-card" style={{
              padding: '50px', 
              borderRadius: '32px', 
              boxShadow: 'var(--shadow-lg)'
            }}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px'}}>
                <div>
                  <h2 style={{fontSize: '2rem', fontWeight: '800', marginBottom: '10px'}}>Prediction Result</h2>
                  <p style={{color: 'var(--text-muted)'}}>Based on our AI model analysis</p>
                </div>
                <button 
                  onClick={() => setResult(null)} 
                  style={{color: 'var(--primary)', fontWeight: '600', backgroundColor: 'transparent'}}
                >
                  Start Over
                </button>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px'}}>
                <div>
                  <div style={{
                    padding: '30px', backgroundColor: '#eff6ff', 
                    borderRadius: '24px', borderLeft: '6px solid var(--primary)',
                    marginBottom: '30px'
                  }}>
                    <span style={{fontSize: '0.9rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase'}}>Potential Condition</span>
                    <h3 style={{fontSize: '2.5rem', fontWeight: '800', margin: '10px 0'}}>{result.disease}</h3>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <Activity size={18} color="var(--primary)" />
                      <span style={{fontSize: '1.1rem', fontWeight: '600'}}>Confidence: {result.confidence}%</span>
                    </div>
                  </div>

                  <div style={{marginBottom: '30px'}}>
                    <h4 style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', fontWeight: '700'}}>
                      <ShieldAlert size={20} color="var(--secondary)" /> Doctor's Recommendation
                    </h4>
                    <p style={{lineHeight: '1.7', color: 'var(--text-muted)', backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px'}}>
                      {result.recommendations}
                    </p>
                  </div>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  <div style={{height: '250px'}}>
                    {chartData && <Bar 
                      data={chartData} 
                      options={{
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } },
                        scales: { y: { beginAtZero: true, max: 100 } }
                      }} 
                    />}
                  </div>
                  <div style={{marginTop: '30px', padding: '20px', backgroundColor: '#fff7ed', borderRadius: '16px', display: 'flex', gap: '15px'}}>
                    <FileText color="var(--accent)" />
                    <p style={{fontSize: '0.85rem', color: '#92400e'}}>
                      Note: This is an AI simulation. Please consult a qualified doctor for a professional medical diagnosis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIPrediction;
