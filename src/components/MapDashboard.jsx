import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Simple colored marker based on species
const speciesColors = {
  'Nephila pilipes': '#22c55e',
  'Argiope appensa': '#f59e0b',
  'Heteropoda venatoria': '#ef4444',
  Other: '#60a5fa',
};

function iconForSpecies(species = 'Other') {
  const color = speciesColors[species] || speciesColors.Other;
  const svg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='1.5'>
      <circle cx='12' cy='12' r='10' fill='${color}' />
      <text x='12' y='16' text-anchor='middle' font-size='12' fill='white'>🕷️</text>
    </svg>`
  );
  return L.icon({
    iconUrl: `data:image/svg+xml;charset=UTF-8,${svg}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

const sampleData = [
  {
    id: 1,
    species: 'Nephila pilipes',
    date: '2025-08-12',
    activity: 'membuat jaring',
    observer: 'Ayu',
    count: 3,
    photo: 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?q=80&w=1200&auto=format&fit=crop',
    coords: [-7.824, 110.164],
    location: 'Kulon Progo - Hargowilis',
  },
  {
    id: 2,
    species: 'Argiope appensa',
    date: '2025-08-20',
    activity: 'berburu',
    observer: 'Dimas',
    count: 1,
    photo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    coords: [-7.853, 110.096],
    location: 'Kulon Progo - Girimulyo',
  },
  {
    id: 3,
    species: 'Heteropoda venatoria',
    date: '2025-09-01',
    activity: 'diam',
    observer: 'Rina',
    count: 2,
    photo: 'https://images.unsplash.com/photo-1602173990778-26fbb7f87583?q=80&w=1200&auto=format&fit=crop',
    coords: [-7.804, 110.215],
    location: 'Sleman - Tempel',
  },
];

export default function MapDashboard({ onAddPoint }) {
  const [data, setData] = useState(sampleData);
  const [filters, setFilters] = useState({ species: 'All', activity: 'All' });

  const filtered = useMemo(() => {
    return data.filter(d => {
      const okSpecies = filters.species === 'All' || d.species === filters.species;
      const okActivity = filters.activity === 'All' || d.activity === filters.activity;
      return okSpecies && okActivity;
    });
  }, [data, filters]);

  // Handle map click to add point
  const mapRef = useRef(null);

  function handleMapClick(e) {
    const { latlng } = e;
    if (onAddPoint) onAddPoint([latlng.lat, latlng.lng], newPoint => setData(prev => [...prev, newPoint]));
  }

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
  }, []);

  return (
    <div className="w-full h-[56vh] min-h-[420px] rounded-xl overflow-hidden ring-1 ring-emerald-400/30">
      <div className="flex gap-3 items-center justify-between p-3 bg-neutral-900 text-neutral-100">
        <div className="flex items-center gap-3">
          <span className="text-lg">📍</span>
          <h2 className="font-semibold">Peta Observasi</h2>
        </div>
        <div className="flex gap-2">
          <select
            className="bg-neutral-800 border border-neutral-700 rounded-md px-2 py-1 text-sm"
            value={filters.species}
            onChange={e => setFilters(f => ({ ...f, species: e.target.value }))}
          >
            <option value="All">Semua Spesies</option>
            {Object.keys(speciesColors)
              .filter(k => k !== 'Other')
              .map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
          </select>
          <select
            className="bg-neutral-800 border border-neutral-700 rounded-md px-2 py-1 text-sm"
            value={filters.activity}
            onChange={e => setFilters(f => ({ ...f, activity: e.target.value }))}
          >
            <option value="All">Semua Aktivitas</option>
            {['berburu', 'membuat jaring', 'kawin', 'diam'].map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>
      <MapContainer
        center={[-7.824, 110.164]}
        zoom={11}
        className="w-full h-[calc(56vh-56px)]"
        whenCreated={map => (mapRef.current = map)}
        onClick={handleMapClick}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Street">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Topo">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenTopoMap"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              url="https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}.png?access-token=demotoken"
              attribution="&copy; Jawg Maps"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {filtered.map(point => (
          <Marker key={point.id} position={point.coords} icon={iconForSpecies(point.species)}>
            <Popup>
              <div className="space-y-2 text-sm">
                <div className="font-semibold">{point.species}</div>
                <div className="text-neutral-600">{point.location}</div>
                <div>
                  <span className="font-medium">Tanggal:</span> {point.date}
                </div>
                <div>
                  <span className="font-medium">Aktivitas:</span> {point.activity}
                </div>
                <div>
                  <span className="font-medium">Pengamat:</span> {point.observer} ({point.count} individu)
                </div>
                {point.photo && (
                  <img src={point.photo} alt={point.species} className="rounded-md w-full h-28 object-cover" />
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
