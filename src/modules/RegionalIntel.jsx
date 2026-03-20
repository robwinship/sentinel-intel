import { useState } from 'react';
import { REGIONS, CATS } from '../data/seeds.js';
import EvCard from '../components/EvCard.jsx';

const REGION_GROUPS = ['Regional', 'Provincial', 'National', 'International'];
const SEVERITIES    = ['All', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'];

export default function RegionalIntel({ events }) {
  const [reg, setReg] = useState('All');
  const [cat, setCat] = useState('All');
  const [sev, setSev] = useState('All');

  const filtered = events.filter(e =>
    (reg === 'All' || e.region === reg) &&
    (cat === 'All' || e.cat    === cat) &&
    (sev === 'All' || e.sev    === sev)
  );

  const groups = Object.fromEntries(REGION_GROUPS.map(g => [g, []]));
  filtered.forEach(e => { if (groups[e.region]) groups[e.region].push(e); });

  return (
    <div>
      <div className="sec-hdr">
        <div>
          <div className="sec-title">Regional Intelligence</div>
          <div className="sec-sub">Events grouped by geographic scope</div>
        </div>
      </div>

      <div className="filter-bar">
        <span className="filter-lbl">Region</span>
        <select className="sel" value={reg} onChange={e => setReg(e.target.value)}>
          {REGIONS.map(r => <option key={r}>{r}</option>)}
        </select>
        <span className="filter-lbl" style={{ marginLeft: 8 }}>Category</span>
        <select className="sel" value={cat} onChange={e => setCat(e.target.value)}>
          {CATS.map(c => <option key={c}>{c}</option>)}
        </select>
        <span className="filter-lbl" style={{ marginLeft: 8 }}>Severity</span>
        <select className="sel" value={sev} onChange={e => setSev(e.target.value)}>
          {SEVERITIES.map(s => <option key={s}>{s}</option>)}
        </select>
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text3)' }}>
          {filtered.length} events
        </span>
      </div>

      {REGION_GROUPS.map(grp => (
        (reg === 'All' || reg === grp) && (
          <div key={grp} style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ fontFamily: 'var(--display)', fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                {grp}
              </div>
              <span className="tag">{groups[grp].length} event{groups[grp].length !== 1 ? 's' : ''}</span>
            </div>
            {groups[grp].length === 0
              ? <div className="empty">No events</div>
              : groups[grp].map(e => <EvCard key={e.id} ev={e} />)
            }
          </div>
        )
      ))}
    </div>
  );
}
