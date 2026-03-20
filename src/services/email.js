import emailjs from '@emailjs/browser';
import { SEV } from '../data/seeds.js';

/**
 * Sends an executive scan digest via EmailJS.
 *
 * Required EmailJS template variables:
 *   {{to_email}}       — recipient address
 *   {{scan_time}}      — human-readable scan timestamp
 *   {{critical_count}} — number of CRITICAL events
 *   {{high_count}}     — number of HIGH events
 *   {{total_events}}   — total event count
 *   {{ai_summary}}     — AI-generated brief (or placeholder)
 *   {{top_events}}     — top 5 events as plain text
 *
 * Configure your EmailJS credentials in Settings → Email Configuration.
 *
 * @param {object} params
 * @param {string} params.toEmail
 * @param {Array}  params.events
 * @param {string} params.aiText
 * @param {string} params.scanTime  ISO timestamp
 */
export async function sendEmailDigest({ toEmail, events, aiText, scanTime }) {
  const serviceId  = localStorage.getItem('emailjsServiceId')  || '';
  const templateId = localStorage.getItem('emailjsTemplateId') || '';
  const publicKey  = localStorage.getItem('emailjsPublicKey')  || '';

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      'EmailJS is not fully configured. Please add your Service ID, Template ID, and Public Key in Settings.'
    );
  }

  if (!toEmail) {
    throw new Error('No recipient email address set. Please configure it in Settings → Schedule.');
  }

  const sorted = [...events].sort((a, b) => SEV[b.sev].rank - SEV[a.sev].rank);
  const critCount  = events.filter(e => e.sev === 'CRITICAL').length;
  const highCount  = events.filter(e => e.sev === 'HIGH').length;
  const topEvents  = sorted
    .slice(0, 5)
    .map((e, i) => `${i + 1}. [${e.sev}] ${e.headline}\n   ${e.region} | ${e.cat}\n   ${e.synopsis}`)
    .join('\n\n');

  const scanTimeFormatted = new Date(scanTime).toLocaleString('en-CA', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  });

  await emailjs.send(
    serviceId,
    templateId,
    {
      to_email:       toEmail,
      scan_time:      scanTimeFormatted,
      critical_count: critCount,
      high_count:     highCount,
      total_events:   events.length,
      ai_summary:     aiText || '[No AI summary generated — click "AI Brief" on the Dashboard first.]',
      top_events:     topEvents,
    },
    publicKey
  );
}
