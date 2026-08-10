import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import type { CafeService } from '../../services/contracts';
import { createSeedSnapshot } from '../../services/seed';
import { CafeProvider } from '../../state/CafeStore';
import { QrPage, buildStandeeSvg, buildTableUrl } from './QrPage';

vi.mock('qrcode', () => ({ default: { toString: vi.fn(async () => '<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0"/></svg>') } }));

describe('QrPage', () => {
  it('builds safe table menu URLs', () => {
    expect(buildTableUrl('https://luca.example/', 4)).toBe('https://luca.example/menu?table=4');
  });

  it('exports the complete branded standee, not only the QR matrix', () => {
    const settings = createSeedSnapshot().qrSettings;
    const standee = buildStandeeSvg(settings, 4, 'https://luca.test/menu?table=4', '<path d="M0 0"/>');
    expect(standee).toContain('Luca Cafe');
    expect(standee).toContain('TABLE 4');
    expect(standee).toContain(settings.heading);
    expect(standee).toContain('https://luca.test/menu?table=4');
    expect(standee).toContain('<path d="M0 0"/>');
  });

  it('renders a local branded preview and persists standee settings', async () => {
    const snapshot = createSeedSnapshot();
    const updateQrSettings = vi.fn(async () => snapshot);
    const service = { getSnapshot: async () => snapshot, subscribe: () => () => undefined, updateQrSettings } as unknown as CafeService;
    render(<CafeProvider service={service}><QrPage /></CafeProvider>);
    const tableSelect = await screen.findByLabelText('Table');
    expect(screen.getByRole('heading', { name: 'Table QR codes' })).toBeInTheDocument();
    fireEvent.change(tableSelect, { target: { value: '4' } });
    expect(screen.getAllByText('https://lucacafe.example/menu?table=4')).toHaveLength(2);
    expect(await screen.findByRole('img', { name: 'QR code for Table 4' })).toBeInTheDocument();
    expect(screen.getByLabelText('Wi-Fi name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Print standee' })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole('button', { name: 'Download standee' })).toBeEnabled());
    fireEvent.click(screen.getByRole('button', { name: 'Save QR settings' }));
    await waitFor(() => expect(updateQrSettings).toHaveBeenCalled());
  });
});
