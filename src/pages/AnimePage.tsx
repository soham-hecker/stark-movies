import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import MediaGrid from '@/components/MediaGrid';
import { fetchAnime, type MediaItem } from '@/lib/api';

export default function AnimePage() {
  const [anime, setAnime] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnime() {
      setLoading(true);
      const data = await fetchAnime(1);
      const animeWithType = data.result.map(item => ({
        ...item,
        type: 'anime' as const
      }));
      setAnime(animeWithType);
      setLoading(false);
    }
    loadAnime();
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-6 h-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Anime</h1>
        </div>
        <MediaGrid items={anime} loading={loading} />
      </div>
    </main>
  );
}
