export const formatDate = (date, locale = 'en-US') => {
  return new Date(date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
};

export const truncate = (str, n) => str?.length > n ? str.substring(0, n) + '...' : str;

export const getCategoryLabel = (cat) => ({
  news: 'News', events: 'Events', 'social-work': 'Social Work',
  education: 'Education', donation: 'Donation', general: 'General',
}[cat] || cat);

export const getCategoryColor = (cat) => ({
  news: 'bg-blue-100 text-blue-800',
  events: 'bg-purple-100 text-purple-800',
  'social-work': 'bg-green-100 text-green-800',
  education: 'bg-yellow-100 text-yellow-800',
  donation: 'bg-red-100 text-red-800',
  general: 'bg-gray-100 text-gray-800',
}[cat] || 'bg-gray-100 text-gray-800');
