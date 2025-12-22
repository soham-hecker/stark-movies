import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, Film, Tv, Sparkles } from 'lucide-react';
import type { MediaItem } from '@/lib/api';

interface MediaCardProps {
  item: MediaItem;
}

const typeIcons = {
  movie: Film,
  tv: Tv,
  anime: Sparkles,
};

const typeLabels = {
  movie: 'Movie',
  tv: 'TV Series',
  anime: 'Anime',
};

// Generate consistent gradient based on title
function getGradient(title: string): string {
  const gradients = [
    'from-rose-900 via-pink-800 to-red-900',
    'from-violet-900 via-purple-800 to-indigo-900',
    'from-blue-900 via-cyan-800 to-teal-900',
    'from-emerald-900 via-green-800 to-lime-900',
    'from-amber-900 via-orange-800 to-red-900',
    'from-slate-800 via-zinc-700 to-neutral-800',
    'from-fuchsia-900 via-pink-800 to-rose-900',
    'from-sky-900 via-blue-800 to-indigo-900',
  ];
  const index = title.length % gradients.length;
  return gradients[index];
}

function getWatchUrl(item: MediaItem): string {
  const id = item.imdb_id || item.tmdb_id;
  const titleParam = `?title=${encodeURIComponent(item.title)}`;
  switch (item.type) {
    case 'movie':
      return `/movie/${id}${titleParam}`;
    case 'tv':
      return `/tv/${id}/1/1${titleParam}`;
    case 'anime':
      return `/anime/${id}/1/sub${titleParam}`;
    default:
      return `/movie/${id}${titleParam}`;
  }
}

export default function MediaCard({ item }: MediaCardProps) {
  const Icon = typeIcons[item.type] || Film;
  const label = typeLabels[item.type] || 'Movie';
  const gradient = getGradient(item.title);

  return (
    <Link 
      to={getWatchUrl(item)} 
      className="group relative block rounded-xl overflow-hidden card-hover"
    >
      {/* Poster area */}
      <div className="aspect-[2/3] relative overflow-hidden bg-muted">
        {(item.image || item.thumbnail_url) ? (
          <img 
            src={item.image || item.thumbnail_url} 
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <>
            {/* Beautiful gradient background fallback */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
            
            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1)_0%,_transparent_50%)]" />
            
            {/* Icon centered */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon className="w-16 h-16 text-white/20" />
            </div>
          </>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 glow">
              <Play className="w-7 h-7 text-primary-foreground fill-current ml-1" />
            </div>
          </div>
        </div>

        {/* Type badge */}
        {item.type !== 'movie' && (
          <div className="absolute top-3 left-3 glass px-2 py-1 rounded-lg">
            <div className="flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-foreground">{label}</span>
            </div>
          </div>
        )}

        {/* Year badge if available */}
        {item.year && (
          <div className="absolute top-3 right-3 glass px-2 py-1 rounded-lg">
            <span className="text-xs font-medium text-foreground">{item.year}</span>
          </div>
        )}
      </div>

      {/* Title and Metadata */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent">
        <h3 className="text-sm font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        {(item.actors || item.cast) && (
          <p className="text-[10px] text-muted-foreground line-clamp-1 mt-1">
            {item.actors || item.cast}
          </p>
        )}
      </div>
    </Link>
  );
}