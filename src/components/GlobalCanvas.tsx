/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isBrandColor: boolean;
}

export default function GlobalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      if (!canvas) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.scale(dpr, dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      initParticles(width, height);
    };

    const initParticles = (width: number, height: number) => {
      particles = [];
      // Dynamic count for performance optimization
      const isMobile = width < 768;
      const particleCount = isMobile ? 40 : 85;

      for (let i = 0; i < particleCount; i++) {
        const rand = Math.random();
        const isBrandColor = rand > 0.45;
        const radius = Math.random() * 2.2 + 1.0;

        let color = 'rgba(255, 255, 255, 0.65)';
        if (isBrandColor) {
          // Brand Purple: #7B6CF6, Brand Teal: #00D4AA
          color = Math.random() > 0.5 ? 'rgba(123, 94, 248, 0.85)' : 'rgba(0, 212, 170, 0.85)';
        }

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius,
          color,
          isBrandColor
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Attach global window listeners for interaction across all sections
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();

    const animate = () => {
      if (!canvas || !ctx) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clear full screen transparently so the body BG is preserved
      ctx.clearRect(0, 0, width, height);

      // Connect particles using faint purple/teal lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const baseOpacity = (130 - dist) / 130;
            const lineOpacity = baseOpacity * 0.13;
            ctx.beginPath();
            // Connection lines use faint purple to capture our modern boutique style
            ctx.strokeStyle = `rgba(123, 94, 248, ${lineOpacity})`;
            ctx.lineWidth = 0.55;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;

        if (p.isBrandColor) {
          ctx.shadowBlur = 3;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap or bounce off screen edges nicely
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Magnet mouse effect
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        if (mx > -100 && my > -100) {
          const mdx = mx - p.x;
          const mdy = my - p.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 150) {
            const force = (150 - mdist) / 150;
            // Push gently
            p.x -= (mdx / mdist) * force * 1.5;
            p.y -= (mdy / mdist) * force * 1.5;
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
