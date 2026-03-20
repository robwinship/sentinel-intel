import { useState, useEffect } from 'react';
import Severity from '../components/Severity.jsx';

const OPTS = [
  { id: 'hourly',   lbl: 'Every hour' },
  { id: 'every2h',  lbl: 'Every 2 hours' },
  { id: 'every4h',  lbl: 'Every 4 hours' },
  { id: 'every6h',  lbl: 'Every 6 hours' },
  { id: 'every12h', lbl: 'Every 12 hours' },
  { id: 'daily',    lbl: 'Once per day' },
  { id: 'custom',   lbl: 'Custom (times per day)' },
];

const HRS = { hourly: 1, every2h: 2, every4h: 4, every6h: 6, every12h: 12, daily: 24 };

export default function Schedule({ onScan, scanState }) {
  const [mode,      setMode]     = useState('every4h');
  const [tpd,       setTpd]      = useState(4);
  const [alertSev,  setAlertSev] = useState('HIGH');
  const [email,     setEmail]    = useState('');
  const [emailOn,   setEmailOn]  = useState(false);
  const [saveMsg,   setSaveMsg]  = useState('');

  // Load persisted email settings from localStorage on mount
  useEffect(() => {
    setEmail(localStorage.getItem('digestEmail') || '');
    setEmailOn(localStorage.getItem('digestEnabled') === 'true');
  }, []);

  const saveEmailSettings = () => {
    localStorage.setItem('digestEmail',   email);
    localStorage.setItem('digestEnabled', emailOn ? 'true' : 'false');
    setSaveMsg('Saved');
    setTimeout(() => setSaveMsg(''), 2000);
  };

  const intervalHrs = mode === 'custom' ? (24 / (tpd || 1)) : (HRS[mode] || 4);
  const next = new Date(Date.now() + intervalHrs * 3600 * 1000)
    .toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' });

  return (
    <div>
      <div className="sec-hdr">
        <div>
          <div className="sec-title">Scan Schedule</div>
          <div className="sec-sub">Configure automated scan cadence and email digest</div>
        </div>
      </div>

      <div className="g2">
        {/* Left column */}
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-hdr"><div className="card-title">Scan Frequency</div></div>
            {OPTS.map(o => (
              <div key={o.id} className="sch-opt" onClick={() => setMode(o.id)}>
                <div className={`radio ${mode === o.id ? 'on' : ''}`}>
                  {mode === o.id && <div className="radio-dot" />}
                </div>
                <span style={{ fontSize: 13 }}>{o.lbl}</span>
                {o.id === 'custom' && mode === 'custom' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 8 }}
                       onClick={e => e.stopPropagation()}>
                    <input
                      type="number"
                      className="num-inp"
                      min={1} max={24}
                      value={tpd}
                      onChange={e => setTpd(parseInt(e.target.value) || 1)}
                    />
                    <span style={{ fontSize: 12, color: 'var(--text2)' }}>times/day</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="card">
            <div className="card-hdr"><div className="card-title">Alert Thresholds</div></div>
            <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12 }}>Notify when severity reaches:</div>
            {['CRITICAL', 'HIGH', 'MODERATE', 'LOW'].map(s => (
              <div key={s} className="sch-opt" onClick={() => setAlertSev(s)}>
                <div className={`radio ${alertSev === s ? 'on' : ''}`}>
                  {alertSev === s && <div className="radio-dot" />}
                </div>
                <Severity s={s} />
                <span style={{ fontSize: 12, marginLeft: 6, color: 'var(--text2)' }}>and above</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-hdr"><div className="card-title">Schedule Status</div></div>
            {[['MODE', mode.toUpperCase()], ['NEXT SCAN', next], ['ALERT AT', null]].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text3)' }}>{l}</span>
                {l === 'ALERT AT'
                  ? <Severity s={alertSev} />
                  : <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)' }}>{v}</span>
                }
              </div>
            ))}
            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 12 }}
              onClick={onScan}
              disabled={scanState === 'running'}
            >
              {scanState === 'running' ? '⟳ Scanning…' : '▶ Run Scan Now'}
            </button>
          </div>

          <div className="card">
            <div className="card-hdr"><div className="card-title">Email Digest</div></div>
            <div style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12 }}>
              Send an executive briefing email after each scan.
              Configure EmailJS credentials in{' '}
              <span style={{ color: 'var(--accent)', cursor: 'pointer' }}>Settings</span>.
            </div>
            <label className="settings-label">Recipient Email</label>
            <input
              type="email"
              className="settings-input"
              placeholder="executive@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <div className="sch-opt" style={{ marginBottom: 12 }} onClick={() => setEmailOn(o => !o)}>
              <div className={`tog ${emailOn ? 'on' : 'off'}`}>
                <div className="tog-thumb" style={{ transform: emailOn ? 'translateX(16px)' : 'none' }} />
              </div>
              <span style={{ fontSize: 13 }}>Enable email digest after each scan</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button className="btn btn-secondary btn-sm" onClick={saveEmailSettings}>
                Save
              </button>
              {saveMsg && (
                <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--green)' }}>
                  ✓ {saveMsg}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
