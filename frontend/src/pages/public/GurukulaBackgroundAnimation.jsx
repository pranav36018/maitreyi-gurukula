import { useEffect, useRef, useState } from "react";
import "./GurukulaBackgroundAnimation.css";

// 5 Authentic Gurukula Visual Atmospheres
const scenicAtmospheres = [
  {
    id: "panoramic-campus",
    src: "/images/campus/campus-panoramic.webp",
    title: "12-Acre Serene Green Sanctuary • Ramohalli",
  },
  {
    id: "main-mahadwara",
    src: "/images/local/gurukula-campus-main.jpg",
    title: "Traditional Tiled Mahadwara Entrance Arch",
  },
  {
    id: "vriksha-katte",
    src: "/images/brand/hero-banner-1.jpg",
    title: "Vriksha Katte Pathashala Under Ancient Canopy",
  },
  {
    id: "morning-assembly",
    src: "/images/campus/campus-morning-assembly.webp",
    title: "Dawn Prayers & Assembly at Annapoorna Hall",
  },
  {
    id: "morning-mandapam",
    src: "/images/campus/campus-mandapam.webp",
    title: "Sacred Yajnashala & Dhyana Mandapam",
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
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || window.innerHeight),
        radius: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.35,
        speedY: -(Math.random() * 0.45 + 0.18), // rises upward gently
        opacity: Math.random() * 0.65 + 0.25,
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

        const currentOpacity = Math.max(0.12, Math.min(0.85, p.opacity));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        // Radiant golden aura
        ctx.shadowBlur = 12;
        if (p.colorType === "gold") {
          ctx.shadowColor = "rgba(251, 191, 36, 0.9)";
          ctx.fillStyle = `rgba(254, 240, 138, ${currentOpacity})`;
        } else {
          ctx.shadowColor = "rgba(245, 158, 11, 0.85)";
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

      {/* 3. Sacred Vedic Geometric Mandala (Slow Majestic Rotation) */}
      <div className="gurukula-mandala-wrapper">
        <svg
          className="gurukula-mandala-svg"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Sun Rays & Boundary */}
          <circle cx="400" cy="400" r="380" stroke="rgba(251, 191, 36, 0.35)" strokeWidth="1" strokeDasharray="4 8" />
          <circle cx="400" cy="400" r="360" stroke="rgba(251, 191, 36, 0.25)" strokeWidth="1.5" />
          <circle cx="400" cy="400" r="330" stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1" />
          
          {/* 16 Sacred Outer Lotus Petals */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <g key={`petal-outer-${i}`} transform={`rotate(${angle} 400 400)`}>
                <path
                  d="M400 70 C430 180, 430 260, 400 330 C370 260, 370 180, 400 70 Z"
                  stroke="rgba(251, 191, 36, 0.25)"
                  strokeWidth="1"
                  fill="rgba(251, 191, 36, 0.015)"
                />
              </g>
            );
          })}

          {/* Concentric Interlocking Sacred Rings */}
          <circle cx="400" cy="400" r="280" stroke="rgba(251, 191, 36, 0.3)" strokeWidth="1.2" />
          <circle cx="400" cy="400" r="240" stroke="rgba(245, 158, 11, 0.25)" strokeWidth="1" strokeDasharray="6 6" />

          {/* 8 Inner Lotus Petals */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 360) / 8 + 22.5;
            return (
              <g key={`petal-inner-${i}`} transform={`rotate(${angle} 400 400)`}>
                <path
                  d="M400 160 C425 240, 425 310, 400 360 C375 310, 375 240, 400 160 Z"
                  stroke="rgba(254, 240, 138, 0.35)"
                  strokeWidth="1.2"
                  fill="rgba(251, 191, 36, 0.025)"
                />
              </g>
            );
          })}

          {/* Sacred Interlocking Triangles (Sri Yantra / Star Geometry) */}
          <polygon
            points="400,190 580,505 220,505"
            stroke="rgba(251, 191, 36, 0.32)"
            strokeWidth="1.2"
          />
          <polygon
            points="400,610 580,295 220,295"
            stroke="rgba(251, 191, 36, 0.32)"
            strokeWidth="1.2"
          />
          <polygon
            points="400,230 550,480 250,480"
            stroke="rgba(245, 158, 11, 0.25)"
            strokeWidth="1"
          />
          <polygon
            points="400,570 550,320 250,320"
            stroke="rgba(245, 158, 11, 0.25)"
            strokeWidth="1"
          />

          {/* Center Sanctum Bindu Rings */}
          <circle cx="400" cy="400" r="140" stroke="rgba(251, 191, 36, 0.35)" strokeWidth="1.5" />
          <circle cx="400" cy="400" r="90" stroke="rgba(254, 240, 138, 0.4)" strokeWidth="1" />
          <circle cx="400" cy="400" r="50" stroke="rgba(251, 191, 36, 0.5)" strokeWidth="1.5" />
          <circle cx="400" cy="400" r="16" fill="rgba(251, 191, 36, 0.6)" />
          <circle cx="400" cy="400" r="6" fill="#FFFFFF" />
        </svg>
      </div>

      {/* 4. Ambient Golden Dawn Radiance from Top Center */}
      <div className="gurukula-dawn-radiance" />

      {/* 5. Canvas for Gently Rising Golden Motes & Sacred Embers */}
      <canvas ref={canvasRef} className="gurukula-prana-canvas" />
    </div>
  );
}

export default GurukulaBackgroundAnimation;
