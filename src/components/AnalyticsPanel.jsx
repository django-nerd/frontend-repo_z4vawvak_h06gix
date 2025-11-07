import React, { useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sample = [
  { species: 'Nephila pilipes', count: 12 },
  { species: 'Argiope appensa', count: 7 },
  { species: 'Heteropoda venatoria', count: 9 },
  { species: 'Other', count: 5 },
];

const timeseries = [
  { date: '2025-07', value: 6 },
  { date: '2025-08', value: 9 },
  { date: '2025-09', value: 12 },
  { date: '2025-10', value: 10 },
];

export default function AnalyticsPanel() {
  const stats = useMemo(() => ({
    totalSpecies: sample.length,
    totalObs: sample.reduce((a, b) => a + b.count, 0),
    avgPerPoint: (sample.reduce((a, b) => a + b.count, 0) / 10).toFixed(1),
  }), []);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      <div className="lg:col-span-2 bg-neutral-900 text-neutral-100 rounded-xl p-4 ring-1 ring-emerald-400/30">
        <h3 className="font-semibold mb-3">Jumlah Observasi per Spesies</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sample}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="species" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip wrapperStyle={{ outline: 'none' }} contentStyle={{ background: '#111827', border: '1px solid #10b98130', color: '#e5e7eb' }} />
              <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="lg:col-span-3 bg-neutral-900 text-neutral-100 rounded-xl p-4 ring-1 ring-emerald-400/30">
        <h3 className="font-semibold mb-3">Tren Populasi (Jumlah Observasi)</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeseries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="date" tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <YAxis tick={{ fill: '#9ca3af', fontSize: 12 }} />
              <Tooltip wrapperStyle={{ outline: 'none' }} contentStyle={{ background: '#111827', border: '1px solid #10b98130', color: '#e5e7eb' }} />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={{ r: 3, stroke: '#10b981' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="lg:col-span-5 grid grid-cols-3 gap-4">
        <div className="bg-neutral-900 rounded-xl p-4 ring-1 ring-emerald-400/30 text-neutral-200">
          <div className="text-sm">Total Spesies</div>
          <div className="text-2xl font-semibold">{stats.totalSpecies}</div>
        </div>
        <div className="bg-neutral-900 rounded-xl p-4 ring-1 ring-emerald-400/30 text-neutral-200">
          <div className="text-sm">Total Observasi</div>
          <div className="text-2xl font-semibold">{stats.totalObs}</div>
        </div>
        <div className="bg-neutral-900 rounded-xl p-4 ring-1 ring-emerald-400/30 text-neutral-200">
          <div className="text-sm">Rata-rata Individu/Titik</div>
          <div className="text-2xl font-semibold">{stats.avgPerPoint}</div>
        </div>
      </div>
    </section>
  );
}
