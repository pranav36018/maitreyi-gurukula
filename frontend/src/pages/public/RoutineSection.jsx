import {
  Sparkles,
  Sun,
  Activity,
  BookOpen,
  Utensils,
  Music,
  Moon,
  Clock,
  Heart,
  Flame,
  CheckCircle2,
} from "lucide-react";

function RoutineSection() {
  const schedule = [
    {
      time: "05:00 AM",
      period: "Brahma Muhurta",
      title: "Jagaran & Pratahsmaranam",
      desc: "Awakening with sacred shlokas, thanking Mother Earth, and a quiet moment of mindfulness and intention for the day.",
      icon: Sun,
      color: "saffron",
    },
    {
      time: "05:30 AM",
      period: "Physical Vitality",
      title: "Yogasana, Surya Namaskar & Ghosh Drill",
      desc: "Dynamic physical training including 12-count Suryanamaskars, pranayama, Ghosh (traditional brass & drum band drill), and martial agility.",
      icon: Activity,
      color: "emerald",
    },
    {
      time: "07:00 AM",
      period: "Cleanliness & Devotion",
      title: "Snana, Sandhyavandanam & Veda Patha",
      desc: "Morning ablutions, Sandhya prayers, Gayatri Japa, and melodious Vedic recitation purifying speech and memory.",
      icon: Flame,
      color: "teal",
    },
    {
      time: "08:00 AM",
      period: "Nourishment & Seva",
      title: "Satvic Breakfast & Campus Seva",
      desc: "Wholesome, fresh breakfast followed by voluntary campus cleaning and gardening seva, cultivating dignity of labor.",
      icon: Utensils,
      color: "terracotta",
    },
    {
      time: "09:00 AM – 01:00 PM",
      period: "Scholastic Rigor",
      title: "Core Academics & Shastric Studies",
      desc: "Intensive classroom learning covering Sanskrit Vyakarna (grammar), Mathematics, Science, Kannada, English, and Social Studies.",
      icon: BookOpen,
      color: "indigo",
    },
    {
      time: "01:00 PM – 02:00 PM",
      period: "Midday Repast",
      title: "Annapurna Satvic Lunch & Rest",
      desc: "Freshly prepared wholesome vegetarian meals served with prayer and shared as a family, followed by a brief period of relaxation.",
      icon: Utensils,
      color: "saffron",
    },
    {
      time: "02:00 PM – 04:30 PM",
      period: "Cultural Heritage",
      title: "Bharatanatyam, Gandhari Vidya & Arts",
      desc: "Classical dance steps, vocal ragas, Harikatha storytelling, blindfolded sensory perception (Gandhari Vidya), and Vedic astrology (Jyotisha).",
      icon: Music,
      color: "rose",
    },
    {
      time: "04:30 PM – 06:00 PM",
      period: "Play & Refreshment",
      title: "Evening Krida (Sports) & Herbal Drink",
      desc: "Traditional Indian outdoor games, kabaddi, throwball, laughter, and seasonal herbal decoction / fresh milk.",
      icon: Activity,
      color: "emerald",
    },
    {
      time: "06:30 PM – 07:30 PM",
      period: "Twilight Devotion",
      title: "Deepa Prajvalana & Sandhya Aarati",
      desc: "Lighting sacred lamps in every quarter, collective chanting of the Vishnu Sahasranama, Bhagavad Gita, and Stotras.",
      icon: Flame,
      color: "teal",
    },
    {
      time: "07:30 PM – 08:30 PM",
      period: "Dinner",
      title: "Satvic Dinner & Sisterhood",
      desc: "Light, easily digestible dinner in the Annapurna hall accompanied by affectionate conversations and storytelling.",
      icon: Utensils,
      color: "terracotta",
    },
    {
      time: "08:30 PM – 09:30 PM",
      period: "Svadhyaya",
      title: "Self-Study & Night Prayers",
      desc: "Quiet personal revision, reading, writing daily reflection journals, concluding with Shanti Mantras and peaceful sleep.",
      icon: Moon,
      color: "indigo",
    },
  ];

  const activities = [
    {
      title: "Ghosh Band & Drill",
      desc: "Students learn traditional martial instruments (Vamshi, Shanka, Anaka) building synchronization, posture, and poise.",
      image: "/images/campus/campus-morning-assembly.webp",
    },
    {
      title: "Bharatanatyam & Classical Arts",
      desc: "Systematic training in classical mudras, bhavas, and rhythmic footwork culminating in annual stage performances.",
      image: "/images/students/student-learning-4.webp",
    },
    {
      title: "Gita & Stotra Recitation",
      desc: "Daily recitation that enhances neural memory, sharpens phonetic diction, and instills timeless ethical values.",
      image: "/images/students/student-learning-3.webp",
    },
    {
      title: "Organic Agriculture & Goshala Seva",
      desc: "Hands-on care for cows, composting, planting seasonal vegetables, and developing reverent intimacy with nature.",
      image: "/images/campus/campus-green-gardens.webp",
    },
  ];

  return (
    <section className="maitreyi-routine-section" id="routine">
      <div className="section-container">
        {/* Header */}
        <div className="section-header-centered">
          <div className="section-pill-badge">
            <Sparkles size={14} />
            <span>DAILY LIFE • DINACHARYA</span>
          </div>
          <h2>
            The Daily Routine &amp;
            <br />
            <span className="section-title-highlight">Student Activities</span>
          </h2>
          <p className="section-subtitle">
            A balanced, joyful rhythm designed to harmonize intellectual growth, physical vigor,
            spiritual serenity, and self-reliance from the first light of dawn until evening rest.
          </p>
        </div>

        {/* Schedule Timeline Grid */}
        <div className="routine-timeline-wrapper">
          <div className="timeline-items-grid">
            {schedule.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className={`timeline-slot-card slot-${item.color}`}>
                  <div className="slot-top-row">
                    <div className="slot-time-pill">
                      <Clock size={13} />
                      <strong>{item.time}</strong>
                    </div>
                    <span className="slot-period-tag">{item.period}</span>
                  </div>

                  <div className="slot-main-content">
                    <div className={`slot-icon-bubble icon-${item.color}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Experiential Activities with Photos */}
        <div className="student-activities-container">
          <div className="activities-header">
            <h3>Key Experiential Activities in Practice</h3>
            <p>Beyond books — activities that sculpt self-reliance, leadership, and emotional poise</p>
          </div>

          <div className="activities-cards-grid activities-cards-with-img">
            {activities.map((act, index) => (
              <div key={index} className="activity-card activity-photo-card">
                <div className="activity-img-wrap">
                  <img src={act.image} alt={act.title} loading="lazy" />
                  <div className="activity-card-tag">0{index + 1} • PRACTICE</div>
                </div>
                <div className="activity-card-text">
                  <h4>{act.title}</h4>
                  <p>{act.desc}</p>
                  <div className="activity-check-line">
                    <CheckCircle2 size={15} />
                    <span>Integrated in weekly timetable</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoutineSection;
