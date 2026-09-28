const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(num) {
  return String(num)
    .split('')
    .map((ch) => (ch >= '0' && ch <= '9' ? bengaliDigits[Number(ch)] : ch))
    .join('');
}

export function formatDate(dateInput) {
  const date = new Date(dateInput);
  return date.toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function readingTime(content) {
  const words = String(content || '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${toBengaliNumber(minutes)} মিনিটে পড়ো`;
}
