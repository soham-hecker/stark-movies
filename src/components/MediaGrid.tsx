import MediaCard from './MediaCard';
import type { MediaItem } from '@/lib/api';

interface MediaGridProps {
  items: MediaItem[];
  loading?: boolean;
}

function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-secondary animate-pulse">
      <div className="aspect-[2/3] bg-muted" />
    </div>
  );
}

export default function MediaGrid({ items, loading = false }: MediaGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">No content found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {items.map((item, index) => (
        <div 
          key={item.tmdb_id || item.imdb_id || index}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <MediaCard item={item} />
        </div>
      ))}
    </div>
  );
}
