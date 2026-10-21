import { useState, useEffect, useRef, useCallback } from "react";
import {
  Sparkles,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Camera,
  ArrowRight,
  MapPin,
} from "lucide-react";
import "./HeroShowcaseCard.css";

// 6 Authentic High-Resolution Gurukula Photographs with 100% Matching Context
export const SHOWCASE_GLIMPSES = [
  {
    id: "vedic-shastras",
    tag: "🌳 Vriksha Katte",
    title: "Open-Air Vriksha Katte Under Sacred Tree Canopy",
    category: "SHASTRA & SANSKRIT IMMERSION",
    src: "/images/brand/hero-banner-1.jpg",
    alt: "Acharya teaching girl students seated on the stone platform under the sacred tree in Ramohalli",
    desc: "Acharya instructing young shishyas in Rigvedic suktas and spoken Sanskrit grammar upon the circular stone platform under the ancient sacred tree.",
    location: "Vriksha Katte Mandapam • 12-Acre Ramohalli Campus",
  },
  {
    id: "campus-parisara",
    tag: "👨‍👩‍👧‍👧 Gurukula Family",
    title: "The Gurukula Kutumba: Student Cohort with Founder",
    category: "SACRED RAMOHALLI PARISARA",
    src: "/images/local/gurukula-activity-1.jpg",
    alt: "Complete residential student cohort seated and standing with Managing Trustee Sri Pramod Kamath under ancient trees",
    desc: "Our residential family of shishyas across 6th Standard to 2nd PUC gathered with Managing Trustee Sri Pramod Kamath in the tranquil green grove.",
    location: "Ramohalli Parisara • Near Big Banyan Tree",
  },
  {
    id: "dawn-prayer",
    tag: "🌅 Dawn Assembly",
    title: "Morning Flag Hoisting & Prarthana at Annapoorna Hall",
    category: "DAILY DINACHARYA & PATRIOTISM",
    src: "/images/local/gurukula-activity-3.jpg",
    alt: "Students in white uniforms with saffron waistbands gathered before Annapoorna Hall during morning flag hoisting",
    desc: "Students in pristine white uniforms with saffron waistbands gathered before the Annapoorna Main Hall for morning prayers and patriotic pledge.",
    location: "Annapoorna Prangana Forecourt",
  },
  {
    id: "ghosh-band",
    tag: "🥁 Ghosh Band",
    title: "Disciplined All-Girls Ghosh Marching Band & Drums",
    category: "MARTIAL AGILITY & TEAM RIGOR",
    src: "/images/events/independence-day-1.webp",
    alt: "Maitreyi Gurukula Ghosh band in white uniforms, red sashes, and ceremonial berets marching with snare and bass drums",
    desc: "Synchronized student marching band with snare drums, bass drums, and ceremonial formation fostering courage, rhythm, and sisterly unity.",
    location: "Campus Parade Ground",
  },
  {
    id: "mandir-puja",
    tag: "🪔 Mandir Puja",
    title: "Daily Morning Devarapooje & Sanctum Deeparadhana",
    category: "LIVING VEDIC SANSKARA",
    src: "/images/brand/hero-banner-2.jpg",
    alt: "Girl students seated in devotion performing morning puja and lamp worship before the consecrated Lord Krishna shrine",
    desc: "Young shishyas lighting brass oil lamps, offering flowers, and chanting stotras before the consecrated Lord Krishna shrine in the prayer hall.",
    location: "Ashram Prayer Sanctum",
  },
  {
    id: "campus-mahadwara",
    tag: "⛩️ Mahadwara",
    title: "Grand Campus Mahadwara: Traditional Tiled Gateway",
    category: "HERITAGE ARCHITECTURE",
    src: "/images/local/gurukula-campus-main.jpg",
    alt: "Traditional tiled-roof entrance arch of Shubham Karoti Maitreyi Gurukula crowned with the sacred Om symbol",
    desc: "The welcoming terracotta-roofed stone archway crowned with the sacred Om emblem and Kannada inscription at our 12-acre Ramohalli sanctuary.",
    location: "Main Gateway • Ramohalli, Bengaluru",
  },
];

export default function HeroShowcaseCard() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const autoPlayTimerRef = useRef(null);

  const handleNext = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % SHOWCASE_GLIMPSES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIdx((prev) => (prev - 1 + SHOWCASE_GLIMPSES.length) % SHOWCASE_GLIMPSES.length);
  }, []);

  // Keyboard Navigation: ESC to exit fullscreen, Left/Right arrows to change photo
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.keyCode === 27) {
        setIsLightboxOpen(false);
      }
      if (e.key === "ArrowLeft" || e.keyCode === 37) {
        handlePrev();
        setIsPlaying(false);
      }
      if (e.key === "ArrowRight" || e.keyCode === 39) {
        handleNext();
        setIsPlaying(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext]);

  // Lock body scroll when Lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  // Auto-advance photos every 5.5 seconds when autoplay is enabled
  useEffect(() => {
    if (!isPlaying) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      handleNext();
    }, 5500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying, handleNext]);

  const currentPhoto = SHOWCASE_GLIMPSES[currentIdx];

  return (
    <div className="hero-showcase-container">
      {/* Outer Card with Soft Golden Border Glow */}
      <div className="showcase-outer-card">
        {/* ================= TOP HEADER BAR ================= */}
        <div className="showcase-card-header">
          <div className="showcase-header-title">
            <Camera size={15} className="showcase-cam-icon" />
            <span>CAMPUS DARSHANAM • VISUAL TOUR</span>
          </div>

          <div className="showcase-header-controls">
            {/* Labeled Prev / Next Button Bar for Explicit Choice */}
            <div className="showcase-header-nav-group">
              <button
                type="button"
                className="showcase-header-arrow-btn"
                onClick={() => {
                  handlePrev();
                  setIsPlaying(false);
                }}
                title="View Previous Photo (or press Left Arrow)"
                aria-label="Previous Photo"
              >
                <ChevronLeft size={16} />
                <span className="btn-text-label">Prev</span>
              </button>

              <span className="showcase-counter-badge">
                <strong>{String(currentIdx + 1).padStart(2, "0")}</strong> / {String(SHOWCASE_GLIMPSES.length).padStart(2, "0")}
              </span>

              <button
                type="button"
                className="showcase-header-arrow-btn"
                onClick={() => {
                  handleNext();
                  setIsPlaying(false);
                }}
                title="View Next Photo (or press Right Arrow)"
                aria-label="Next Photo"
              >
                <span className="btn-text-label">Next</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Autoplay Play/Pause Button */}
            <button
              type="button"
              className={`showcase-ctrl-btn ${isPlaying ? "active" : ""}`}
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause auto-slideshow" : "Start auto-slideshow"}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            </button>

            {/* Fullscreen Expand Button */}
            <button
              type="button"
              className="showcase-ctrl-btn"
              onClick={() => setIsLightboxOpen(true)}
              title="Enlarge photograph full-screen (Press ESC to exit)"
              aria-label="Enlarge image"
            >
              <Maximize2 size={13} />
            </button>
          </div>
        </div>

        {/* ================= MAIN PHOTO STAGE ================= */}
        <div
          className="showcase-photo-stage"
          onClick={() => setIsLightboxOpen(true)}
          title="Click to view full screen (Press ESC to exit)"
        >
          {/* Main Visual Image */}
          <img
            key={currentPhoto.src}
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            className="showcase-main-photo"
            loading="eager"
          />

          {/* Deep Emerald Vignette Scrim */}
          <div className="showcase-stage-scrim" />

          {/* Category Tag Pill */}
          <div className="showcase-category-pill">
            <Sparkles size={11} className="pill-sparkle-ico" />
            <span>{currentPhoto.category}</span>
          </div>

          {/* Large, Prominent Floating Previous Button */}
          <button
            type="button"
            className="showcase-nav-arrow arrow-prev"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
              setIsPlaying(false);
            }}
            title="Previous Photo (Left Arrow)"
            aria-label="Previous photograph"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Large, Prominent Floating Next Button */}
          <button
            type="button"
            className="showcase-nav-arrow arrow-next"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
              setIsPlaying(false);
            }}
            title="Next Photo (Right Arrow)"
            aria-label="Next photograph"
          >
            <ChevronRight size={24} />
          </button>

          {/* Bottom Captions Overlay */}
          <div className="showcase-caption-overlay">
            <div className="caption-location-row">
              <MapPin size={12} className="caption-pin-ico" />
              <span>{currentPhoto.location}</span>
            </div>
            <h3 className="caption-title">{currentPhoto.title}</h3>
            <p className="caption-desc">{currentPhoto.desc}</p>
          </div>

          {/* Subtle Progress Bar */}
          {isPlaying && <div className="showcase-autoplay-progress" />}
        </div>

        {/* ================= THUMBNAIL FILMSTRIP BAR ================= */}
        <div className="showcase-thumb-bar">
          {SHOWCASE_GLIMPSES.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              className={`showcase-thumb-btn ${currentIdx === idx ? "active" : ""}`}
              onClick={() => {
                setCurrentIdx(idx);
                setIsPlaying(false);
              }}
              title={`View ${item.title}`}
            >
              <img src={item.src} alt={item.title} />
              <span className="thumb-label-text">
                {item.tag.replace(/^[^\s]+\s/, "")}
              </span>
            </button>
          ))}
        </div>

        {/* ================= CARD FOOTER ================= */}
        <div className="showcase-bottom-bar">
          <div className="showcase-footer-left">
            <span className="footer-gold-dot">✦</span>
            <span>100% Free Residential Sanskrit &amp; Board Education</span>
          </div>
          <a href="#gallery" className="showcase-gallery-link">
            <span>View All 25+ Photos</span>
            <ArrowRight size={13} />
          </a>
        </div>
      </div>

      {/* ================= LIGHTBOX MODAL ================= */}
      {isLightboxOpen && (
        <div
          className="showcase-lightbox-backdrop"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Full screen photo view"
        >
          <div
            className="showcase-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header with ESC Hint and Close Button */}
            <div className="lightbox-top-bar">
              <span className="lightbox-esc-hint">
                <kbd>ESC</kbd> to exit fullscreen • <kbd>←</kbd> <kbd>→</kbd> to navigate
              </span>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setIsLightboxOpen(false)}
                title="Close (or press ESC)"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="lightbox-image-stage">
              <img
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                className="lightbox-photo"
              />

              {/* Lightbox Prev / Next Controls */}
              <button
                type="button"
                className="lightbox-arrow lightbox-arrow-left"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                title="Previous Photo (Left Arrow)"
                aria-label="Previous photo"
              >
                <ChevronLeft size={30} />
              </button>

              <button
                type="button"
                className="lightbox-arrow lightbox-arrow-right"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                title="Next Photo (Right Arrow)"
                aria-label="Next photo"
              >
                <ChevronRight size={30} />
              </button>
            </div>

            <div className="lightbox-info">
              <div className="lightbox-info-header">
                <span className="lightbox-tag-pill">{currentPhoto.category}</span>
                <span className="lightbox-counter">
                  {currentIdx + 1} of {SHOWCASE_GLIMPSES.length}
                </span>
              </div>
              <h3>{currentPhoto.title}</h3>
              <p>{currentPhoto.desc}</p>
              <span className="lightbox-location-text">
                📍 {currentPhoto.location}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
