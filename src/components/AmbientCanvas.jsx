import React, { useEffect, useRef } from 'react';

/**
 * Section 02: Ambient Canvas Component
 * Renders an atmospheric canvas particle system and vignette depth layers.
 */
export const AmbientCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Disable heavy canvas particle animation loop on mobile to preserve 60/120fps touch scroll
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let animId;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const count = window.innerWidth < 768 ? 16 : 40;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        speedY: Math.random() * 0.35 + 0.1,
        speedX: (Math.random() - 0.5) * 0.2,
        blue: Math.random() > 0.65
      });
    }

    // High performance batched rendering: single path for blue, single path for white
    const render = () => {
      if (document.hidden) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Blue particle batch (1 path, 1 fill)
      ctx.fillStyle = 'rgba(0, 162, 232, 0.45)';
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (p.blue) {
          ctx.moveTo(p.x + p.radius, p.y);
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        }
      }
      ctx.fill();

      // 2. White particle batch (1 path, 1 fill)
      ctx.fillStyle = 'rgba(240, 246, 255, 0.32)';
      ctx.beginPath();
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!p.blue) {
          ctx.moveTo(p.x + p.radius, p.y);
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        }

        // Advance positions
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
      }
      ctx.fill();

      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="ambient-canvas" aria-hidden="true" />
      <div className="vignette-overlay" aria-hidden="true" />
    </>
  );
};

export default AmbientCanvas;

