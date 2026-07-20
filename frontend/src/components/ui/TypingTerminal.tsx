'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Code2 } from 'lucide-react';
import { TerminalCard } from '../reutilizables/TerminalCard';

const codeLines = [
  { text: '#[derive(Debug, Clone)]', class: 'text-zinc-500' },
  { text: 'pub struct Engine {', class: 'text-white' },
  { text: '    throughput: AtomicU64,', class: 'text-brand/80' },
  { text: '    latency_ms: f32,', class: 'text-brand/80' },
  { text: '    status: SystemState,', class: 'text-brand/80' },
  { text: '}', class: 'text-white' },
  { text: '', class: '' },
  { text: 'impl Engine {', class: 'text-white' },
  { text: '    pub async fn boot() -> Result<Self> {', class: 'text-brand' },
  { text: '        // Zero-cost abstractions initialized', class: 'text-zinc-600' },
  { text: '        tracing::info!("System scaling to 100%.");', class: 'text-white' },
  { text: '    }', class: 'text-white' },
  { text: '}', class: 'text-white' },
];

export function TypingTerminal() {
  const [displayedLines, setDisplayedLines] = useState<{ text: string; class: string }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) return;

    const currentLine = codeLines[currentLineIndex];

    if (currentCharIndex < currentLine.text.length) {
      const timeout = setTimeout(
        () => {
          setCurrentCharIndex((prev) => prev + 1);
        },
        Math.random() * 30 + 10,
      );
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, currentLine]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  return (
    <TerminalCard title="glastor_core.rs" className="min-h-100">
      <div className="p-6 font-mono text-xs md:text-sm leading-relaxed overflow-hidden">
        {displayedLines.map((line, i) => (
          <p key={i} className={line.class}>
            {line.text === '' ? <br /> : line.text}
          </p>
        ))}

        {currentLineIndex < codeLines.length && (
          <p className={codeLines[currentLineIndex].class}>
            {codeLines[currentLineIndex].text.substring(0, currentCharIndex)}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-brand ml-1 align-middle"
            />
          </p>
        )}

        {currentLineIndex >= codeLines.length && (
          <p>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 bg-brand ml-1 align-middle"
            />
          </p>
        )}
      </div>

      <div className="absolute bottom-4 right-4 animate-pulse">
        <Code2 className="text-brand opacity-50" size={24} />
      </div>
    </TerminalCard>
  );
}
