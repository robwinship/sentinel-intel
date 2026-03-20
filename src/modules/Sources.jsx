export default function Sources({ sources, onToggle }) {
  const activeCount = sources.filter(s => s.active).length;

  return (
    <div>
      <div className="sec-hdr">
        <div>
          <div className="sec-title">Source Configuration</div>
          <div className="sec-sub">Manage monitored intelligence sources</div>
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text3)' }}>
          {activeCount}/{sources.length} active
        </span>
      </div>

      <div className="card">
        <table className="src-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Type</th>
              <th>Region</th>
              <th>Credibility</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {sources.map(s => (
              <tr key={s.id}>
                <td>
                  <div style={{ fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)', marginTop: 2 }}>{s.url}</div>
                </td>
                <td><span className="src-badge">{s.type}</span></td>
                <td style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>{s.region}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div className="cred-bar">
                      <div style={{
                        height: '100%',
                        background: s.cred > 90 ? 'var(--green)' : s.cred > 75 ? 'var(--yellow)' : 'var(--red)',
                        width: `${s.cred}%`,
                        borderRadius: 3,
                      }} />
                    </div>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: 10 }}>{s.cred}</span>
                  </div>
                </td>
                <td>
                  <div className={`tog ${s.active ? 'on' : 'off'}`} onClick={() => onToggle(s.id)}>
                    <div className="tog-thumb" style={{ transform: s.active ? 'translateX(16px)' : 'none' }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
