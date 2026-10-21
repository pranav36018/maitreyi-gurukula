import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Sparkles,
  Camera,
  MapPin,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import "./GurukulaLifeStrip.css";

const LIFE_PHOTOS = [
  {
    id: "life-vriksha",
    title: "Vriksha Katte Pathashala Under Ancient Canopy",
    tag: "🌳 Vedic Shastra",
    category: "SHASTRA & SANSKRIT IMMERSION",
    src: "/images/brand/hero-banner-1.jpg",
    alt: "Acharyas and students seated on raised stone platform under the sacred tree",
    desc: "Acharyas instructing residential students in oral Rigvedic mantras and spoken Sanskrit grammar upon the circular stone platform under the ancient sacred tree.",
    context: "In accordance with ancient Guru-Shishya tradition, students learn shastras in natural open-air settings, fostering deep mental focus and communion with nature.",
    location: "Vriksha Katte Mandapam • 12-Acre Ramohalli Campus",
    chips: ["Rigvedic Mantras", "Paninian Grammar", "Daily Oral Recitation"],
  },
  {
    id: "life-family",
    title: "Gurukula Kutumba: Student Cohort with Founder",
    tag: "👨‍👩‍👧‍👧 Residential Family",
    category: "GURUKULA FAMILY & RESIDENTIAL SEVA",
    src: "/images/local/gurukula-activity-1.jpg",
    alt: "Complete student cohort with Sri Pramod Kamath in the campus grove",
    desc: "Our residential family of shishyas from 6th Standard through 2nd PUC gathered in traditional attire with Managing Trustee Sri Pramod Kamath in the serene grove.",
    context: "Living as one unified family under the care of Matrushrees and Acharyas, students receive 100% free residential education, satvic meals, and loving mentorship.",
    location: "Ramohalli Campus Green Grove • Bengaluru",
    chips: ["100% Free Living & Meals", "Class 6th to 2nd PUC", "Matrushree Care"],
  },
  {
    id: "life-prayer",
    title: "Morning Flag Hoisting & Prarthana Assembly",
    tag: "🌅 Dawn Dinacharya",
    category: "DAILY DINACHARYA & PATRIOTISM",
    src: "/images/local/gurukula-activity-3.jpg",
    alt: "Students in white uniforms with saffron sashes before Annapoorna Hall",
    desc: "Students in pristine white uniforms with saffron waistbands gathered at dawn before Annapoorna Main Hall for national flag hoisting, Vedic prayers, and daily pledge.",
    context: "The daily Dinacharya instills spiritual grounding and patriotic duty. The morning assembly combines Vedic Shanti Mantras with the national anthem.",
    location: "Annapoorna Prangana Forecourt • Ramohalli",
    chips: ["Daily 5:00 AM Jagaran", "Vedic Shanti Mantras", "National Pride"],
  },
  {
    id: "life-ghosh",
    title: "All-Girls Ghosh Marching Band & Drum Parade",
    tag: "🥁 Ghosh Vadyam",
    category: "MARTIAL AGILITY & TEAM RIGOR",
    src: "/images/events/independence-day-1.webp",
    alt: "All-girls student Ghosh band in white uniforms and red berets with drums",
    desc: "Synchronized student marching band with snare drums, bass drums, and ceremonial formations, fostering physical stamina, rhythm, courage, and sisterly unity.",
    context: "100% student-conducted Ghosh band trains young girls in rhythmic coordination, martial courage, leadership, and synchronized teamwork.",
    location: "Campus Parade Grounds • Bengaluru",
    chips: ["100% Student-Conducted", "Snare & Bass Drums", "Martial Agility"],
  },
  {
    id: "life-mandir",
    title: "Daily Morning Devarapooje & Sanctum Deeparadhana",
    tag: "🪔 Mandir Puja",
    category: "LIVING VEDIC SANSKARA & DEVOTION",
    src: "/images/brand/hero-banner-2.jpg",
    alt: "Girl students seated in prayer lighting oil lamps before Lord Krishna shrine",
    desc: "Young shishyas lighting traditional brass oil lamps, offering fresh flowers, and chanting devotional stotras before the sacred Lord Krishna shrine.",
    context: "Daily Sandhya Vandanam, Agnihotra fire offerings, and temple rituals nurture inner tranquility, gratitude, and moral purity from childhood.",
    location: "Ashram Prayer Sanctum • Ramohalli",
    chips: ["Lord Krishna Shrine", "Daily Agnihotra", "Brass Deeparadhana"],
  },
  {
    id: "life-drama",
    title: "Swami Vivekananda Chicago World Parliament Play",
    tag: "🎭 Classical Natya",
    category: "THEATRICAL ARTS & BHARATANATYAM",
    src: "/images/events/vivekananda-chicago-2.webp",
    alt: "Students in saffron robes and turbans reenacting the Chicago address on stage",
    desc: "Students in traditional robes and saffron turbans performing the iconic 1893 Chicago Parliament of Religions theatrical presentation with national pride.",
    context: "Through Sanskrit drama, Kannada theater, and Bharatanatyam, students cultivate stage presence, fearlessness, expressive oratory, and cultural pride.",
    location: "Main Auditorium Pavilion • Maitreyi Gurukula",
    chips: ["Vivekananda Chicago Address", "Drama & Natya", "Stage Confidence"],
  },
  {
    id: "life-mandala",
    title: "Auspicious Flower Rangoli Mandala on Utsavas",
    tag: "🪷 Floral Rangoli",
    category: "TRADITIONAL SANSKRITI & FESTIVITY",
    src: "/images/events/celebration-flower-mandala.webp",
    alt: "Ornate circular flower rangoli mandala with marigolds and rose petals",
    desc: "Girl shishyas creating an intricate sacred floral mandala using marigold petals, lotus blossoms, and traditional lamps during annual Gurupoornima festivities.",
    context: "Fostering sacred aesthetics and artistic devotion, floral rangoli creation is an integral part of ashram celebrations, uniting students in collaborative art.",
    location: "Ashram Central Courtyard • Ramohalli",
    chips: ["Gurupoornima Utsava", "Sacred Geometry", "Flower Rangoli"],
  },
  {
    id: "life-study",
    title: "Rigorous Library Research & Board Examination Study",
    tag: "📚 Shastra Swadhyaya",
    category: "ACADEMIC BRILLIANCE & SWADHYAYA",
    src: "/images/students/student-learning-1.webp",
    alt: "Students in peaceful concentration studying textbooks in the library",
    desc: "Students engaged in quiet, focused self-study in the campus study pavilion, balancing State Board Mathematics and Science with classical Sanskrit texts.",
    context: "The Gurukula maintains a 100% first-class pass record in Karnataka State SSLC and PUC board examinations with stellar academic distinction.",
    location: "Saraswati Library & Study Pavilion • Ramohalli",
    chips: ["100% SSLC Pass Record", "Quiet Swadhyaya", "Science & Math"],
  },
];

export default function GurukulaLifeStrip() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  // Keyboard navigation for full-screen view
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape" || e.keyCode === 27) {
        setSelectedIdx(null);
      }
      if (e.key === "ArrowLeft" || e.keyCode === 37) {
        setSelectedIdx((prev) => (prev > 0 ? prev - 1 : LIFE_PHOTOS.length - 1));
      }
      if (e.key === "ArrowRight" || e.keyCode === 39) {
        setSelectedIdx((prev) => (prev < LIFE_PHOTOS.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIdx]);

  const activePhoto = selectedIdx !== null ? LIFE_PHOTOS[selectedIdx] : null;

  return (
    <section className="gurukula-life-section">
      <div className="gurukula-life-container">
        {/* Section Header */}
        <div className="gurukula-life-header">
          <div className="life-header-pill">
            <Sparkles size={14} />
            <span>JEEVANADA DARSHANA • VIBRANT GLIMPSES OF GURUKULA LIFE</span>
          </div>
          <h2>
            Authentic Life in Our
            <span className="life-title-highlight"> 12-Acre Sanctuary</span>
          </h2>
          <p className="life-header-desc">
            From dawn Vedic chanting under ancient banyan trees and synchronized Ghosh drum parades to festive floral rangolis and rigorous academic swadhyaya. Tap any photo to explore in high resolution.
          </p>
        </div>

        {/* 8-Photo Symmetrical Responsive Grid */}
        <div className="gurukula-life-grid">
          {LIFE_PHOTOS.map((photo, idx) => (
            <article
              key={photo.id}
              className="life-photo-card"
              onClick={() => setSelectedIdx(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedIdx(idx);
                }
              }}
              title={`View ${photo.title} (Click to enlarge)`}
            >
              <div className="life-photo-img-wrap">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="life-card-img"
                />
                <div className="life-photo-scrim" />

                <span className="life-tag-pill">{photo.tag}</span>

                <div className="life-expand-badge">
                  <Maximize2 size={14} />
                </div>
              </div>

              <div className="life-card-info">
                <div className="life-card-location">
                  <MapPin size={11} className="location-pin" />
                  <span>{photo.location}</span>
                </div>
                <h4 className="life-card-title">{photo.title}</h4>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full-Screen Modal Portaled to document.body */}
      {activePhoto &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="showcase-lightbox-backdrop"
            onClick={() => setSelectedIdx(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Full screen photo view"
          >
            <div
              className="showcase-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lightbox-top-bar">
                <div className="lightbox-top-left">
                  <span className="lightbox-tag-pill">{activePhoto.category}</span>
                  <span className="lightbox-counter-pill">
                    Photo {selectedIdx + 1} of {LIFE_PHOTOS.length}
                  </span>
                </div>

                <div className="lightbox-top-right">
                  <span className="lightbox-esc-hint">
                    <kbd>ESC</kbd> to exit • <kbd>←</kbd> <kbd>→</kbd> to navigate
                  </span>
                  <button
                    type="button"
                    className="lightbox-close-btn"
                    onClick={() => setSelectedIdx(null)}
                    title="Close (Press ESC)"
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="lightbox-image-stage">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  className="lightbox-photo"
                />

                <button
                  type="button"
                  className="lightbox-arrow lightbox-arrow-left"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIdx((prev) =>
                      prev > 0 ? prev - 1 : LIFE_PHOTOS.length - 1
                    );
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
                    setSelectedIdx((prev) =>
                      prev < LIFE_PHOTOS.length - 1 ? prev + 1 : 0
                    );
                  }}
                  title="Next Photo (Right Arrow)"
                  aria-label="Next photo"
                >
                  <ChevronRight size={28} />
                </button>
              </div>

              <div className="lightbox-info">
                <div className="lightbox-location-tag">
                  <MapPin size={13} className="info-pin-ico" />
                  <span>{activePhoto.location}</span>
                </div>

                <h3 className="lightbox-photo-title">{activePhoto.title}</h3>

                <p className="lightbox-photo-desc">{activePhoto.desc}</p>

                {activePhoto.context && (
                  <div className="lightbox-context-box">
                    <div className="context-header">
                      <BookOpen size={14} />
                      <strong>GURUKULA TRADITION &amp; DAILY IMMERSION</strong>
                    </div>
                    <p>{activePhoto.context}</p>
                  </div>
                )}

                {activePhoto.chips && (
                  <div className="lightbox-chips-row">
                    {activePhoto.chips.map((chip, i) => (
                      <span key={i} className="lightbox-chip">
                        ✦ {chip}
                      </span>
                    ))}
                  </div>
                )}

                <div className="lightbox-thumb-strip">
                  {LIFE_PHOTOS.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`lightbox-mini-thumb ${selectedIdx === idx ? "active" : ""}`}
                      onClick={() => setSelectedIdx(idx)}
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
    </section>
  );
}
