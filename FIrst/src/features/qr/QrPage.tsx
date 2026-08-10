import { Download, ExternalLink, LoaderCircle, Printer, QrCode, Save, Wifi } from 'lucide-react';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import QRCode from 'qrcode';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';
import type { QrSettings } from '../../services/contracts';
import { useCafe } from '../../state/CafeStore';
import './qr.css';

export function buildTableUrl(baseUrl: string, table: number) {
  const raw = baseUrl.trim() || 'https://lucacafe.example';
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    const parsed = new URL(withProtocol);
    const base = `${parsed.origin}${parsed.pathname}`.replace(/\/+$/, '');
    return `${base}/menu?table=${Math.max(1, Math.floor(table))}`;
  } catch {
    return `https://lucacafe.example/menu?table=${Math.max(1, Math.floor(table))}`;
  }
}

const xml = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character]!);

export function buildStandeeSvg(settings: QrSettings, table: number, url: string, qrSvg: string) {
  const wifi = settings.wifiName ? `<text x="540" y="1325" text-anchor="middle" font-size="28" fill="#624536">Guest Wi-Fi · ${xml(settings.wifiName)}${settings.wifiPassword ? ` · ${xml(settings.wifiPassword)}` : ''}</text>` : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1600" viewBox="0 0 1080 1600"><rect width="1080" height="1600" rx="64" fill="#fffdf8"/><rect x="28" y="28" width="1024" height="1544" rx="48" fill="none" stroke="#d8c1a9" stroke-width="4"/><text x="540" y="150" text-anchor="middle" font-family="Georgia,serif" font-size="76" fill="#35241d">Luca Cafe</text><text x="540" y="235" text-anchor="middle" font-family="Arial,sans-serif" font-size="30" letter-spacing="8" fill="#a66a3f">TABLE ${table}</text><text x="540" y="350" text-anchor="middle" font-family="Georgia,serif" font-size="58" fill="#35241d">${xml(settings.heading)}</text><text x="540" y="420" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" fill="#76675e">${xml(settings.instruction)}</text><svg x="260" y="500" width="560" height="560" viewBox="0 0 560 560">${qrSvg}</svg><text x="540" y="1145" text-anchor="middle" font-family="Arial,sans-serif" font-size="40" font-weight="700" fill="#35241d">Scan to order</text><text x="540" y="1210" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#76675e">${xml(url)}</text>${wifi}<text x="540" y="1490" text-anchor="middle" font-family="Georgia,serif" font-size="27" fill="#624536">Good coffee · Good company · Your kind of pause</text></svg>`;
}

export function QrPage() {
  const { snapshot, loading, service, refresh } = useCafe();
  const [tableNumber, setTableNumber] = useState(1);
  const [draft, setDraft] = useState<QrSettings | null>(null);
  const [qrSvg, setQrSvg] = useState('');
  const [saved, setSaved] = useState(false);
  const settings = draft ?? snapshot?.qrSettings;
  const qrUrl = useMemo(() => buildTableUrl(settings?.baseUrl ?? '', tableNumber), [settings?.baseUrl, tableNumber]);

  useEffect(() => {
    let active = true;
    setQrSvg('');
    void QRCode.toString(qrUrl, { type: 'svg', errorCorrectionLevel: 'M', margin: 1, width: 560, color: { dark: '#2d1d18', light: '#fffdf8' } }).then((svg) => { if (active) setQrSvg(svg); });
    return () => { active = false; };
  }, [qrUrl]);

  if (loading || !snapshot || !settings) return <main className="staff-page"><h1>Table QR codes</h1><LoadingSkeleton rows={4} /></main>;
  const update = <K extends keyof QrSettings>(key: K, value: QrSettings[K]) => { setDraft({ ...settings, [key]: value }); setSaved(false); };
  const save = async (event: FormEvent) => { event.preventDefault(); if (!service) return; await service.updateQrSettings(settings); await refresh(); setSaved(true); };
  const download = () => {
    const blob = new Blob([buildStandeeSvg(settings, tableNumber, qrUrl, qrSvg)], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = `luca-cafe-table-${tableNumber}-qr.svg`; anchor.click(); URL.revokeObjectURL(url);
  };

  return (
    <main className="staff-page qr-page">
      <header className="staff-page-header"><div><p className="eyebrow">Table touchpoints</p><h1>Table QR codes</h1><p>Design, preview, print, and download a Luca standee for every table.</p></div><div className="staff-page-header__meta"><Badge>Generated locally</Badge></div></header>
      <div className="qr-layout">
        <form className="admin-panel qr-controls liquid-glass liquid-glass--dense" onSubmit={(event) => void save(event)}>
          <div className="admin-panel__heading"><div><p className="eyebrow">Standee setup</p><h2>Content & destination</h2></div></div>
          <label>Table<select value={tableNumber} onChange={(event) => setTableNumber(Number(event.target.value))}>{snapshot.tables.filter((table) => table.active).map((table) => <option key={table.id} value={table.number}>Table {table.number}</option>)}</select></label>
          <label>Website base URL<input type="url" value={settings.baseUrl} onChange={(event) => update('baseUrl', event.target.value)} /></label>
          <div className="qr-destination"><ExternalLink aria-hidden="true" /><span>{qrUrl}</span></div>
          <label>Standee heading<input value={settings.heading} maxLength={48} onChange={(event) => update('heading', event.target.value)} /></label>
          <label>Instruction<textarea value={settings.instruction} maxLength={120} onChange={(event) => update('instruction', event.target.value)} /></label>
          <fieldset><legend><Wifi aria-hidden="true" /> Optional guest Wi-Fi</legend><label>Wi-Fi name<input aria-label="Wi-Fi name" value={settings.wifiName} onChange={(event) => update('wifiName', event.target.value)} /></label><label>Wi-Fi password<input value={settings.wifiPassword} onChange={(event) => update('wifiPassword', event.target.value)} /></label></fieldset>
          {saved && <p className="request-success" role="status">QR settings saved locally.</p>}
          <Button type="submit"><Save aria-hidden="true" /> Save QR settings</Button>
        </form>
        <section className="qr-preview-wrap" aria-labelledby="preview-title">
          <div className="qr-preview-toolbar"><div><p className="eyebrow">Live preview</p><h2 id="preview-title">Table standee</h2></div><div><Button variant="secondary" type="button" aria-label="Print standee" onClick={() => window.print()}><Printer aria-hidden="true" /> Print</Button><Button type="button" aria-label="Download standee" disabled={!qrSvg} onClick={download}><Download aria-hidden="true" /> Download</Button></div></div>
          <article className="qr-standee" id="qr-standee"><div className="qr-standee__top"><span className="qr-mini-mark"><QrCode aria-hidden="true" /></span><p>Luca Cafe</p></div><p className="eyebrow">Table {tableNumber}</p><h2>{settings.heading}</h2><p>{settings.instruction}</p><div className="qr-code" role="img" aria-label={`QR code for Table ${tableNumber}`}>{qrSvg ? <div dangerouslySetInnerHTML={{ __html: qrSvg }} /> : <LoaderCircle className="qr-loader" aria-hidden="true" />}</div><strong>Scan to order</strong><small>{qrUrl}</small>{settings.wifiName && <div className="standee-wifi"><Wifi aria-hidden="true" /><span><b>Guest Wi-Fi</b>{settings.wifiName}{settings.wifiPassword && <> · {settings.wifiPassword}</>}</span></div>}<footer>Good coffee · Good company · Your kind of pause</footer></article>
        </section>
      </div>
    </main>
  );
}
