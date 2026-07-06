import { motion } from 'motion/react';

const technologies = [
  { name: "RUST", icon: "/icons/rust.svg" },
  { name: "BUN", icon: "/icons/bun.svg" },
  { name: "POSTGRESQL", icon: "/icons/postgresql.svg" },
  { name: "KAFKA", icon: "/icons/kafka.svg" },
  { name: "REDIS", icon: "/icons/redis.svg" },
  { name: "KUBERNETES", icon: "/icons/kubernetes.svg" },
  { name: "DOCKER", icon: "/icons/docker.svg" },
  { name: "CLOUDFLARE", icon: "/icons/cloudflare.svg" },
  { name: "TERRAFORM", icon: "/icons/terraform.svg" }
];

// Triplicar para asegurar el bucle continuo sin saltos visuales en pantallas anchas
const duplicatedTech = [...technologies, ...technologies, ...technologies, ...technologies];

export function TrustBar() {
  return (
    <div className="w-full border-y border-white/10 bg-black overflow-hidden py-12 relative flex items-center group">
      {/* Sombras en los bordes para desvanecimiento suave */}
      <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-linear-to-l from-black to-transparent z-10 pointer-events-none" />
      
      <div className="flex whitespace-nowrap overflow-hidden">
        <motion.div 
          className="flex items-center gap-8 md:gap-24 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 40, 
            repeat: Infinity 
          }}
        >
          {duplicatedTech.map((tech, idx) => (
            <div key={idx} className="flex items-center gap-8 md:gap-24 group-hover:opacity-100 opacity-50 hover:opacity-100! transition-opacity duration-300">
              <div className="flex items-center gap-6">
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-12 h-12 md:w-16 md:h-16 object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
                <span 
                  className="text-3xl md:text-6xl font-black uppercase tracking-tighter transition-colors duration-500 text-transparent cursor-default block"
                  style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.15)' }}
                >
                  {tech.name}
                </span>
              </div>
              <span className="text-brand opacity-30 text-2xl">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
