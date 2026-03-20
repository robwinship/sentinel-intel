export default function Severity({ s }) {
  return <span className={`sev sev-${s}`}>{s}</span>;
}
