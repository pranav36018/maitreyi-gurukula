import { useState } from "react";
import {
  Sparkles,
  Heart,
  Brain,
  Activity,
  Sun,
  Flame,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

function PersonalitySection() {
  const [activeTab, setActiveTab] = useState(0);

  const dimensions = [
    {
      id: "physical",
      title: "Physical Personality (ಶಾರೀರಿಕ ವಿಕಾಸ)",
      sanskrit: "Sharirika Kosha",
      icon: "/images/personality/physical-personality.webp",
      desc: "Cultivating bodily vitality, endurance, agility, and natural health through traditional disciplines.",
      details: [
        "Daily Suryanamaskars and classical Yogasana practice at dawn",
        "Ghosh band drill (traditional brass, flute & percussion martial formation)",
        "Organic satvic vegetarian nutrition from ashram farming and desi goshala milk",
        "Traditional outdoor sports: Kabaddi, Kho-Kho, Throwball, and self-defense",
      ],
      image: "/images/events/independence-day-1.webp",
      tag: "Vitality & Ghosh Rigor",
      color: "emerald",
    },
    {
      id: "mental",
      title: "Mental Personality (ಮಾನಸಿಕ ವಿಕಾಸ)",
      sanskrit: "Manomaya Kosha",
      icon: "/images/personality/mental-personality.webp",
      desc: "Fostering emotional balance, unwavering focus, resilience, and calm inner equilibrium.",
      details: [
        "Pranayama and guided breath mindfulness before study hours",
        "Emotional safety in a nurturing residential Guru-Shishya family environment",
        "Affectionate 24/7 maternal guidance from resident Matrushrees",
        "Development of patience, gratitude, and equanimity under challenges",
      ],
      image: "/images/campus/campus-learning-pavilion.webp",
      tag: "Focus & Poise",
      color: "saffron",
    },
    {
      id: "intellectual",
      title: "Intellectual Personality (ಬೌದ್ಧಿಕ ವಿಕಾಸ)",
      sanskrit: "Vijnanamaya Kosha",
      icon: "/images/personality/intellectual-personality.webp",
      desc: "Harmonizing profound traditional shastric depth with contemporary scientific inquiry.",
      details: [
        "Full syllabus coverage of Karnataka State Board SSLC & Pre-University (PUC)",
        "Immersion in Sanskrit Vyakarna (Paninian grammar) and Kavya Sahitya",
        "Gandhari Vidya: remarkable blindfolded sensory perception & intuitive focus",
        "Science, mathematics, logical debate (Tarka), and analytical reasoning",
      ],
      image: "/images/brand/hero-banner-1.jpg",
      tag: "Scholastic Brilliance",
      color: "indigo",
    },
    {
      id: "emotional",
      title: "Emotional Personality (ಭಾವನಾತ್ಮಕ ವಿಕಾಸ)",
      sanskrit: "Anandamaya Kosha",
      icon: "/images/personality/emotional-personality.webp",
      desc: "Awakening aesthetic sensitivity, deep sisterhood, cultural empathy, and devotion.",
      details: [
        "Mastery in classical Bharatanatyam mudras, natya shastra, and stage poise",
        "Carnatic vocal music, devotional stotras, and Harikatha storytelling",
        "Lifelong bonds of supportive sisterhood across student batches",
        "Celebration of traditional Indian festivals with joy, art, and rangolis",
      ],
      image: "/images/events/celebration-flower-mandala.webp",
      tag: "Grace & Harmony",
      color: "rose",
    },
    {
      id: "spiritual",
      title: "Spiritual Personality (ಆಧ್ಯಾತ್ಮಿಕ ವಿಕಾಸ)",
      sanskrit: "Atma Samskara",
      icon: "/images/personality/spiritual-personality.webp",
      desc: "Grounding the soul in eternal dharma, reverence for all creation, and selfless seva.",
      details: [
        "Agnihotra and Sandhyavandanam performed twice daily with pure ghee",
        "Recitation of Bhagavad Gita, Upanishads, and Vishnu Sahasranama",
        "Daily Devarapooje, lamp lighting, and stotra parayana in the prayer sanctum",
        "Unshakeable sense of self-respect (Atmagaurava) and national pride",
      ],
      image: "/images/brand/hero-banner-2.jpg",
      tag: "Inner Light & Seva",
      color: "amber",
    },
  ];

  const currentDim = dimensions[activeTab];

  return (
    <section className="maitreyi-personality-section" id="panchamukhi">
      <div className="section-container">
        {/* Header */}
        <div className="section-header-centered">
          <div className="section-pill-badge">
            <Sparkles size={14} />
            <span>PANCHAMUKHI SHIKSHANA • 5-FOLD HOLISTIC GROWTH</span>
          </div>
          <h2>
            Panchamukhi Shikshana:
            <br />
            <span className="section-title-highlight">Nurturing the Whole Being</span>
          </h2>
          <p className="section-subtitle">
            True education goes far beyond rote memorization. Our 5-dimensional framework shapes a strong body, tranquil mind, brilliant intellect, noble emotions, and awakened soul.
          </p>
        </div>

        {/* Dimension Tab Pills */}
        <div className="personality-tabs-bar">
          {dimensions.map((dim, idx) => (
            <button
              key={dim.id}
              type="button"
              className={`personality-tab-btn ${activeTab === idx ? "active" : ""}`}
              onClick={() => setActiveTab(idx)}
            >
              <img
                src={dim.icon}
                alt={dim.title}
                className="personality-tab-icon"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="tab-btn-title">{dim.title.split(" (")[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Dimension Showcase Panel */}
        <div className={`personality-display-card dim-${currentDim.color}`}>
          <div className="display-card-grid">
            {/* Left: Text & Points */}
            <div className="display-card-content">
              <div className="display-eyebrow">
                <span className="dim-sanskrit-tag">{currentDim.sanskrit}</span>
                <span className="dim-badge-chip">{currentDim.tag}</span>
              </div>
              <h3>{currentDim.title}</h3>
              <p className="dim-summary-text">{currentDim.desc}</p>

              <div className="dim-points-list">
                {currentDim.details.map((point, i) => (
                  <div key={i} className="dim-point-item">
                    <CheckCircle2 size={16} className="dim-check-icon" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <div className="dim-footer-action">
                <a href="#curriculum" className="dim-learn-more-btn">
                  <span>Explore Academic Curriculum</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>

            {/* Right: Real Photograph */}
            <div className="display-card-visual">
              <div className="dim-visual-frame">
                <img
                  src={currentDim.image}
                  alt={currentDim.title}
                  loading="lazy"
                />
                <div className="dim-visual-overlay">
                  <div className="dim-icon-bubble">
                    <img
                      src={currentDim.icon}
                      alt=""
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                  <span className="dim-visual-caption">
                    Authentic Gurukula Learning • Shubham Karoti
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Dimension Mini Cards Grid (for quick overview on all screens) */}
        <div className="personality-mini-grid">
          {dimensions.map((dim, idx) => (
            <div
              key={dim.id}
              className={`personality-mini-card ${activeTab === idx ? "active-card" : ""}`}
              onClick={() => setActiveTab(idx)}
            >
              <div className="mini-card-icon-wrap">
                <img
                  src={dim.icon}
                  alt={dim.title}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <h4>{dim.title.split(" (")[0]}</h4>
              <p>{dim.sanskrit}</p>
              <span className="mini-card-explore">
                {activeTab === idx ? "Currently Viewing" : "Click to view"}
              </span>
            </div>
          ))}
        </div>

        {/* Decorative Divider */}
        <div className="personality-divider-wrap">
          <img
            src="/images/brand/floral-line.png"
            alt=""
            className="personality-divider-img"
          />
        </div>
      </div>
    </section>
  );
}

export default PersonalitySection;
