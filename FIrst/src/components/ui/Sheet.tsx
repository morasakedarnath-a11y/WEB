import type { ReactNode } from 'react';
import { Dialog } from './Dialog';

export function Sheet(props: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  return <Dialog {...props} />;
}
