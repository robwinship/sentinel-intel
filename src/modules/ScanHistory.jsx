function fmtDt(iso) {
  return new Date(iso).toLocaleString('en-CA', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export default function ScanHistory({ history }) {
  return (
    <div>
      <div className="sec-hdr">
        <div>
          <div className="sec-title">Scan History</div>
          <div className="sec-sub">Log of all completed intelligence scans</div>
        </div>
        {history.length > 0 && (
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text3)' }}>
            {history.length} scan{history.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="card">
        {history.length === 0
          ? <div className="empty">No scans yet. Run your first scan from the Dashboard.</div>
          : history.map((h, i) => (
            <div className="scan-row" key={i}>
              <div style={{
                width: 7, height: 7, borderRadius: '50%',
                background: h.ok ? 'var(--green)' : 'var(--red)',
                flexShrink: 0,
              }} />
              <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text3)', width: 150 }}>
                {fmtDt(h.time)}
              </div>
              <div style={{ flex: 1 }}>
                {h.ok ? `Completed — ${h.events} events found` : 'Failed — check sources'}
              </div>
              {h.emailSent && (
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--green)' }}>✉ digest sent</span>
              )}
              <span className="tag">{h.srcs} sources</span>
              <span className="tag">{h.dur}s</span>
            </div>
          ))
        }
      </div>
    </div>
  );
}
