import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { MOCK_ZEMA_TRACKS } from '../../data/mockZema';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, X, Music, Download } from 'lucide-react';

export const AudioPlayerBar: React.FC = () => {
  const { activeTrackId, setActiveTrackId, language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = MOCK_ZEMA_TRACKS.find((t) => t.id === activeTrackId) || MOCK_ZEMA_TRACKS[0];

  useEffect(() => {
    if (activeTrackId) {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [activeTrackId]);

  if (!activeTrackId) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const cur = audioRef.current.currentTime;
      const dur = audioRef.current.duration || 1;
      setProgress((cur / dur) * 100);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0e1b30]/95 backdrop-blur-lg border-t-2 border-[#d4af37] py-2.5 px-4 shadow-2xl animate-slideUp">
      <audio
        ref={audioRef}
        src={track.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Track Metadata */}
        <div className="flex items-center gap-3 min-w-0 max-w-xs md:max-w-md">
          <div className="w-10 h-10 rounded-lg bg-[#800020] border border-[#d4af37]/50 flex items-center justify-center shrink-0">
            <Music className="w-5 h-5 text-[#d4af37] animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="bg-[#d4af37] text-[#070f1e] text-[9px] font-black px-1.5 py-0.5 rounded">
                {track.mode} Mode
              </span>
              <span className="text-[10px] text-[#9ba6b8] truncate">{track.category}</span>
            </div>
            <p className="text-xs font-bold text-white truncate font-geez">
              {language === 'en' ? track.titleEnglish : track.titleAmharic}
            </p>
            <p className="text-[10px] text-[#d4af37] truncate">{track.cantor}</p>
          </div>
        </div>

        {/* Player Controls & Timeline Progress */}
        <div className="flex-1 max-w-md hidden sm:flex flex-col items-center gap-1">
          <div className="flex items-center gap-3">
            <button className="text-[#9ba6b8] hover:text-white transition">
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-[#d4af37] text-[#070f1e] flex items-center justify-center hover:bg-[#f4e07b] transition shadow-md"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button className="text-[#9ba6b8] hover:text-white transition">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="w-full flex items-center gap-2">
            <span className="text-[10px] text-[#9ba6b8]">0:00</span>
            <div className="flex-1 h-1.5 bg-[#070f1e] rounded-full overflow-hidden border border-[#d4af37]/30">
              <div
                className="h-full bg-gradient-to-r from-[#d4af37] to-[#f4e07b] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[10px] text-[#9ba6b8]">{track.duration}</span>
          </div>
        </div>

        {/* Volume & Actions */}
        <div className="flex items-center gap-3">
          <a
            href={track.audioUrl}
            download
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1 text-xs text-[#d4af37] hover:underline"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Audio</span>
          </a>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-[#9ba6b8] hover:text-white"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setActiveTrackId(null)}
            className="p-1 rounded bg-[#162846] text-[#9ba6b8] hover:text-white hover:bg-[#800020] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
