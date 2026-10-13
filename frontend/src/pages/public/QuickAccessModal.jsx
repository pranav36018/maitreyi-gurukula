import { useState, useEffect, useMemo, useRef } from "react";
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
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Sun,
  Activity,
  Flame,
  HeartHandshake,
  Heart,
  Eye,
  Layers,
  Grid,
  Maximize2,
  SlidersHorizontal,
} from "lucide-react";
import "./QuickAccessModal.css";

// Comprehensive catalog of ALL 17 contents & sections across Maitreyi Gurukula
export const QUICK_ACCESS_ITEMS = [
  {
    id: "intro",
    pageId: "intro",
    num: "01",
    title: "The Guiding Essence",
    kannadaTitle: "ಮಾರ್ಗದರ್ಶಿ ತತ್ವ • THE GUIDING ESSENCE",
    category: "essence",
    categoryLabel: "Core Essence",
    badge: "01 • Guiding Principle",
    icon: Sparkles,
    color: "gold",
    summary:
      "Education is not only about what she learns — it is who she becomes. 3 sacred pillars: Self-Respect, Scholastic Mastery, and Selfless Seva.",
    keyChips: ["3 Pillars of Education", "Self-Respect (ಆತ್ಮಗೌರವ)", "Civilizational Roots"],
    content: {
      lead:
        "Shubham Karoti Maitreyi Gurukula was founded on the sacred conviction that educating young girls with cultural pride, deep moral grounding, and modern academic excellence creates transformative leaders for families, communities, and our nation.",
      quote:
        "“Education is not only about what she learns. It is who she becomes.”",
      details: [
        {
          num: "01",
          heading: "Self-Respect & Identity (ಆತ್ಮಗೌರವ / आत्मगौरव)",
          text:
            "Nurturing fearless confidence and unshakeable pride in our rich civilizational roots. Equipping girls to stand tall in any global forum with cultural dignity.",
        },
        {
          num: "02",
          heading: "Scholastic Mastery (ಜ್ಞಾನ & ವಿದ್ಯಾ / ज्ञान & विद्या)",
          text:
            "Harmonizing Karnataka State Board academic rigor (SSLC) with Karnataka Sanskrit University scholarship, Paninian grammar, and modern science.",
        },
        {
          num: "03",
          heading: "Duty & Compassion (ಸಂಸ್ಕಾರ & ಸೇವಾ / संस्कार & सेवा)",
          text:
            "Fostering personal discipline, sisterhood, domestic wisdom, environmental care, and selfless community seva as an organic way of living.",
        },
      ],
      stats: [
        { label: "Core Pillars", value: "3 Fold" },
        { label: "Curriculum", value: "Holistic" },
        { label: "Target Cohort", value: "Young Girls" },
      ],
      actionType: "scroll",
      actionText: "View Guiding Essence on Page",
    },
  },
  {
    id: "story-origin",
    pageId: "story",
    num: "02",
    title: "Our Sacred Origin (1994 Catalyst)",
    kannadaTitle: "ಸಂಸ್ಥೆಯ ಪವಿತ್ರ ಉಗಮ • 1994 SEED OF INSPIRATION",
    category: "essence",
    categoryLabel: "Heritage & History",
    badge: "02 • Sacred Origin",
    icon: Globe,
    color: "amber",
    summary:
      "How an incident of overseas airport scrutiny inspired Sri Ramdas Kamath & Sri Pramod Kamath to establish an all-girls sanctuary of dignity in Bengaluru.",
    keyChips: ["1994 Transit Catalyst", "Pejawar Swamiji Blessings", "Kamath Family Land"],
    content: {
      lead:
        "Around thirty years ago, visionary entrepreneur Sri Pramod Kamath and his father Sri Ramdas Kamath—running a thriving garment enterprise employing roughly 3,000 workers—were traveling to England. During international transit, aggressive questioning by airport authorities struck Sri Pramod Kamath not with bitterness, but with an unyielding resolve: true national self-respect and global dignity can only be forged from within—by reviving cultural pride and creating transformative educational institutions back home.",
      quote:
        "“When our dignity was challenged on foreign soil, the answer was not anger. It was building a sanctuary where India's daughters grow with fearless cultural pride, pristine scholarship, and unshakeable self-respect.”",
      details: [
        {
          num: "01",
          heading: "The Catalyst Across the Seas (1994)",
          text:
            "Humiliating scrutiny at international transit prompted Sri Pramod Kamath to channel family fortunes into education rather than commercial expansion.",
        },
        {
          num: "02",
          heading: "A Sacred Resolve for India's Daughters",
          text:
            "Believing that young women carry the moral strength to uplift entire families and preserve civilizational values, they dedicated the institution exclusively to girls.",
        },
        {
          num: "03",
          heading: "Blessings of Poojya Pejawar Swamiji",
          text:
            "Divine blessings and guidance from Poojya Sri Sri Vishveshwara Teertha Swamiji of Pejawar Matha, Udupi inaugurated the Gurukula on Vyasa Poornima, 22nd July 1994.",
        },
        {
          num: "04",
          heading: "100% Self-Funded Family Seva",
          text:
            "The Kamath family dedicated 12 to 20 acres of prime land in Ramohalli near Big Banyan Tree, personally sustaining complete expenses without relying on public trusts.",
        },
      ],
      stats: [
        { label: "Founded", value: "July 1994" },
        { label: "Campus Size", value: "12–20 Acres" },
        { label: "Tuition & Stay", value: "100% Free" },
      ],
      actionType: "scroll",
      actionText: "Read Complete Founding Story on Page",
    },
  },
  {
    id: "story-milestones",
    pageId: "story",
    num: "03",
    title: "30-Year Milestones & History",
    kannadaTitle: "೩೦ ವರ್ಷಗಳ ಸುವರ್ಣ ಪಯಣ • 30-YEAR LEGACY",
    category: "essence",
    categoryLabel: "Heritage & History",
    badge: "03 • 30-Yr Evolution",
    icon: Scroll,
    color: "saffron",
    summary:
      "3 historical phases: Phase 1 Genesis (1994–2002), Phase 2 Flourishing Shishyas (2002–2014), and Phase 3 Full-Time Mentorship (2014 & Onwards).",
    keyChips: ["Phase 1 (1994-02)", "Phase 2 (2002-14)", "Phase 3 (2014+)", "300+ Alumni"],
    content: {
      lead:
        "Over the span of three decades, Shubham Karoti Maitreyi Gurukula has grown from a humble ashram sanctuary into an esteemed institution of classical and contemporary learning, graduating over 15 batches and 300+ accomplished young women.",
      quote:
        "“Swastha Susamskruta Samajada Nirmana — The Creation of a Healthy, Cultured, and Virtuous Society.”",
      details: [
        {
          num: "01",
          heading: "Phase 1 (1994–2002) • Genesis & Campus Foundation",
          text:
            "Inauguration on Vyasa Poornima (22 July 1994) by Pejawar Swamiji. Campus established in Ramohalli. Methodological guidance from Hindu Seva Prathishtana.",
        },
        {
          num: "02",
          heading: "Phase 2 (2002–2014) • Flourishing Shishyas",
          text:
            "First batch graduated in 2000. Under guidance of eminent educationists, 15 batches comprising over 300 students completed the 6-year course and achieved collegiate accolades.",
        },
        {
          num: "03",
          heading: "Phase 3 (2014 & Onwards) • Intensive Matrushree Mentorship",
          text:
            "Sri Pramod Kamath retired from business to dedicate his life full-time. Today alumni flourish as software engineers, doctors, CAs, advocates, and Bharatanatyam exponents.",
        },
      ],
      stats: [
        { label: "Years of Seva", value: "30+ Years" },
        { label: "Graduating Batches", value: "15+ Batches" },
        { label: "Alumni Scholars", value: "300+ Girls" },
      ],
      actionType: "scroll",
      actionText: "View 30-Year Milestones on Page",
    },
  },
  {
    id: "philosophy",
    pageId: "philosophy",
    num: "04",
    title: "Gurukula Philosophy • Siddhanta",
    kannadaTitle: "ಸಿದ್ಧಾಂತ ಮತ್ತು ಮೌಲ್ಯಗಳು • GURUKULA PHILOSOPHY",
    category: "academics",
    categoryLabel: "Philosophy & Academics",
    badge: "04 • Philosophy",
    icon: BookOpen,
    color: "teal",
    summary:
      "Living, learning, and growing as one united family. Guru-Shishya Parampara, living spoken Sanskrit in daily life, and girl child self-reliance.",
    keyChips: ["Guru-Shishya Parampara", "Living Spoken Sanskrit", "Girl Child Self-Reliance"],
    content: {
      lead:
        "True Gurukula education does not merely train students for examinations. It harmonizes intellect, character, spiritual equanimity, and practical self-reliance into a noble, complete existence.",
      quote:
        "“A true education bridges ancient roots with soaring contemporary wings.”",
      details: [
        {
          num: "01",
          heading: "Guru-Shishya Parampara (Family Living)",
          text:
            "Teachers (Acharyas and Matrushrees) and students stay, learn, eat, and cherish life together under one roof, fostering deep trust, moral clarity, and lifelong guidance.",
        },
        {
          num: "02",
          heading: "Living Spoken Sanskrit (ಸಂಸ್ಕೃತ ಸಂಭಾಷಣೆ)",
          text:
            "Sanskrit is not treated as a dead examination subject — it is the vibrant medium of daily conversation. Students naturally converse, debate, and compose in Sanskrit.",
        },
        {
          num: "03",
          heading: "Girl Child Self-Reliance (ಸ್ವಾವಲಂಬನೆ)",
          text:
            "Equipping young girls from humble backgrounds with unshakeable self-confidence, fearless speech, scholastic excellence, and domestic wisdom to become breadwinners.",
        },
      ],
      stats: [
        { label: "Instruction", value: "Immersive" },
        { label: "Living Model", value: "Ashram Family" },
        { label: "Language", value: "Living Sanskrit" },
      ],
      actionType: "scroll",
      actionText: "Explore Philosophy Section on Page",
    },
  },
  {
    id: "panchamukhi",
    pageId: "panchamukhi",
    num: "05",
    title: "Panchamukhi Shikshana (5 Personalities)",
    kannadaTitle: "ಪಂಚಮುಖಿ ಶಿಕ್ಷಣ ವಿಕಾಸ • 5-FOLD PERSONALITY DEVELOPMENT",
    category: "academics",
    categoryLabel: "Philosophy & Academics",
    badge: "05 • Panchamukhi",
    icon: Flower2,
    color: "emerald",
    summary:
      "Harmonious 5-fold development: Sharirika (Physical), Manomaya (Mental), Vijnanamaya (Intellectual), Anandamaya (Emotional), and Atma Samskara (Spiritual).",
    keyChips: ["Sharirika (Physical)", "Manomaya (Mental)", "Bouddhika (Intellectual)", "Bhavika (Emotional)", "Adhyatmika (Spiritual)"],
    content: {
      lead:
        "Panchamukhi Shikshana is our time-tested holistic pedagogical framework ensuring that every girl develops physical vitality, emotional poise, intellectual brilliance, aesthetic grace, and spiritual grounding.",
      quote:
        "“Sarvangeena Vikasa: Complete harmonious unfoldment of body, mind, intellect, emotions, and soul.”",
      details: [
        {
          num: "01",
          heading: "Physical Development (ಶಾರೀರಿಕ ವಿಕಾಸ • Sharirika Kosha)",
          text:
            "Daily dawn Suryanamaskars, Yogasana, Ghosh marching band drill, satvic organic farming nutrition, pure A2 desi milk, and traditional sports (Kabaddi, Kho-Kho).",
        },
        {
          num: "02",
          heading: "Mental Development (ಮಾನಸಿಕ ವಿಕಾಸ • Manomaya Kosha)",
          text:
            "Pranayama, guided breath mindfulness before study hours, 24/7 maternal affection and counseling from resident Matrushrees, emotional equilibrium.",
        },
        {
          num: "03",
          heading: "Intellectual Development (ಬೌದ್ಧಿಕ ವಿಕಾಸ • Vijnanamaya Kosha)",
          text:
            "Complete Karnataka State Board SSLC & PUC academics, Paninian Sanskrit grammar (Vyakarna), science, mathematics, and Gandhari Vidya (blindfolded perception).",
        },
        {
          num: "04",
          heading: "Emotional Development (ಭಾವನಾತ್ಮಕ ವಿಕಾಸ • Anandamaya Kosha)",
          text:
            "Mastery in classical Bharatanatyam mudras and stage poise, Carnatic vocal music, Harikatha storytelling, and strong sisterhood bonds across batches.",
        },
        {
          num: "05",
          heading: "Spiritual Development (ಆಧ್ಯಾತ್ಮಿಕ ವಿಕಾಸ • Atma Samskara)",
          text:
            "Agnihotra and Sandhyavandanam performed twice daily with pure cow ghee, Bhagavad Gita and Upanishad chanting, Surabhi Goshala seva, and unshakeable Atmagaurava.",
        },
      ],
      stats: [
        { label: "Personality Facets", value: "5 Koshas" },
        { label: "Physical Drills", value: "Daily Dawn" },
        { label: "Spiritual Seva", value: "Twice Daily" },
      ],
      actionType: "scroll",
      actionText: "View Interactive Panchamukhi Section on Page",
    },
  },
  {
    id: "unique",
    pageId: "unique",
    num: "06",
    title: "What Makes Us Different",
    kannadaTitle: "ವಿಶಿಷ್ಟತೆಗಳು ಮತ್ತು ವೈಶಿಷ್ಟ್ಯ • WHAT MAKES US DIFFERENT",
    category: "academics",
    categoryLabel: "Philosophy & Academics",
    badge: "06 • Key Distinctions",
    icon: ShieldCheck,
    color: "indigo",
    summary:
      "4 distinctive hallmarks: 100% Free of Cost education, Triple Board Certifications, Conversational Sanskrit immersion, and Ancient Arts (Gandhari Vidya, Natya).",
    keyChips: ["100% Free of Cost", "Triple Board Exams", "Living Sanskrit", "Gandhari Vidya"],
    content: {
      lead:
        "Shubham Karoti Maitreyi Gurukula stands apart in Karnataka through its uncompromising dedication to 100% charitable free education and a dual-track academic and shastric syllabus.",
      quote:
        "“Deep civilizational roots combined with modern wings of empowerment.”",
      details: [
        {
          num: "01",
          heading: "100% Free of Cost Education & Living",
          text:
            "Every girl admitted receives safe lodging, wholesome satvic meals, uniforms, books, medical care, and tuition completely free of charge for the full 6 years.",
        },
        {
          num: "02",
          heading: "Triple Final Board Examinations",
          text:
            "Students achieve 3 prestigious credentials upon graduation: Karnataka State Board (SSLC), Karnataka Sanskrit University degree examinations, and Gurukula internal honors.",
        },
        {
          num: "03",
          heading: "Living Spoken Sanskrit Fluency",
          text:
            "Sanskrit is the natural living pulse of our campus. Students chat, debate, recite, and create in conversational Sanskrit effortlessly from dawn to night.",
        },
        {
          num: "04",
          heading: "Ancient Arts & Practical Skills",
          text:
            "Systematic training in classical Bharatanatyam, Gandhari Vidya (blindfolded sensory perception), Harikatha, Vedic astrology (Jyotisha), goshala care, and self-reliance.",
        },
      ],
      stats: [
        { label: "Cost to Student", value: "₹0 / Free" },
        { label: "Board Certs", value: "3 Boards" },
        { label: "Languages", value: "Sanskrit + Eng + Kan" },
      ],
      actionType: "scroll",
      actionText: "Read What Makes Us Different on Page",
    },
  },
  {
    id: "journey",
    pageId: "journey",
    num: "07",
    title: "The 6-Year Shishya Journey",
    kannadaTitle: "೬ ವರ್ಷಗಳ ಶಿಷ್ಯ ಪಯಣ • 6-YEAR STUDENT JOURNEY",
    category: "academics",
    categoryLabel: "Philosophy & Academics",
    badge: "07 • Student Journey",
    icon: Award,
    color: "rose",
    summary:
      "Tracking each child through 6 stages: Pravesha (Admission), Vidya (Academics), Kala (Arts), Dharma (Responsibilities & Seva), Siddhi (Honors), and Alumni Mentorship.",
    keyChips: ["Pravesha (Entry)", "Vidya (Academics)", "Kala (Arts)", "Dharma (Seva)", "Siddhi (Milestones)", "Alumni"],
    content: {
      lead:
        "Our Student Journey Tracking System lovingly monitors each child's holistic growth across six foundational dimensions from 5th standard admission through graduation and active collegiate/alumni life.",
      quote:
        "“Every child has a sacred story worth treasuring.”",
      details: [
        {
          num: "01",
          heading: "Stage 01: Pravesha (Admission & Welcome)",
          text:
            "Entering at age 10 after 5th standard. Family background intake, health assessment, initial aspirations, and joyful initiation into the Gurukula sisterhood.",
        },
        {
          num: "02",
          heading: "Stage 02: Vidya (Academic Learning)",
          text:
            "Continuous scholastic progress tracking across State Board subjects (Science, Math, Social Studies, English, Kannada) and Sanskrit Shastras toward annual board excellence.",
        },
        {
          num: "03",
          heading: "Stage 03: Kala (Skills & Cultural Talents)",
          text:
            "Cultivating classical arts including Bharatanatyam, Carnatic vocal music, Harikatha storytelling, Vedic debate, painting, handicraft making, and Vedic astrology.",
        },
        {
          num: "04",
          heading: "Stage 04: Dharma (Responsibilities & Seva)",
          text:
            "Active leadership roles: morning prayer coordination, mentoring younger peers, dining hall seva, environmental upkeep, and goshala care.",
        },
        {
          num: "05",
          heading: "Stage 05: Siddhi (Achievements & Honors)",
          text:
            "Commemorating milestones: district competitions, Sanskrit board distinctions, stage performances, leadership awards, and public accolades.",
        },
        {
          num: "06",
          heading: "Stage 06: Alumni Network & Mentorship",
          text:
            "Continuing lifelong bonds after graduation. Alumni mentor younger batches, share collegiate guidance, and carry Gurukula values into professional careers.",
        },
      ],
      stats: [
        { label: "Total Duration", value: "6 Years" },
        { label: "Entry Standard", value: "Class 5 Pass" },
        { label: "Exit Level", value: "2nd PUC + Shastra" },
      ],
      actionType: "scroll",
      actionText: "View 6-Year Shishya Journey on Page",
    },
  },
  {
    id: "campus-photos",
    pageId: "campus-photos",
    num: "08",
    title: "Ramohalli Campus Photos (Photo Tour)",
    kannadaTitle: "ರಾಮೋಹಳ್ಳಿ ಕ್ಯಾಂಪಸ್ ಛಾಯಾಚಿತ್ರಗಳು • CAMPUS PHOTOGRAPHS",
    category: "campus",
    categoryLabel: "Campus Life & Routine",
    badge: "08 • Photo Tour",
    icon: Camera,
    color: "teal",
    summary:
      "Exclusive photography of our 12-to-20-acre sanctuary in Ramohalli near Big Banyan Tree: traditional tile roofing, dawn assemblies, open courtyards, and lush greenery.",
    keyChips: ["12-Acre Grounds", "Big Banyan Tree Road", "Traditional Architecture", "Dawn Assemblies"],
    content: {
      lead:
        "Located in Ramohalli near Bengaluru's historic 400-year-old Big Banyan Tree, our campus offers a serene, pollution-free oasis surrounded by green orchards, tulasi groves, and ancient trees.",
      quote:
        "“शान्तಂ शिवमद्वैतम् — A peaceful sanctuary that nurtures the spirit.”",
      details: [
        {
          num: "01",
          heading: "Main Ashram Sanctuary & Sacred Grounds",
          text:
            "Constructed with traditional vernacular architecture, cool tiled roofing, and airy courtyards that naturally foster deep contemplation and study free from urban noise.",
        },
        {
          num: "02",
          heading: "Dawn Shishya Assembly & Disciplined Alignment",
          text:
            "Young students gathered in pristine traditional uniform at daybreak, reciting Rigvedic mantras, Saraswati Vandana, and patriotic pledges in synchronous harmony.",
        },
        {
          num: "03",
          heading: "12 Pristine Green Acres",
          text:
            "Sprawling grounds dedicated by the Kamath family featuring organic fruit plantations, medicinal herbal gardens, outdoor sports grounds, and peaceful walking pathways.",
        },
      ],
      stats: [
        { label: "Campus Area", value: "12–20 Acres" },
        { label: "Location", value: "Ramohalli, Blr" },
        { label: "Nearby Landmark", value: "Big Banyan Tree" },
      ],
      actionType: "scroll",
      actionText: "View Campus Photo Gallery on Page",
    },
  },
  {
    id: "campus",
    pageId: "campus",
    num: "09",
    title: "Campus Facilities & Living",
    kannadaTitle: "ಸೌಲಭ್ಯಗಳು ಮತ್ತು ಆವರಣ • FACILITIES & INFRASTRUCTURE",
    category: "campus",
    categoryLabel: "Campus Life & Routine",
    badge: "09 • Campus Facilities",
    icon: Compass,
    color: "emerald",
    summary:
      "Sacred Yajnashala, Sanskrit Pathashala, Surabhi Desi Goshala, Annapurna Satvic dining hall, green orchard grounds, and secure residential hostels under Matrushree care.",
    keyChips: ["Yajnashala & Agnihotra", "Sanskrit Classrooms", "Surabhi Desi Goshala", "Annapurna Dining"],
    content: {
      lead:
        "Every corner of the 12-acre campus is designed to support satvic living, spiritual concentration, and wholesome health under round-the-clock maternal care.",
      quote:
        "“A self-contained ashram sanctuary for living in harmony with nature.”",
      details: [
        {
          num: "01",
          heading: "Sacred Yajnashala & Dhyana Mandiram",
          text:
            "A sanctified open-air stone mandapam dedicated to daily Agnihotra, Sandhyavandanam, Vedic recitations, and morning silent meditation.",
        },
        {
          num: "02",
          heading: "Sanskrit Pathashala & Study Pavilion",
          text:
            "Bright, airy classrooms that blend traditional floor seating for focused shastric discourse with modern learning desks, reference libraries, and computers.",
        },
        {
          num: "03",
          heading: "Surabhi Goshala & Organic Plantations",
          text:
            "Home to indigenous desi cows. Students engage in daily goshala seva, learning reverence for nature while enjoying pure fresh A2 milk and organic produce.",
        },
        {
          num: "04",
          heading: "Annapurna Kshetra & Courtyard Dining",
          text:
            "Hygienic culinary kitchen providing three wholesome, fresh, satvic vegetarian meals daily prepared with pure grains and served as one united family.",
        },
        {
          num: "05",
          heading: "Secure Residential Hostels & Dormitories",
          text:
            "Clean, spacious sleeping quarters where resident Matrushrees (maternal wardens) stay with students, providing 24/7 safety, emotional comfort, and healthcare.",
        },
      ],
      stats: [
        { label: "Campus Size", value: "12 Acres" },
        { label: "Milk Source", value: "Surabhi Desi Cows" },
        { label: "Warden Support", value: "24/7 Matrushrees" },
      ],
      actionType: "scroll",
      actionText: "Explore Facilities Section on Page",
    },
  },
  {
    id: "routine",
    pageId: "routine",
    num: "10",
    title: "Daily Routine (Dinacharya)",
    kannadaTitle: "ದೈನಂದಿನ ದಿನಚರ್ಯಾ • DAILY ASHRAM ROUTINE",
    category: "campus",
    categoryLabel: "Campus Life & Routine",
    badge: "10 • Dinacharya",
    icon: Clock,
    color: "saffron",
    summary:
      "A rhythmic 24-hour routine from 5:00 AM Brahma Muhurta awakening to 9:30 PM Ratri Shayana, harmonizing yogasana, shastras, academics, arts, seva, and wholesome nutrition.",
    keyChips: ["5:00 AM Jagaran", "Suryanamaskar & Ghosh", "9 AM - 1 PM Academics", "Bharatanatyam", "9:30 PM Shayana"],
    content: {
      lead:
        "The Gurukula Dinacharya balances bodily vitality, mental poise, and intellectual rigor. Every hour is designed to cultivate discipline, mindfulness, and joy.",
      quote:
        "“अनुशासनं परमं तपः — Sacred discipline is the highest tapasya.”",
      details: [
        {
          num: "05:00 AM",
          heading: "Brahma Muhurta • Jagaran & Pratahsmaranam",
          text: "Awakening with sacred shlokas, thanking Mother Earth, silent introspection and intention for the day.",
        },
        {
          num: "05:30 AM",
          heading: "Physical Vitality • Yogasana, Surya Namaskar & Ghosh Drill",
          text: "Dynamic physical training: 12-count Suryanamaskars, pranayama, martial agility, and Ghosh band brass & drum practice.",
        },
        {
          num: "07:00 AM",
          heading: "Cleanliness & Devotion • Snana, Sandhyavandanam & Veda Patha",
          text: "Morning ablutions, Sandhya prayers, Gayatri Japa, and melodious Vedic recitation purifying speech and memory.",
        },
        {
          num: "08:00 AM",
          heading: "Nourishment & Seva • Satvic Breakfast & Campus Seva",
          text: "Wholesome breakfast followed by voluntary campus cleaning, goshala seva, and garden upkeep.",
        },
        {
          num: "09:00 AM",
          heading: "Scholastic Rigor • Core Academics & Shastric Studies (till 1:00 PM)",
          text: "Intensive classroom learning covering Sanskrit Vyakarna (grammar), Mathematics, Science, Kannada, English, and Social Studies.",
        },
        {
          num: "01:00 PM",
          heading: "Midday Repast • Annapurna Satvic Lunch & Rest",
          text: "Nutritious traditional South Indian lunch served hot with fresh ghee and organic vegetables, followed by a brief rest.",
        },
        {
          num: "02:00 PM",
          heading: "Creative Talents • Traditional Arts, Bharatanatyam & Music (till 4:30 PM)",
          text: "Classical Bharatanatyam, Carnatic vocal music, Gandhari Vidya (blindfolded sensory practice), Harikatha, and crafts.",
        },
        {
          num: "04:30 PM",
          heading: "Energy & Games • Satvic Refreshments & Outdoor Sports",
          text: "Herbal kashaya/milk followed by outdoor indigenous sports: Kabaddi, Kho-Kho, throwball, and drills.",
        },
        {
          num: "06:00 PM",
          heading: "Twilight Sacredness • Sayam Sandhyavandanam & Agnihotra",
          text: "Evening prayers, sacred Agnihotra fire ritual, Deepa Prajvalana (lamp lighting), and Vishnu Sahasranama chanting.",
        },
        {
          num: "07:00 PM",
          heading: "Focus & Review • Self-Study & Shastric Discussions",
          text: "Quiet evening study hours for homework, shastric debate, memorization, and peer learning.",
        },
        {
          num: "08:00 PM",
          heading: "Dinner & Family Time • Wholesome Dinner & Night Milk",
          text: "Light dinner, warm turmeric A2 cow milk, and informal dialogue with Matrushrees.",
        },
        {
          num: "09:30 PM",
          heading: "Peaceful Slumber • Ratri Prarthana & Shayana",
          text: "Night prayers, review of the day's deeds, and restful sleep in the residential halls.",
        },
      ],
      stats: [
        { label: "Awakening", value: "5:00 AM" },
        { label: "Academics", value: "4 Hours" },
        { label: "Lights Out", value: "9:30 PM" },
      ],
      actionType: "scroll",
      actionText: "View Full Daily Routine Schedule on Page",
    },
  },
  {
    id: "acharyas",
    pageId: "acharyas",
    num: "11",
    title: "Profiles of Acharyas & Mentors",
    kannadaTitle: "ಆಚಾರ್ಯರು ಮತ್ತು ಮಾರ್ಗದರ್ಶಕರು • ACHARYAS & FOUNDERS",
    category: "campus",
    categoryLabel: "Campus Life & Routine",
    badge: "11 • Leadership",
    icon: Users,
    color: "amber",
    summary:
      "Visionary founding patron Late Sri Ramdas Kamath, divine patron Poojya Pejawar Swamiji, President Sri Pramod Kamath, Trustees Amit & Meera Kamath, and resident Matrushrees.",
    keyChips: ["Late Sri Ramdas Kamath", "Pejawar Swamiji", "Sri Pramod Kamath", "Matrushrees"],
    content: {
      lead:
        "The Gurukula is guided by self-sacrificing philanthropists, revered spiritual leaders, and affectionate resident Matrushrees who treat every student as their own daughter.",
      quote:
        "“When you educate a daughter with cultural dignity, you elevate the entire family, community, and civilization.”",
      details: [
        {
          num: "01",
          heading: "Late Sri Ramdas Kamath • Founding Patron & Philanthropist (1994–2002)",
          text:
            "Industrialist who ran a thriving garment business employing 3,000 workers; channeled his fortune and 12–20 acres of prime family land in Ramohalli into building this 100% free educational sanctuary for girls.",
        },
        {
          num: "02",
          heading: "Poojya Sri Sri Vishveshwara Teertha Swamiji • Divine Spiritual Patron",
          text:
            "Revered pontiff of Sri Pejawar Matha, Udupi who blessed and inaugurated the Gurukula on Vyasa Poornima 1994, providing sacred direction for cultural rejuvenation.",
        },
        {
          num: "03",
          heading: "Sri Pramod Kamat • Managing Trustee & President (2014 – Present)",
          text:
            "Following a distinguished global business career, retired to dedicate his life full-time to personally funding and mentoring the shastric and modern education of our daughters.",
        },
        {
          num: "04",
          heading: "Sri Amit Kamat & Smt. Meera Kamat • Trustees & Mentors",
          text:
            "Guiding institutional expansion, financial sustainability, and residential maternal care to uphold the founding family's commitment to 100% free education.",
        },
        {
          num: "05",
          heading: "Resident Matrushrees & Dedicated Shastric Faculty",
          text:
            "Eminent scholars in Paninian Sanskrit grammar, Nyaya, Veda Pathana, Bharatanatyam, and State Board academics who live 24/7 on campus with the students.",
        },
      ],
      stats: [
        { label: "Founding Patron", value: "Kamath Family" },
        { label: "Spiritual Guide", value: "Pejawar Matha" },
        { label: "Full-Time Seva", value: "Since 2014" },
      ],
      actionType: "scroll",
      actionText: "View Acharyas & Leadership Profiles on Page",
    },
  },
  {
    id: "admissions",
    pageId: "admissions",
    num: "12",
    title: "Admissions & Eligibility",
    kannadaTitle: "ಪ್ರವೇಶ ಪ್ರಕ್ರಿಯೆ ಮತ್ತು ಅರ್ಹತೆ • ADMISSIONS & ELIGIBILITY",
    category: "admissions",
    categoryLabel: "Admissions & Contact",
    badge: "12 • Admissions",
    icon: GraduationCap,
    color: "emerald",
    summary:
      "Admissions open for girls who completed 5th standard (~10 yrs). 100% free food, stay, clothes & education. 5-step transparent selection process representing all districts.",
    keyChips: ["Class 5 Completion", "100% Free of Cost", "15-20 Girls / Batch", "All Districts"],
    content: {
      lead:
        "Shubham Karoti Maitreyi Gurukula provides equal opportunity to deserving daughters from all districts of Karnataka. Admissions prioritize character, eager curiosity, and family alignment with traditional ethos.",
      quote:
        "“100% Free Education, Lodging, Satvic Meals, Uniforms, Books & Healthcare from 6th Std through 2nd PUC.”",
      details: [
        {
          num: "Step 01",
          heading: "Enquiry & Application Form",
          text:
            "Parents download the application form or submit an online enquiry. Completed application details with 5th standard academic history are submitted.",
        },
        {
          num: "Step 02",
          heading: "General Assessment Test",
          text:
            "A simple, child-friendly general assessment designed to gauge grasping power, language aptitude, and curiosity rather than rote textbook memorization.",
        },
        {
          num: "Step 03",
          heading: "Personal Interview & Interaction",
          text:
            "A warm, interactive dialogue with the prospective student and her parents to understand family alignment with Gurukula ethos and cultural values.",
        },
        {
          num: "Step 04",
          heading: "Selection & District Representation",
          text:
            "To ensure broad geographic representation, 15 to 20 girls representing different districts are selected per annual batch based on merit and mutual readiness.",
        },
        {
          num: "Step 05",
          heading: "Auspicious Initiation & Welcome",
          text:
            "Selected shishyas are joyfully welcomed into the Gurukula family during the sacred academic commencement ceremony with blessings from the Acharyas.",
        },
      ],
      stats: [
        { label: "Eligibility", value: "Class 5 Pass (~10 yrs)" },
        { label: "Annual Batch", value: "15–20 Girls" },
        { label: "Total Cost", value: "100% Free Seva" },
      ],
      actionType: "scroll",
      actionText: "View Admissions Section on Page",
    },
  },
  {
    id: "gallery",
    pageId: "gallery",
    num: "13",
    title: "Photo & Video Gallery",
    kannadaTitle: "ಚಿತ್ರ ಮತ್ತು ವಿಡಿಯೋ ಗ್ಯಾಲರಿ • PHOTO & VIDEO GALLERY",
    category: "media",
    categoryLabel: "Photos, Media & FAQs",
    badge: "13 • Media Gallery",
    icon: Palette,
    color: "rose",
    summary:
      "Curated collection of 20+ authentic high-resolution photographs and video highlights: Vedic chanting, student Ghosh marching band parade, cultural festivals, and ashram life.",
    keyChips: ["20+ Curated Photos", "Vedic Chanting", "Ghosh Marching Band", "Video Highlights"],
    content: {
      lead:
        "Explore living snapshots of Gurukula traditions, martial band formations, shastric recitations, classical Bharatanatyam performances, and joyous cultural celebrations.",
      quote:
        "“A living chronicle of tradition, discipline, and radiant joy.”",
      details: [
        {
          num: "01",
          heading: "Vedic Chanting & Shastra Pathana",
          text:
            "Oral recitation of Rigvedic mantras, Paninian grammar, and Upanishadic dialogues on the outdoor stone mandapam under sacred peepal trees.",
        },
        {
          num: "02",
          heading: "Student Ghosh Band Parade & Snare Drills",
          text:
            "Disciplined marching band in pristine white uniforms with brass snare drums and flutes building military precision and team rhythm.",
        },
        {
          num: "03",
          heading: "Festive Celebrations & Floral Rangolis",
          text:
            "Vibrant mandala rangolis, Navaratri Ayudha Puja, Deepavali lamps, and sacred festival celebrations led by the students.",
        },
        {
          num: "04",
          heading: "Campus Parisara & Goshala Seva",
          text:
            "Daily life caring for indigenous Surabhi desi cows, organic kitchen farming, and outdoor yoga amidst 12 lush green acres.",
        },
      ],
      stats: [
        { label: "Photographs", value: "20+ Authentic" },
        { label: "Video Coverage", value: "Embedded" },
        { label: "Categories", value: "4 Media Filters" },
      ],
      actionType: "scroll",
      actionText: "Explore Full Media Gallery on Page",
    },
  },
  {
    id: "faqs",
    pageId: "faqs",
    num: "14",
    title: "Frequently Asked Questions (FAQs)",
    kannadaTitle: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೋತ್ತರಗಳು • PRASHNOTTARI",
    category: "media",
    categoryLabel: "Photos, Media & FAQs",
    badge: "14 • FAQs",
    icon: HelpCircle,
    color: "indigo",
    summary:
      "Clear, detailed answers to 8 common questions: zero fees, eligibility, board accreditations, learning Sanskrit, parental visits, alumni careers, safety, and 80G tax exemptions.",
    keyChips: ["Zero Fees Explained", "Triple Board Degrees", "Parental Visitation", "80G Tax Exemption"],
    content: {
      lead:
        "Find quick answers to common queries from parents, well-wishers, and donors regarding admissions, student life, exams, and institutional support.",
      quote:
        "“Transparent answers to illuminate your daughter's sacred path.”",
      details: [
        {
          num: "Q1",
          heading: "Who is eligible to apply for admission?",
          text:
            "Girls aged approx 10 years and 10 months who have completed the 5th standard. A child-friendly general assessment and family interaction are conducted. 15 to 20 girls representing various districts are selected annually.",
        },
        {
          num: "Q2",
          heading: "What are the fees for boarding, meals, and education?",
          text:
            "Shubham Karoti Gurukula is 100% charitable. No tuition, hostel, food, or exam fees are charged. Safe lodging, satvic meals, uniforms, books, medical care, and education are completely free for the entire 6 years.",
        },
        {
          num: "Q3",
          heading: "Which educational boards and certifications do students appear for?",
          text:
            "Triple credentials: 1) Karnataka State Secondary Education Board (SSLC 10th std), 2) Karnataka Sanskrit University official board degrees in Sanskrit Sahitya, and 3) Gurukula internal honors in classical arts and yoga.",
        },
        {
          num: "Q4",
          heading: "Is prior knowledge of Sanskrit required before joining?",
          text:
            "No prior knowledge is needed. Sanskrit is the living spoken language on campus. Through natural immersion and daily chanting, students begin understanding and speaking fluently within months.",
        },
        {
          num: "Q5",
          heading: "Can parents visit or stay in contact with their daughters?",
          text:
            "Yes. The Gurukula maintains designated parent visitation days, festive celebrations (Deepavali, Navaratri), vacation intervals, and scheduled parental phone calls.",
        },
        {
          num: "Q6",
          heading: "What careers and higher education do alumni pursue?",
          text:
            "Over 300 graduates are now successful software engineers in top MNCs, medical doctors, chartered accountants, high court advocates, teachers, and classical Bharatanatyam artists.",
        },
        {
          num: "Q7",
          heading: "How are residential safety, nutrition, and healthcare managed?",
          text:
            "Round-the-clock female care with resident Matrushrees staying in dormitories. Pure satvic vegetarian food from organic campus gardens and desi cows. On-call physicians and regular medical checkups.",
        },
        {
          num: "Q8",
          heading: "How can well-wishers and donors support the Gurukula?",
          text:
            "You can sponsor a student's educational materials, support the Surabhi Goshala, or contribute to campus infrastructure. Donations are 100% eligible for tax exemption under Section 80G of the Income Tax Act.",
        },
      ],
      stats: [
        { label: "Questions", value: "8 Key FAQs" },
        { label: "Tax Exemption", value: "80G Available" },
        { label: "Alumni Careers", value: "Software, CA, Docs" },
      ],
      actionType: "scroll",
      actionText: "View Complete FAQ Section on Page",
    },
  },
  {
    id: "contact",
    pageId: "contact",
    num: "15",
    title: "Contact & Admission Enquiry Form",
    kannadaTitle: "ಸಂಪರ್ಕ ಮತ್ತು ವಿಚಾರಣೆ • CONTACT & ENQUIRY",
    category: "admissions",
    categoryLabel: "Admissions & Contact",
    badge: "15 • Contact",
    icon: MessageCircle,
    color: "teal",
    summary:
      "Direct phone numbers, campus and city office addresses, email, visiting hours, and online admission enquiry form to apply for upcoming batches.",
    keyChips: ["Online Enquiry Form", "Sri Pramod Kamat (+91 9845403290)", "Campus: Ramohalli", "Office: Ramachandra Puram"],
    content: {
      lead:
        "We welcome parents, prospective students, and well-wishers to get in touch. Reach out directly or fill the online enquiry form to schedule a campus interaction.",
      quote:
        "“Our doors and hearts are always open to parents seeking a noble future for their daughters.”",
      details: [
        {
          num: "01",
          heading: "Direct Phone Contacts",
          text:
            "• Sri Pramod Kamat (President): +91 9845403290\n• Gurukula Office: +91 6362133847\n• Sri Venugopal: +91 9900216373",
        },
        {
          num: "02",
          heading: "Email Address",
          text: "shubhamkarotimaitreyigurukula@gmail.com",
        },
        {
          num: "03",
          heading: "Campus Address (Residential)",
          text:
            "Shubham Karoti (Maitreyi Gurukula), No 52/1, Big Banyan Tree Road, Ramohalli, Kengeri Hobli, Bengaluru 560 074, Karnataka, India.",
        },
        {
          num: "04",
          heading: "City Administrative Office",
          text:
            "No. 37, 1st Main, Ramachandra Puram, Bengaluru 560 021, Karnataka, India.",
        },
        {
          num: "05",
          heading: "Visiting Hours",
          text:
            "Monday through Saturday: 9:00 AM – 5:00 PM (Prior appointment recommended).",
        },
      ],
      stats: [
        { label: "Phone", value: "+91 9845403290" },
        { label: "Campus", value: "Ramohalli" },
        { label: "Visiting", value: "Mon–Sat 9AM-5PM" },
      ],
      actionType: "scroll",
      actionText: "Open Admission Enquiry Form on Page",
    },
  },
  {
    id: "directions",
    pageId: null,
    num: "16",
    title: "Directions & Transit Navigation",
    kannadaTitle: "ಮಾರ್ಗದರ್ಶಿ ಮತ್ತು ನಕ್ಷೆ • GOOGLE MAPS NAVIGATION",
    category: "admissions",
    categoryLabel: "Admissions & Contact",
    badge: "16 • Navigation",
    icon: Navigation,
    color: "saffron",
    summary:
      "Interactive Google Maps directions, Kengeri Metro Station route, BMTC 227 bus routes from Majestic/KR Market, and Big Banyan Tree landmark guide.",
    keyChips: ["Google Maps Link", "Kengeri Metro Station", "BMTC 227 Bus Series", "Near Big Banyan Tree"],
    content: {
      lead:
        "Easily reach Shubham Karoti Gurukula located in Ramohalli, Bengaluru, just 1.5 km before the world-famous 400-year-old Big Banyan Tree (Dodda Alada Mara).",
      quote:
        "“Simple transit routes by Metro, Bus, or Car from anywhere in Karnataka.”",
      details: [
        {
          num: "01",
          heading: "By Metro (Namma Metro Purple Line)",
          text:
            "Take the Purple Line to Kengeri Metro Station (or Challaghatta). From Kengeri, BMTC feeder buses and autos take you directly to Ramohalli (approx 8 km).",
        },
        {
          num: "02",
          heading: "By Bus (BMTC from Majestic & KR Market)",
          text:
            "Direct BMTC Route 227 series buses depart frequently from Kempegowda Bus Station (Majestic) and KR Market heading toward Dodda Alada Mara. Alight at Ramohalli Gurukula stop.",
        },
        {
          num: "03",
          heading: "By Car / Two-Wheeler / Taxi",
          text:
            "Drive along Mysore Road past Kengeri Satellite Town, take the right turn toward Big Banyan Tree Road, and follow signs to Ramohalli (approx 28 km from Majestic).",
        },
        {
          num: "04",
          heading: "Nearby Landmark",
          text:
            "Historic Dodda Alada Mara (Big Banyan Tree) is located just 1.5 km from the campus gate.",
        },
      ],
      stats: [
        { label: "Metro", value: "Kengeri (Purple Line)" },
        { label: "BMTC Bus", value: "Route 227 Series" },
        { label: "Distance", value: "~28 km from Majestic" },
      ],
      actionType: "directions",
      actionText: "Launch Interactive Google Maps Directions",
    },
  },
  {
    id: "portal-login",
    pageId: null,
    num: "17",
    title: "Acharya & Staff Portal Login",
    kannadaTitle: "ಆಚಾರ್ಯ ಲಾಗಿನ್ ಪೋರ್ಟಲ್ • INTERNAL MANAGEMENT SYSTEM",
    category: "admissions",
    categoryLabel: "Admissions & Contact",
    badge: "17 • Portal Access",
    icon: LogIn,
    color: "indigo",
    summary:
      "Secure internal management portal for Acharyas, Matrushrees, and staff to monitor student tracking, marks, attendance, and admissions records.",
    keyChips: ["Acharya Portal", "Shishya Tracking", "Attendance & Marks", "Secure Login"],
    content: {
      lead:
        "Authorized digital portal exclusively for Gurukula Acharyas, Matrushrees, and administrative staff to manage student shishya tracking, academic assessments, attendance, and admissions records.",
      quote:
        "“Empowering mentors with real-time holistic tracking for each daughter.”",
      details: [
        {
          num: "01",
          heading: "Holistic Shishya Tracking",
          text:
            "Monitor progress across all 5 dimensions of Panchamukhi Shikshana (Physical, Mental, Intellectual, Emotional, Spiritual).",
        },
        {
          num: "02",
          heading: "Academic Marks & Certifications",
          text:
            "Record and review Karnataka State Board (SSLC) scores, Sanskrit University grades, and Gurukula internal honors.",
        },
        {
          num: "03",
          heading: "Daily Dinacharya & Attendance",
          text:
            "Manage daily prayer, sports, yoga, study hour attendance, and medical checkup records.",
        },
        {
          num: "04",
          heading: "Admissions & Candidate Review",
          text:
            "Process new applicant profiles, assessment test scores, and district representation rosters.",
        },
      ],
      stats: [
        { label: "Portal Access", value: "Authorized Staff" },
        { label: "Modules", value: "Students, Marks, Seva" },
        { label: "Security", value: "Encrypted Auth" },
      ],
      actionType: "login",
      actionText: "Login to Staff & Acharya Portal",
    },
  },
];

export const CATEGORIES = [
  { id: "all", label: "All Contents (17)" },
  { id: "essence", label: "Core Essence & Heritage" },
  { id: "academics", label: "Philosophy & Academics" },
  { id: "campus", label: "Campus Life & Routine" },
  { id: "admissions", label: "Admissions & Contact" },
  { id: "media", label: "Photos, Media & FAQs" },
];

function QuickAccessModal({
  isOpen,
  onClose,
  onLogin,
  onOpenDirections,
  initialItemId = null,
}) {
  const [selectedId, setSelectedId] = useState(initialItemId || null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState(initialItemId ? "reader" : "grid"); // 'grid' | 'reader'
  const readerContentRef = useRef(null);

  // Sync initialItemId when opened
  useEffect(() => {
    if (initialItemId) {
      setSelectedId(initialItemId);
      setViewMode("reader");
    } else {
      setSelectedId(null);
      setViewMode("grid");
    }
    setSearchQuery("");
    setActiveCategory("all");
  }, [initialItemId, isOpen]);

  // Handle ESC key and scroll locking
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Reset scroll when switching reader item
  useEffect(() => {
    if (readerContentRef.current) {
      readerContentRef.current.scrollTop = 0;
    }
  }, [selectedId]);

  // Filtered list based on category & search query
  const filteredItems = useMemo(() => {
    return QUICK_ACCESS_ITEMS.filter((item) => {
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

  // Current active item in reader mode
  const activeItem = useMemo(() => {
    if (!selectedId) return QUICK_ACCESS_ITEMS[0];
    return (
      QUICK_ACCESS_ITEMS.find((item) => item.id === selectedId) ||
      QUICK_ACCESS_ITEMS[0]
    );
  }, [selectedId]);

  const activeIndex = useMemo(() => {
    return QUICK_ACCESS_ITEMS.findIndex((item) => item.id === activeItem.id);
  }, [activeItem]);

  const prevItem = useMemo(() => {
    if (activeIndex <= 0)
      return QUICK_ACCESS_ITEMS[QUICK_ACCESS_ITEMS.length - 1];
    return QUICK_ACCESS_ITEMS[activeIndex - 1];
  }, [activeIndex]);

  const nextItem = useMemo(() => {
    if (activeIndex >= QUICK_ACCESS_ITEMS.length - 1)
      return QUICK_ACCESS_ITEMS[0];
    return QUICK_ACCESS_ITEMS[activeIndex + 1];
  }, [activeIndex]);

  // Handle open in reader
  const handleOpenReader = (itemId) => {
    setSelectedId(itemId);
    setViewMode("reader");
  };

  // Handle direct navigation to page section
  const handleNavigateToPage = (item) => {
    if (item.actionType === "directions") {
      onClose();
      if (onOpenDirections) onOpenDirections();
      return;
    }

    if (item.actionType === "login") {
      onClose();
      if (onLogin) onLogin();
      return;
    }

    // Scroll to page section
    const targetElement = document.getElementById(item.pageId);
    onClose();

    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

        // Apply a glowing highlight pulse so the user clearly sees where they arrived
        targetElement.classList.remove("quick-access-target-highlight");
        void targetElement.offsetWidth; // trigger reflow
        targetElement.classList.add("quick-access-target-highlight");
        setTimeout(() => {
          targetElement.classList.remove("quick-access-target-highlight");
        }, 3000);
      }, 100);
    } else {
      // fallback to hash
      window.location.hash = `#${item.pageId}`;
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="qa-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Quick Access Hub"
    >
      <div
        className="qa-modal-card"
        onClick={(event) => event.stopPropagation()}
      >
        {/* ================= MODAL TOP HEADER ================= */}
        <header className="qa-modal-header">
          <div className="qa-header-left">
            <div className="qa-brand-mark">
              <Compass size={22} className="qa-compass-icon" />
            </div>
            <div className="qa-header-titles">
              <div className="qa-header-badge">
                <Sparkles size={13} />
                <span>ALL-IN-ONE DIRECTORY • 17 SECTIONS</span>
              </div>
              <h3>Quick Access Hub</h3>
              <p>Instant access to every section &amp; facility without scrolling</p>
            </div>
          </div>

          <div className="qa-header-controls">
            {/* View Mode Toggle */}
            <div className="qa-view-toggle">
              <button
                type="button"
                className={`qa-toggle-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Browse All Sections Grid"
              >
                <Grid size={15} />
                <span>Directory</span>
              </button>
              <button
                type="button"
                className={`qa-toggle-btn ${viewMode === "reader" ? "active" : ""}`}
                onClick={() => {
                  if (!selectedId) setSelectedId(QUICK_ACCESS_ITEMS[0].id);
                  setViewMode("reader");
                }}
                title="Interactive Content Reader"
              >
                <Layers size={15} />
                <span>Reader</span>
              </button>
            </div>

            {/* Close Button */}
            <button
              type="button"
              className="qa-modal-close-btn"
              onClick={onClose}
              aria-label="Close Quick Access Hub"
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* ================= SEARCH & CATEGORY BAR ================= */}
        <div className="qa-toolbar">
          <div className="qa-search-box">
            <Search size={17} className="qa-search-icon" />
            <input
              type="text"
              placeholder="Search anything (e.g. Sanskrit, Admissions, Routine, Fees, Bharatanatyam, Goshala)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search quick access contents"
            />
            {searchQuery && (
              <button
                type="button"
                className="qa-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="qa-categories-scroll">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`qa-category-pill ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* ================= MAIN CONTENT BODY ================= */}
        <div className="qa-modal-body">
          {viewMode === "grid" ? (
            /* ================= VIEW 1: DIRECTORY GRID ================= */
            <div className="qa-grid-view">
              {filteredItems.length === 0 ? (
                <div className="qa-empty-state">
                  <div className="qa-empty-icon">
                    <Search size={32} />
                  </div>
                  <h4>No content matching &ldquo;{searchQuery}&rdquo;</h4>
                  <p>Try searching for words like &apos;Routine&apos;, &apos;Hostel&apos;, &apos;Admission&apos;, or &apos;Sanskrit&apos;.</p>
                  <button
                    type="button"
                    className="qa-empty-reset-btn"
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("all");
                    }}
                  >
                    Reset Search &amp; Filters
                  </button>
                </div>
              ) : (
                <div className="qa-cards-grid">
                  {filteredItems.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                      <div
                        key={item.id}
                        className={`qa-card card-variant-${item.color}`}
                        onClick={() => handleOpenReader(item.id)}
                      >
                        <div className="qa-card-header">
                          <div className={`qa-card-icon-box box-${item.color}`}>
                            <ItemIcon size={22} />
                          </div>
                          <div className="qa-card-meta">
                            <span className="qa-card-num">{item.num}</span>
                            <span className="qa-card-category">{item.categoryLabel}</span>
                          </div>
                        </div>

                        <div className="qa-card-body">
                          <h4 className="qa-card-title">{item.title}</h4>
                          <span className="qa-card-kannada">{item.kannadaTitle}</span>
                          <p className="qa-card-summary">{item.summary}</p>

                          <div className="qa-card-chips">
                            {item.keyChips.map((chip, idx) => (
                              <span key={idx} className="qa-chip">
                                {chip}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="qa-card-actions">
                          <button
                            type="button"
                            className="qa-card-btn-reader"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenReader(item.id);
                            }}
                          >
                            <span>Open Details</span>
                            <ChevronRight size={15} />
                          </button>

                          <button
                            type="button"
                            className="qa-card-btn-jump"
                            title="Scroll to this section on homepage"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNavigateToPage(item);
                            }}
                          >
                            <span>Go to Page</span>
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            /* ================= VIEW 2: INTERACTIVE CONTENT READER ================= */
            <div className="qa-reader-view">
              {/* Left Column: Persistent Section Switcher List */}
              <aside className="qa-reader-sidebar">
                <div className="qa-sidebar-header">
                  <div className="qa-sidebar-badge">
                    <span>SWITCH TO ANY CONTENT</span>
                  </div>
                  <span className="qa-sidebar-count">
                    {QUICK_ACCESS_ITEMS.length} Sections
                  </span>
                </div>

                <div className="qa-sidebar-list">
                  {QUICK_ACCESS_ITEMS.map((item) => {
                    const ItemIcon = item.icon;
                    const isActive = item.id === activeItem.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        className={`qa-sidebar-item ${isActive ? "active" : ""} item-${item.color}`}
                        onClick={() => setSelectedId(item.id)}
                      >
                        <div className="qa-sidebar-icon">
                          <ItemIcon size={16} />
                        </div>
                        <div className="qa-sidebar-item-info">
                          <span className="qa-sidebar-item-num">#{item.num}</span>
                          <span className="qa-sidebar-item-title">{item.title}</span>
                        </div>
                        {isActive && <div className="qa-active-indicator" />}
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* Right Column: Full Detailed Content Display */}
              <main className="qa-reader-main" ref={readerContentRef}>
                {/* Top Nav Switcher for Mobile & Quick Browsing */}
                <div className="qa-reader-top-bar">
                  <button
                    type="button"
                    className="qa-top-nav-btn"
                    onClick={() => setSelectedId(prevItem.id)}
                    title={`Previous: ${prevItem.title}`}
                  >
                    <ArrowLeft size={14} />
                    <span>Prev: {prevItem.title}</span>
                  </button>

                  <button
                    type="button"
                    className="qa-top-back-btn"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid size={14} />
                    <span>All Directory (17)</span>
                  </button>

                  <button
                    type="button"
                    className="qa-top-nav-btn"
                    onClick={() => setSelectedId(nextItem.id)}
                    title={`Next: ${nextItem.title}`}
                  >
                    <span>Next: {nextItem.title}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Article Header */}
                <div className="qa-article-header">
                  <div className="qa-article-badge-row">
                    <span className="qa-article-pill">
                      {activeItem.badge}
                    </span>
                    <span className="qa-article-category-tag">
                      {activeItem.categoryLabel}
                    </span>
                  </div>

                  <div className="qa-article-title-row">
                    <div className={`qa-article-icon-box box-${activeItem.color}`}>
                      {(() => {
                        const IconComponent = activeItem.icon;
                        return <IconComponent size={32} />;
                      })()}
                    </div>
                    <div>
                      <h2>{activeItem.title}</h2>
                      <span className="qa-article-kannada">
                        {activeItem.kannadaTitle}
                      </span>
                    </div>
                  </div>

                  <p className="qa-article-lead">{activeItem.content.lead}</p>

                  {/* Inspiring Quote */}
                  {activeItem.content.quote && (
                    <div className="qa-article-quote">
                      <p>{activeItem.content.quote}</p>
                    </div>
                  )}

                  {/* Stats Bar */}
                  {activeItem.content.stats && (
                    <div className="qa-article-stats-bar">
                      {activeItem.content.stats.map((st, idx) => (
                        <div key={idx} className="qa-stat-item">
                          <span className="qa-stat-val">{st.value}</span>
                          <span className="qa-stat-lbl">{st.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Article Detailed Breakdown */}
                <div className="qa-article-details">
                  <h4 className="qa-details-title">
                    <Sparkles size={16} />
                    <span>Detailed Overview &amp; Key Highlights</span>
                  </h4>

                  <div className="qa-details-grid">
                    {activeItem.content.details.map((detail, idx) => (
                      <div key={idx} className="qa-detail-card">
                        <div className="qa-detail-num-tag">{detail.num}</div>
                        <div className="qa-detail-body">
                          <h5>{detail.heading}</h5>
                          <p>{detail.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Chips */}
                <div className="qa-article-chips-row">
                  <span className="qa-chips-label">Key Topics:</span>
                  <div className="qa-chips-wrap">
                    {activeItem.keyChips.map((chip, idx) => (
                      <span key={idx} className="qa-detail-chip">
                        <CheckCircle2 size={13} />
                        <span>{chip}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Reader Action Footer */}
                <div className="qa-reader-footer">
                  <button
                    type="button"
                    className="qa-reader-primary-btn"
                    onClick={() => handleNavigateToPage(activeItem)}
                  >
                    <span>{activeItem.content.actionText}</span>
                    <ArrowRight size={17} />
                  </button>

                  <button
                    type="button"
                    className="qa-reader-secondary-btn"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid size={15} />
                    <span>Back to All Sections</span>
                  </button>

                  <button
                    type="button"
                    className="qa-reader-close-btn"
                    onClick={onClose}
                  >
                    <span>Close Window</span>
                  </button>
                </div>
              </main>
            </div>
          )}
        </div>

        {/* ================= MODAL BOTTOM STATUS BAR ================= */}
        <footer className="qa-modal-bottom-bar">
          <div className="qa-bottom-info">
            <span className="qa-dot-live"></span>
            <span>
              Showing {filteredItems.length} of {QUICK_ACCESS_ITEMS.length} sections
            </span>
            <span className="qa-bottom-sep">•</span>
            <span>Click any section to switch instantly without scrolling</span>
          </div>

          <div className="qa-bottom-actions">
            <button
              type="button"
              className="qa-bottom-text-btn"
              onClick={() => {
                onClose();
                if (onOpenDirections) onOpenDirections();
              }}
            >
              <Navigation size={13} />
              <span>Directions</span>
            </button>
            <span className="qa-bottom-sep">/</span>
            <button
              type="button"
              className="qa-bottom-text-btn"
              onClick={() => {
                onClose();
                if (onLogin) onLogin();
              }}
            >
              <LogIn size={13} />
              <span>Portal Login</span>
            </button>
            <span className="qa-bottom-sep">/</span>
            <button
              type="button"
              className="qa-bottom-close-text"
              onClick={onClose}
            >
              Close (Esc)
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default QuickAccessModal;
