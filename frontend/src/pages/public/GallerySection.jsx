import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import {
  Sparkles,
  Play,
  Pause,
  Video,
  ExternalLink,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
  Camera,
  Calendar,
  Flower2,
  MapPin,
  Eye,
  Search,
  Grid,
  Columns,
  SlidersHorizontal,
  Download,
  Share2,
  BookOpen,
  Check,
  Sun,
  Award,
} from "lucide-react";
import "./GallerySection.css";

// 28 Verified, Authentic Gurukula Photographs with 100% Matched Visual Titles & Rich Cultural Context
const curatedGalleryItems = [
  {
    id: "vedic-mandapam",
    title: "Vriksha Katte Pathashala: Open-Air Vedic Study",
    category: "Vedic & Shastras",
    date: "Daily Morning",
    tag: "Vriksha Katte",
    location: "Praangana Mandapam, Ramohalli",
    desc: "Acharya instructing young shishyas in Rigvedic mantras, Paninian Sanskrit grammar, and Upanishadic wisdom upon the stone katte under the ancient tree canopy.",
    culturalStory: "The oral recitation (Shruti Parampara) has been preserved intact for thousands of years. Learning under sacred trees harmonizes the mind with nature, eliminating fatigue and deepening retention.",
    image: "/images/brand/hero-banner-1.jpg",
    aspect: "wide",
  },
  {
    id: "ghosh-band-drill",
    title: "Student Ghosh Marching Band & Snare Drills",
    category: "Ghosh & Martial Rigor",
    date: "Parade Ground",
    tag: "Ghosh Band",
    location: "Main Parade Ground",
    desc: "Disciplined student marching band in pristine white uniforms with red berets, yellow plumes, brass snare drums, and flutes building enduring physical rhythm and team unity.",
    culturalStory: "Ghosh (the traditional marching band) is a hallmark of Gurukula physical discipline. It instills military precision, synchronized rhythm, alertness, and deep patriotism in every young girl.",
    image: "/images/events/independence-day-1.webp",
    aspect: "wide",
  },
  {
    id: "student-parivara",
    title: "The Complete Gurukula Kutumba: Student Cohort with Founder",
    category: "Campus & Ashram",
    date: "Annual Parivara",
    tag: "Student Cohort",
    location: "Ramohalli Parisara Grove",
    desc: "All 70+ residential girls of Maitreyi Gurukula seated together in the shaded tree grove with founding mentor Sri Pramod Kamath near Bengaluru's Big Banyan Tree.",
    culturalStory: "Gurukula education is 100% residential and operates as one loving family (Kutumba). The students share rooms, eat together, study together, and form unbreakable sisterly bonds for life.",
    image: "/images/local/gurukula-activity-1.jpg",
    aspect: "wide",
  },
  {
    id: "campus-mahadwara",
    title: "Grand Mahadwara: Campus Entrance Gopuram",
    category: "Campus & Ashram",
    date: "Main Gateway",
    tag: "Mahadwara",
    location: "Ramohalli, Bengaluru",
    desc: "Traditional terracotta-roofed stone archway bearing 'Shubham Karoti Maitreyi Gurukula' welcoming seekers into the 12-acre peaceful sanctuary.",
    culturalStory: "The Mahadwara marks the transition from worldly hustle to the tranquil silence of the ashram, shaded by tall trees, bamboo clusters, and birdsong.",
    image: "/images/local/gurukula-campus-main.jpg",
    aspect: "standard",
  },
  {
    id: "annapoorna-assembly",
    title: "Dawn Assembly & Flag Hoisting at Annapoorna Hall",
    category: "Campus & Ashram",
    date: "Daily Dawn",
    tag: "Dawn Assembly",
    location: "Annapoorna Prangana",
    desc: "Daily morning assembly before Annapoorna Hall with patriotic anthems, Vedic prayers, and Acharya blessings under the bright morning sun.",
    culturalStory: "Every day begins with collective reverence. The Annapoorna building stands as a monument to nourishment of body, mind, and soul, consecrated with the sacred Om sun emblem.",
    image: "/images/local/gurukula-activity-3.jpg",
    aspect: "standard",
  },
  {
    id: "acharya-blessing-scroll",
    title: "Guru Vandana & Academic Scroll Blessings",
    category: "Campus & Ashram",
    date: "Graduation Convocation",
    tag: "Guru Blessings",
    location: "Inner Temple Hall",
    desc: "Founder Sri Pramod Kamath in ceremonial golden silk conferring blessings and academic recognition upon a graduating shishya.",
    culturalStory: "In the Vedic tradition, education culminates in Dikshanta (convocation), where the Guru charges the disciple: 'Speak the truth, practice dharma, and never cease from learning and sharing.'",
    image: "/images/local/gurukula-activity-2.jpg",
    aspect: "standard",
  },
  {
    id: "vyasa-sannidhi",
    title: "Bhagavan Veda Vyasa Maharshi Sannidhi & Founding Charter",
    category: "Vedic & Shastras",
    date: "Vyasa Poornima",
    tag: "Vyasa Sannidhi",
    location: "Central Campus Sanctuary",
    desc: "Student offering folded-hands homage at the Bhagavan Veda Vyasa shrine and marble founding charter commemorating the Vyasa Poornima 1994 birth of the Gurukula.",
    culturalStory: "Bhagavan Veda Vyasa is the fountainhead of Vedic wisdom who classified the four Vedas and composed the Mahabharata. He represents pristine scholarship and lifelong guru devotion.",
    image: "/images/campus/campus-panoramic.webp",
    aspect: "standard",
  },
  {
    id: "founder-ramdas-kamath-memorial",
    title: "Founder Late Sri Ramdas Kamath Memorial Smriti Mantapa",
    category: "Campus & Ashram",
    date: "Founder's Legacy",
    tag: "Founder Memorial",
    location: "Memorial Garden Pavilion",
    desc: "Garlanded bust of Founder-Patriarch Late Sri Ramdas Kamath in the lush brick-columned garden pavilion honoring his vision of free residential girls' education.",
    culturalStory: "Established in 1994 with the blessings of Poojya Sri Vishveshwara Teertha Swamiji of Pejawar Matha, Late Sri Ramdas Kamath's selfless dharma continues to illuminate hundreds of young lives.",
    image: "/images/students/student-learning-1.webp",
    aspect: "standard",
  },
  {
    id: "anna-prasadam-dining",
    title: "Satvic Anna Prasadam in Annapoorna Bhojana Shala",
    category: "Campus & Ashram",
    date: "Daily Bhojana",
    tag: "Anna Prasadam",
    location: "Annapoorna Bhojana Shala",
    desc: "Students seated in traditional dining rows partaking of 100% free wholesome, organic vegetarian meals served with motherly love.",
    culturalStory: "Food is revered as Brahma (अन्नं ब्रह्मेति व्यजानात्). Meals are prepared in a dedicated satvic kitchen, offered in prayer, and eaten in quiet gratitude without waste.",
    image: "/images/campus/campus-courtyard.webp",
    aspect: "standard",
  },
  {
    id: "mandir-puja-deeparadhana",
    title: "Daily Morning Devarapooje & Sanctum Deeparadhana",
    category: "Traditions & Celebrations",
    date: "Morning Dinacharya",
    tag: "Mandir Puja",
    location: "Ashram Sanctum",
    desc: "Young shishya lighting oil deepams, making floral offerings, and chanting stotras before the garlanded deities in the Gurukula prayer mandir.",
    culturalStory: "Students learn temple rituals, sacred conch blowing, sandalwood preparation, and flower arrangement directly, fostering pure devotion and aesthetic sensitivity.",
    image: "/images/brand/hero-banner-2.jpg",
    aspect: "standard",
  },
  {
    id: "sacred-puja-vigrahas",
    title: "Sunlit Sacred Puja Vigrahas: Ganesha, Shiva Linga & Shankha",
    category: "Traditions & Celebrations",
    date: "Abhisheka Puja",
    tag: "Sacred Vigrahas",
    location: "Sanctum Courtyard",
    desc: "Sacred bronze Ganesha, Narmadeshwara Linga, and Valampuri Shankha adorned with jasmine and hibiscus flowers in a copper Arghya plate during morning abhisheka.",
    culturalStory: "Every morning ritual teaches mindfulness, cleanliness (Shaucha), and reverence for the divine presence pervading all creation.",
    image: "/images/campus/campus-entry-gate.webp",
    aspect: "standard",
  },
  {
    id: "homa-kunda-agnikarya",
    title: "Sacred Homa Kunda & Deepa Stambha Agnikarya",
    category: "Vedic & Shastras",
    date: "Vedic Homa",
    tag: "Agnikarya",
    location: "Yajna Shala Courtyard",
    desc: "Sacred brick Homa Kunda with rising Vedic fire offerings beside brass Deepa Stambhas and auspicious mango-leaf Kalashas.",
    culturalStory: "Yajna and Agnikarya purify the atmosphere and instill the spirit of cosmic reciprocity—offering one's best actions back to the divine.",
    image: "/images/students/student-learning-7.webp",
    aspect: "standard",
  },
  {
    id: "deepotsava-flower-mandala",
    title: "Sacred Deepotsava & Floral Rangoli Mandala",
    category: "Traditions & Celebrations",
    date: "Karthika Deepotsava",
    tag: "Floral Mandala",
    location: "Inner Praangana",
    desc: "Intricate hand-drawn marigold and rose-petal Rangoli mandala bordered with glowing clay diyas crafted with devotion by students.",
    culturalStory: "Rangoli is sacred geometry (Yantra). Drawing mandalas trains spatial memory, symmetry, patience, and fine motor skills while welcoming auspicious energy.",
    image: "/images/events/celebration-flower-mandala.webp",
    aspect: "wide",
  },
  {
    id: "sandhya-deepa-kalasha-puja",
    title: "Sandhya Deepa Puja & Kalasha Aradhana",
    category: "Traditions & Celebrations",
    date: "Festive Sandhya",
    tag: "Kalasha Puja",
    location: "Mandir Verandah",
    desc: "Senior students in traditional silk sarees offering kumkuma archana and lighting brass deepa stambhas around sacred coconut-mango Kalashas.",
    culturalStory: "Performing complete Vedic and Puranic pujas trains every daughter of the Gurukula in spiritual leadership and sacred cultural continuity.",
    image: "/images/events/pooja-tradition-1.webp",
    aspect: "standard",
  },
  {
    id: "kalasha-teertha-prokshana",
    title: "Sacred Kalasha Teertha Prokshana & Ashirvada",
    category: "Traditions & Celebrations",
    date: "Utsava Blessings",
    tag: "Teertha Blessings",
    location: "Campus Courtyard",
    desc: "Student performing auspicious Teertha Prokshana (sprinkling sanctified water with mango leaves from a brass Kalasha) to bless gathered elders and guests.",
    culturalStory: "With the mantra 'Shubham Karoti Kalyanam', sanctified water symbolizes purity, peace, and auspiciousness shared with the entire community.",
    image: "/images/events/pooja-tradition-2.webp",
    aspect: "standard",
  },
  {
    id: "festive-deepavali",
    title: "Deepavali Utsava: Sparklers & Joyful Sisterhood",
    category: "Traditions & Celebrations",
    date: "Deepavali Utsava",
    tag: "Deepavali",
    location: "Residential Courtyard",
    desc: "Students in festive attire joyfully celebrating Deepavali night with sparklers and diyas, expressing the warmth of ashram fellowship.",
    culturalStory: "Festivals at Gurukula are lived spiritual immersions where students prepare traditional sweets, light hundreds of clay diyas, and celebrate as one family.",
    image: "/images/students/student-group-1.webp",
    aspect: "standard",
  },
  {
    id: "deepavali-night-fountain",
    title: "Festival of Lights: Night Fireworks in the Ashram Courtyard",
    category: "Traditions & Celebrations",
    date: "Deepavali Night",
    tag: "Jyoti Utsava",
    location: "Open Praangana",
    desc: "A golden fountain of light illuminating the night sky as students gather around in wonder during the annual Deepavali celebration.",
    culturalStory: "'Tamaso Ma Jyotirgamaya'—lead us from darkness into light—is celebrated both inwardly through wisdom and outwardly through joyous festival lights.",
    image: "/images/events/celebration-festive.webp",
    aspect: "standard",
  },
  {
    id: "moral-assembly-pavilion",
    title: "Morning Mindfulness & Moral Discourse Assembly",
    category: "Campus & Ashram",
    date: "Morning Discourse",
    tag: "Moral Assembly",
    location: "Assembly Grounds",
    desc: "Morning congregation where senior acharyas impart moral values, Sanskrit subhashitas, and character-building wisdom to the student assembly.",
    culturalStory: "Daily moral discourses ground academic brilliance in humility and integrity, teaching students that character (sheela) is humanity's highest ornament.",
    image: "/images/campus/campus-learning-pavilion.webp",
    aspect: "wide",
  },
  {
    id: "guru-shishya-upadesha",
    title: "Guru-Shishya Parampara: Personalized Vedic Upadesha",
    category: "Vedic & Shastras",
    date: "Vedic Initiation",
    tag: "Guru-Shishya",
    location: "Pathashala Hall",
    desc: "Traditional one-on-one spiritual instruction and Vedic chanting guidance between acharya and young student in an unbroken sacred lineage.",
    culturalStory: "Unlike mass commercial classrooms, the Guru-Shishya tradition treats every child as a unique individual, lovingly nurturing her specific talents, voice, and temperament.",
    image: "/images/students/student-learning-4.webp",
    aspect: "standard",
  },
  {
    id: "padmasana-study-circle",
    title: "Traditional Padmasana Svadhyaya Study Circles",
    category: "Vedic & Shastras",
    date: "Daily Svadhyaya",
    tag: "Padmasana Study",
    location: "Classroom Pavilion",
    desc: "Young students seated cross-legged in Padmasana on woven mats, practicing Sanskrit recitation and focused peer study.",
    culturalStory: "Studying seated on the floor maintains spine alignment, steady breath, and mental composure, turning daily study into an effortless meditative practice.",
    image: "/images/students/student-learning-2.webp",
    aspect: "standard",
  },
  {
    id: "vivekananda-chicago-oratory",
    title: "Swami Vivekananda Chicago Address & Stage Oratory",
    category: "Cultural Arts & Drama",
    date: "National Youth Day",
    tag: "Vivekananda Oratory",
    location: "Cultural Auditorium",
    desc: "Students dressed in Swami Vivekananda's iconic ochre robe and turban delivering his historic 1893 Chicago address with fearless conviction.",
    culturalStory: "Reciting Swamiji's words ignites burning self-confidence and cultural pride, empowering young girls to stand tall as ambassadors of Indian civilization.",
    image: "/images/events/vivekananda-chicago-1.webp",
    aspect: "standard",
  },
  {
    id: "vivekananda-choral-recitation",
    title: "Choral Patriotic & Vivekananda Vani Stage Recitation",
    category: "Cultural Arts & Drama",
    date: "Yuva Divas",
    tag: "Choral Oratory",
    location: "Main Stage",
    desc: "Ensemble of students in Vivekananda attire and uniform presenting synchronized Sanskrit and English patriotic oratory before the assembly.",
    culturalStory: "Stage elocution removes all stage fright from an early age, training every student to speak with clarity, resonance, and leadership.",
    image: "/images/events/vivekananda-chicago-2.webp",
    aspect: "standard",
  },
  {
    id: "mythological-sanskrit-costumes",
    title: "Classical Mythological & Sanskrit Drama Ensembles",
    category: "Cultural Arts & Drama",
    date: "Sanskrit Nataka Utsava",
    tag: "Sanskrit Drama",
    location: "Cultural Pavilion",
    desc: "Students attired in traditional silk dhotis, zari lehengas, angavastras, and classical jewelry for Purana and Sanskrit theatrical enactments.",
    culturalStory: "Sanskrit drama (Nataka) combines literature, music, abhinaya, and philosophy. Students converse effortlessly in classical Sanskrit without scripts.",
    image: "/images/events/krishna-janmashtami-1.webp",
    aspect: "wide",
  },
  {
    id: "kreedangana-courtyard-games",
    title: "Kreedangana: Outdoor Courtyard Games & Joyful Recreation",
    category: "Ghosh & Martial Rigor",
    date: "Evening Kreeda",
    tag: "Kreedangana",
    location: "Shaded Play Grounds",
    desc: "Students enjoying lively outdoor group games and musical chairs under the campus trees, balancing rigorous study with wholesome laughter and agility.",
    culturalStory: "Physical play (Kreeda) builds spontaneity, team spirit, quick reflexes, and joyful camaraderie among girls of all age groups.",
    image: "/images/events/play-drama-1.webp",
    aspect: "wide",
  },
  {
    id: "vyasa-gurupoornima-utsava",
    title: "Vyasa Gurupoornima Mahotsava & Stage Discourse",
    category: "Traditions & Celebrations",
    date: "Guru Poornima",
    tag: "Guru Poornima",
    location: "Main Sabhabhavana",
    desc: "Annual Guru Poornima celebration honoring Pejawar Matha Swamiji's founding blessings with scholar discourses before a packed hall of devotees.",
    culturalStory: "Vyasa Poornima in 1994 was the auspicious day Shubham Karoti Gurukula took birth under the divine guidance of Poojya Sri Vishveshwara Teertha Swamiji.",
    image: "/images/events/gurupoornima-1.webp",
    aspect: "standard",
  },
  {
    id: "auspicious-deepa-prajwalana",
    title: "Auspicious Deepa Prajwalana: Ceremonial Lamp Lighting",
    category: "Community & Civic",
    date: "Inaugural Ceremony",
    tag: "Deepa Prajwalana",
    location: "Auditorium Stage",
    desc: "Founder Sri Pramod Kamath and distinguished guests lighting the tall brass ceremonial kuthuvilakku lamp to inaugurate the annual Gurukula convocation.",
    culturalStory: "Every major gathering begins with Deepa Prajwalana, invoking divine grace for the pursuit of sacred knowledge.",
    image: "/images/events/gurupoornima-3.webp",
    aspect: "standard",
  },
  {
    id: "independence-day-community",
    title: "National Celebrations & Parent-Community Fellowship",
    category: "Community & Civic",
    date: "Independence Day",
    tag: "National Celebration",
    location: "Campus Gathering",
    desc: "Parents, alumni, and community elders seated together under the shamiana pavilion for patriotic celebrations and student cultural presentations.",
    culturalStory: "The Gurukula maintains warm, transparent relationships with families. Parents witness their daughters growing into cultured, self-reliant young leaders.",
    image: "/images/events/independence-day-2.webp",
    aspect: "standard",
  },
  {
    id: "inner-wheel-civic-visit",
    title: "Inner Wheel Club Dignitaries Campus Visit",
    category: "Community & Civic",
    date: "Civic Reception",
    tag: "Civic Visit",
    location: "Campus Grounds",
    desc: "Members of the Inner Wheel Club of Vijayanagar touring the 12-acre campus with students and Sri Pramod Kamath in support of girls' education.",
    culturalStory: "Distinguished women leaders and service clubs frequently visit the campus, offering encouragement and witnessing the transformative power of Gurukula education.",
    image: "/images/events/inner-wheel-rally.webp",
    aspect: "standard",
  },
  {
    id: "rotary-guruvandana-honors",
    title: "Rotary Club Guru Vandana & Felicitations",
    category: "Community & Civic",
    date: "Community Honors",
    tag: "Rotary Honors",
    location: "Annapoorna Stage",
    desc: "Rotary Club and Inner Wheel dignitaries honoring Founder Sri Pramod Kamath and the Gurukula's 30-year charitable mission of free girls' education.",
    culturalStory: "The Kamath family has sustained this 100% free residential institution out of personal dedication, earning the deep respect of civic and educational institutions.",
    image: "/images/events/guruvandhana-ceremony.webp",
    aspect: "standard",
  },
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'mosaic' | 'tour'
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [tourIndex, setTourIndex] = useState(0);
  const [isTourPlaying, setIsTourPlaying] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = [
    "All",
    "Campus & Ashram",
    "Vedic & Shastras",
    "Ghosh & Martial Rigor",
    "Traditions & Celebrations",
    "Cultural Arts & Drama",
    "Community & Civic",
  ];

  // Quick filter hashtags
  const quickTags = [
    "All",
    "Vedic Chanting",
    "Ghosh Band",
    "Student Cohort",
    "Dawn Assembly",
    "Guru Blessings",
    "Deepavali",
    "Anna Prasadam",
    "Mandir Puja",
  ];

  // Filtered gallery items based on Category and Search Query
  const filteredItems = useMemo(() => {
    return curatedGalleryItems.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.desc.toLowerCase().includes(query) ||
        item.tag.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.culturalStory.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Virtual Tour Auto-advance timer
  useEffect(() => {
    if (viewMode !== "tour" || !isTourPlaying) return;
    const timer = setInterval(() => {
      setTourIndex((prev) => (prev + 1) % filteredItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [viewMode, isTourPlaying, filteredItems.length]);

  const openLightbox = (index) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const showNext = () => {
    setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
  };

  const showPrev = () => {
    setSelectedPhotoIndex((prev) =>
      prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
    );
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === "Escape" || e.keyCode === 27) closeLightbox();
      if (e.key === "ArrowRight" || e.keyCode === 39) showNext();
      if (e.key === "ArrowLeft" || e.keyCode === 37) showPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPhotoIndex, filteredItems.length]);

  const currentPhoto =
    selectedPhotoIndex !== null ? filteredItems[selectedPhotoIndex] : null;

  const handleCopyShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section className="aesthetic-gallery-section" id="gallery">
      {/* Decorative Traditional Watermark */}
      <div className="gallery-bg-watermark">
        <span>चित्रशाला • शुभं करोति</span>
      </div>

      <div className="section-container">
        {/* Section Header */}
        <div className="aesthetic-section-header">
          <div className="aesthetic-pill-tag">
            <Camera size={15} />
            <span>MOMENTS &amp; MEDIA • CHITRASHALA</span>
            <Sparkles size={14} className="pill-sparkle" />
          </div>
          <h2>
            Chitrashala:
            <br />
            <span className="aesthetic-header-gradient">Visual Chronicle of Heritage &amp; Sisterhood</span>
          </h2>
          <p className="aesthetic-header-lead">
            An authentic photographic chronicle of life at Shubham Karoti Maitreyi Gurukula — oral Vedic chanting,
            disciplined marching Ghosh drills, satvic dining, festive Deepavali celebrations, and serene 12-acre nature.
          </p>
        </div>

        {/* Featured Video Documentary Showcase */}
        <div className="aesthetic-video-showcase">
          <div className="video-showcase-grid">
            <div className="video-player-container">
              <iframe
                title="Shubham Karoti Maitreyi Gurukula Video Documentary"
                src="https://www.youtube.com/embed/B2dPfZnGCrA?rel=0"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            <div className="video-story-panel">
              <div className="video-gold-pill">
                <Video size={14} />
                <span>OFFICIAL VIDEO DOCUMENTARY</span>
              </div>
              <h3>Glimpses into Shubham Karoti Gurukula</h3>
              <p>
                Watch our students converse fluently in spoken Sanskrit, chant Vedic mantras,
                practice disciplined Ghosh band drills, and experience the loving sisterhood that defines their 6-year transformation.
              </p>

              <div className="video-facet-tags">
                <span className="v-tag">🪷 Spoken Sanskrit Fluency</span>
                <span className="v-tag">🌿 12-Acre Nature Parisara</span>
                <span className="v-tag">🥁 Marching Ghosh Band</span>
                <span className="v-tag">📜 SSLC &amp; Sanskrit Univ.</span>
              </div>

              <a
                href="https://www.youtube.com/channel/UC9TV50PmZrCNhZdNley6bAg"
                target="_blank"
                rel="noopener noreferrer"
                className="video-channel-btn"
              >
                <span>Watch Channel on YouTube</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* ================= INTERACTIVE SEARCH & UTILITY TOOLBAR ================= */}
        <div className="gallery-toolbar-card">
          <div className="toolbar-top-row">
            {/* Live Search Input */}
            <div className="gallery-search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search photos by topic (e.g. Ghosh, Sanskrit, Assembly, Puja, Deepavali, Prasadam)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search gallery photographs"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* View Mode Switcher */}
            <div className="view-mode-toggle-group">
              <button
                type="button"
                className={`view-mode-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Curated Exhibition Grid"
              >
                <Grid size={15} />
                <span>Exhibition</span>
              </button>

              <button
                type="button"
                className={`view-mode-btn ${viewMode === "mosaic" ? "active" : ""}`}
                onClick={() => setViewMode("mosaic")}
                title="Masonry Photo Mosaic"
              >
                <Columns size={15} />
                <span>Mosaic</span>
              </button>

              <button
                type="button"
                className={`view-mode-btn ${viewMode === "tour" ? "active" : ""}`}
                onClick={() => setViewMode("tour")}
                title="Cinematic Virtual Tour Slideshow"
              >
                <Play size={15} />
                <span>Virtual Tour</span>
              </button>
            </div>
          </div>

          {/* Category Filter Pills Cluster */}
          <div className="gallery-category-chips-bar">
            <div className="filter-chips-list">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`category-chip ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => {
                    setActiveCategory(cat);
                    setSearchQuery("");
                  }}
                >
                  <span>{cat}</span>
                  <span className="chip-count">
                    {cat === "All"
                      ? curatedGalleryItems.length
                      : curatedGalleryItems.filter((i) => i.category === cat).length}
                  </span>
                </button>
              ))}
            </div>

            <div className="gallery-results-count">
              <span>Showing <strong>{filteredItems.length}</strong> of {curatedGalleryItems.length} photographs</span>
            </div>
          </div>
        </div>

        {/* ================= VIEW MODE 3: VIRTUAL TOUR SLIDESHOW ================= */}
        {viewMode === "tour" && filteredItems.length > 0 && (
          <div className="gallery-tour-theatre">
            <div className="tour-stage">
              <img
                src={filteredItems[tourIndex % filteredItems.length].image}
                alt={filteredItems[tourIndex % filteredItems.length].title}
                className="tour-main-img"
              />
              <div className="tour-overlay-scrim"></div>

              {/* Tour Controls */}
              <div className="tour-floating-controls">
                <button
                  type="button"
                  className="tour-arrow-btn"
                  onClick={() =>
                    setTourIndex(
                      (tourIndex - 1 + filteredItems.length) % filteredItems.length
                    )
                  }
                  aria-label="Previous tour slide"
                >
                  <ChevronLeft size={22} />
                </button>

                <button
                  type="button"
                  className="tour-play-pause-btn"
                  onClick={() => setIsTourPlaying(!isTourPlaying)}
                  title={isTourPlaying ? "Pause slideshow tour" : "Play slideshow tour"}
                >
                  {isTourPlaying ? <Pause size={18} /> : <Play size={18} />}
                  <span>{isTourPlaying ? "Pause Tour" : "Resume Tour"}</span>
                </button>

                <button
                  type="button"
                  className="tour-arrow-btn"
                  onClick={() =>
                    setTourIndex((tourIndex + 1) % filteredItems.length)
                  }
                  aria-label="Next tour slide"
                >
                  <ChevronRight size={22} />
                </button>

                <button
                  type="button"
                  className="tour-fullscreen-btn"
                  onClick={() => openLightbox(tourIndex % filteredItems.length)}
                  title="View in Lightbox"
                >
                  <Maximize2 size={16} />
                </button>
              </div>

              {/* Tour Caption Panel */}
              <div className="tour-caption-panel">
                <div className="tour-pill-row">
                  <span className="tour-cat-pill">
                    {filteredItems[tourIndex % filteredItems.length].category}
                  </span>
                  <span className="tour-location-pill">
                    📍 {filteredItems[tourIndex % filteredItems.length].location}
                  </span>
                </div>
                <h3>{filteredItems[tourIndex % filteredItems.length].title}</h3>
                <p>{filteredItems[tourIndex % filteredItems.length].desc}</p>
                <div className="tour-story-box">
                  <strong>Cultural Insight:</strong> {filteredItems[tourIndex % filteredItems.length].culturalStory}
                </div>
              </div>
            </div>

            {/* Tour Mini Navigation Thumbnails Bar */}
            <div className="tour-thumbs-strip">
              {filteredItems.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  className={`tour-thumb-pill ${tourIndex % filteredItems.length === idx ? "active" : ""}`}
                  onClick={() => setTourIndex(idx)}
                >
                  <img src={item.image} alt={item.title} />
                  <span>{item.tag}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ================= VIEW MODE 1: CURATED EXHIBITION GRID ================= */}
        {viewMode === "grid" && (
          <div className="chitrashala-art-grid">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`chitrashala-art-card card-${item.aspect || "standard"}`}
                onClick={() => openLightbox(index)}
              >
                {/* Image Frame with natural lighting */}
                <div className="art-card-img-frame">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                    }}
                  />

                  {/* Floating Tag Pill */}
                  <div className="art-floating-pill">
                    <span className="art-category-pill">{item.tag}</span>
                  </div>

                  {/* Hover Action Badge */}
                  <div className="art-hover-overlay">
                    <span className="art-hover-pill">
                      <Maximize2 size={15} />
                      <span>Inspect Photograph</span>
                    </span>
                  </div>
                </div>

                {/* Clean Porcelain Card Body */}
                <div className="art-card-body">
                  <div className="art-meta-row">
                    <span className="art-cat-name">{item.category}</span>
                    <span className="art-date-tag">
                      <Calendar size={12} />
                      <span>{item.date}</span>
                    </span>
                  </div>

                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>

                  {/* Cultural Story Accordion Snippet */}
                  <div className="art-story-snippet">
                    <BookOpen size={13} className="story-ico" />
                    <span>{item.culturalStory}</span>
                  </div>

                  <div className="art-card-footer">
                    <span className="art-source-label">
                      <MapPin size={13} />
                      <span>{item.location}</span>
                    </span>
                    <span className="art-inspect-link">
                      <Eye size={14} />
                      <span>View Full-Res</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= VIEW MODE 2: MASONRY PHOTO MOSAIC ================= */}
        {viewMode === "mosaic" && (
          <div className="gallery-mosaic-wall">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="mosaic-tile-card"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="mosaic-tile-img"
                />
                <div className="mosaic-tile-scrim"></div>

                <div className="mosaic-tile-info">
                  <span className="mosaic-tag">{item.tag}</span>
                  <h4>{item.title}</h4>
                  <p>📍 {item.location}</p>
                </div>

                <button
                  type="button"
                  className="mosaic-zoom-btn"
                  title="Enlarge Photo"
                  aria-label="Enlarge Photo"
                >
                  <Maximize2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Empty Search Fallback */}
        {filteredItems.length === 0 && (
          <div className="gallery-empty-state">
            <Camera size={44} className="empty-ico" />
            <h3>No Photographs Match Your Search</h3>
            <p>We couldn't find any photos matching "{searchQuery}". Try selecting another category or resetting the search.</p>
            <button
              type="button"
              className="reset-filter-btn"
              onClick={() => {
                setActiveCategory("All");
                setSearchQuery("");
              }}
            >
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* ================= CINEMATIC ENHANCED LIGHTBOX MODAL (PORTALED TO DOCUMENT.BODY) ================= */}
      {currentPhoto &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="cinematic-lightbox-backdrop" onClick={closeLightbox}>
            <div
              className="cinematic-lightbox-modal"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Controls Header */}
              <div className="lightbox-modal-actions">
                <button
                  type="button"
                  className="lb-action-btn"
                  onClick={handleCopyShare}
                  title="Copy share link"
                >
                  {copiedLink ? <Check size={16} color="#10b981" /> : <Share2 size={16} />}
                  <span>{copiedLink ? "Link Copied!" : "Share"}</span>
                </button>

                <a
                  href={currentPhoto.image}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lb-action-btn"
                  title="Download high-resolution photograph"
                >
                  <Download size={16} />
                  <span>Download</span>
                </a>

                <button
                  type="button"
                  className="cinematic-close-btn"
                  onClick={closeLightbox}
                  aria-label="Close Lightbox (Press ESC)"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation buttons */}
              <button
                type="button"
                className="cinematic-nav-arrow arrow-prev"
                onClick={showPrev}
                aria-label="Previous photograph"
              >
                <ChevronLeft size={30} />
              </button>
              <button
                type="button"
                className="cinematic-nav-arrow arrow-next"
                onClick={showNext}
                aria-label="Next photograph"
              >
                <ChevronRight size={30} />
              </button>

              {/* Main Image Stage */}
              <div className="cinematic-img-stage">
                <img src={currentPhoto.image} alt={currentPhoto.title} />
              </div>

              {/* Comprehensive Information & Cultural Context Panel */}
              <div className="cinematic-info-panel">
                <div className="cinematic-header-row">
                  <div className="cinematic-tag-group">
                    <span className="cinematic-gold-pill">{currentPhoto.category}</span>
                    <span className="cinematic-location-tag">📍 {currentPhoto.location}</span>
                  </div>
                  <span className="cinematic-counter">
                    Photo {(selectedPhotoIndex ?? 0) + 1} of {filteredItems.length}
                  </span>
                </div>

                <h3>{currentPhoto.title}</h3>
                <p className="cinematic-desc-text">{currentPhoto.desc}</p>

                {/* Cultural Insight Card in Lightbox */}
                <div className="cinematic-cultural-card">
                  <div className="cultural-header">
                    <BookOpen size={15} />
                    <strong>CULTURAL SIGNIFICANCE &amp; ASHRAM TRADITION</strong>
                  </div>
                  <p>{currentPhoto.culturalStory}</p>
                </div>

                {/* Lightbox Mini Thumbnails Rail */}
                <div className="lightbox-thumbs-rail">
                  {filteredItems.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`lb-thumb-btn ${selectedPhotoIndex === i ? "active-lb-thumb" : ""}`}
                      onClick={() => setSelectedPhotoIndex(i)}
                      title={p.title}
                    >
                      <img src={p.image} alt={p.title} />
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
