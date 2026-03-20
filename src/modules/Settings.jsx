import { useState, useEffect } from 'react';
import { generateAISummary } from '../services/ai.js';
import { sendEmailDigest } from '../services/email.js';
import { EVENTS_INIT, MARKET } from '../data/seeds.js';

function Field({ label, hint, type = 'text', placeholder, value, onChange }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <label className="settings-label">{label}</label>
      <input
        className="settings-input"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete="off"
      />
      {hint && <div className="settings-hint">{hint}</div>}
    </div>
  );
}

export default function Settings() {
  const [provider,    setProvider]   = useState('gemini');
  const [geminiKey,   setGeminiKey]  = useState('');
  const [geminiModel, setGeminiModel]= useState('gemini-1.5-flash');
  const [anthropicKey,setAnthropicKey] = useState('');
  const [svcId,       setSvcId]      = useState('');
  const [tplId,       setTplId]      = useState('');
  const [pubKey,      setPubKey]      = useState('');

  const [aiStatus,      setAiStatus]     = useState(null);
  const [aiMsg,         setAiMsg]        = useState('');
  const [emailStatus,   setEmailStatus]  = useState(null);
  const [emailMsg,      setEmailMsg]     = useState('');
  const [saving,        setSaving]       = useState(false);
  const [testing,       setTesting]      = useState(false);
  const [testingEmail,  setTestingEmail] = useState(false);
  const [discovering,   setDiscovering]  = useState(false);
  const [discovered,    setDiscovered]   = useState([]);

  // Load saved values from localStorage on mount
  useEffect(() => {
    setProvider(   localStorage.getItem('aiProvider')      || 'gemini');
    setGeminiKey(  localStorage.getItem('geminiApiKey')    || '');
    setGeminiModel(localStorage.getItem('geminiModel')     || 'gemini-1.5-flash');
    setAnthropicKey(localStorage.getItem('anthropicApiKey')|| '');
    setSvcId(      localStorage.getItem('emailjsServiceId') || '');
    setTplId(      localStorage.getItem('emailjsTemplateId')|| '');
    setPubKey(     localStorage.getItem('emailjsPublicKey') || '');
  }, []);

  const saveAll = () => {
    setSaving(true);
    localStorage.setItem('aiProvider',       provider);
    localStorage.setItem('geminiApiKey',     geminiKey);
    localStorage.setItem('geminiModel',      geminiModel);
    localStorage.setItem('anthropicApiKey',  anthropicKey);
    localStorage.setItem('emailjsServiceId', svcId);
    localStorage.setItem('emailjsTemplateId',tplId);
    localStorage.setItem('emailjsPublicKey', pubKey);
    setTimeout(() => setSaving(false), 800);
  };

  const discoverModels = async () => {
    if (!geminiKey) { setAiStatus('err'); setAiMsg('Enter your API key first.'); return; }
    setDiscovering(true);
    setDiscovered([]);
    setAiStatus(null);
    setAiMsg('');
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${geminiKey}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message || `Error ${res.status}`);
      const generateModels = (data.models || [])
        .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
        .map(m => m.name.replace('models/', ''));
      setDiscovered(generateModels);
      if (generateModels.length === 0) {
        setAiStatus('err');
        setAiMsg('No generateContent models found for this key.');
      } else {
        setAiStatus('ok');
        setAiMsg(`Found ${generateModels.length} compatible model(s). Click one to select it.`);
      }
    } catch (err) {
      setAiStatus('err');
      setAiMsg(err.message);
    }
    setDiscovering(false);
  };

  const testAI = async () => {
    // Persist current form values before testing so generateAISummary reads them
    localStorage.setItem('aiProvider',      provider);
    localStorage.setItem('geminiApiKey',    geminiKey);
    localStorage.setItem('geminiModel',     geminiModel);
    localStorage.setItem('anthropicApiKey', anthropicKey);
    setTesting(true);
    setAiStatus(null);
    setAiMsg('');
    try {
      const text = await generateAISummary(EVENTS_INIT.slice(0, 3), MARKET.slice(0, 3));
      setAiStatus('ok');
      setAiMsg(text ? 'Connection successful — AI response received.' : 'Connected but empty response.');
    } catch (err) {
      setAiStatus('err');
      setAiMsg(err.message);
    }
    setTesting(false);
  };

  const testEmail = async () => {
    const toEmail = localStorage.getItem('digestEmail') || '';
    if (!toEmail) {
      setEmailStatus('err');
      setEmailMsg('No recipient email set. Save an email address in Schedule first.');
      return;
    }
    setTestingEmail(true);
    setEmailStatus(null);
    setEmailMsg('');
    try {
      await sendEmailDigest({
        toEmail,
        events: EVENTS_INIT.slice(0, 3),
        aiText: '[This is a test email from Sentinel Intel.]',
        scanTime: new Date().toISOString(),
      });
      setEmailStatus('ok');
      setEmailMsg(`Test email sent to ${toEmail}`);
    } catch (err) {
      setEmailStatus('err');
      setEmailMsg(err.message);
    }
    setTestingEmail(false);
  };

  return (
    <div>
      <div className="sec-hdr">
        <div>
          <div className="sec-title">Settings</div>
          <div className="sec-sub">API keys and integration credentials — stored locally in your browser</div>
        </div>
        <button className="btn btn-primary btn-sm" onClick={saveAll} disabled={saving}>
          {saving ? '✓ Saved' : 'Save All'}
        </button>
      </div>

      {/* ── AI CONFIGURATION ── */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-hdr">
          <div className="card-title">AI Configuration</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {aiStatus && (
              <span className={`status-badge ${aiStatus}`}>
                {aiStatus === 'ok' ? '✓ Connected' : '✗ Failed'}
              </span>
            )}
            <button className="btn btn-secondary btn-sm" onClick={testAI} disabled={testing}>
              {testing ? 'Testing…' : 'Test Connection'}
            </button>
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label className="settings-label">AI Provider</label>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { id: 'gemini',    label: 'Google Gemini 1.5 Flash (Free)' },
              { id: 'anthropic', label: 'Anthropic Claude'                },
            ].map(opt => (
              <div key={opt.id} className="sch-opt" style={{ margin: 0 }} onClick={() => setProvider(opt.id)}>
                <div className={`radio ${provider === opt.id ? 'on' : ''}`}>
                  {provider === opt.id && <div className="radio-dot" />}
                </div>
                <span style={{ fontSize: 13 }}>{opt.label}</span>
              </div>
            ))}
          </div>
        </div>

        {provider === 'gemini' && (
          <>
            <Field
              label="Gemini API Key"
              type="password"
              placeholder="AIza…"
              value={geminiKey}
              onChange={setGeminiKey}
              hint={
                <>
                  Free at{' '}
                  <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer">
                    aistudio.google.com
                  </a>
                  {' '}— 1,500 free requests/day. No credit card required.
                </>
              }
            />
            <div style={{ marginBottom: 12 }}>
              <label className="settings-label">Gemini Model</label>
              <select
                className="sel"
                style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--r)', fontSize: 13 }}
                value={geminiModel}
                onChange={e => setGeminiModel(e.target.value)}
              >
                <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                <option value="gemini-1.5-flash-8b">gemini-1.5-flash-8b</option>
                <option value="gemini-1.5-pro">gemini-1.5-pro</option>
                <option value="gemini-2.0-flash">gemini-2.0-flash</option>
                <option value="gemini-2.0-flash-lite">gemini-2.0-flash-lite</option>
              </select>
              <div className="settings-hint" style={{ marginTop: 4 }}>
                If Test Connection fails, click <strong>Discover Models</strong> to see what's
                available for your key, then select one from the list.
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={discoverModels}
                disabled={discovering}
              >
                {discovering ? 'Discovering…' : '🔍 Discover Models'}
              </button>
              {discovered.length > 0 && (
                <div style={{ marginTop: 10 }}>
                  <div className="settings-label">Available models — click to select:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                    {discovered.map(m => (
                      <button
                        key={m}
                        className="btn btn-secondary btn-sm"
                        style={{ fontFamily: 'var(--mono)', fontSize: 11, borderColor: m === geminiModel ? 'var(--accent)' : undefined, color: m === geminiModel ? 'var(--accent)' : undefined }}
                        onClick={() => setGeminiModel(m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {provider === 'anthropic' && (
          <Field
            label="Anthropic API Key"
            type="password"
            placeholder="sk-ant-…"
            value={anthropicKey}
            onChange={setAnthropicKey}
            hint={
              <>
                Get a key at{' '}
                <a href="https://console.anthropic.com/" target="_blank" rel="noreferrer">
                  console.anthropic.com
                </a>
                . Requires a paid account.
              </>
            }
          />
        )}

        {aiMsg && (
          <div style={{
            marginTop: 8, fontSize: 12, fontFamily: 'var(--mono)',
            color: aiStatus === 'ok' ? 'var(--green)' : 'var(--red)',
          }}>
            {aiMsg}
          </div>
        )}
      </div>

      {/* ── EMAILJS CONFIGURATION ── */}
      <div className="card">
        <div className="card-hdr">
          <div className="card-title">EmailJS Configuration</div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {emailStatus && (
              <span className={`status-badge ${emailStatus}`}>
                {emailStatus === 'ok' ? '✓ Sent' : '✗ Failed'}
              </span>
            )}
            <button className="btn btn-secondary btn-sm" onClick={testEmail} disabled={testingEmail}>
              {testingEmail ? 'Sending…' : 'Send Test Email'}
            </button>
          </div>
        </div>

        <div className="settings-hint" style={{ marginBottom: 14 }}>
          Sign up free at{' '}
          <a href="https://www.emailjs.com/" target="_blank" rel="noreferrer">emailjs.com</a>
          . Create a service, then a template using the variables below.
          Your template must include:{' '}
          <code style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>
            {'{{to_email}}, {{scan_time}}, {{critical_count}}, {{high_count}}, {{total_events}}, {{ai_summary}}, {{top_events}}'}
          </code>
        </div>

        <Field label="Service ID"   placeholder="service_xxxxxxx" value={svcId}  onChange={setSvcId} />
        <Field label="Template ID"  placeholder="template_xxxxxxx" value={tplId}  onChange={setTplId} />
        <Field label="Public Key"   placeholder="xxxxxxxxxxxxxxxxxxxx" value={pubKey} onChange={setPubKey} type="password" />

        {emailMsg && (
          <div style={{
            marginTop: 8, fontSize: 12, fontFamily: 'var(--mono)',
            color: emailStatus === 'ok' ? 'var(--green)' : 'var(--red)',
          }}>
            {emailMsg}
          </div>
        )}
      </div>

      <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--bg3)', borderRadius: 'var(--r)', border: '1px solid var(--border)' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>
          Security Note
        </div>
        <div style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>
          All credentials are stored only in your browser's <strong>localStorage</strong> — they are never sent to any server other than the respective API endpoints (Google/Anthropic/EmailJS). Do not use this app on shared or public computers.
        </div>
      </div>
    </div>
  );
}
