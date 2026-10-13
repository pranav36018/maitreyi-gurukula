import { useState, useEffect } from "react";
import {
  Sparkles,
  MapPin,
  Camera,
  Maximize2,
  X,
  CheckCircle2,
  ArrowRight,
  Compass,
  ChevronLeft,
  ChevronRight,
  Sun,
  LayoutGrid,
  Layers,
  Flower2,
  Eye,
} from "lucide-react";
import GurukulaBackgroundAnimation from "./GurukulaBackgroundAnimation";

function LocalPhotosSection() {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [viewMode, setViewMode] = useState("mosaic"); // "mosaic" | "spotlight"

  const localPhotos = [
    {
      id: "campus-main",
      title: "Campus Mahadwara: The Sacred Entrance Gopuram",
      subtitle: "Ramohalli Parisara • Near Big Banyan Tree",
      sanskrit: "शान्तं शिवमद्वैतम्",
      tag: "Heritage Gateway",
      badge: "Campus Entrance Arch",
      aspect: "featured",
      desc: "The welcoming terracotta-roofed entrance archway (Mahadwara) of Shubham Karoti Maitreyi Gurukula crowned with the sacred Om emblem and Kannada inscription ('ಶುಭಂ ಕರೋತಿ ಮೈತ್ರೇಯಿ ಗುರುಕುಲ'). Framed by tall trees in Ramohalli, this gateway marks the threshold into a serene 12-acre educational sanctuary free from urban clamor.",
      src: "/images/local/gurukula-campus-main.jpg",
      highlights: [
        "Traditional terracotta-tiled gopuram arch crowned with the sacred Om symbol",
        "Situated in lush green Ramohalli near Bengaluru's historic Big Banyan Tree",
        "Secure, peaceful residential gateway dedicated to virtuous girl child upbringing",
      ],
      photographerNote: "The main entrance archway welcoming students, parents, and visitors into the Ramohalli campus.",
    },
    {
      id: "vriksha-katte",
      title: "Vriksha Katte Pathashala: Learning Under the Sacred Tree",
      subtitle: "Open-Air Shastra Immersion • Ashwattha Katte",
      sanskrit: "स्वाध्यायान्मा प्रमदः",
      tag: "Open-Air Pathashala",
      badge: "Banyan Tree Class",
      aspect: "standard",
      desc: "An Acharya seated cross-legged on the raised circular stone platform beneath the canopy of a giant sacred tree, instructing young shishyas in Vedic chanting, Paninian Sanskrit grammar, and Upanishadic wisdom amidst pure forest breeze.",
      src: "/images/brand/hero-banner-1.jpg",
      highlights: [
        "Traditional circular stone platform (Katte) shaded by ancient sacred trees",
        "Oral recitation (Shruti Parampara) in harmony with birdsong and greenery",
        "Fosters calm concentration, natural vitality, and joyful scholarly inquiry",
      ],
      photographerNote: "Acharya conducting an open-air Sanskrit and shastra session under the sacred tree canopy.",
    },
    {
      id: "activity-1",
      title: "The Gurukula Kutumba: Student Cohort with Founder",
      subtitle: "One United Family • 12-Acre Shaded Grove",
      sanskrit: "सङ्घच्छध्वं संवदध्वम्",
      tag: "Gurukula Parivara",
      badge: "Student Cohort",
      aspect: "standard",
      desc: "Over 45 residential shishyas across 6th Standard through 2nd PUC seated and standing in three harmonious rows under the tall campus trees alongside Managing Trustee Sri Pramod Kamath — living, learning, and growing as one united family.",
      src: "/images/local/gurukula-activity-1.jpg",
      highlights: [
        "100% free residential education, boarding, satvic meals, and clothing for all girls",
        "Students from across Karnataka bonded in lifelong sisterhood and mutual care",
        "Personal mentorship from Managing Trustee Sri Pramod Kamath and resident Matrushrees",
      ],
      photographerNote: "Full student cohort portrait with Managing Trustee Sri Pramod Kamath under the campus trees.",
    },
    {
      id: "activity-3",
      title: "Dawn Assembly & Flag Hoisting at Annapoorna Hall",
      subtitle: "Daily Dinacharya • Patriotic & Vedic Prarthana",
      sanskrit: "अनुशासनं परमं तपः",
      tag: "Morning Dinacharya",
      badge: "Annapoorna Assembly",
      aspect: "standard",
      desc: "Young shishyas in pristine white uniforms with saffron waistbands gathered in disciplined formation before the 'ಅನ್ನಪೂರ್ಣ' (Annapoorna) Main Hall featuring the rising-sun Om emblem during morning flag hoisting with trustees and acharyas.",
      src: "/images/local/gurukula-activity-3.jpg",
      highlights: [
        "Morning flag ceremony, patriotic pledges, and collective Vedic prayers",
        "Held on the stepped forecourt of the iconic Annapoorna Main Hall",
        "Instills punctuality, national pride, and reverence for elders and mentors",
      ],
      photographerNote: "Students, trustees, and acharyas gathered before Annapoorna Hall for morning flag hoisting.",
    },
    {
      id: "activity-2",
      title: "Guru Vandana & Academic Scroll Blessings",
      subtitle: "Guru-Shishya Parampara • Sacred Convocation",
      sanskrit: "आचार्यो देवो भव",
      tag: "Guru Blessings",
      badge: "Convocation Honors",
      aspect: "standard",
      desc: "A shishya in traditional white attire bowing with deep reverence as she receives her academic scroll and personal blessings from Managing Trustee Sri Pramod Kamath — embodying humility alongside scholastic achievement.",
      src: "/images/local/gurukula-activity-2.jpg",
      highlights: [
        "Sacred Guru-Shishya tradition honoring knowledge with gratitude and humility",
        "Direct personal encouragement from the founding family for every student",
        "Celebrating milestones across State Board (SSLC/PUC) and Sanskrit exams",
      ],
      photographerNote: "Managing Trustee Sri Pramod Kamath conferring scroll and blessings upon a student.",
    },
    {
      id: "vyasa-sannidhi",
      title: "Bhagavan Veda Vyasa Sannidhi & Founding Charter",
      subtitle: "Established Vyasa Poornima 1994 • Sacred Shrine",
      sanskrit: "नमोऽस्तु ते व्यास विशालबुद्धे",
      tag: "Vyasa Shrine",
      badge: "Founding Charter",
      aspect: "standard",
      desc: "A girl student offering folded-hands pranama before the shrine of Bhagavan Maharshi Veda Vyasa ('ಭಗವಾನ್ ವ್ಯಾಸ ಮಹರ್ಷಿಃ'), flanked by granite tablets inscribed with the Gurukula's core mission: 'Swastha Susamskruta Samajada Nirmana'.",
      src: "/images/campus/campus-panoramic.webp",
      highlights: [
        "Commemorates the Gurukula's inauguration on Vyasa Poornima, 22nd July 1994",
        "Granite tablets permanently inscribing the vision of a healthy, cultured society",
        "Daily locus of student devotion to the sage who compiled the four Vedas",
      ],
      photographerNote: "Student offering namaskara at the Bhagavan Veda Vyasa shrine and mission tablets.",
    },
    {
      id: "bhojana-shala",
      title: "Annapoorna Bhojana Shala: Satvic Community Dining",
      subtitle: "Wholesome Nutrition • Anna Brahma Bhava",
      sanskrit: "अन्नं ब्रह्मेति व्यजानात्",
      tag: "Satvic Dining",
      badge: "Annapoorna Hall",
      aspect: "standard",
      desc: "Girl students seated cross-legged in a neat row on the spotless dining floor, partaking of freshly prepared, steaming satvic vegetarian meals served with maternal warmth after chanting the Brahmarpanam prayer.",
      src: "/images/campus/campus-courtyard.webp",
      highlights: [
        "Three nutritious, freshly cooked satvic vegetarian meals provided 100% free daily",
        "Traditional floor seating promoting healthy digestion and mindful eating",
        "Zero food wastage discipline practiced as gratitude to Mother Annapoorna",
      ],
      photographerNote: "Students enjoying a wholesome morning breakfast in the Annapoorna dining hall.",
    },
    {
      id: "mandir-puja",
      title: "Daily Devarapooje & Sanctum Deeparadhana",
      subtitle: "Morning & Evening Upasana • Prayer Mandiram",
      sanskrit: "दीपज्योतिः परं ब्रह्म",
      tag: "Mandir Upasana",
      badge: "Prayer Sanctum",
      aspect: "standard",
      desc: "Four girl students seated in serene devotion before the carved wooden mantapa of Lord Krishna in the sunlit prayer hall, performing daily puja, lighting brass oil lamps, and offering fresh flowers.",
      src: "/images/brand/hero-banner-2.jpg",
      highlights: [
        "Hands-on mastery of traditional puja rituals, arati, and stotra recitation",
        "Sunlit sanctum adorned with sacred portraits and carved wooden mantapa",
        "Cultivates inner peace, emotional purity, and aesthetic grace every morning",
      ],
      photographerNote: "Students performing daily morning lamp worship before the Lord Krishna shrine.",
    },
  ];

  const currentPhoto = localPhotos[activePhotoIdx];

  const handleNext = (e) => {
    e?.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % localPhotos.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + localPhotos.length) % localPhotos.length);
  };

  const openLightboxAt = (idx) => {
    setActivePhotoIdx(idx);
    setIsLightboxOpen(true);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      if (e.key === "ArrowRight") setActivePhotoIdx((prev) => (prev + 1) % localPhotos.length);
      if (e.key === "ArrowLeft") setActivePhotoIdx((prev) => (prev - 1 + localPhotos.length) % localPhotos.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, localPhotos.length]);

  return (
    <section className="aesthetic-local-photos-section" id="campus-photos">
      {/* Sacred Background Animation: Floating Leaves & Prana Motes */}
      <GurukulaBackgroundAnimation isHeroOnly={true} />

      {/* Subtle Sacred Background Watermark */}
      <div className="aesthetic-bg-watermark">
        <span>शु॒भं क॑रोति क॑ल्या॒णम्</span>
      </div>

      <div className="section-container">
        {/* Curated Header */}
        <div className="aesthetic-section-header">
          <div className="aesthetic-pill-tag">
            <Camera size={15} />
            <span>EXCLUSIVE ASHRAM ARCHIVES • RAMOHALLI BENGALURU</span>
            <Sparkles size={14} className="pill-sparkle" />
          </div>
          <h2>
            Glimpses of Ramohalli:
            <br />
            <span className="aesthetic-header-gradient">Life in Our 12-Acre Sanctuary</span>
          </h2>
          <p className="aesthetic-header-lead">
            Authentic, unedited photography capturing the serene spirit of our residential Gurukula near Bangalore&apos;s historic Big Banyan Tree.
            Witness our welcoming Mahadwara, open-air Vriksha Katte classes, morning assemblies, satvic dining, and daily devotion.
          </p>

          {/* View Mode Switcher Pills */}
          <div className="photo-view-switcher">
            <button
              type="button"
              className={`view-switch-btn ${viewMode === "mosaic" ? "active" : ""}`}
              onClick={() => setViewMode("mosaic")}
              title="View all 8 photographs together in an editorial mosaic"
            >
              <LayoutGrid size={16} />
              <span>Mosaic Gallery Grid</span>
              <span className="view-btn-badge">All 8 Photos</span>
            </button>

            <button
              type="button"
              className={`view-switch-btn ${viewMode === "spotlight" ? "active" : ""}`}
              onClick={() => setViewMode("spotlight")}
              title="View one photo at a time in full theatrical spotlight with narrative"
            >
              <Layers size={16} />
              <span>Spotlight Theater</span>
              <span className="view-btn-badge">Narrative View</span>
            </button>
          </div>
        </div>

        {/* ================= VIEW MODE 1: EDITORIAL MOSAIC GALLERY ================= */}
        {viewMode === "mosaic" && (
          <div className="curated-mosaic-gallery">
            <div className="mosaic-grid-layout">
              {/* Grand Featured Hero Card (Campus Main Building) */}
              <div
                className="mosaic-card mosaic-card-featured"
                onClick={() => openLightboxAt(0)}
              >
                <div className="mosaic-img-frame">
                  <img
                    src={localPhotos[0].src}
                    alt={localPhotos[0].title}
                    loading="lazy"
                  />
                  <div className="mosaic-photo-overlay">
                    <span className="mosaic-inspect-badge">
                      <Maximize2 size={15} />
                      <span>Click to Enlarge</span>
                    </span>
                  </div>
                  <div className="mosaic-floating-top-pill">
                    <MapPin size={13} />
                    <span>Ramohalli Campus • 12 Acres</span>
                  </div>
                </div>

                <div className="mosaic-card-body">
                  <div className="mosaic-meta-row">
                    <span className="mosaic-sanskrit-tag">{localPhotos[0].sanskrit}</span>
                    <span className="mosaic-category-pill">{localPhotos[0].badge}</span>
                  </div>
                  <h3>{localPhotos[0].title}</h3>
                  <p>{localPhotos[0].desc}</p>
                  <div className="mosaic-highlights-chips">
                    {localPhotos[0].highlights.map((h, i) => (
                      <span key={i} className="mosaic-chip">
                        <CheckCircle2 size={13} />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3 Complementary Ashram Life Cards */}
              <div className="mosaic-subgrid">
                {localPhotos.slice(1).map((item, idx) => {
                  const actualIdx = idx + 1;
                  return (
                    <div
                      key={item.id}
                      className="mosaic-card mosaic-card-sub"
                      onClick={() => openLightboxAt(actualIdx)}
                    >
                      <div className="mosaic-img-frame mosaic-img-sub">
                        <img
                          src={item.src}
                          alt={item.title}
                          loading="lazy"
                        />
                        <div className="mosaic-photo-overlay">
                          <span className="mosaic-inspect-badge">
                            <Maximize2 size={15} />
                            <span>Enlarge</span>
                          </span>
                        </div>
                        <div className="mosaic-floating-top-pill pill-sub">
                          <span>0{actualIdx + 1}</span>
                        </div>
                      </div>

                      <div className="mosaic-card-body mosaic-card-sub-body">
                        <div className="mosaic-meta-row">
                          <span className="mosaic-sanskrit-tag">{item.sanskrit}</span>
                          <span className="mosaic-category-pill pill-gold">{item.tag}</span>
                        </div>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                        <div className="mosaic-sub-footer">
                          <span className="mosaic-note-text">
                            <em>📸 {item.photographerNote}</em>
                          </span>
                          <span className="mosaic-zoom-link">
                            <Eye size={14} />
                            <span>Inspect</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW MODE 2: SPOTLIGHT THEATER ================= */}
        {viewMode === "spotlight" && (
          <div className="masterpiece-theater-split">
            {/* Split Theater: Left Stage Photo, Right Editorial Narrative */}
            <div className="theater-split-grid">
              {/* Left Column: Pure High-Res Photo Canvas */}
              <div
                className="theater-photo-canvas"
                onClick={() => setIsLightboxOpen(true)}
              >
                <div className="canvas-img-wrapper">
                  <img
                    src={currentPhoto.src}
                    alt={currentPhoto.title}
                    key={currentPhoto.id}
                    className="canvas-display-img"
                  />
                  <div className="canvas-hover-glass">
                    <span className="canvas-zoom-pill">
                      <Maximize2 size={16} />
                      <span>View Fullscreen High Resolution</span>
                    </span>
                  </div>
                </div>

                {/* Corner Badges */}
                <div className="canvas-top-badges">
                  <div className="canvas-location-pill">
                    <MapPin size={13} className="pin-gold" />
                    <span>Ramohalli Campus Sanctuary</span>
                  </div>
                  <span className="canvas-index-pill">
                    {activePhotoIdx + 1} of {localPhotos.length}
                  </span>
                </div>

                {/* Prev / Next Stage Arrows */}
                <button
                  type="button"
                  className="canvas-nav-arrow arrow-left"
                  onClick={handlePrev}
                  aria-label="Previous photograph"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  className="canvas-nav-arrow arrow-right"
                  onClick={handleNext}
                  aria-label="Next photograph"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Right Column: Editorial Narrative Card */}
              <div className="theater-narrative-card">
                <div className="theater-card-header">
                  <div className="theater-sanskrit-tag">
                    <Flower2 size={15} />
                    <span>{currentPhoto.sanskrit}</span>
                  </div>
                  <span className="theater-badge-pill">{currentPhoto.badge}</span>
                </div>

                <h3>{currentPhoto.title}</h3>
                <span className="theater-subtitle">{currentPhoto.subtitle}</span>

                <p className="theater-desc-paragraph">{currentPhoto.desc}</p>

                <div className="theater-highlights-box">
                  <span className="highlights-box-title">LIVING HERITAGE IN PRACTICE</span>
                  {currentPhoto.highlights.map((h, i) => (
                    <div key={i} className="theater-highlight-item">
                      <CheckCircle2 size={15} className="item-check" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="theater-photographer-box">
                  <em>📸 {currentPhoto.photographerNote}</em>
                </div>

                <div className="theater-card-actions">
                  <button
                    type="button"
                    className="theater-enlarge-action-btn"
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    <Maximize2 size={16} />
                    <span>Inspect Fullscreen Resolution</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Filmstrip Switcher */}
            <div className="theater-filmstrip-row">
              {localPhotos.map((item, index) => {
                const isActive = activePhotoIdx === index;
                return (
                  <div
                    key={item.id}
                    className={`theater-thumb-card ${isActive ? "active-thumb" : ""}`}
                    onClick={() => setActivePhotoIdx(index)}
                  >
                    <div className="thumb-img-box">
                      <img src={item.src} alt={item.title} loading="lazy" />
                      <span className="thumb-index-num">0{index + 1}</span>
                      {isActive && <div className="thumb-active-rim"></div>}
                    </div>
                    <div className="thumb-info-box">
                      <span className="thumb-tag">{item.tag}</span>
                      <h5>{item.title}</h5>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Elegant Campus Invitation Banner */}
        <div className="aesthetic-visit-invitation">
          <div className="invitation-ornament">
            <Sun size={28} />
          </div>
          <div className="invitation-content">
            <h4>Immerse in the Serenity of Ramohalli</h4>
            <p>
              Photographs convey only a fraction of the peaceful vibration, fragrant greenery, and Vedic resonance at our campus.
              We warmly invite families, educationists, and patrons to visit in person and experience Gurukula life firsthand.
            </p>
          </div>
          <div className="invitation-actions">
            <a href="#contact" className="invitation-primary-btn">
              <span>Schedule Campus Visit</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Cinematic Full-Screen Lightbox */}
      {isLightboxOpen && (
        <div
          className="cinematic-lightbox-backdrop"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="cinematic-lightbox-modal"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              className="cinematic-close-btn"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close high-resolution preview"
            >
              <X size={22} />
            </button>

            {/* Nav Arrows */}
            <button
              type="button"
              className="cinematic-nav-arrow arrow-prev"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={30} />
            </button>
            <button
              type="button"
              className="cinematic-nav-arrow arrow-next"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight size={30} />
            </button>

            {/* High-Res Image Display */}
            <div className="cinematic-img-stage">
              <img
                src={currentPhoto.src}
                alt={currentPhoto.title}
                className="cinematic-display-img"
              />
            </div>

            {/* Bottom Metadata Panel */}
            <div className="cinematic-info-panel">
              <div className="cinematic-header-row">
                <div className="cinematic-tag-group">
                  <span className="cinematic-gold-pill">{currentPhoto.badge}</span>
                  <span className="cinematic-sanskrit-tag">{currentPhoto.sanskrit}</span>
                </div>
                <span className="cinematic-counter">
                  Photo {activePhotoIdx + 1} of {localPhotos.length}
                </span>
              </div>

              <h3>{currentPhoto.title}</h3>
              <p>{currentPhoto.desc}</p>

              <div className="cinematic-facets-list">
                {currentPhoto.highlights.map((h, i) => (
                  <div key={i} className="cinematic-facet-item">
                    <CheckCircle2 size={14} className="facet-check" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Lightbox Mini Thumbnails Strip */}
              <div className="lightbox-thumbs-rail">
                {localPhotos.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    className={`lb-thumb-btn ${activePhotoIdx === i ? "active-lb-thumb" : ""}`}
                    onClick={() => setActivePhotoIdx(i)}
                  >
                    <img src={p.src} alt={p.title} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default LocalPhotosSection;
