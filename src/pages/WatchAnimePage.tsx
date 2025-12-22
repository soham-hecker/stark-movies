import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useState } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import { getAnimeEmbedUrl, ServerId } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function WatchAnimePage() {
  const { id, episode = '1', type = 'sub' } = useParams<{ 
    id: string; 
    episode: string; 
    type: string; 
  }>();
  const [searchParams] = useSearchParams();
  const title = searchParams.get('title') || id;
  const navigate = useNavigate();
  const [server, setServer] = useState<ServerId>('1');

  if (!id) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <p className="text-muted-foreground">Invalid anime ID</p>
      </div>
    );
  }

  const currentEpisode = parseInt(episode) || 1;
  const currentType = type || 'sub';
  const embedUrl = getAnimeEmbedUrl(id, currentEpisode, currentType, server);

  // Generate episode options
  const episodes = Array.from({ length: 100 }, (_, i) => i + 1);
  const types = [
    { value: 'sub', label: 'Subbed' },
    { value: 'dub', label: 'Dubbed' },
  ];

  const handleEpisodeChange = (newEpisode: string) => {
    const titleParam = title ? `?title=${encodeURIComponent(title)}` : '';
    navigate(`/anime/${id}/${newEpisode}/${currentType}${titleParam}`);
  };

  const handleTypeChange = (newType: string) => {
    const titleParam = title ? `?title=${encodeURIComponent(title)}` : '';
    navigate(`/anime/${id}/${currentEpisode}/${newType}${titleParam}`);
  };

  const handleModeSwitch = (newMode: 'movie' | 'tv' | 'anime') => {
    const titleParam = title ? `?title=${encodeURIComponent(title)}` : '';
    if (newMode === 'movie') navigate(`/movie/${id}${titleParam}`);
    else if (newMode === 'tv') navigate(`/tv/${id}/1/1${titleParam}`);
    else if (newMode === 'anime') navigate(`/anime/${id}/1/sub${titleParam}`);
  };

  return (
    <main className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Back link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Browse</span>
        </Link>

        {/* Media info */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="glass px-3 py-1.5 rounded-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Anime</span>
              </div>
            </div>
            <span className="text-muted-foreground text-sm">ID: {id}</span>
          </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleModeSwitch('movie')}
                className="h-8 px-3 glass"
              >
                Movie
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleModeSwitch('tv')}
                className="h-8 px-3 glass"
              >
                TV Series
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleModeSwitch('anime')}
                className="h-8 px-3 bg-primary/20 border-primary/50"
              >
                Anime
              </Button>
            </div>
        </div>

          {/* Title above player */}
          <div className="mb-6 max-w-6xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              Watching Anime: <span className="text-primary">{title}</span>
              <span className="ml-3 text-lg font-normal text-muted-foreground">Episode {currentEpisode}</span>
            </h1>
          </div>

          {/* Video Player */}
          <VideoPlayer 
            key={`${id}-${currentEpisode}-${server}`}
            embedUrl={embedUrl} 
            title={`Anime ${title} Episode ${currentEpisode}`}
            mediaId={id}
            mediaType="anime"
            episode={currentEpisode}
          />
        
        <div className="mt-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setServer('1')}
              className={cn(
                "h-9 px-6 transition-all duration-300",
                server === '1' 
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]" 
                  : "glass hover:bg-white/10"
              )}
            >
              Server 1
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setServer('2')}
              className={cn(
                "h-9 px-6 transition-all duration-300",
                server === '2' 
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_0_15px_rgba(var(--primary),0.3)]" 
                  : "glass hover:bg-white/10"
              )}
            >
              Server 2
            </Button>
          </div>
          <p className="text-muted-foreground text-xs text-center max-w-md">
            Switch to VidPlay or any other cloud if the current one doesn't load.
            If one server fails, try the other.
          </p>
        </div>

        {/* Episode/Type Controls */}
        <div className="mt-6 max-w-6xl mx-auto">
          <div className="glass-strong rounded-xl p-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Episode Selector */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">Episode</span>
                <Select value={currentEpisode.toString()} onValueChange={handleEpisodeChange}>
                  <SelectTrigger className="w-24 bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {episodes.map((e) => (
                      <SelectItem key={e} value={e.toString()}>
                        {e}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Type Selector (Sub/Dub) */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">Audio</span>
                <Select value={currentType} onValueChange={handleTypeChange}>
                  <SelectTrigger className="w-28 bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {types.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Current info */}
              <div className="ml-auto text-sm text-muted-foreground">
                Now watching: <span className="text-foreground font-medium">Episode {currentEpisode} ({currentType === 'sub' ? 'Subbed' : 'Dubbed'})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
