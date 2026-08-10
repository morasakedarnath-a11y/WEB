import { ArrowDownRight, ArrowRight, Coffee, MapPin, Phone, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PublicHeader } from '../../components/layout/PublicHeader';
import { FoodImage } from '../../components/ui/FoodImage';
import { categories, combos } from '../../domain/catalog';
import './LandingPage.css';

const previewCategories = categories.filter((category) =>
  ['pizza', 'pasta', 'sandwiches', 'hot-beverages', 'iced-refreshers', 'sundaes'].includes(category.id),
);

export function LandingPage() {
  return (
    <div className="landing-page">
      <PublicHeader />
      <main>
        <section className="landing-hero" aria-labelledby="landing-title">
          <FoodImage src="/images/cafe-hero.webp" alt="A latte and pastry in Luca Cafe" />
          <div className="landing-hero__veil" />
          <div className="landing-hero__content glass-panel">
            <p className="eyebrow"><Sparkles aria-hidden="true" size={14} /> Slow mornings, lively tables</p>
            <h1 id="landing-title">Luca Cafe</h1>
            <p className="hero-copy">Cafe favourites with a playful local soul—made for solo pauses, shared plates, and everything in between.</p>
            <div className="hero-actions">
              <Link className="button button--primary control-44" to="/menu">Browse the menu <ArrowRight aria-hidden="true" size={17} /></Link>
              <Link className="button button--secondary control-44" to="/menu">Order at your table <ArrowDownRight aria-hidden="true" size={17} /></Link>
            </div>
          </div>
          <div className="hero-note glass-dark"><Coffee aria-hidden="true" /><span>Made for your kind of break</span></div>
        </section>

        <section className="landing-section combo-section" id="combos" aria-labelledby="combos-title">
          <div className="section-intro">
            <p className="eyebrow">Come as you are</p>
            <h2 id="combos-title">A combo for every table</h2>
            <p>Thoughtfully grouped favourites at an easy cafe price. No substitutions—just a very good reason to stay a little longer.</p>
          </div>
          <div className="combo-grid">
            {combos.map((combo, index) => (
              <article className={`combo-card combo-card--${index + 1} liquid-glass ${index === 1 ? 'liquid-glass--dark' : 'liquid-glass--dense'} liquid-glass--interactive`} key={combo.id}>
                <div className="combo-card__number" aria-hidden="true">0{index + 1}</div>
                <p className="eyebrow">{index === 0 ? 'A quiet moment' : index === 1 ? 'For two' : 'Bring everyone'}</p>
                <h3>{combo.name}</h3>
                <p>{combo.contents.map((item) => `${item.quantity} ${item.label.toLowerCase()}`).join(' · ')}</p>
                <div className="combo-card__footer"><strong className="tabular">₹{combo.price}</strong><Link to={`/menu?product=${combo.id}`} aria-label={`View ${combo.name}`}><ArrowRight aria-hidden="true" /></Link></div>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-section category-section" aria-labelledby="categories-title">
          <div className="section-intro section-intro--row">
            <div><p className="eyebrow">All-day favourites</p><h2 id="categories-title">Follow your craving</h2></div>
            <Link to="/menu">See the full menu <ArrowRight aria-hidden="true" size={17} /></Link>
          </div>
          <div className="category-preview-grid">
            {previewCategories.map((category) => (
              <Link className="category-preview" to={`/menu?category=${category.id}`} key={category.id}>
                <FoodImage src={category.image} alt={`${category.name} at Luca Cafe`} />
                <span className="category-preview__label glass-panel"><h3>{category.name}</h3><ArrowRight aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="story-section" id="our-story" aria-labelledby="story-title">
          <div className="story-section__image"><FoodImage src="/images/coffee-matcha.webp" alt="Coffee and matcha served at Luca Cafe" /></div>
          <div className="story-section__copy">
            <p className="eyebrow">The Luca way</p>
            <h2 id="story-title">Familiar comfort, served with a little wonder.</h2>
            <p>We like our coffee unhurried, our tables full, and our menu curious. From ghee roast pizza to matcha lattes and warm brownie fudge, Luca Cafe brings easy comfort to every kind of cafe day.</p>
            <blockquote>“Stay for the coffee. Order the pastry anyway.”</blockquote>
          </div>
        </section>

        <section className="landing-section contact-section" id="contact" aria-labelledby="contact-title">
          <div><p className="eyebrow">Find your table</p><h2 id="contact-title">See you in Manipal</h2><p>Drop in, take a breath, and let us make you something lovely.</p></div>
          <div className="contact-actions">
            <span className="liquid-glass liquid-glass--interactive"><MapPin aria-hidden="true" /> Manipal, Karnataka</span>
            <a className="liquid-glass liquid-glass--interactive" href="tel:08203559195"><Phone aria-hidden="true" /> 0820 3559195</a>
          </div>
        </section>
      </main>
      <footer className="landing-footer">
        <div className="wordmark"><Coffee aria-hidden="true" size={22} /><span>Luca</span><small>cafe</small></div>
        <p>Good coffee. Good company. Your kind of pause.</p>
        <div><Link to="/menu">Menu</Link><a href="#contact">Contact</a><Link to="/staff">Staff Portal</Link></div>
      </footer>
    </div>
  );
}
