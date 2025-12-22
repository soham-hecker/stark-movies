import { useState, useEffect } from 'react';
import { Play, TrendingUp } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import MediaGrid from '@/components/MediaGrid';
import { type MediaItem } from '@/lib/api';
import { HOME_PAGE_DATA } from '@/lib/home-data';

export default function HomePage() {
  const [movies, setMovies] = useState<MediaItem[]>(HOME_PAGE_DATA);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // We already have the hardcoded data
    setLoading(false);
  }, []);

  return (
    <main className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
              <Play className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Stream unlimited content</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
              Discover & Watch
              <br />
              <span className="text-gradient">Unlimited</span> Content
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Stream thousands of movies, TV shows, and anime. No subscriptions, no limits.
            </p>

            {/* Search Bar */}
            <SearchBar large />
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Featured Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Trending Now</h2>
          </div>

          <MediaGrid items={movies} loading={loading} />
        </div>
      </section>
    </main>
  );
}
