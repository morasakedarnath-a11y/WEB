import { useMemo, type ReactNode } from 'react';
import { CafeProvider } from '../state/CafeStore';
import { LocalCafeAdapter } from '../services/localAdapter';

export function AppProviders({ children }: { children: ReactNode }) {
  const service = useMemo(() => new LocalCafeAdapter(), []);
  return <CafeProvider service={service}>{children}</CafeProvider>;
}
