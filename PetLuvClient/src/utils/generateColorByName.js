export default function generateRandomColor(name) {
  if (!name || name.length === 0) return '#f79400';

  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = `hsl(${hash % 360}, 70%, 75%)`;

  return color;
}
