import { Coffee, Menu as MenuIcon, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PublicHeader() {
  return (
    <header className="public-header glass-panel">
      <Link className="wordmark" to="/" aria-label="Luca Cafe home">
        <Coffee aria-hidden="true" size={22} />
        <span>Luca</span><small>cafe</small>
      </Link>
      <nav aria-label="Main navigation">
        <a href="#combos">Combos</a>
        <a href="#our-story">Our cafe</a>
        <a href="#contact">Contact</a>
        <Link className="header-staff-link liquid-glass--interactive" to="/staff"><ShieldCheck aria-hidden="true" size={16} /> Staff Portal</Link>
        <Link className="header-menu-link glass-dark liquid-glass--interactive" to="/menu"><MenuIcon aria-hidden="true" size={17} /> Menu</Link>
      </nav>
    </header>
  );
}
