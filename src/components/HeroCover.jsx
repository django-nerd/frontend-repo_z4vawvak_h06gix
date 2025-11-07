import React from 'react';
import Spline from '@splinetool/react-spline';

export default function HeroCover() {
  return (
    <section className="relative w-full h-[42vh] min-h-[360px] overflow-hidden rounded-xl bg-black/90">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/6tUXqVcUA0xgJugv/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />

      <div className="relative z-10 h-full flex flex-col items-start justify-end p-6 sm:p-10 text-white">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 ring-1 ring-emerald-400/40">
            <span className="text-2xl">🕷️</span>
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            Program Konservasi Laba-laba Kulonprogo
          </h1>
        </div>
        <p className="max-w-3xl text-sm sm:text-base text-emerald-100/90">
          Dashboard pemantauan sebaran dan aktivitas laba-laba berbasis peta — untuk peneliti dan mahasiswa mencatat, memfilter, dan menganalisis observasi lapangan secara spasial.
        </p>
      </div>
    </section>
  );
}
