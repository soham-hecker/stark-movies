import { useState, useEffect } from 'react';
import { Film } from 'lucide-react';
import MediaGrid from '@/components/MediaGrid';
import { fetchMovies, type MediaItem } from '@/lib/api';

export default function MoviesPage() {
  const [movies, setMovies] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMovies() {
      setLoading(true);
      const data = await fetchMovies(1);
      const moviesWithType = data.result.map(item => ({
        ...item,
        type: 'movie' as const
      }));
      setMovies(moviesWithType);
      setLoading(false);
    }
    loadMovies();
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Film className="w-6 h-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Movies</h1>
        </div>
        <MediaGrid items={movies} loading={loading} />
      </div>
    </main>
  );
}
