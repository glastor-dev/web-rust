'use client';

export function SocialFeedGrid() {
  const posts = [
    { img: 'IMG', alt: 'Trabajo en altura' },
    { img: 'IMG', alt: 'Corte de concreto' },
    { img: 'IMG', alt: 'Obra en construcción' },
    { img: 'IMG', alt: 'Mecánica pesada' },
    { img: 'IMG', alt: 'Instalación eléctrica' },
  ];

  return (
    <section className="w-full bg-white py-8 border-b-8 border-brand">
      <div className="text-center mb-6">
        <h3 className="text-black font-black uppercase text-xl md:text-2xl tracking-tighter italic">
          ÚNETE A LA <span className="text-brand">CONVERSACIÓN</span>
        </h3>
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mt-1">
          #GLASTORTOOL
        </p>
      </div>

      <div className="w-full flex flex-nowrap overflow-x-auto snap-x snap-mandatory hide-scrollbar">
        {posts.map((post, i) => (
          <div
            key={i}
            className="w-[80vw] md:w-1/5 shrink-0 aspect-square md:aspect-auto md:h-48 bg-zinc-200 border-r border-white relative group cursor-pointer snap-start"
          >
            {/* Fake Image Background */}
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <span className="text-zinc-500 text-xs font-bold uppercase">{post.img}</span>
            </div>

            {/* Hover overlay with social icon (fake) */}
            <div className="absolute inset-0 bg-brand/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-black font-black uppercase tracking-widest text-xs">
                VER POST
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
