import { useState } from "react";
import {
  Sparkles,
  Award,
  BookOpen,
  Heart,
  Users,
  Flower2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

function AcharyasSection() {
  const [activeLeaderGroup, setActiveLeaderGroup] = useState("all");

  const visionaries = [
    {
      name: "Late Sri Ramdas Kamath",
      role: "Founder & Philanthropist",
      period: "1994 – 2002",
      badge: "Founding Patron",
      image: null,
      desc: "Industrialist who ran a thriving garment business employing 3,000 workers; channeled his fortune and 12–20 acres of prime family land in Ramohalli into building this 100% free educational sanctuary for girls.",
      color: "saffron",
      quote: "Educating a daughter with cultural dignity elevates the entire family and civilization.",
    },
    {
      name: "Poojya Sri Sri Vishveshwara Teertha Swamiji",
      role: "Divine Spiritual Patron",
      period: "Pejawar Matha, Udupi",
      badge: "Divine Inspiration",
      image: null,
      desc: "Revered pontiff of Sri Pejawar Matha who blessed and inaugurated the Gurukula on Vyasa Poornima 1994, providing sacred direction for cultural rejuvenation and girl child empowerment.",
      color: "emerald",
      quote: "May this Gurukula be a beacon of pure dharma and enlightened womanhood for Karnataka.",
    },
  ];

  const trustees = [
    {
      name: "Sri Pramod Kamat",
      role: "Managing Trustee & President",
      period: "2014 – Present (Full Time)",
      badge: "President & Managing Trustee",
      image: "/images/acharyas/shri-pramod-kamat.webp",
      desc: "Following a distinguished global business career, retired to dedicate his life full-time to personally funding and mentoring the shastric and modern education of our daughters.",
      color: "terracotta",
    },
    {
      name: "Sri Amit Kamat",
      role: "Trustee & Advisor",
      period: "Board of Trustees",
      badge: "Trustee",
      image: "/images/acharyas/shri-amit-kamat.webp",
      desc: "Guiding institutional expansion, financial sustainability, and strategic partnerships to uphold the founding family's commitment to 100% free education.",
      color: "indigo",
    },
    {
      name: "Smt. Meera Kamat",
      role: "Trustee & Matrushree Guide",
      period: "Board of Trustees",
      badge: "Trustee & Guidance",
      image: "/images/acharyas/smt-meera-kamat.webp",
      desc: "Providing maternal warmth, moral guidance, and overseeing the holistic well-being, residential comfort, and cultural grounding of the girl students.",
      color: "saffron",
    },
    {
      name: "Smt. Pooja P. Kamat",
      role: "Trustee & Cultural Coordinator",
      period: "Board of Trustees",
      badge: "Trustee",
      image: "/images/acharyas/smt-pooja-kamat.webp",
      desc: "Actively involved in enriching traditional arts, classical dance training, festival observances, and cultural curriculum at the Gurukula.",
      color: "rose",
    },
    {
      name: "Smt. Pramila J. Kamat",
      role: "Trustee & Educational Advisor",
      period: "Board of Trustees",
      badge: "Trustee",
      image: "/images/acharyas/smt-pramila-kamat.webp",
      desc: "Contributing educational insight, student welfare support, and community coordination for the academic and spiritual growth of the shishyas.",
      color: "emerald",
    },
    {
      name: "Ms. Deep Kamat",
      role: "Trustee & Youth Initiatives",
      period: "Board of Trustees",
      badge: "Trustee",
      image: "/images/acharyas/ms-deep-kamat.webp",
      desc: "Spearheading modern youth engagement, digital infrastructure integration, and alumni career mentorship programs for graduating students.",
      color: "teal",
    },
  ];

  const facultyHighlights = [
    {
      title: "Resident Matrushrees (Lady Wardens & Teachers)",
      desc: "Living on campus around the clock, our Matrushrees provide maternal warmth, emotional comfort, hygiene supervision, and personal guidance so no girl ever feels away from home.",
    },
    {
      title: "Sanskrit Vyakarna & Shastra Acharyas",
      desc: "Traditional scholars possessing mastery in Paninian grammar, Vedic chanting, Sahitya, and philosophy who teach through conversational Sanskrit immersion.",
    },
    {
      title: "State Board Academic Specialists",
      desc: "Qualified educators ensuring students excel in Mathematics, Physical Sciences, Social Sciences, Kannada, and English with deep conceptual understanding.",
    },
    {
      title: "Classical Arts & Gandhari Vidya Gurus",
      desc: "Masters teaching authentic Bharatanatyam, Carnatic vocal music, Harikatha, Jyotisha (astrology), and the blindfolded sensory perception technique known as Gandhari Vidya.",
    },
  ];

  return (
    <section className="maitreyi-acharyas-section" id="acharyas">
      <div className="section-container">
        {/* Header */}
        <div className="section-header-centered">
          <div className="section-pill-badge">
            <Sparkles size={14} />
            <span>MENTORSHIP • GURU PARAMPARA</span>
          </div>
          <h2>
            Founders, Trustees &amp;
            <br />
            <span className="section-title-highlight">Mentors of Gurukula</span>
          </h2>
          <p className="section-subtitle">
            At Maitreyi Gurukula, education is not a mechanical transaction.
            Guided by saintly seers and visionary founders, our dedicated trustees and resident teachers live as one family with our students.
          </p>
        </div>

        {/* Section 1: Visionaries & Spiritual Patron */}
        <div className="acharyas-visionaries-banner">
          <div className="visionaries-header">
            <Flower2 size={18} />
            <span>FOUNDING VISION &amp; SACRED BLESSINGS</span>
          </div>
          <div className="visionaries-grid">
            {visionaries.map((v, i) => (
              <div key={i} className={`visionary-card visionary-${v.color}`}>
                <div className="visionary-top">
                  <span className="visionary-badge">{v.badge}</span>
                  <span className="visionary-period">{v.period}</span>
                </div>
                <div className="visionary-avatar-wrap">
                  <div className="visionary-initials">
                    {v.name.includes("Vishveshwara") ? "🕉️" : "🏛️"}
                  </div>
                </div>
                <h3>{v.name}</h3>
                <div className="visionary-role">{v.role}</div>
                <p className="visionary-desc">{v.desc}</p>
                <div className="visionary-quote">
                  <span>“{v.quote}”</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Board of Trustees with Real Photographs */}
        <div className="trustees-section-container">
          <div className="trustees-header-row">
            <div>
              <div className="trustees-eyebrow">
                <Users size={16} />
                <span>LEADERSHIP IN SEVA • BOARD OF TRUSTEES</span>
              </div>
              <h3 className="trustees-title">Managing Trustees &amp; Stewards</h3>
            </div>
            <p className="trustees-desc">
              Committed to selflessly nurturing the institution with personal dedication, care, and continuous guidance.
            </p>
          </div>

          <div className="trustees-grid">
            {trustees.map((person, idx) => (
              <div key={idx} className={`trustee-card trustee-${person.color}`}>
                <div className="trustee-photo-wrap">
                  <img
                    src={person.image}
                    alt={person.name}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="trustee-badge-pill">{person.badge}</span>
                </div>
                <div className="trustee-card-body">
                  <h3>{person.name}</h3>
                  <div className="trustee-role-label">{person.role}</div>
                  <p>{person.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Resident Faculty & Matrushree Roles */}
        <div className="faculty-container">
          <div className="faculty-header">
            <div className="faculty-header-badge">
              <Flower2 size={15} />
              <span>FACULTY &amp; RESIDENT MENTORS</span>
            </div>
            <h3>The Pillars of Gurukula Instruction</h3>
            <p>Combining traditional shastric depth with contemporary educational rigor</p>
          </div>

          <div className="faculty-grid">
            {facultyHighlights.map((fac, i) => (
              <div key={i} className="faculty-card">
                <div className="faculty-num">0{i + 1}</div>
                <h4>{fac.title}</h4>
                <p>{fac.desc}</p>
                <div className="faculty-card-footer">
                  <CheckCircle2 size={14} className="fac-check" />
                  <span>Personalized 1:1 Student Attention</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guru-Shishya Kutumba Quote Banner */}
        <div className="acharyas-quote-banner">
          <div className="quote-mark-icon">“</div>
          <blockquote>
            One of the sacred characteristic features of our Gurukula is that the Acharya and the Shishya live, learn, eat, and cherish life together as one united family.
          </blockquote>
          <span className="quote-author">— Gurukula Founding Ethos • Shubham Karoti</span>
        </div>
      </div>
    </section>
  );
}

export default AcharyasSection;
