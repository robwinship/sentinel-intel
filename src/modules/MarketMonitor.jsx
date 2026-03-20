import { MARKET, TICKERS } from '../data/seeds.js';
import MktRow from '../components/MktRow.jsx';

export default function MarketMonitor() {
  const vix = MARKET.find(m => m.sym === 'VIX');

  return (
    <div>
      <div className="sec-hdr">
        <div>
          <div className="sec-title">Market Monitor</div>
          <div className="sec-sub">Key financial indicators and volatility signals</div>
        </div>
      </div>

      <div className="g2" style={{ marginBottom: 16 }}>
        <div className="card card-accent">
          <div className="card-hdr"><div className="card-title">Major Indices</div></div>
          {MARKET.filter(m => m.type === 'Index').map(m => <MktRow key={m.sym} item={m} />)}
        </div>
        <div className="card">
          <div className="card-hdr"><div className="card-title">Volatility &amp; Bonds</div></div>
          {MARKET.filter(m => m.type === 'Volatility' || m.type === 'Bond').map(m => <MktRow key={m.sym} item={m} />)}
          <hr className="divider" />
          <div className="card-title" style={{ marginBottom: 8 }}>FX</div>
          {MARKET.filter(m => m.type === 'FX').map(m => <MktRow key={m.sym} item={m} />)}
        </div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-hdr"><div className="card-title">Commodities</div></div>
          {MARKET.filter(m => m.type === 'Commodity').map(m => <MktRow key={m.sym} item={m} />)}
        </div>
        <div className="card">
          <div className="card-hdr"><div className="card-title">Watchlist Tickers</div></div>
          {TICKERS.map(m => <MktRow key={m.sym} item={m} />)}
        </div>
      </div>

      {vix && (
        <div className="card" style={{ marginTop: 16, borderColor: 'rgba(255,149,0,.2)' }}>
          <div className="card-hdr">
            <div className="card-title" style={{ color: 'var(--orange)' }}>⚠ Market Risk Signal</div>
            <span className="sev sev-HIGH">HIGH</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>
            VIX at <strong style={{ color: 'var(--orange)' }}>{vix.val.toFixed(2)}</strong> ({vix.pct >= 0 ? '+' : ''}{vix.pct.toFixed(2)}%) indicates elevated market anxiety.
            Combined with current security events, executives should anticipate potential liquidity and operational disruptions.
          </p>
        </div>
      )}
    </div>
  );
}
