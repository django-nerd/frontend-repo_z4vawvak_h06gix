import React, { useMemo } from 'react';

const photos = [
  {
    id: 'g1',
    url: 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1200&auto=format&fit=crop',
    species: 'Nephila pilipes',
    coords: [-7.824, 110.164],
    caption: 'Jaring emas di tepi hutan',
  },
  {
    id: 'g2',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    species: 'Argiope appensa',
    coords: [-7.853, 110.096],
    caption: 'Polanya khas',
  },
  {
    id: 'g3',
    url: 'https://images.unsplash.com/photo-1602173990778-26fbb7f87583?q=80&w=1200&auto=format&fit=crop',
    species: 'Heteropoda venatoria',
    coords: [-7.804, 110.215],
    caption: 'Pemburu malam',
  },
];

export default function GalleryPanel({ onSelect }) {
  const items = useMemo(() => photos, []);
  return (
    <section className="bg-neutral-900 text-neutral-100 rounded-xl p-4 ring-1 ring-emerald-400/30">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span>📸</span>
          <h3 className="font-semibold">Galeri Observasi</h3>
        </div>
        <button className="px-3 py-1.5 rounded-md bg-neutral-800 border border-neutral-700 text-sm">Ekspor CSV</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {items.map(p => (
          <button
            key={p.id}
            onClick={() => onSelect?.(p)}
            className="group relative aspect-square overflow-hidden rounded-lg ring-1 ring-neutral-800"
          >
            <img src={p.url} alt={p.species} className="w-full h-full object-cover group-hover:scale-105 transition" />
            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent text-xs text-white">
              <div className="font-medium">{p.species}</div>
              <div className="text-[10px] opacity-80">{p.caption}</div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
