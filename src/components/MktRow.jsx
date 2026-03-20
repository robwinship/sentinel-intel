export default function MktRow({ item }) {
  const up  = item.pct >= 0;
  const vix = item.sym === 'VIX' && item.val > 20;
  const cls = vix ? 'fl' : up ? 'up' : 'dn';

  const fmtVal = item.sym === 'USD/CAD'
    ? item.val.toFixed(4)
    : item.val.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="mkt-row">
      <div>
        <div className="mkt-sym">{item.sym}</div>
        {item.type && <div className="mkt-type">{item.type}</div>}
      </div>
      <div style={{ textAlign: 'right' }}>
        <div className="mkt-val">{fmtVal}</div>
        <div className={`mkt-chg ${cls}`}>
          {up ? '+' : ''}{item.pct.toFixed(2)}%
        </div>
      </div>
    </div>
  );
}
