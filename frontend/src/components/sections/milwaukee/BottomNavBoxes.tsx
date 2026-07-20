'use client';

export function BottomNavBoxes() {
  const boxes = [
    { title: 'EMPRESA Y CARRERAS', img: '/images/noise.svg' },
    { title: 'TIENDA DE ARTÍCULOS', img: '/images/noise.svg' },
    { title: 'CONTÁCTANOS', img: '/images/noise.svg' },
  ];

  return (
    <section className="w-full bg-[#050505]">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {boxes.map((box, i) => (
          <div
            key={i}
            className="relative h-64 md:h-80 w-full group cursor-pointer overflow-hidden border-r border-b border-white/5"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 opacity-40 mix-blend-overlay bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              style={{ backgroundImage: `url(${box.img})` }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 group-hover:bg-brand/20 transition-colors duration-500" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <h3 className="text-white font-black uppercase text-2xl md:text-3xl tracking-tighter drop-shadow-md">
                {box.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
