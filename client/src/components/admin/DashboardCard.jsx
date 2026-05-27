export default function DashboardCard({ title, value, icon, color = 'green' }) {
  const colors = {
    green: 'from-forest to-forest-light',
    gold: 'from-gold-dark to-gold',
    navy: 'from-navy-dark to-navy',
    red: 'from-red-700 to-red-500',
  };
  return (
    <div className={`bg-gradient-to-br ${colors[color]} text-white rounded-2xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-4xl">{icon}</span>
      </div>
      <p className="text-3xl font-display font-bold">{value}</p>
      <p className="text-white/70 text-sm mt-1">{title}</p>
    </div>
  );
}
