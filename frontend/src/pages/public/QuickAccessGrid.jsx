import { useState, useMemo } from "react";
import {
  Sparkles,
  Globe,
  Scroll,
  BookOpen,
  Flower2,
  ShieldCheck,
  Award,
  Camera,
  Compass,
  Clock,
  Users,
  GraduationCap,
  Palette,
  HelpCircle,
  MessageCircle,
  Navigation,
  LogIn,
  Search,
  X,
  ArrowRight,
} from "lucide-react";
import "./QuickAccessGrid.css";

export const CONTENT_ITEMS = [
  {
    id: "intro",
    num: "01",
    title: "The Guiding Essence",
    kannadaTitle: "ಮಾರ್ಗದರ್ಶಿ ತತ್ವ",
    category: "essence",
    categoryLabel: "Core Essence",
    icon: Sparkles,
    color: "gold",
    image: "/images/brand/hero-banner-1.jpg",
    summary:
      "Education is not only about what she learns — it is who she becomes. 3 sacred pillars: Self-Respect, Scholastic Mastery, and Selfless Seva.",
    keyChips: ["3 Core Pillars", "Self-Respect (ಆತ್ಮಗೌರವ)", "Civilizational Roots"],
  },
  {
    id: "story",
    num: "02",
    title: "Our Sacred Origin & 1994 Catalyst",
    kannadaTitle: "ಸಂಸ್ಥೆಯ ಪವಿತ್ರ ಉಗಮ",
    category: "essence",
    categoryLabel: "Heritage & Origins",
    icon: Globe,
    color: "amber",
    image: "/images/students/student-learning-1.webp",
    summary:
      "How an overseas airport transit scrutiny inspired Sri Ramdas Kamath & Sri Pramod Kamath to dedicate their family land to empower India's daughters.",
    keyChips: ["1994 Transit Catalyst", "Pejawar Swamiji Blessings", "12-20 Acres Land"],
  },
  {
    id: "milestones",
    num: "03",
    title: "30-Year Milestones & History",
    kannadaTitle: "೩೦ ವರ್ಷಗಳ ಸುವರ್ಣ ಪಯಣ",
    category: "essence",
    categoryLabel: "Heritage & Origins",
    icon: Scroll,
    color: "saffron",
    image: "/images/campus/campus-panoramic.webp",
    summary:
      "Tracing the 3 pivotal phases: Genesis in 1994, graduation of 15 batches (300+ shishyas) by 2014, and full-time mentorship expanding alumni globally.",
    keyChips: ["Phase 1 (1994-02)", "Phase 2 (2002-14)", "Phase 3 (2014+)", "300+ Alumni"],
  },
  {
    id: "philosophy",
    num: "04",
    title: "Gurukula Philosophy • Siddhanta",
    kannadaTitle: "ಸಿದ್ಧಾಂತ ಮತ್ತು ಮೌಲ್ಯಗಳು",
    category: "academics",
    categoryLabel: "Philosophy & Academics",
    icon: BookOpen,
    color: "teal",
    image: "/images/students/student-learning-4.webp",
    summary:
      "Guru-Shishya Parampara family living, spoken Sanskrit in daily life, and fostering fearless self-reliance (ಸ್ವಾವಲಂಬನೆ) in girls.",
    keyChips: ["Guru-Shishya Parampara", "Living Spoken Sanskrit", "Girl Child Self-Reliance"],
  },
  {
    id: "panchamukhi",
    num: "05",
    title: "Panchamukhi Shikshana (5 Personalities)",
    kannadaTitle: "ಪಂಚಮುಖಿ ಶಿಕ್ಷಣ ವಿಕಾಸ",
    category: "academics",
    categoryLabel: "Philosophy & Academics",
    icon: Flower2,
    color: "emerald",
    image: "/images/events/vivekananda-chicago-2.webp",
    summary:
      "Harmonious 5-fold development: Sharirika (Physical), Manomaya (Mental), Vijnanamaya (Intellectual), Anandamaya (Emotional), and Atma Samskara (Spiritual).",
    keyChips: ["Sharirika (Physical)", "Manomaya (Mental)", "Intellectual (SSLC/PUC)", "Emotional (Natya)", "Spiritual (Agnihotra)"],
  },
  {
    id: "unique",
    num: "06",
    title: "What Makes Us Different",
    kannadaTitle: "ವಿಶಿಷ್ಟತೆಗಳು ಮತ್ತು ವೈಶಿಷ್ಟ್ಯ",
    category: "academics",
    categoryLabel: "Philosophy & Academics",
    icon: ShieldCheck,
    color: "indigo",
    image: "/images/events/independence-day-1.webp",
    summary:
      "4 distinctive hallmarks: 100% Free of Cost education, Triple Board Certifications, Conversational Sanskrit immersion, and Ancient Arts (Gandhari Vidya, Natya).",
    keyChips: ["100% Free Seva", "Triple Board Exams", "Living Sanskrit", "Gandhari Vidya"],
  },
  {
    id: "journey",
    num: "07",
    title: "The 6-Year Shishya Journey",
    kannadaTitle: "೬ ವರ್ಷಗಳ ಶಿಷ್ಯ ಪಯಣ",
    category: "academics",
    categoryLabel: "Philosophy & Academics",
    icon: Award,
    color: "rose",
    image: "/images/local/gurukula-activity-2.jpg",
    summary:
      "Tracking each child through 6 stages: Pravesha (Admission), Vidya (Academics), Kala (Arts), Dharma (Seva), Siddhi (Honors), and Alumni Sisterhood.",
    keyChips: ["Pravesha (Entry)", "Vidya (Academics)", "Kala (Arts)", "Dharma (Seva)", "Siddhi (Honors)", "Alumni"],
  },
  {
    id: "campus-photos",
    num: "08",
    title: "Ramohalli Campus Photos (Photo Tour)",
    kannadaTitle: "ರಾಮೋಹಳ್ಳಿ ಕ್ಯಾಂಪಸ್ ಛಾಯಾಚಿತ್ರಗಳು",
    category: "campus",
    categoryLabel: "Campus Life & Routine",
    icon: Camera,
    color: "teal",
    image: "/images/local/gurukula-campus-main.jpg",
    summary:
      "Photo tour of our 12-acre sanctuary in Ramohalli near Big Banyan Tree: traditional Mahadwara archway, dawn assemblies, open courtyards, and lush greenery.",
    keyChips: ["12-Acre Grounds", "Big Banyan Tree Road", "Traditional Architecture", "Dawn Assemblies"],
  },
  {
    id: "campus",
    num: "09",
    title: "Campus Facilities & Living",
    kannadaTitle: "ಸೌಲಭ್ಯಗಳು ಮತ್ತು ಆವರಣ",
    category: "campus",
    categoryLabel: "Campus Life & Routine",
    icon: Compass,
    color: "emerald",
    image: "/images/campus/campus-morning-assembly.webp",
    summary:
      "Sacred Yajnashala, Vriksha Katte Pathashala, Prayer Sanctum, Annapoorna Satvic dining hall, green orchards, and secure hostels under Matrushree care.",
    keyChips: ["Yajnashala & Agnihotra", "Vriksha Katte Classrooms", "Prayer Sanctum", "Annapoorna Dining"],
  },
  {
    id: "routine",
    num: "10",
    title: "Daily Routine (Dinacharya)",
    kannadaTitle: "ದೈನಂದಿನ ದಿನಚರ್ಯಾ",
    category: "campus",
    categoryLabel: "Campus Life & Routine",
    icon: Clock,
    color: "saffron",
    image: "/images/local/gurukula-activity-3.jpg",
    summary:
      "A rhythmic 24-hour routine from 5:00 AM Brahma Muhurta awakening to 9:30 PM Ratri Shayana, balancing yogasana, shastras, academics, arts, and wholesome nutrition.",
    keyChips: ["5:00 AM Jagaran", "Suryanamaskar & Ghosh", "9 AM - 1 PM Academics", "Bharatanatyam", "9:30 PM Shayana"],
  },
  {
    id: "acharyas",
    num: "11",
    title: "Profiles of Acharyas & Mentors",
    kannadaTitle: "ಆಚಾರ್ಯರು ಮತ್ತು ಮಾರ್ಗದರ್ಶಕರು",
    category: "campus",
    categoryLabel: "Campus Life & Routine",
    icon: Users,
    color: "amber",
    image: "/images/acharyas/shri-pramod-kamat.webp",
    summary:
      "Visionary patron Late Sri Ramdas Kamath, divine patron Poojya Pejawar Swamiji, President Sri Pramod Kamath, Trustees Amit & Meera Kamath, and resident Matrushrees.",
    keyChips: ["Late Sri Ramdas Kamath", "Pejawar Swamiji", "Sri Pramod Kamath", "Matrushrees"],
  },
  {
    id: "admissions",
    num: "12",
    title: "Admissions & Eligibility",
    kannadaTitle: "ಪ್ರವೇಶ ಪ್ರಕ್ರಿಯೆ ಮತ್ತು ಅರ್ಹತೆ",
    category: "admissions",
    categoryLabel: "Admissions & Contact",
    icon: GraduationCap,
    color: "emerald",
    image: "/images/local/gurukula-activity-1.jpg",
    summary:
      "Admissions open for girls who completed 5th standard (~10 yrs). 100% free food, stay, clothes & education. 5-step transparent selection process representing all districts.",
    keyChips: ["Class 5 Completion", "100% Free of Cost", "15-20 Girls / Batch", "All Districts"],
  },
  {
    id: "gallery",
    num: "13",
    title: "Photo & Video Gallery",
    kannadaTitle: "ಚಿತ್ರ ಮತ್ತು ವಿಡಿಯೋ ಗ್ಯಾಲರಿ",
    category: "media",
    categoryLabel: "Photos, Media & FAQs",
    icon: Palette,
    color: "rose",
    image: "/images/events/celebration-flower-mandala.webp",
    summary:
      "Curated collection of 25+ authentic high-resolution photographs and video highlights: Vedic chanting, student Ghosh marching band parade, cultural festivals, and ashram life.",
    keyChips: ["25+ Curated Photos", "Vedic Chanting", "Ghosh Marching Band", "Video Highlights"],
  },
  {
    id: "faqs",
    num: "14",
    title: "Frequently Asked Questions (FAQs)",
    kannadaTitle: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೋತ್ತರಗಳು",
    category: "media",
    categoryLabel: "Photos, Media & FAQs",
    icon: HelpCircle,
    color: "indigo",
    image: "/images/students/student-learning-2.webp",
    summary:
      "Clear, detailed answers to 8 common questions: zero fees, eligibility, board accreditations, learning Sanskrit, parental visits, alumni careers, safety, and 80G tax exemptions.",
    keyChips: ["Zero Fees Explained", "Triple Board Degrees", "Parental Visitation", "80G Tax Exemption"],
  },
  {
    id: "contact",
    num: "15",
    title: "Contact & Admission Enquiry Form",
    kannadaTitle: "ಸಂಪರ್ಕ ಮತ್ತು ವಿಚಾರಣೆ",
    category: "admissions",
    categoryLabel: "Admissions & Contact",
    icon: MessageCircle,
    color: "teal",
    image: "/images/campus/campus-learning-pavilion.webp",
    summary:
      "Direct phone numbers, campus and city office addresses, email, visiting hours, and online admission enquiry form to apply for upcoming batches.",
    keyChips: ["Online Enquiry Form", "Sri Pramod Kamat (+91 9845403290)", "Campus: Ramohalli", "Office: Ramachandra Puram"],
  },
  {
    id: "directions",
    num: "16",
    title: "Directions & Transit Navigation",
    kannadaTitle: "ಮಾರ್ಗದರ್ಶಿ ಮತ್ತು ನಕ್ಷೆ",
    category: "admissions",
    categoryLabel: "Admissions & Contact",
    icon: Navigation,
    color: "saffron",
    image: "/images/events/independence-day-2.webp",
    summary:
      "Interactive Google Maps directions, Kengeri Metro Station route, BMTC 227 bus routes from Majestic/KR Market, and Big Banyan Tree landmark guide.",
    keyChips: ["Google Maps Link", "Kengeri Metro Station", "BMTC 227 Bus Series", "Near Big Banyan Tree"],
  },
  {
    id: "portal-login",
    num: "17",
    title: "Acharya & Staff Portal Login",
    kannadaTitle: "ಆಚಾರ್ಯ ಲಾಗಿನ್ ಪೋರ್ಟಲ್",
    category: "admissions",
    categoryLabel: "Admissions & Contact",
    icon: LogIn,
    color: "indigo",
    image: "/images/students/student-group-2.webp",
    summary:
      "Secure internal management portal for Acharyas, Matrushrees, and staff to monitor student tracking, marks, attendance, and admissions records.",
    keyChips: ["Acharya Portal", "Shishya Tracking", "Attendance & Marks", "Secure Login"],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Sacred Pathways" },
  { id: "essence", label: "Heritage & Origins" },
  { id: "academics", label: "Philosophy & Academics" },
  { id: "campus", label: "Campus Life & Routine" },
  { id: "admissions", label: "Admissions & Contact" },
  { id: "media", label: "Photos, Media & FAQs" },
];

function QuickAccessGrid({ onSelectContent }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return CONTENT_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchKannada = item.kannadaTitle.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchChips = item.keyChips.some((chip) =>
        chip.toLowerCase().includes(q)
      );
      const matchCategory = item.categoryLabel.toLowerCase().includes(q);

      return (
        matchTitle ||
        matchKannada ||
        matchSummary ||
        matchChips ||
        matchCategory
      );
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="darshanam-section" id="gurukula-darshanam">
      {/* Subtle Sacred Geometry Watermark in Background */}
      <div className="darshanam-mandala-watermark" aria-hidden="true" />

      <div className="darshanam-container">
        {/* ================= HEADER BANNER ================= */}
        <div className="darshanam-header">
          <div className="darshanam-pill">
            <Compass size={15} className="darshanam-compass-spin" />
            <span>DIVYA DWARA • SACRED PATHWAYS OF MAITREYI</span>
          </div>
          <h2>
            <span className="darshanam-title-en">Gurukula Darshanam</span>
            <span className="darshanam-header-dot">•</span>
            <span className="darshanam-title-kn">ಗುರುಕುಲ ದರ್ಶನಂ</span>
          </h2>
          <p className="darshanam-subtitle">
            An immersive gateway into every sacred dimension of our 12-acre sanctuary.
            Tap any doorway below to step directly into its respective sanctuary — delve into our philosophy,
            30-year heritage, daily routine, campus life, and admissions.
          </p>
        </div>

        {/* ================= SEARCH & CATEGORY BAR ================= */}
        <div className="darshanam-controls">
          <div className="darshanam-search-box">
            <Search size={18} className="darshanam-search-icon" />
            <input
              type="text"
              placeholder="Search pathways (e.g., Routine, Sanskrit, Admissions, Free Fees, Bharatanatyam, Goshala)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search Gurukula Darshanam pathways"
            />
            {searchQuery && (
              <button
                type="button"
                className="darshanam-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="darshanam-categories-row">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`darshanam-cat-btn ${isActive ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= BUTTONS GRID ================= */}
        {filteredItems.length === 0 ? (
          <div className="darshanam-empty-box">
            <div className="darshanam-empty-icon">
              <Search size={32} />
            </div>
            <h4>No pathways found for &ldquo;{searchQuery}&rdquo;</h4>
            <p>Try searching for keywords like &apos;Routine&apos;, &apos;Hostel&apos;, &apos;Free&apos;, or &apos;Sanskrit&apos;.</p>
            <button
              type="button"
              className="darshanam-empty-reset"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
            >
              Reset Search &amp; Filters
            </button>
          </div>
        ) : (
          <div className="darshanam-cards-grid">
            {filteredItems.map((item) => {
              const ItemIcon = item.icon;
              return (
                <article
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  className={`darshanam-card card-accent-${item.color}`}
                  onClick={() => onSelectContent(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectContent(item.id);
                    }
                  }}
                  title={`Explore ${item.title}`}
                >
                  {/* Visual Photo Header */}
                  <div className="darshanam-card-img-wrap">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="darshanam-card-photo"
                      loading="lazy"
                    />
                    <div className="darshanam-card-photo-scrim" />

                    {/* Category Ribbon */}
                    <span className="darshanam-card-category-ribbon">
                      {item.categoryLabel}
                    </span>

                    {/* Ornate Medallion Icon */}
                    <div className={`darshanam-card-medallion box-${item.color}`}>
                      <ItemIcon size={20} />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="darshanam-card-body">
                    <div className="darshanam-card-text-group">
                      <h3 className="darshanam-card-title">
                        {item.title}
                      </h3>
                      <span className="darshanam-card-kannada">{item.kannadaTitle}</span>
                      <p className="darshanam-card-summary">
                        {item.summary}
                      </p>
                    </div>

                    <div className="darshanam-card-bottom-group">
                      <div className="darshanam-card-chips">
                        {item.keyChips.map((chip, idx) => (
                          <span
                            key={idx}
                            className="darshanam-card-chip"
                          >
                            {chip}
                          </span>
                        ))}
                      </div>

                      {/* Card Footer Action Button */}
                      <div className="darshanam-card-footer">
                        <span className="darshanam-action-btn">
                          <span className="darshanam-action-label">Explore Pathway</span>
                          <ArrowRight size={14} className="darshanam-action-arrow-icon" />
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* ================= FOOTER NOTE ================= */}
        <div className="darshanam-footer-note">
          <div className="darshanam-footer-left">
            <Sparkles size={16} className="darshanam-sparkle-icon" />
            <span>
              Every dimension is directly accessible via these dedicated pathways. When viewing any section, click the &ldquo;Back to Gurukula Darshanam&rdquo; button anytime to return here.
            </span>
          </div>
          <span className="darshanam-footer-tag">Sampoorna Gurukula Darshanam</span>
        </div>
      </div>
    </section>
  );
}

export default QuickAccessGrid;
