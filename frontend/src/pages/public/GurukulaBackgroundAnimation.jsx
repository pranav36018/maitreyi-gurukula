import { useEffect, useRef, useState } from "react";
import "./GurukulaBackgroundAnimation.css";

// 5 Authentic Gurukula Visual Atmospheres
const scenicAtmospheres = [
  {
    id: "panoramic-campus",
    src: "/images/campus/campus-panoramic.webp",
    title: "12-Acre Serene Green Sanctuary",
  },
  {
    id: "morning-mandapam",
    src: "/images/campus/campus-mandapam.webp",
    title: "Sacred Yajnashala & Dhyana Mandapam",
  },
  {
    id: "morning-assembly",
    src: "/images/campus/campus-morning-assembly.webp",
    title: "Dawn Prayers & Chanting Assembly",
  },
  {
    id: "main-ashram",
    src: "/images/local/gurukula-campus-main.jpg",
    title: "Ramohalli Parisara Courtyard",
  },
  {
    id: "celebration-mandala",
    src: "/images/events/celebration-flower-mandala.webp",
    title: "Auspicious Floral Rangoli Mandala",
  },
];

function GurukulaBackgroundAnimation({ isHeroOnly = true, variant = isHeroOnly ? "hero" : "content" }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Smooth cinematic crossfade between authentic backdrops
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % scenicAtmospheres.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // HTML5 Canvas for Floating Golden Prana Motes & Radiant Sun Sparks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;

    const resize = () => {
      const container = containerRef.current || canvas.parentElement;
      if (!container) return;
      width = container.offsetWidth || window.innerWidth;
      height = container.offsetHeight || window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Golden sparks and sacred prana motes
    const particles = [];
    const particleCount = 42;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || window.innerHeight),
        radius: Math.random() * 2.4 + 0.9,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -(Math.random() * 0.5 + 0.2), // rises upward gently
        opacity: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        colorType: Math.random() > 0.35 ? "gold" : "saffron",
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.01;

        // Wrap around smoothly
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentOpacity = Math.max(0.15, Math.min(0.9, p.opacity));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Radiant golden aura
        ctx.shadowBlur = 14;
        if (p.colorType === "gold") {
          ctx.shadowColor = "rgba(251, 191, 36, 0.95)";
          ctx.fillStyle = `rgba(254, 240, 138, ${currentOpacity})`;
        } else {
          ctx.shadowColor = "rgba(245, 158, 11, 0.9)";
          ctx.fillStyle = `rgba(251, 191, 36, ${currentOpacity})`;
        }

        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`gurukula-ambient-container ${variant === "hero" ? "hero-ambient" : "content-ambient"}`}
      aria-hidden="true"
    >
      {/* 1. Deep Celestial Sacred Atmosphere */}
      <div className="gurukula-sky-atmosphere" />

      {/* 2. Scenic Photographic Panorama with Cinematic Lighting */}
      <div className="gurukula-photo-slideshow">
        {scenicAtmospheres.map((scene, idx) => (
          <div
            key={scene.id}
            className={`gurukula-photo-slide ${idx === activeIdx ? "active" : ""}`}
            style={{ backgroundImage: `url(${scene.src})` }}
          />
        ))}
        {/* Royal Scrim Vignette: Balances photo brilliance with text contrast */}
        <div className="gurukula-royal-scrim" />
      </div>

      {/* 3. Ambient Golden Dawn Radiance from Top Center */}
      <div className="gurukula-dawn-radiance" />

      {/* 4. Canvas for Gently Rising Golden Motes & Sacred Embers */}
      <canvas ref={canvasRef} className="gurukula-prana-canvas" />
    </div>
  );
}

export default GurukulaBackgroundAnimation;
