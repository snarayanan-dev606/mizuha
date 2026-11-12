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
    const count = window.innerWidth < 768 ? 35 : 85;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.4,
        speedY: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        blue: Math.random() > 0.6
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.blue 
          ? `rgba(0, 162, 232, ${p.alpha * 0.7})` 
          : `rgba(240, 246, 255, ${p.alpha * 0.4})`;
        ctx.fill();

        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
      }
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

