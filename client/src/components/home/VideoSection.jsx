import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublicVideos } from '../../api/videoApi';
import { useLang } from '../../context/LanguageContext';

function VideoModal({ video, onClose }) {
  const { isBn } = useLang();
  if (!video) return null;
  const title = isBn && video.titleBn ? video.titleBn : video.title;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor:'rgba(0,0,0,0.85)' }} onClick={onClose}>
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor:'var(--c-bg)' }} onClick={e => e.stopPropagation()}>
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="p-4 flex items-center justify-between">
          <h3 className="font-display font-semibold" style={{ color:'var(--c-primary)' }}>{title}</h3>
          <button onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
            style={{ backgroundColor:'var(--c-primary)' }}>✕</button>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ video, onPlay }) {
  const { t, isBn } = useLang();
  const title = isBn && video.titleBn ? video.titleBn : video.title;
  const thumb = video.thumbnail || `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <div className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{ backgroundColor:'var(--c-bg)', border:'1px solid color-mix(in srgb, var(--c-primary) 10%, transparent)', boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}
      onClick={() => onPlay(video)}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 12px 32px color-mix(in srgb, var(--c-primary) 15%, transparent)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'}>
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img src={thumb} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {/* Dark overlay + play button */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ background:'rgba(0,0,0,0.32)' }}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor:'var(--c-accent)' }}>
            <svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        {/* Category badge */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium text-white"
          style={{ backgroundColor:'var(--c-primary)' }}>
          🎬 {video.category}
        </div>
      </div>
      {/* Card body */}
      <div className="p-4">
        <h3 className="font-display font-semibold line-clamp-2 mb-1 group-hover:opacity-80 transition-opacity"
          style={{ color:'var(--c-primary)', fontSize:'var(--font-size-base)' }}>
          {title}
        </h3>
        {video.description && (
          <p className="text-xs line-clamp-2" style={{ color:'var(--c-text-muted)' }}>
            {isBn && video.descriptionBn ? video.descriptionBn : video.description}
          </p>
        )}
        <p className="text-xs mt-2 font-semibold" style={{ color:'var(--c-accent)' }}>
          ▶ {t('Watch Now','এখন দেখুন')}
        </p>
      </div>
    </div>
  );
}

export default function VideoSection() {
  const { t } = useLang();
  const [videos, setVideos]   = useState([]);
  const [playing, setPlaying] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicVideos({ featured:'true' })
      .then(r => setVideos(r.data.data.slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && videos.length === 0) return null;

  return (
    <section className="py-20" style={{ backgroundColor:'var(--c-bg-alt)' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color:'var(--c-accent)' }}>
              {t('Watch & Learn','দেখুন ও শিখুন')}
            </span>
            <h2 className="font-display font-bold mt-1" style={{ color:'var(--c-primary)', fontSize:'var(--font-size-3xl)' }}>
              {t('Our Videos','আমাদের ভিডিও')}
            </h2>
          </div>
          <Link to="/videos" className="text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color:'var(--c-primary)' }}>
            {t('View All →','সব দেখুন →')}
          </Link>
        </div>

        {/* Skeleton loader */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill(0).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-video" style={{ backgroundColor:'color-mix(in srgb, var(--c-primary) 10%, transparent)' }} />
                <div className="p-4 space-y-2">
                  <div className="h-4 rounded w-3/4" style={{ backgroundColor:'color-mix(in srgb, var(--c-primary) 8%, transparent)' }} />
                  <div className="h-3 rounded w-1/2" style={{ backgroundColor:'color-mix(in srgb, var(--c-primary) 6%, transparent)' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videos grid */}
        {!loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map(v => <VideoCard key={v._id} video={v} onPlay={setPlaying} />)}
          </div>
        )}
      </div>

      <VideoModal video={playing} onClose={() => setPlaying(null)} />
    </section>
  );
}