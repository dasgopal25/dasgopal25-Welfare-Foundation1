export default function Loader({ size = 'md', text = '' }) {
  const s = { sm: 'w-5 h-5', md: 'w-10 h-10', lg: 'w-16 h-16' }[size];
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className={`${s} border-4 border-forest/20 border-t-forest dark:border-green-400/20 dark:border-t-green-400 rounded-full animate-spin`} />
      {text && <p className="text-gray-500 dark:text-gray-400 text-sm">{text}</p>}
    </div>
  );
}
