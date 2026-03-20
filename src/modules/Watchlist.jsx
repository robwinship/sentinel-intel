import { useState } from 'react';

const TYPES = ['Region', 'Company', 'Ticker', 'Keyword', 'Topic'];

const DEFAULTS = [
  { id: 1, type: 'Region',  val: 'Ontario' },
  { id: 2, type: 'Ticker',  val: 'SHOP.TO' },
  { id: 3, type: 'Keyword', val: 'Ransomware' },
  { id: 4, type: 'Topic',   val: 'Border Security' },
];

export default function Watchlist() {
  const [list, setList] = useState(DEFAULTS);
  const [type, setType] = useState('Region');
  const [val,  setVal]  = useState('');

  const add = () => {
    if (!val.trim()) return;
    setList(l => [...l, { id: Date.now(), type, val: val.trim() }]);
    setVal('');
  };

  const remove = id => setList(l => l.filter(i => i.id !== id));

  const grouped = Object.fromEntries(TYPES.map(t => [t, list.filter(i => i.type === t)]));

  return (
    <div>
      <div className="sec-hdr">
        <div>
          <div className="sec-title">Watchlists</div>
          <div className="sec-sub">Regions, companies, tickers, keywords, and topics</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-hdr"><div className="card-title">Add to Watchlist</div></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <select className="sel" value={type} onChange={e => setType(e.target.value)}>
            {TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
          <input
            type="text"
            className="num-inp"
            style={{ width: 200, textAlign: 'left' }}
            placeholder={`Add ${type}…`}
            value={val}
            onChange={e => setVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && add()}
          />
          <button className="btn btn-primary btn-sm" onClick={add}>+ Add</button>
        </div>
      </div>

      {TYPES.map(t => (
        <div key={t} style={{ marginBottom: 20 }}>
          <div style={{
            fontFamily: 'var(--display)', fontSize: 12, fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--text2)', marginBottom: 8,
          }}>
            {t}s ({grouped[t].length})
          </div>
          {grouped[t].length === 0
            ? <div style={{ color: 'var(--text3)', fontSize: 12, fontFamily: 'var(--mono)', padding: '6px 0' }}>None added</div>
            : grouped[t].map(i => (
              <div className="watch-item" key={i.id}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{i.val}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)' }}>{i.type}</div>
                </div>
                <button className="rm-btn" onClick={() => remove(i.id)}>✕</button>
              </div>
            ))
          }
        </div>
      ))}
    </div>
  );
}
