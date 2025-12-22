import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import MediaGrid from '@/components/MediaGrid';
import { searchMediaRemote, type MediaItem } from '@/lib/api';

export default function SearchPage() {
  const { searchTerm } = useParams<{ searchTerm: string }>();
  const [results, setResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function performSearch() {
      if (!searchTerm) return;
      
      setLoading(true);
      const filtered = await searchMediaRemote(decodeURIComponent(searchTerm));
      
      setResults(filtered);
      setLoading(false);
    }

    performSearch();
  }, [searchTerm]);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Back link and search */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <SearchBar initialValue={searchTerm ? decodeURIComponent(searchTerm) : ''} />
        </div>

        {/* Results header */}
        <div className="flex items-center gap-3 mb-8">
          <Search className="w-6 h-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Search results for "{searchTerm ? decodeURIComponent(searchTerm) : ''}"
          </h1>
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-muted-foreground mb-6">
            Found {results.length} result{results.length !== 1 ? 's' : ''}
          </p>
        )}

        {/* Results grid or empty state */}
        {!loading && results.length === 0 ? (
          <div className="text-center py-20 glass rounded-2xl">
            <Search className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No results found</h2>
            <p className="text-muted-foreground mb-6">
              Try searching with different keywords
            </p>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
            >
              Browse Trending
            </Link>
          </div>
        ) : (
          <MediaGrid items={results} loading={loading} />
        )}
      </div>
    </main>
  );
}
