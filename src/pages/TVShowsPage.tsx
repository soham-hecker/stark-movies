import { useState, useEffect } from 'react';
import { Tv } from 'lucide-react';
import MediaGrid from '@/components/MediaGrid';
import { fetchTVShows, type MediaItem } from '@/lib/api';

export default function TVShowsPage() {
  const [shows, setShows] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadShows() {
      setLoading(true);
      const data = await fetchTVShows(1);
      const showsWithType = data.result.map(item => ({
        ...item,
        type: 'tv' as const
      }));
      setShows(showsWithType);
      setLoading(false);
    }
    loadShows();
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Tv className="w-6 h-6 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">TV Series</h1>
        </div>
        <MediaGrid items={shows} loading={loading} />
      </div>
    </main>
  );
}
