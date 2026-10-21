import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
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
  BookOpen,
} from "lucide-react";
import "./HeroShowcaseCard.css";

// 6 Authentic High-Resolution Gurukula Photographs with 100% Matching Context & Details
export const SHOWCASE_GLIMPSES = [
  {
    id: "vedic-shastras",
    tag: "🌳 Vriksha Katte",
    title: "Open-Air Vriksha Katte Shastra Pathashala Under Sacred Canopy",
    category: "SHASTRA & SANSKRIT IMMERSION",
    src: "/images/brand/hero-banner-1.jpg",
    alt: "Acharya teaching girl students seated on the stone platform under the sacred tree in Ramohalli",
    desc: "Acharya instructing young residential shishyas in Rigvedic mantras, Paninian Sanskrit grammar, and oral sloka recitation in the open-air classroom upon the circular stone platform under the ancient sacred tree.",
    context: "In accordance with ancient Guru-Shishya tradition, students learn shastras in natural open-air settings, fostering deep mental focus, vocal purity, and harmonious communion with nature.",
    location: "Vriksha Katte Stone Platform • 12-Acre Ramohalli Campus, Bengaluru",
    keyChips: ["Rigvedic Mantras", "Paninian Grammar", "Daily Oral Recitation", "Guru-Shishya Parampara"],
  },
  {
    id: "campus-parisara",
    tag: "👨‍👩‍👧‍👧 Gurukula Kutumba",
    title: "The Gurukula Kutumba: Residential Student Cohort with Founder",
    category: "GURUKULA FAMILY & RESIDENTIAL SEVA",
    src: "/images/local/gurukula-activity-1.jpg",
    alt: "Complete residential student cohort seated and standing in rows with Managing Trustee Sri Pramod Kamath under ancient trees",
    desc: "The complete residential family of girl shishyas from 6th Standard through 2nd PUC gathered in traditional festive attire with Managing Trustee Sri Pramod Kamath in the tranquil campus grove.",
    context: "Living as one unified family (Kutumba) under the care of resident Matrushrees and Acharyas, students from across Karnataka receive 100% free residential education, satvic meals, and loving parental mentorship.",
    location: "Campus Green Grove • Ramohalli Parisara (Near Big Banyan Tree), Bengaluru",
    keyChips: ["100% Free Living & Meals", "Class 6th to 2nd PUC", "Matrushree Mentorship", "300+ Alumni Sisterhood"],
  },
  {
    id: "dawn-prayer",
    tag: "🌅 Dawn Assembly",
    title: "Morning Flag Hoisting & Prarthana Assembly at Annapoorna Hall",
    category: "DAILY DINACHARYA & PATRIOTISM",
    src: "/images/local/gurukula-activity-3.jpg",
    alt: "Students in white uniforms with saffron waistbands gathered before Annapoorna Hall during morning flag hoisting",
    desc: "Students in pristine white uniforms with saffron waistbands gathered at dawn before Annapoorna Main Hall for the national flag hoisting, Vedic prayers, and daily patriotic pledge.",
    context: "The daily Dinacharya instills spiritual grounding and patriotic duty. The morning assembly combines the chanting of Vedic Shanti Mantras with the national anthem and physical agility drills.",
    location: "Annapoorna Prangana Forecourt • Ramohalli Campus",
    keyChips: ["Daily 5:00 AM Jagaran", "Vedic Shanti Mantras", "National Pride", "Annapoorna Forecourt"],
  },
  {
    id: "ghosh-band",
    tag: "🥁 Ghosh Band",
    title: "Disciplined All-Girls Ghosh Marching Band & Drum Parade",
    category: "MARTIAL AGILITY & TEAM DISCIPLINE",
    src: "/images/events/independence-day-1.webp",
    alt: "Maitreyi Gurukula Ghosh band in white uniforms, red sashes, and ceremonial berets marching with snare and bass drums",
    desc: "Synchronized student marching band with snare drums, bass drums, and ceremonial formations, fostering physical stamina, rhythm, courage, and sisterly unity.",
    context: "100% student-conducted Ghosh band trains young girls in rhythmic coordination, martial courage, leadership, and synchronized teamwork, regularly performing at prestigious cultural assemblies.",
    location: "Campus Parade Grounds • Ramohalli, Bengaluru",
    keyChips: ["100% Student-Conducted", "Snare & Bass Drums", "Martial Discipline", "Cultural Utsavas"],
  },
  {
    id: "mandir-puja",
    tag: "🪔 Mandir Puja",
    title: "Daily Morning Devarapooje & Sanctum Deeparadhana",
    category: "LIVING VEDIC SANSKARA & DEVOTION",
    src: "/images/brand/hero-banner-2.jpg",
    alt: "Girl students seated in devotion performing morning puja and lamp worship before the consecrated Lord Krishna shrine",
    desc: "Young shishyas lighting traditional brass oil lamps, offering fresh flowers, and chanting devotional stotras before the consecrated Lord Krishna shrine in the prayer sanctum.",
    context: "Daily Sandhya Vandanam, Agnihotra fire offerings, and temple rituals nurture inner tranquility, gratitude, and moral purity from childhood.",
    location: "Ashram Prayer Sanctum • Ramohalli Gurukula",
    keyChips: ["Lord Krishna Shrine", "Daily Agnihotra", "Sandhya Vandanam", "Brass Deeparadhana"],
  },
  {
    id: "campus-mahadwara",
    tag: "⛩️ Mahadwara",
    title: "Grand Campus Mahadwara: Traditional Tiled Gateway",
    category: "HERITAGE ASHRAM ARCHITECTURE",
    src: "/images/local/gurukula-campus-main.jpg",
    alt: "Traditional tiled-roof entrance arch of Shubham Karoti Maitreyi Gurukula crowned with the sacred Om symbol",
    desc: "The welcoming terracotta-roofed stone archway crowned with the sacred Om emblem and Kannada inscription, marking the entrance into our 12-to-20-acre lush sanctuary.",
    context: "Inaugurated on Vyasa Poornima in 1994, this sacred portal marks the boundary between urban bustle and the peaceful shastric retreat located near Bengaluru's landmark Big Banyan Tree.",
    location: "Main Gateway • Ramohalli, Bengaluru (Near Big Banyan Tree)",
    keyChips: ["Established 1994", "12-Acre Green Haven", "Near Big Banyan Tree", "BMTC 227 Direct Transit"],
  },
  {
    id: "floral-mandala",
    tag: "🪷 Floral Rangoli",
    title: "Auspicious Flower Rangoli Mandala on Utsava Celebrations",
    category: "TRADITIONAL SANSKRITI & FESTIVITY",
    src: "/images/events/celebration-flower-mandala.webp",
    alt: "Students creating an ornate circular flower rangoli mandala with marigolds and rose petals in the courtyard",
    desc: "Girl shishyas creating an intricate sacred floral mandala using marigold petals, lotus blossoms, and traditional lamps during annual Gurupoornima festivities.",
    context: "Fostering sacred aesthetics and artistic devotion, floral rangoli creation is an integral part of ashram celebrations, uniting students in collaborative sacred geometry.",
    location: "Ashram Central Courtyard • Ramohalli Campus",
    keyChips: ["Gurupoornima Utsava", "Sacred Geometry", "Flower Rangoli", "Ashram Aesthetics"],
  },
  {
    id: "cultural-natya",
    tag: "🎭 Classical Natya",
    title: "Swami Vivekananda Chicago World Parliament Historic Play",
    category: "THEATRICAL ARTS & BHARATANATYAM",
    src: "/images/events/vivekananda-chicago-2.webp",
    alt: "Students dressed as Swami Vivekananda in saffron turbans and delegates on stage reenacting the historic Chicago address",
    desc: "Students in traditional robes and saffron turbans performing the iconic 1893 Chicago Parliament of Religions theatrical presentation, inspiring audiences with national pride.",
    context: "Through Sanskrit drama, Kannada theater, and Bharatanatyam, students cultivate stage presence, fearlessness, expressive oratory, and deep immersion in India's civilizational history.",
    location: "Main Auditorium Pavilion • Maitreyi Gurukula",
    keyChips: ["Vivekananda Chicago Address", "Sanskrit & Kannada Drama", "Stage Confidence", "Civilizational Pride"],
  },
  {
    id: "study-library",
    tag: "📚 Shastra Swadhyaya",
    title: "Rigorous Self-Study, Library Research & Board Preparation",
    category: "ACADEMIC BRILLIANCE & SWADHYAYA",
    src: "/images/students/student-learning-1.webp",
    alt: "Students in peaceful concentration studying textbooks, notebooks, and reference volumes in the well-lit library",
    desc: "Students engaged in quiet, focused self-study in the campus study pavilion, balancing State Board Mathematics and Science with classical Sanskrit texts.",
    context: "The Gurukula maintains a 100% first-class pass record in Karnataka State SSLC and PUC board examinations, proving that shastric discipline enhances modern scholastic brilliance.",
    location: "Saraswati Library & Study Pavilion • Ramohalli",
    keyChips: ["100% SSLC Pass Record", "State Board Preparation", "Quiet Swadhyaya", "Modern Science & Math"],
  },
  {
    id: "sacred-mandapam",
    tag: "🔥 Yajnashala",
    title: "Sacred Yajnashala & Dhyana Mandapam Gathering",
    category: "SACRED AGNIHOTRA & DHYANA",
    src: "/images/campus/campus-mandapam.webp",
    alt: "Traditional wooden and terracotta pillared Yajnashala mandapam surrounded by lush coconut palms",
    desc: "The open pillared heritage pavilion with terracotta roof tiles where students gather for collective Agnihotra fire offerings, Sandhya Vandanam, and meditative silence.",
    context: "Situated amidst lush coconut palms and sacred flora, the Yajnashala purifies the environment and anchors the students in Vedic ritual consciousness every sunrise and sunset.",
    location: "Sacred Yajnashala • 12-Acre Ramohalli Parisara",
    keyChips: ["Daily Agnihotra", "Vedic Fire Offerings", "Terracotta Heritage", "Dhyana & Silence"],
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

      {/* ================= LIGHTBOX MODAL (PORTALED TO DOCUMENT.BODY) ================= */}
      {isLightboxOpen &&
        typeof document !== "undefined" &&
        createPortal(
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
              {/* Lightbox Header with ESC Hint, Title, and Close Button */}
              <div className="lightbox-top-bar">
                <div className="lightbox-top-left">
                  <span className="lightbox-tag-pill">{currentPhoto.category}</span>
                  <span className="lightbox-counter-pill">
                    Photo {currentIdx + 1} of {SHOWCASE_GLIMPSES.length}
                  </span>
                </div>

                <div className="lightbox-top-right">
                  <span className="lightbox-esc-hint">
                    <kbd>ESC</kbd> to exit • <kbd>←</kbd> <kbd>→</kbd> to navigate
                  </span>
                  <button
                    type="button"
                    className="lightbox-close-btn"
                    onClick={() => setIsLightboxOpen(false)}
                    title="Close (Press ESC)"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Lightbox Main Image Stage with Floating Arrows */}
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
                  <ChevronLeft size={28} />
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
                  <ChevronRight size={28} />
                </button>
              </div>

              {/* Comprehensive Accurate Image Details Panel */}
              <div className="lightbox-info">
                <div className="lightbox-location-tag">
                  <MapPin size={13} className="info-pin-ico" />
                  <span>{currentPhoto.location}</span>
                </div>

                <h3 className="lightbox-photo-title">{currentPhoto.title}</h3>

                <p className="lightbox-photo-desc">{currentPhoto.desc}</p>

                {currentPhoto.context && (
                  <div className="lightbox-context-box">
                    <div className="context-header">
                      <BookOpen size={14} />
                      <strong>GURUKULA TRADITION &amp; DAILY IMMERSION</strong>
                    </div>
                    <p>{currentPhoto.context}</p>
                  </div>
                )}

                {/* Key Highlight Chips */}
                {currentPhoto.keyChips && (
                  <div className="lightbox-chips-row">
                    {currentPhoto.keyChips.map((chip, idx) => (
                      <span key={idx} className="lightbox-chip">
                        ✦ {chip}
                      </span>
                    ))}
                  </div>
                )}

                {/* Mini Thumbnails Rail inside Lightbox */}
                <div className="lightbox-thumb-strip">
                  {SHOWCASE_GLIMPSES.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`lightbox-mini-thumb ${currentIdx === idx ? "active" : ""}`}
                      onClick={() => setCurrentIdx(idx)}
                      title={item.title}
                    >
                      <img src={item.src} alt={item.title} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
