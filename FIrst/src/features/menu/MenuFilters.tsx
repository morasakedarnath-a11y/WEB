import { Leaf, Search } from 'lucide-react';
import type { Category } from '../../domain/types';

export function MenuFilters({ categories, activeCategory, onCategory, search, onSearch, vegetarian, onVegetarian }: {
  categories: Category[];
  activeCategory: string;
  onCategory: (category: string) => void;
  search: string;
  onSearch: (search: string) => void;
  vegetarian: boolean;
  onVegetarian: () => void;
}) {
  return (
    <div className="menu-filters glass-panel">
      <label className="menu-search liquid-glass liquid-glass--interactive"><Search aria-hidden="true" size={18} /><span className="sr-only">Search the menu</span><input type="search" aria-label="Search the menu" placeholder="Search a craving…" value={search} onChange={(event) => onSearch(event.target.value)} /></label>
      <div className="category-chips" aria-label="Menu categories">
        <button className={`liquid-glass--interactive ${activeCategory === 'all' ? 'is-active' : ''}`} onClick={() => onCategory('all')}>All</button>
        {categories.map((category) => <button className={`liquid-glass--interactive ${activeCategory === category.id ? 'is-active' : ''}`} key={category.id} onClick={() => onCategory(category.id)}>{category.name}</button>)}
      </div>
      <button className={`veg-filter liquid-glass--interactive control-44 ${vegetarian ? 'is-active' : ''}`} aria-pressed={vegetarian} aria-label="Vegetarian only" onClick={onVegetarian}><Leaf aria-hidden="true" size={17} /> Veg</button>
    </div>
  );
}
