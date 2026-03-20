import EvCard from '../components/EvCard.jsx';

export default function Alerts({ events }) {
  const hi = events.filter(e => e.sev === 'CRITICAL' || e.sev === 'HIGH');

  return (
    <div>
      <div className="sec-hdr">
        <div>
          <div className="sec-title">Active Alerts</div>
          <div className="sec-sub">High and critical severity events</div>
        </div>
        <span className="sev sev-CRITICAL">{hi.length} Active</span>
      </div>
      {hi.length === 0
        ? <div className="empty">No active alerts</div>
        : hi.map(e => <EvCard key={e.id} ev={e} defaultOpen={e.sev === 'CRITICAL'} />)
      }
    </div>
  );
}
