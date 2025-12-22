import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchBarProps {
  initialValue?: string;
  large?: boolean;
}

export default function SearchBar({ initialValue = '', large = false }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className={`relative group ${large ? 'text-lg' : ''}`}>
        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
        <div className="relative glass-strong rounded-2xl overflow-hidden transition-all duration-300 group-focus-within:border-primary/50">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary ${large ? 'w-6 h-6' : 'w-5 h-5'}`} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search movies, TV series, anime..."
              className={`w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground ${
                large ? 'py-5 pl-14 pr-6 text-lg' : 'py-4 pl-12 pr-5'
              }`}
            />
          {query && (
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl font-medium transition-all hover:scale-105"
            >
              Search
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
