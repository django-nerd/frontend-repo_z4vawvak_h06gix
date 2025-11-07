import React, { useEffect, useState } from 'react';

export default function ObservationFormModal({ open, onClose, coordinates, onSubmit }) {
  const [form, setForm] = useState({
    date: '',
    observer: '',
    species: 'Nephila pilipes',
    count: 1,
    activity: 'diam',
    photo: '',
    location: '',
  });

  useEffect(() => {
    if (open) {
      setForm(prev => ({ ...prev, date: new Date().toISOString().slice(0, 10) }));
    }
  }, [open]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!coordinates) return;
    const payload = {
      id: Date.now(),
      ...form,
      coords: coordinates,
    };
    onSubmit?.(payload);
    onClose?.();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-neutral-900 text-neutral-100 rounded-xl p-6 ring-1 ring-emerald-400/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Tambah Observasi Baru</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-white">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="col-span-1">
            <label className="block text-sm mb-1">Tanggal</label>
            <input type="date" className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          </div>
          <div className="col-span-1">
            <label className="block text-sm mb-1">Pengamat</label>
            <input type="text" placeholder="Nama" className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2" value={form.observer} onChange={e => setForm(f => ({ ...f, observer: e.target.value }))} />
          </div>
          <div className="col-span-1">
            <label className="block text-sm mb-1">Spesies</label>
            <select className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2" value={form.species} onChange={e => setForm(f => ({ ...f, species: e.target.value }))}>
              <option>Nephila pilipes</option>
              <option>Argiope appensa</option>
              <option>Heteropoda venatoria</option>
              <option>Other</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-sm mb-1">Jumlah Individu</label>
            <input type="number" min="1" className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2" value={form.count} onChange={e => setForm(f => ({ ...f, count: Number(e.target.value) }))} />
          </div>
          <div className="col-span-1">
            <label className="block text-sm mb-1">Aktivitas</label>
            <select className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2" value={form.activity} onChange={e => setForm(f => ({ ...f, activity: e.target.value }))}>
              <option>berburu</option>
              <option>membuat jaring</option>
              <option>kawin</option>
              <option>diam</option>
            </select>
          </div>
          <div className="col-span-1">
            <label className="block text-sm mb-1">Foto (URL opsional)</label>
            <input type="url" placeholder="https://" className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2" value={form.photo} onChange={e => setForm(f => ({ ...f, photo: e.target.value }))} />
          </div>
          <div className="col-span-2">
            <label className="block text-sm mb-1">Lokasi (Desa/Kabupaten)</label>
            <input type="text" placeholder="Deskripsi lokasi" className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
          </div>
          <div className="col-span-2 flex items-center justify-between pt-2">
            <div className="text-xs text-neutral-400">Koordinat: {coordinates?.[0].toFixed(4)}, {coordinates?.[1].toFixed(4)}</div>
            <div className="flex gap-2">
              <button type="button" onClick={onClose} className="px-3 py-2 rounded-md border border-neutral-700">Batal</button>
              <button type="submit" className="px-3 py-2 rounded-md bg-emerald-500 text-black font-medium">Simpan</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
