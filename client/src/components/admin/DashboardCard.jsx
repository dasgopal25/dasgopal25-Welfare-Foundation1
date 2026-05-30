export default function DashboardCard({ title, value, icon, color = 'primary' }) {
  const gradients = {
    green:   'linear-gradient(135deg, var(--c-primary-d), var(--c-primary))',
    primary: 'linear-gradient(135deg, var(--c-primary-d), var(--c-primary))',
    gold:    'linear-gradient(135deg, var(--c-accent-d),   var(--c-accent))',
    navy:    'linear-gradient(135deg, var(--c-secondary),  color-mix(in srgb, var(--c-secondary) 70%, var(--c-primary)))',
    red:     'linear-gradient(135deg, #7f1d1d, #dc2626)',
  };
  return (
    <div className="rounded-2xl p-6 shadow-lg text-white"
      style={{ background: gradients[color] || gradients.primary }}>
      <div className="text-4xl mb-3">{icon}</div>
      <p className="text-3xl font-display font-bold">{value}</p>
      <p className="text-white/70 text-sm mt-1">{title}</p>
    </div>
  );
}