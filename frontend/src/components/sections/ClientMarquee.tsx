import { motion } from 'motion/react';

const clients = [
  { name: "STRIPE", icon: "/icons/stripe.svg" },
  { name: "SLACK", icon: "/icons/slack.svg" },
  { name: "2K GAMES", icon: "/icons/2k.svg" },
  { name: "VUE", icon: "/icons/vue.svg" },
  { name: "ALACRITTY", icon: "/icons/alacritty.svg" },
  { name: "1PANEL", icon: "/icons/1panel.svg" }
];

// Duplicate for infinite scroll
const duplicatedClients = [...clients, ...clients, ...clients];

export function ClientMarquee() {
  return (
    <section className="py-12 border-y border-white/10 overflow-hidden bg-black relative">
      {/* Gradients for smooth fade out at edges */}
      <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-black to-transparent z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-12">
         <h4 className="text-zinc-600 text-xs font-mono uppercase tracking-widest text-center">
            Sistemas críticos impulsados por nuestra infraestructura
         </h4>
      </div>

      <div className="relative flex w-full overflow-hidden">
        <motion.div 
          className="flex whitespace-nowrap gap-16 md:gap-32 px-6 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 35, 
            repeat: Infinity 
          }}
        >
          {duplicatedClients.map((client, index) => (
            <div 
              key={`${client.name}-${index}`} 
              className="flex items-center gap-6 group opacity-50 hover:opacity-100 transition-opacity duration-300"
            >
              <img 
                src={client.icon} 
                alt={client.name} 
                className="w-12 h-12 md:w-16 md:h-16 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-zinc-700 group-hover:text-white transition-colors duration-300">
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
