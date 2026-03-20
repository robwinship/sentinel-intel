import { useState } from 'react';
import { SOURCES_INIT } from '../data/seeds.js';
import Severity from './Severity.jsx';

function fmtDt(iso) {
  return new Date(iso).toLocaleString('en-CA', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

const IMPACT_FIELDS = [
  ['Operational Impact', 'op'],
  ['Cyber Impact',       'cyber'],
  ['Travel Impact',      'travel'],
  ['Business Continuity','bcp'],
];

export default function EvCard({ ev, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const src = SOURCES_INIT.find(s => s.name === ev.source);

  return (
    <div className={`ev ${open ? 'open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="ev-hdr">
        <div className="ev-title">{ev.headline}</div>
        <Severity s={ev.sev} />
      </div>

      <div className="ev-meta">
        <span className="ev-tag">{ev.region}</span>
        <span className="ev-tag">{ev.cat}</span>
        <span className="ev-tag">{ev.source}</span>
        <span>{fmtDt(ev.dt)}</span>
        {ev.developing && <span className="dev-tag">● DEVELOPING</span>}
      </div>

      {open && (
        <div onClick={e => e.stopPropagation()}>
          <p className="ev-body">{ev.synopsis}</p>

          <div className="ev-grid">
            {IMPACT_FIELDS.map(([label, key]) => (
              <div className="ev-det" key={key}>
                <div className="ev-det-lbl">{label}</div>
                <div className="ev-det-val">{ev[key]}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
            <a href={ev.url} target="_blank" rel="noreferrer" className="ev-link">
              ↗ View Source ({ev.sourceType})
            </a>
            {src && (
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)' }}>
                Credibility: {src.cred}/100
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
