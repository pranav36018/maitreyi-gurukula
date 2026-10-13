import { useState } from "react";
import {
  Sparkles,
  TreePine,
  Flame,
  BookOpen,
  HeartHandshake,
  Utensils,
  Music,
  Compass,
  Home,
  CheckCircle2,
  Maximize2,
  X,
  MapPin,
} from "lucide-react";

function CampusSection() {
  const [activePhotoModal, setActivePhotoModal] = useState(null);

  const facilities = [
    {
      title: "Vriksha Katte Pathashala & Open-Air Study Platform",
      category: "Shastric Learning",
      desc: "A raised circular stone platform beneath the canopy of a sacred tree where Acharyas conduct oral Vedic recitation, Paninian grammar, and Sanskrit discourse amidst nature.",
      icon: BookOpen,
      color: "emerald",
      image: "/images/campus/campus-mandapam.webp",
      tag: "Vriksha Katte Class",
    },
    {
      title: "Sacred Yajnashala & Homa Mandapam",
      category: "Spiritual Practice",
      desc: "Sanctified ceremonial hall featuring the brick Homa Kunda and flower-decked brass Deepa Stambhas dedicated to Vedic Yajnas, Agnihotra, and sacred samskara initiations.",
      icon: Flame,
      color: "saffron",
      image: "/images/students/student-learning-7.webp",
      tag: "Vedic Yajnashala",
    },
    {
      title: "Devarapooje Sanctum & Prayer Mandiram",
      category: "Daily Devotion",
      desc: "Sunlit prayer sanctum housing the carved wooden shrine of Lord Krishna where shishyas perform daily morning puja, lighting brass lamps, stotra parayana, and arati.",
      icon: HeartHandshake,
      color: "teal",
      image: "/images/campus/campus-green-gardens.webp",
      tag: "Mandir Sanctum",
    },
    {
      title: "Annapoorna Bhojana Shala & Satvic Dining",
      category: "Satvic Living",
      desc: "Spotless community dining hall providing three wholesome, freshly cooked satvic vegetarian meals daily, where students sit in traditional rows and eat as one united family.",
      icon: Utensils,
      color: "terracotta",
      image: "/images/campus/campus-courtyard.webp",
      tag: "Satvic Bhojana Shala",
    },
    {
      title: "Bhagavan Veda Vyasa Sannidhi & Founding Charter",
      category: "Sacred Heritage",
      desc: "Revered shrine of Maharshi Veda Vyasa flanked by granite tablets inscribed with the Gurukula's founding mission ('Swastha Susamskruta Samajada Nirmana', Est. 1994).",
      icon: TreePine,
      color: "indigo",
      image: "/images/campus/campus-panoramic.webp",
      tag: "Vyasa Sannidhi",
    },
    {
      title: "Campus Mahadwara & Welcoming Gopuram Arch",
      category: "Heritage Gate",
      desc: "The peaceful terracotta-roofed entrance archway crowned with the sacred Om symbol welcoming students, acharyas, and visitors into our safe 12-acre Ramohalli sanctuary.",
      icon: Home,
      color: "rose",
      image: "/images/local/gurukula-campus-main.jpg",
      tag: "Ramohalli Mahadwara",
    },
    {
      title: "Annapoorna Main Hall & Flagpole Forecourt",
      category: "Ashram Architecture",
      desc: "The main hall crowned with the rising-sun Om emblem of Shubham Karoti and its stepped forecourt designed for community gatherings, convocations, and national ceremonies.",
      icon: Compass,
      color: "saffron",
      image: "/images/campus/campus-morning-assembly.webp",
      tag: "Annapoorna Main Hall",
    },
    {
      title: "Morning Prarthana & Courtyard Assembly Grounds",
      category: "Daily Assembly",
      desc: "Shaded open courtyard where students, resident Matrushrees, and trustees gather in a circle around the morning rangoli for prayers, subhashitas, and moral discourse.",
      icon: Music,
      color: "emerald",
      image: "/images/campus/campus-learning-pavilion.webp",
      tag: "Courtyard Assembly",
    },
  ];

  return (
    <section className="maitreyi-campus-section" id="campus">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-centered">
          <div className="section-pill-badge">
            <Sparkles size={14} />
            <span>CAMPUS &amp; FACILITIES • PARISARA</span>
          </div>
          <h2>
            A 12-Acre Sanctuary of
            <br />
            <span className="section-title-highlight">Nature, Culture &amp; Learning</span>
          </h2>
          <p className="section-subtitle">
            Nestled in Ramohalli, near Bengaluru&apos;s historic Big Banyan Tree (Dodda Alada Mara),
            our 12-acre campus provides a safe, peaceful green haven where students thrive free from urban noise and distraction.
          </p>
        </div>

        {/* Campus Overview Features Banner */}
        <div className="campus-overview-strip">
          <div className="campus-strip-card">
            <span className="strip-metric">12 Acres</span>
            <span className="strip-label">Lush Green Campus</span>
          </div>
          <div className="campus-strip-card">
            <span className="strip-metric">100% Secure</span>
            <span className="strip-label">Residential Protection</span>
          </div>
          <div className="campus-strip-card">
            <span className="strip-metric">Goshala</span>
            <span className="strip-label">Indigenous Desi Cows</span>
          </div>
          <div className="campus-strip-card">
            <span className="strip-metric">Organic</span>
            <span className="strip-label">Satvic Dining Everyday</span>
          </div>
        </div>

        {/* 8 Facilities Grid with Authentic Photographs */}
        <div className="facilities-grid facilities-with-images">
          {facilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`facility-card facility-photo-card facility-${item.color}`}
              >
                <div
                  className="facility-image-wrap"
                  onClick={() => setActivePhotoModal(item)}
                  title="Click to zoom photo"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="facility-img-overlay">
                    <span className="facility-zoom-icon">
                      <Maximize2 size={16} />
                    </span>
                  </div>
                  <span className="facility-photo-tag">{item.tag}</span>
                </div>

                <div className="facility-body">
                  <div className="facility-card-header">
                    <div className={`facility-icon-wrap icon-${item.color}`}>
                      <Icon size={20} />
                    </div>
                    <span className="facility-cat-tag">{item.category}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="facility-card-footer">
                    <CheckCircle2 size={14} className="facility-check-icon" />
                    <span>Integrated Daily Experience</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Campus Atmosphere Callout */}
        <div className="campus-callout-box">
          <div className="callout-inner">
            <div className="callout-text">
              <h3>Living as One Family (Guru-Shishya Kutumba)</h3>
              <p>
                At Shubham Karoti Gurukula, teachers and students live, eat, learn, and grow together.
                This creates an atmosphere of trust, emotional security, and motherly care where every girl blossoms with poise and confidence.
              </p>
            </div>
            <a href="#contact" className="callout-btn">
              <span>Schedule a Campus Visit</span>
              <Compass size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhotoModal && (
        <div
          className="photo-lightbox-backdrop"
          onClick={() => setActivePhotoModal(null)}
        >
          <div
            className="photo-lightbox-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setActivePhotoModal(null)}
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <div className="lightbox-image-wrap">
              <img src={activePhotoModal.image} alt={activePhotoModal.title} />
            </div>
            <div className="lightbox-details">
              <span className="lightbox-tag">{activePhotoModal.category}</span>
              <h3>{activePhotoModal.title}</h3>
              <p>{activePhotoModal.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CampusSection;
