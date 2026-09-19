/**
 * Cross-category topic hubs.
 *
 * Listed once here so the header menu, the footer and the sitemap cannot
 * disagree — two of these hubs were previously orphaned (in the sitemap with
 * no inbound internal link at all), which is the single commonest reason a
 * page never gets indexed.
 */
export interface TopicHub {
  href: string;
  label: string;
  note: string;
}

export const TOPIC_HUBS: TopicHub[] = [
  { href: '/window-hardware', label: 'Window hardware', note: 'Rollers, locks, mesh' },
  { href: '/door-hardware', label: 'Door hardware', note: 'Kits, closers, bolts' },
  { href: '/sliding-door-hardware', label: 'Sliding systems', note: 'Rollers & channels' },
  { href: '/bathroom-glass-hardware', label: 'Bathroom & shower', note: 'Hinges, connectors' },
  { href: '/glass-partition-hardware', label: 'Glass partitions', note: 'Office glazing' },
  { href: '/mosquito-mesh-jaali', label: 'Machar jaali', note: 'Mosquito mesh' },
  { href: '/fabrication-consumables', label: 'Consumables', note: 'Screws, discs, sealant' },
];
