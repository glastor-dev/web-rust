'use client';
import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulsePhase: number;
}

interface NetworkParticlesProps {
  nodeCount?: number;
  className?: string;
}

export function NetworkParticles({ nodeCount = 55, className = '' }: NetworkParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const nodesRef = useRef<Node[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Resize ──────────────────────────────────────────────
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Init nodes ──────────────────────────────────────────
    const initNodes = () => {
      nodesRef.current = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
      }));
    };
    initNodes();

    // ── Mouse ────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener('mousemove', onMouseMove);

    // ── Brand green ─────────────────────────────────────────
    const GREEN = '0, 255, 102'; // #00ff66

    // ── Animation loop ───────────────────────────────────────
    let t = 0;
    const MAX_DIST = 140;
    const REPEL_DIST = 90;

    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      // Update positions
      for (const n of nodes) {
        // Repel from cursor
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_DIST && dist > 0) {
          const force = (REPEL_DIST - dist) / REPEL_DIST;
          n.vx += (dx / dist) * force * 0.6;
          n.vy += (dy / dist) * force * 0.6;
        }

        // Damping
        n.vx *= 0.97;
        n.vy *= 0.97;

        n.x += n.vx;
        n.y += n.vy;

        // Wrap edges
        if (n.x < -10) n.x = canvas.width + 10;
        if (n.x > canvas.width + 10) n.x = -10;
        if (n.y < -10) n.y = canvas.height + 10;
        if (n.y > canvas.height + 10) n.y = -10;
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.25;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${GREEN}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const pulse = Math.sin(t + n.pulsePhase) * 0.3 + 0.7;
        const r = n.radius * pulse;

        // Outer glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        grd.addColorStop(0, `rgba(${GREEN}, ${n.opacity * 0.4})`);
        grd.addColorStop(1, `rgba(${GREEN}, 0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GREEN}, ${n.opacity})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, [nodeCount]);

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} aria-hidden="true" />;
}
