const fs = require('fs');
const path = require('path');

const replacements = [
  {
    file: 'src/components/reutilizables/accordion.tsx',
    rules: [
      { from: '[&[data-state=open]]:text-brand', to: 'data-[state=open]:text-brand' }
    ]
  },
  {
    file: 'src/components/reutilizables/card.tsx',
    rules: [
      { from: 'bg-white/[0.02]', to: 'bg-white/2' },
      { from: 'group-hover:bg-brand/[0.02]', to: 'group-hover:bg-brand/2' },
      { from: 'bg-white/[0.01]', to: 'bg-white/1' }
    ]
  },
  {
    file: 'src/components/sections/ClientMarquee.tsx',
    rules: [
      { from: 'bg-gradient-to-r', to: 'bg-linear-to-r' },
      { from: 'bg-gradient-to-l', to: 'bg-linear-to-l' }
    ]
  },
  {
    file: 'src/components/sections/HeroSection.tsx',
    rules: [
      { from: 'bg-[#00ff66]/10', to: 'bg-brand/10' }
    ]
  },
  {
    file: 'src/components/sections/Nosotros/AntiTimeline.tsx',
    rules: [
      { from: 'pl-[5.5rem]', to: 'pl-22' },
      { from: 'md:pl-[8.5rem]', to: 'md:pl-34' }
    ]
  },
  {
    file: 'src/components/sections/ProofSection.tsx',
    rules: [
      { from: 'flex-grow', to: 'grow' }
    ]
  },
  {
    file: 'src/components/sections/ServiceDetail.tsx',
    rules: [
      { from: 'bg-white/[0.02]', to: 'bg-white/2' }
    ]
  },
  {
    file: 'src/components/ui/CookieBanner.tsx',
    rules: [
      { from: 'z-[100]', to: 'z-100' }
    ]
  },
  {
    file: 'src/components/ui/CustomCursor.tsx',
    rules: [
      { from: 'z-[99999]', to: 'z-99999' }
    ]
  },
  {
    file: 'src/components/ui/NoiseOverlay.tsx',
    rules: [
      { from: 'z-[9999]', to: 'z-9999' }
    ]
  },
  {
    file: 'src/components/ui/PageHero.tsx',
    rules: [
      { from: 'bg-[#00ff66]/10', to: 'bg-brand/10' },
      { from: 'break-words', to: 'wrap-break-word' }
    ]
  },
  {
    file: 'src/components/ui/SOWModal.tsx',
    rules: [
      { from: 'border-[#00ff66]/30', to: 'border-brand/30' },
      { from: 'focus:border-[#00ff66]', to: 'focus:border-brand' }
    ]
  },
  {
    file: 'src/components/ui/SOWTemplate.tsx',
    rules: [
      { from: 'text-[#00ff66]', to: 'text-brand' }
    ]
  },
  {
    file: 'src/components/ui/TeamEasterEgg.tsx',
    rules: [
      { from: 'group-hover:[transform:rotateY(180deg)]', to: 'group-hover:transform-[rotateY(180deg)]' },
      { from: '[transform:rotateY(-180deg)]', to: 'transform-[rotateY(-180deg)]' },
      { from: 'group-hover:[transform:rotateY(0deg)]', to: 'group-hover:transform-[rotateY(0deg)]' }
    ]
  },
  {
    file: 'src/components/ui/TrustBar.tsx',
    rules: [
      { from: 'bg-gradient-to-r', to: 'bg-linear-to-r' },
      { from: 'bg-gradient-to-l', to: 'bg-linear-to-l' },
      { from: 'hover:!opacity-100', to: 'hover:opacity-100!' }
    ]
  },
  {
    file: 'src/pages/Legal/Arrepentimiento.tsx',
    rules: [
      { from: '[color-scheme:dark]', to: 'scheme-dark' }
    ]
  },
  {
    file: 'src/pages/NotFound.tsx',
    rules: [
      { from: 'bg-[size:24px_24px]', to: 'bg-size-[24px_24px]' },
      { from: 'bg-gradient-to-b', to: 'bg-linear-to-b' }
    ]
  }
];

for (const { file, rules } of replacements) {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf-8');
    for (const rule of rules) {
      // Use global regex to replace all instances in the file just in case
      // escape regex special characters in rule.from
      const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      content = content.replace(new RegExp(escapeRegExp(rule.from), 'g'), rule.to);
    }
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
}
