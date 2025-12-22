import { useEffect, useRef, useState, useMemo } from 'react';
import { setupPlayerEventListener } from '@/lib/api';

interface VideoPlayerProps {
  embedUrl: string;
  title?: string;
  mediaId?: string;
  mediaType?: 'movie' | 'tv' | 'anime';
  season?: number;
  episode?: number;
}

export default function VideoPlayer({ 
  embedUrl, 
  title = 'Video Player',
  mediaId,
  mediaType,
  season,
  episode
}: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // Generate unique key for storage
  const getStorageKey = () => {
    if (!mediaId || !mediaType) return null;
    if (mediaType === 'movie') return `progress_movie_${mediaId}`;
    return `progress_${mediaType}_${mediaId}_s${season || 1}_e${episode || 1}`;
  };

  const storageKey = getStorageKey();

  // Initial URL calculation
  const getInitialUrl = () => {
    if (storageKey) {
      const savedProgress = localStorage.getItem(storageKey);
      if (savedProgress) {
        const time = parseFloat(savedProgress);
        if (time > 10) {
          return `${embedUrl}${embedUrl.includes('?') ? '&' : '?'}t=${Math.floor(time)}`;
        }
      }
    }
    return embedUrl;
  };

  const finalUrl = useMemo(() => {
    if (storageKey) {
      const savedProgress = localStorage.getItem(storageKey);
      if (savedProgress) {
        const time = parseFloat(savedProgress);
        if (time > 10) {
          return `${embedUrl}${embedUrl.includes('?') ? '&' : '?'}t=${Math.floor(time)}`;
        }
      }
    }
    return embedUrl;
  }, [embedUrl, storageKey]);

  useEffect(() => {
    // Setup player event listener
    const cleanup = setupPlayerEventListener((data) => {
      // Save progress periodically or on pause
      if (storageKey && (data.event === 'time' || data.event === 'pause')) {
        // Don't save if near the end (95%+)
        if (data.currentTime / data.duration < 0.95) {
          localStorage.setItem(storageKey, data.currentTime.toString());
        } else {
          localStorage.removeItem(storageKey); // Clear progress if finished
        }
      }
      
      if (data.event === 'complete' && storageKey) {
        localStorage.removeItem(storageKey);
      }
      
      console.log(`Player ${data.event} at ${data.currentTime}s of ${data.duration}s`);
    });

    return cleanup;
  }, [storageKey]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="relative rounded-2xl overflow-hidden glass-strong">
        {/* Glow effect behind player */}
        <div className="absolute inset-0 bg-primary/10 blur-3xl -z-10" />
        
        <div className="aspect-video relative bg-background">
          <iframe
            ref={iframeRef}
            key={finalUrl}
            src={finalUrl}
            title={title}
            className="w-full h-full"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      </div>
    </div>
  );
}
