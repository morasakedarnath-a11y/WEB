import { Coffee, KeyRound, ShieldCheck } from 'lucide-react';
import { createContext, useContext, useState, type FormEvent, type ReactNode } from 'react';
import { Button } from '../../components/ui/Button';
import { useCafe } from '../../state/CafeStore';
import './auth.css';

const SESSION_KEY = 'luca-staff-session';
const StaffSessionContext = createContext<{ logout: () => void }>({ logout: () => undefined });

const hasSession = () => {
  try { return window.sessionStorage.getItem(SESSION_KEY) === 'active'; } catch { return false; }
};

export function StaffGate({ children }: { children: ReactNode }) {
  const { service } = useCafe();
  const [authenticated, setAuthenticated] = useState(hasSession);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const login = async (event: FormEvent) => {
    event.preventDefault();
    if (!service || submitting) return;
    setSubmitting(true); setError('');
    const valid = await service.authenticateStaff(pin);
    if (!valid) { setError('That demo PIN is not valid.'); setSubmitting(false); return; }
    try { window.sessionStorage.setItem(SESSION_KEY, 'active'); } catch { /* React state still grants this tab access. */ }
    setAuthenticated(true); setSubmitting(false);
  };
  const logout = () => {
    try { window.sessionStorage.removeItem(SESSION_KEY); } catch { /* Session still clears in React state. */ }
    setAuthenticated(false); setPin(''); setError('');
  };

  if (authenticated) return <StaffSessionContext.Provider value={{ logout }}>{children}</StaffSessionContext.Provider>;
  return (
    <main className="staff-login-page">
      <div className="staff-login-card glass-panel">
        <div className="staff-login-card__mark"><Coffee aria-hidden="true" /></div>
        <p className="eyebrow">Luca Cafe · team workspace</p>
        <h1>Demo staff access</h1>
        <p>This local frontend demo is not production authentication. Use it to explore kitchen, floor, admin, and QR workflows.</p>
        <form onSubmit={(event) => void login(event)}>
          <label htmlFor="staff-pin"><span><KeyRound aria-hidden="true" size={17} /> Staff PIN</span><input id="staff-pin" type="password" inputMode="numeric" autoComplete="current-password" maxLength={6} value={pin} onChange={(event) => setPin(event.target.value.replace(/\D/g, ''))} /></label>
          {error && <p className="field-error" role="alert">{error}</p>}
          <Button type="submit" disabled={pin.length < 4 || submitting}>{submitting ? 'Checking…' : 'Enter workspace'}</Button>
        </form>
        <div className="demo-pin"><ShieldCheck aria-hidden="true" /><span><strong>Demo PIN</strong> 2490</span></div>
      </div>
    </main>
  );
}

export function useStaffSession() {
  return useContext(StaffSessionContext);
}
