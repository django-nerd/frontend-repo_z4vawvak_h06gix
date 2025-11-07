import React, { useCallback, useState } from 'react';
import HeroCover from './components/HeroCover';
import MapDashboard from './components/MapDashboard';
import ObservationFormModal from './components/ObservationFormModal';
import AnalyticsPanel from './components/AnalyticsPanel';
import GalleryPanel from './components/GalleryPanel';

export default function App() {
  const [pendingCoords, setPendingCoords] = useState(null);
  const [formOpen, setFormOpen] = useState(false);

  const handleAddPoint = useCallback((coords, commit) => {
    setPendingCoords(coords);
    setFormOpen(true);
    // Pass commit function through modal submit
    window.__commitNewPoint = commit;
  }, []);

  const handleSubmitObservation = useCallback((payload) => {
    if (window.__commitNewPoint) {
      window.__commitNewPoint(payload);
      window.__commitNewPoint = undefined;
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <HeroCover />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapDashboard onAddPoint={handleAddPoint} />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <AnalyticsPanel />
          </div>
        </div>

        <GalleryPanel onSelect={(item) => {
          // In a full app, selecting a photo would pan the map to its coordinates
          alert(`Foto ${item.species} dipilih. Koordinat: ${item.coords[0].toFixed(3)}, ${item.coords[1].toFixed(3)}`);
        }} />
      </div>

      <ObservationFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        coordinates={pendingCoords}
        onSubmit={handleSubmitObservation}
      />

      <footer className="border-t border-emerald-900/40 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-neutral-400 flex items-center justify-between">
          <div>© 2025 Program Konservasi Laba-laba Kulonprogo</div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 rounded-md bg-neutral-900 ring-1 ring-emerald-400/30">Bantuan</button>
            <button className="px-3 py-1.5 rounded-md bg-emerald-500 text-black font-medium">Ekspor GeoJSON</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
