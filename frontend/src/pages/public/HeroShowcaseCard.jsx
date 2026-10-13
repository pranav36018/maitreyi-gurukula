import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Clock,
  Volume2,
  VolumeX,
  Camera,
  ArrowRight,
  ExternalLink,
  BookOpen,
  Award,
  Sun,
  X,
  Music,
} from "lucide-react";
import "./HeroShowcaseCard.css";

// 6 Authentic High-Resolution Gurukula Photographs with 100% Matching Titles & Context
const showcaseGlimpses = [
  {
    id: "vedic-shastras",
    tag: "🌳 Vriksha Katte",
    title: "Open-Air Vriksha Katte Pathashala Under Sacred Canopy",
    category: "SHASTRA & SANSKRIT IMMERSION",
    src: "/images/brand/hero-banner-1.jpg",
    alt: "Acharya teaching girl students seated in a circle on the raised stone platform under the sacred tree in Ramohalli",
    desc: "Acharya instructing young shishyas in Rigvedic suktas and spoken Sanskrit grammar upon the circular stone platform under the ancient sacred tree.",
    location: "Vriksha Katte Mandapam • 12-Acre Ramohalli Campus",
    highlight: "Daily Oral Shastra Pathana",
  },
  {
    id: "campus-parisara",
    tag: "👨‍👩‍👧‍👧 Gurukula Family",
    title: "The Gurukula Kutumba: Student Cohort with Founder",
    category: "SACRED RAMOHALLI PARISARA",
    src: "/images/local/gurukula-activity-1.jpg",
    alt: "Complete residential student cohort seated and standing in three rows with Managing Trustee Sri Pramod Kamath under ancient trees",
    desc: "Our residential family of shishyas across 6th Standard to 2nd PUC gathered with Managing Trustee Sri Pramod Kamath in the tranquil green grove.",
    location: "Ramohalli Parisara • Near Big Banyan Tree",
    highlight: "100% Free Residential Seva",
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
    highlight: "Discipline & Devotion",
  },
  {
    id: "ghosh-band",
    tag: "🥁 Ghosh Band",
    title: "Disciplined Ghosh Marching Band & Drum Parade",
    category: "MARTIAL AGILITY & TEAM RIGOR",
    src: "/images/events/independence-day-1.webp",
    alt: "Maitreyi Gurukula Ghosh band in white uniforms, red sashes, and ceremonial berets marching with drums",
    desc: "Synchronized student marching band with snare drums, bass drums, and ceremonial formation fostering courage, rhythm, and sisterly unity.",
    location: "Campus Parade Ground",
    highlight: "100% Student-Led Ghosh",
  },
  {
    id: "mandir-puja",
    tag: "🪔 Mandir Puja",
    title: "Daily Morning Devarapooje & Sanctum Deeparadhana",
    category: "LIVING VEDIC SANSKARA",
    src: "/images/brand/hero-banner-2.jpg",
    alt: "Girl students seated in devotion performing morning puja and lamp worship before the wooden Lord Krishna shrine",
    desc: "Young shishyas lighting brass oil lamps, offering flowers, and chanting stotras before the consecrated Lord Krishna shrine in the prayer hall.",
    location: "Ashram Prayer Sanctum",
    highlight: "Daily Devotional Immersion",
  },
  {
    id: "campus-mahadwara",
    tag: "⛩️ Mahadwara",
    title: "Grand Campus Mahadwara: Traditional Entrance Archway",
    category: "HERITAGE ARCHITECTURE",
    src: "/images/local/gurukula-campus-main.jpg",
    alt: "Traditional tiled-roof entrance arch of Shubham Karoti Maitreyi Gurukula crowned with the sacred Om symbol",
    desc: "The welcoming terracotta-roofed stone archway crowned with the sacred Om emblem and Kannada inscription at our 12-acre Ramohalli sanctuary.",
    location: "Main Gateway • Ramohalli, Bengaluru",
    highlight: "Peaceful Green Haven",
  },
];

// Daily Dinacharya Schedule Timeline
const dailySchedule = [
  {
    time: "5:00 AM",
    title: "Brahma Muhurta & Purification",
    desc: "Awakening with gratitude, Karadarshana, and morning cold-water snana.",
    icon: "🌅",
  },
  {
    time: "6:00 AM",
    title: "Surya Namaskara & Agnihotra",
    desc: "Yogasanas, pranayama, and collective Vedic Agnihotra fire offering.",
    icon: "🔥",
  },
  {
    time: "8:00 AM",
    title: "Vedic Chanting & Spoken Sanskrit",
    desc: "Oral recitation of Rigvedic mantras, Paninian grammar, and slokas.",
    icon: "📜",
  },
  {
    time: "10:00 AM",
    title: "Karnataka State Board Academics",
    desc: "Rigorous curriculum: Mathematics, Science, Social Studies, & English.",
    icon: "📚",
  },
  {
    time: "1:00 PM",
    title: "Satvic Anna Prasadam",
    desc: "Nutritious organic meals prepared in Gurukula kitchen, eaten in quiet gratitude.",
    icon: "🌾",
  },
  {
    time: "4:30 PM",
    title: "Ghosh Band & Classical Arts",
    desc: "Traditional drums, flute, Bharatanatyam dance, and physical agility drills.",
    icon: "🥁",
  },
  {
    time: "6:30 PM",
    title: "Sandhya Vandanam & Svadhyaya",
    desc: "Sunset meditation, chanting, revision, and reflective self-study.",
    icon: "🪔",
  },
  {
    time: "9:00 PM",
    title: "Ksheera & Shayanotsava",
    desc: "Warm wholesome milk, chanting Ratri Sukta, and restful satvic sleep.",
    icon: "🌙",
  },
];

// Slokas for Vedic Chanting Soundscape
const chantSlokas = [
  {
    name: "Shanti Mantra (शान्ति मन्त्र)",
    sanskrit: "ॐ सह नाववतु । सह नौ भुनक्तु । सह वीर्यं करवावहै । तेजस्वि नावधीतमस्तु मा विद्विषावहै ॥ ॐ शान्तिः शान्तिः शान्तिः ॥",
    meaning: "May the Divine protect both teacher and student. May we nourish together. May our learning be radiant and free of discord. Om Peace, Peace, Peace.",
  },
  {
    name: "Gayatri Mantra (गायत्री मन्त्र)",
    sanskrit: "ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥",
    meaning: "We meditate on the supreme transcendental radiance of the Divine Sun. May that sacred light inspire and illuminate our intellect.",
  },
  {
    name: "Saraswati Vandana (सरस्वती वन्दना)",
    sanskrit: "या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता । सा मां पातु सरस्वती भगवती निःशेषजाड्यापहा ॥",
    meaning: "May Goddess Saraswati, adorned in pure white like moon and snow, protect us and dispel all darkness of ignorance from our mind.",
  },
];

export default function HeroShowcaseCard() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [activeCardMode, setActiveCardMode] = useState("glimpse"); // 'glimpse' | 'schedule' | 'audio'
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioChanting, setIsAudioChanting] = useState(false);
  const [activeChantIdx, setActiveChantIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [scheduleActiveIdx, setScheduleActiveIdx] = useState(0);

  const audioCtxRef = useRef(null);
  const oscillatorNodesRef = useRef([]);

  // Auto-advance photos every 5 seconds when playing in 'glimpse' mode
  useEffect(() => {
    if (!isPlaying || activeCardMode !== "glimpse") return;
    const interval = setInterval(() => {
      setActiveTabIdx((prev) => (prev + 1) % showcaseGlimpses.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, activeCardMode]);

  // Web Audio Tanpura Drone Synthesizer (Harmonious Sa & Pa drone at 130.81Hz & 196Hz)
  const toggleSoundscape = () => {
    if (isAudioChanting) {
      // Stop Tanpura drone
      oscillatorNodesRef.current.forEach((node) => {
        try {
          node.stop();
          node.disconnect();
        } catch {
          // ignore
        }
      });
      oscillatorNodesRef.current = [];
      setIsAudioChanting(false);
    } else {
      // Start Tanpura drone
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = audioCtxRef.current || new AudioCtx();
        audioCtxRef.current = ctx;

        if (ctx.state === "suspended") {
          ctx.resume();
        }

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
        masterGain.connect(ctx.destination);

        // Frequencies for classical Indian Tanpura tuned to C (Sa=130.81, Pa=196.00, High Sa=261.63)
        const droneFreqs = [130.81, 196.0, 261.63, 131.2];
        const nodes = [];

        droneFreqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = idx % 2 === 0 ? "sine" : "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle natural frequency shimmer
          const lfo = ctx.createOscillator();
          lfo.frequency.setValueAtTime(0.3 + idx * 0.1, ctx.currentTime);
          const lfoGain = ctx.createGain();
          lfoGain.gain.setValueAtTime(1.2, ctx.currentTime);
          lfo.connect(osc.frequency);
          lfo.start();

          gain.gain.setValueAtTime(0.25, ctx.currentTime);
          osc.connect(gain);
          gain.connect(masterGain);

          osc.start();
          nodes.push(osc);
          nodes.push(lfo);
        });

        oscillatorNodesRef.current = nodes;
        setIsAudioChanting(true);
      } catch (err) {
        console.warn("Web Audio not permitted without interaction", err);
      }
    }
  };

  // Cleanup audio nodes on unmount
  useEffect(() => {
    return () => {
      oscillatorNodesRef.current.forEach((node) => {
        try {
          node.stop();
          node.disconnect();
        } catch {
          // ignore
        }
      });
    };
  }, []);

  const currentGlimpse = showcaseGlimpses[activeTabIdx];

  const handleNext = () => {
    setActiveTabIdx((prev) => (prev + 1) % showcaseGlimpses.length);
  };

  const handlePrev = () => {
    setActiveTabIdx(
      (prev) => (prev - 1 + showcaseGlimpses.length) % showcaseGlimpses.length
    );
  };

  return (
    <div className="hero-showcase-container">
      {/* Outer Golden Glow Border Frame */}
      <div className="showcase-outer-card">
        {/* Top Header Mode Switcher Bar */}
        <div className="showcase-mode-header">
          <div className="mode-toggle-group">
            <button
              type="button"
              className={`mode-btn ${activeCardMode === "glimpse" ? "active" : ""}`}
              onClick={() => setActiveCardMode("glimpse")}
              title="View Photographic Glimpses"
            >
              <Camera size={13} />
              <span>Glimpses</span>
            </button>

            <button
              type="button"
              className={`mode-btn ${activeCardMode === "schedule" ? "active" : ""}`}
              onClick={() => setActiveCardMode("schedule")}
              title="Daily Dinacharya Schedule"
            >
              <Clock size={13} />
              <span>Daily Routine</span>
            </button>

            <button
              type="button"
              className={`mode-btn ${activeCardMode === "audio" ? "active" : ""}`}
              onClick={() => setActiveCardMode("audio")}
              title="Listen to Vedic Chanting & Slokas"
            >
              <Music size={13} />
              <span>Vedic Sound</span>
            </button>
          </div>

          {/* Autoplay & Zoom Utility Actions */}
          <div className="mode-utility-actions">
            {activeCardMode === "glimpse" && (
              <button
                type="button"
                className={`util-icon-btn ${isPlaying ? "playing" : ""}`}
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? "Pause auto-slideshow" : "Resume auto-slideshow"}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              </button>
            )}

            <button
              type="button"
              className="util-icon-btn"
              onClick={() => setIsLightboxOpen(true)}
              title="Enlarge photograph full-screen"
              aria-label="Enlarge"
            >
              <Maximize2 size={13} />
            </button>
          </div>
        </div>

        {/* ================= MODE 1: PHOTOGRAPHIC GLIMPSES ================= */}
        {activeCardMode === "glimpse" && (
          <div className="showcase-glimpse-content">
            {/* Photo Stage with Golden Trim */}
            <div className="glimpse-photo-stage">
              <img
                src={currentGlimpse.src}
                alt={currentGlimpse.alt}
                key={currentGlimpse.src}
                className="glimpse-main-img"
                onClick={() => setIsLightboxOpen(true)}
              />

              {/* Gradient Scrim for Readability */}
              <div className="glimpse-gradient-scrim"></div>

              {/* Floating Category Pill */}
              <div className="glimpse-top-badge">
                <Sparkles size={12} className="badge-sparkle-ico" />
                <span>{currentGlimpse.category}</span>
              </div>

              {/* Left / Right Arrow Navigation */}
              <button
                type="button"
                className="glimpse-arrow-btn arrow-left"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                  setIsPlaying(false);
                }}
                aria-label="Previous photograph"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                type="button"
                className="glimpse-arrow-btn arrow-right"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                  setIsPlaying(false);
                }}
                aria-label="Next photograph"
              >
                <ChevronRight size={18} />
              </button>

              {/* Captions Overlay at Bottom of Image */}
              <div className="glimpse-caption-box">
                <span className="caption-location-tag">
                  📍 {currentGlimpse.location}
                </span>
                <h4>{currentGlimpse.title}</h4>
                <p>{currentGlimpse.desc}</p>
              </div>

              {/* Slideshow Progress Bar */}
              {isPlaying && <div className="glimpse-progress-bar"></div>}
            </div>

            {/* Interactive Thumbnail Filmstrip for Immediate Visual Browsing */}
            <div className="glimpse-filmstrip-bar">
              {showcaseGlimpses.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  className={`glimpse-thumb-btn ${activeTabIdx === idx ? "active" : ""}`}
                  onClick={() => {
                    setActiveTabIdx(idx);
                    setIsPlaying(false);
                  }}
                  title={item.title}
                >
                  <img src={item.src} alt={item.title} loading="eager" />
                  <span className="glimpse-thumb-label">{item.tag.replace(/^[^\s]+\s/, "")}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ================= MODE 2: DAILY SCHEDULE (DINACHARYA) ================= */}
        {activeCardMode === "schedule" && (
          <div className="showcase-schedule-content">
            <div className="schedule-header-pill">
              <Sun size={14} />
              <span>GURUKULA DINACHARYA • DAILY ORDER OF DISCIPLINE</span>
            </div>

            <div className="schedule-items-list">
              {dailySchedule.map((slot, idx) => (
                <div
                  key={idx}
                  className={`schedule-row ${scheduleActiveIdx === idx ? "active-row" : ""}`}
                  onClick={() => setScheduleActiveIdx(idx)}
                >
                  <div className="schedule-time-badge">
                    <span className="slot-ico">{slot.icon}</span>
                    <span className="slot-time">{slot.time}</span>
                  </div>
                  <div className="schedule-info-box">
                    <strong>{slot.title}</strong>
                    <p>{slot.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="schedule-footer-hint">
              <span>A balanced discipline of mind, body, and spirit from dawn to dusk.</span>
              <a href="#routine" className="schedule-more-link">
                <span>View Full Dinacharya</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        )}

        {/* ================= MODE 3: VEDIC SOUNDSCAPE & CHANTING ================= */}
        {activeCardMode === "audio" && (
          <div className="showcase-audio-content">
            <div className="audio-header-pill">
              <Music size={14} />
              <span>VEDIC RECITATION &amp; TANPURA SOUNDSCAPE</span>
            </div>

            {/* Interactive Tanpura Drone Trigger */}
            <div className="audio-tanpura-card">
              <div className="tanpura-info">
                <strong>Meditative Tanpura Drone (तानपुरा)</strong>
                <span>Tuned to Panchama (Pa-Sa) • Authentic Vedic resonance</span>
              </div>
              <button
                type="button"
                className={`tanpura-toggle-btn ${isAudioChanting ? "active-drone" : ""}`}
                onClick={toggleSoundscape}
              >
                {isAudioChanting ? (
                  <>
                    <Volume2 size={16} className="pulse-speaker" />
                    <span>Stop Tanpura</span>
                  </>
                ) : (
                  <>
                    <VolumeX size={16} />
                    <span>Play Tanpura Drone</span>
                  </>
                )}
              </button>
            </div>

            {/* Visual Equalizer Waves (Animated when audio is playing) */}
            <div className={`soundwave-equalizer ${isAudioChanting ? "playing" : ""}`}>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
            </div>

            {/* Sloka Selector Tabs */}
            <div className="chant-tabs-strip">
              {chantSlokas.map((c, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`chant-pill ${activeChantIdx === idx ? "active" : ""}`}
                  onClick={() => setActiveChantIdx(idx)}
                >
                  <span>{c.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            {/* Sloka Chanting Display Box */}
            <div className="chant-display-box">
              <h4>{chantSlokas[activeChantIdx].name}</h4>
              <p className="chant-sanskrit-text">
                {chantSlokas[activeChantIdx].sanskrit}
              </p>
              <p className="chant-meaning-text">
                <strong>Meaning:</strong> {chantSlokas[activeChantIdx].meaning}
              </p>
            </div>
          </div>
        )}

        {/* ================= CARD FOOTER: INSTITUTIONAL STATS ================= */}
        <div className="showcase-bottom-footer">
          <div className="footer-stat-group">
            <span className="footer-stat-num">300+</span>
            <span className="footer-stat-desc">
              Alumni Scholars Globally
            </span>
          </div>

          <div className="footer-badge-pill">
            <Award size={13} />
            <span>100% Free Residential Seva</span>
          </div>

          <a href="#gallery" className="footer-gallery-link">
            <span>20+ Photos</span>
            <ArrowRight size={13} />
          </a>
        </div>
      </div>

      {/* ================= LIGHTBOX MODAL ================= */}
      {isLightboxOpen && (
        <div className="showcase-lightbox-backdrop" onClick={() => setIsLightboxOpen(false)}>
          <div className="showcase-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <img
              src={currentGlimpse.src}
              alt={currentGlimpse.alt}
              className="lightbox-img"
            />

            <div className="lightbox-caption">
              <span className="lightbox-tag">{currentGlimpse.category}</span>
              <h3>{currentGlimpse.title}</h3>
              <p>{currentGlimpse.desc}</p>
              <span className="lightbox-location">📍 {currentGlimpse.location}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
