import { useState, useEffect } from 'react';
import { getPublicVideos } from '../../api/videoApi';
import { useLang } from '../../context/LanguageContext';

function VideoModal({ video, onClose }) {
  const { isBn } = useLang();
  if (!video) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor:'rgba(0,0,0,0.88)' }} onClick={onClose}>
      <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundColor:'var(--c-bg)' }} onClick={e => e.stopPropagation()}>
        <div className="video-container">
          <iframe src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={isBn && video.titleBn ? video.titleBn : video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen />
        </div>
        <div className="p-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display font-semibold" style={{ color:'var(--c-primary)' }}>
              {isBn && video.titleBn ? video.titleBn : video.title}
            </h3>
            {video.description && (
              <p className="text-sm mt-1" style={{ color:'var(--c-text-muted)' }}>
                {isBn && video.descriptionBn ? video.descriptionBn : video.description}
              </p>
            )}
          </div>
          <button onClick={onClose}
            className="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center text-white"
            style={{ backgroundColor:'var(--c-primary)' }}>✕</button>
        </div>
      </div>
    </div>
  );
}

export default function Videos() {
  const { t, isBn } = useLang();
  const [videos, setVideos]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(null);
  const [filter, setFilter]   = useState('all');

  useEffect(() => {
    getPublicVideos().then(r => setVideos(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const categories = ['all', ...new Set(videos.map(v => v.category))];
  const filtered   = filter === 'all' ? videos : videos.filter(v => v.category === filter);

  return (
    <div className="pt-24 min-h-screen" style={{ backgroundColor:'var(--c-bg)' }}>
      {/* Banner */}
      <div className="theme-hero-bg text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-display font-bold mb-3" style={{ fontSize:'clamp(2rem,5vw,var(--font-size-4xl))' }}>
            {t('Videos','ভিডিও')}
          </h1>
          <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'var(--font-size-lg)' }}>
            {t('Watch our activities, events and programs','আমাদের কার্যক্রম, ইভেন্ট ও অনুষ্ঠান দেখুন')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize"
              style={filter === c
                ? { backgroundColor:'var(--c-primary)', color:'#fff' }
                : { backgroundColor:'var(--c-bg-alt)', color:'var(--c-text)', border:'1px solid color-mix(in srgb, var(--c-primary) 20%, transparent)' }}>
              {c === 'all' ? t('All','সব') : c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6).fill(0).map((_,i) => (
              <div key={i} className="rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-video" style={{ backgroundColor:'color-mix(in srgb, var(--c-primary) 10%, transparent)' }} />
                <div className="p-4 space-y-2">
                  <div className="h-4 rounded w-3/4" style={{ backgroundColor:'color-mix(in srgb, var(--c-primary) 8%, transparent)' }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl block mb-4">🎬</span>
            <p style={{ color:'var(--c-text-muted)' }}>{t('No videos yet.','এখনো কোনো ভিডিও নেই।')}</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(v => {
              const title = isBn && v.titleBn ? v.titleBn : v.title;
              const thumb = v.thumbnail || `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;
              return (
                <div key={v._id} className="group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  style={{ backgroundColor:'var(--c-bg)', border:'1px solid color-mix(in srgb, var(--c-primary) 10%, transparent)' }}
                  onClick={() => setPlaying(v)}>
                  <div className="relative aspect-video overflow-hidden">
                    <img src={thumb} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background:'rgba(0,0,0,0.32)' }}>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-transform group-hover:scale-110"
                        style={{ backgroundColor:'var(--c-accent)' }}>
                        <svg viewBox="0 0 24 24" fill="white" width="22" height="22"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold line-clamp-2" style={{ color:'var(--c-primary)' }}>{title}</h3>
                    {v.description && <p className="text-xs mt-1 line-clamp-2" style={{ color:'var(--c-text-muted)' }}>{isBn&&v.descriptionBn?v.descriptionBn:v.description}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <VideoModal video={playing} onClose={() => setPlaying(null)} />
    </div>
  );
}