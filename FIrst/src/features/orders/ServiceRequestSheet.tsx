import { BellRing, Droplets, ReceiptText } from 'lucide-react';
import { useState } from 'react';
import { Dialog } from '../../components/ui/Dialog';
import type { ServiceRequestType } from '../../domain/types';
import type { CafeService } from '../../services/contracts';

export function ServiceRequestSheet({ open, onClose, service, tableId, tableNumber }: { open: boolean; onClose: () => void; service: CafeService | null; tableId: string; tableNumber: number }) {
  const [status, setStatus] = useState('');
  const request = async (type: ServiceRequestType) => {
    if (!service) return;
    await service.createServiceRequest(tableId, type);
    setStatus(type === 'water' ? 'Water is on the way.' : type === 'bill' ? 'We’ll bring your bill shortly.' : 'A team member will be with you soon.');
  };
  return (
    <Dialog open={open} title="How can we help?" onClose={() => { setStatus(''); onClose(); }}>
      <div className="service-request-grid">
        <button className="liquid-glass liquid-glass--interactive" onClick={() => void request('call-waiter')}><BellRing aria-hidden="true" /><strong>Call a waiter</strong><span>We’ll come to Table {tableNumber}</span></button>
        <button className="liquid-glass liquid-glass--interactive" onClick={() => void request('water')}><Droplets aria-hidden="true" /><strong>Request water</strong><span>We’ll bring it over</span></button>
        <button className="liquid-glass liquid-glass--interactive" onClick={() => void request('bill')}><ReceiptText aria-hidden="true" /><strong>Request the bill</strong><span>Ready when you are</span></button>
        {status && <p className="request-success" role="status">{status}</p>}
      </div>
    </Dialog>
  );
}
