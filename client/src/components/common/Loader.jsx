export default function Loader({ size = 'md', text = '' }) {
  const s = { sm:'w-5 h-5', md:'w-10 h-10', lg:'w-14 h-14' }[size];
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className={`${s} border-4 rounded-full animate-spin`}
        style={{ borderColor:'color-mix(in srgb, var(--c-primary) 20%, transparent)', borderTopColor:'var(--c-primary)' }} />
      {text && <p className="text-sm" style={{ color:'var(--c-text-muted)' }}>{text}</p>}
    </div>
  );
}