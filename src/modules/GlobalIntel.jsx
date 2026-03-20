import EvCard from '../components/EvCard.jsx';

export default function GlobalIntel({ events }) {
  const intl = events.filter(e => e.region === 'International');

  return (
    <div>
      <div className="sec-hdr">
        <div>
          <div className="sec-title">Global Intelligence</div>
          <div className="sec-sub">International events and emerging global threats</div>
        </div>
      </div>
      {intl.length === 0
        ? <div className="empty">No international events in current scan</div>
        : intl.map(e => <EvCard key={e.id} ev={e} />)
      }
    </div>
  );
}
