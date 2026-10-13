import {
  Sparkles,
  Globe,
  HeartHandshake,
  ShieldCheck,
  Eye,
  GraduationCap,
  Flower2,
} from "lucide-react";

function StorySection() {
  return (
    <section className="maitreyi-story" id="story">
      <div className="story-container">
        <div className="maitreyi-story-heading">
          <div className="story-badge">
            <Sparkles size={14} />
            <span>OUR SACRED ORIGIN &amp; 30-YEAR LEGACY</span>
          </div>
          <h2>
            A question that became
            <br />
            <span className="story-title-highlight">a timeless sanctuary.</span>
          </h2>
          <p className="story-heading-desc">
            From an awakening across the seas to an expansive 12-to-20-acre residential institution nurturing generations of daughters in Karnataka.
          </p>
        </div>

        {/* ================= THE FOUNDING STORY SPOTLIGHT ================= */}
        <div className="story-origin-showcase">
          <div className="origin-showcase-header">
            <div className="origin-badge">
              <Globe size={14} />
              <span>THE SEED OF INSPIRATION • 1994</span>
            </div>
            <h3 className="origin-main-title">
              The Overseas Awakening that Sparked a Sanctuary of Dignity
            </h3>
            <p className="origin-main-subtitle">
              How an incident of prejudice at an international airport transit inspired the Kamath family to dedicate their land, wealth, and lives to empower India&apos;s daughters.
            </p>
          </div>

          <div className="origin-grid-layout">
            {/* Left Column: The Narrative Summary */}
            <div className="origin-narrative-col">
              <div className="narrative-paragraph-block">
                <h4 className="narrative-subheading">
                  <span className="narrative-step-num">01</span>
                  The Catalyst Across the Seas
                </h4>
                <p>
                  Around thirty years ago, visionary entrepreneur <strong>Sri Pramod Kamath</strong> and his father, <strong>Sri Ramdas Kamath</strong>—who ran a thriving garment manufacturing business in Bengaluru employing roughly 3,000 workers—were traveling to England. During transit, officials singled them out while British passengers walked past unhindered, aggressively interrogating them about their purpose of visit, duration of stay, accommodation funds, and return tickets.
                </p>
                <p>
                  Deeply stung by this humiliating scrutiny, Pramod Kamath was struck not by bitterness, but by an unyielding resolve: true national self-respect and global dignity can only be forged from within—by reviving cultural pride and creating transformative educational institutions back home.
                </p>
              </div>

              <div className="narrative-paragraph-block">
                <h4 className="narrative-subheading">
                  <span className="narrative-step-num">02</span>
                  A Sacred Resolve for India&apos;s Daughters
                </h4>
                <p>
                  Returning to Bengaluru, father and son discussed their vision and resolved to build an institution dedicated to education. Believing that young women remain deeply loyal, committed, and culturally devoted to their learning—carrying the moral strength to uplift entire families and communities—they decided to establish the institution exclusively for girls.
                </p>
                <p>
                  Seeking spiritual direction, they approached <strong>Poojya Sri Sri Vishveshwara Teertha Swamiji</strong> (the revered pontiff of Sri Pejawar Matha, Udupi). With his sacred guidance and divine blessings, <strong>Shubham Karoti Maitreyi Gurukula</strong> was founded.
                </p>
              </div>

              <div className="narrative-paragraph-block">
                <h4 className="narrative-subheading">
                  <span className="narrative-step-num">03</span>
                  Selfless Seva &amp; Holistic Heritage
                </h4>
                <p>
                  To realize this noble vision, the Kamath family dedicated <strong>12 to 20 acres of prime land in Ramohalli near Kengeri</strong>, choosing to run and fund the entire institution themselves rather than relying on an external trust. Operating with the principle of complete service, the Gurukula provides <strong>entirely free education, residential lodging, satvic meals, and clothing from the 6th standard through 2nd PUC</strong>.
                </p>
                <p>
                  Grounded in ancient philosophy, the students speak <strong>fluent Sanskrit</strong>, train in classical disciplines like <strong>Bharatanatyam, Vedic astrology (Jyotisha), Harikatha</strong>, and the remarkable sensory discipline of <strong>Gandhari Vidya</strong> (blindfolded sensory perception), while simultaneously preparing for Karnataka State Board (SSLC), Pre-University (PUC), and Karnataka Sanskrit University examinations.
                </p>
              </div>

              <div className="story-origin-quote">
                <div className="quote-mark">“</div>
                <p>
                  When our dignity was challenged on foreign soil, the answer was not anger. It was building a sanctuary where India&apos;s daughters grow with fearless cultural pride, pristine scholarship, and unshakeable self-respect.
                </p>
              </div>

              <div className="story-origin-photos-strip">
                <div className="story-origin-photo-card">
                  <img
                    src="/images/students/student-learning-1.webp"
                    alt="Memorial Bust of Founder Late Sri Ramdas Kamath"
                    loading="lazy"
                  />
                  <div className="story-origin-photo-info">
                    <strong>Founder Late Sri Ramdas Kamath Memorial</strong>
                    <span>Revered bronze bust in the tranquil Ramohalli garden pavilion</span>
                  </div>
                </div>
                <div className="story-origin-photo-card">
                  <img
                    src="/images/campus/campus-panoramic.webp"
                    alt="Bhagavan Veda Vyasa Sannidhi and Founding Mission Stone Tablet"
                    loading="lazy"
                  />
                  <div className="story-origin-photo-info">
                    <strong>Bhagavan Veda Vyasa Sannidhi &amp; Charter</strong>
                    <span>Inscribed with &lsquo;Swastha Susamskruta Samajada Nirmana&rsquo; (Est. 1994)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Key Highlights & Takeaways */}
            <div className="origin-highlights-col">
              <div className="origin-highlight-card card-amber">
                <div className="highlight-card-icon">
                  <HeartHandshake size={24} />
                </div>
                <div>
                  <h5>100% Self-Funded Seva</h5>
                  <p>
                    Personally funded and sustained by the Kamath family across 12–20 acres of prime family land in Ramohalli, run as selfless seva rather than through commercial trusts.
                  </p>
                </div>
              </div>

              <div className="origin-highlight-card card-emerald">
                <div className="highlight-card-icon">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h5>Completely Free of Cost</h5>
                  <p>
                    From 6th Standard through 2nd PUC, every student receives full tuition, residential boarding, nutritious satvic meals, uniforms, and healthcare free of charge.
                  </p>
                </div>
              </div>

              <div className="origin-highlight-card card-saffron">
                <div className="highlight-card-icon">
                  <Eye size={24} />
                </div>
                <div>
                  <h5>Gandhari Vidya &amp; Sacred Arts</h5>
                  <p>
                    Mastery in blindfolded sensory perception (Gandhari Vidya), Jyotisha (astrology), Harikatha, Bharatanatyam, and conversational spoken Sanskrit fluency.
                  </p>
                </div>
              </div>

              <div className="origin-highlight-card card-teal">
                <div className="highlight-card-icon">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h5>Triple Academic Accreditations</h5>
                  <p>
                    Harmonized curriculum preparing girls for Karnataka State Board (SSLC), Pre-University (PUC), and Karnataka Sanskrit University examinations.
                  </p>
                </div>
              </div>

              <div className="origin-stats-strip">
                <div className="origin-stat-item">
                  <span className="stat-number">30+</span>
                  <span className="stat-label">Years of Seva</span>
                </div>
                <div className="origin-stat-divider"></div>
                <div className="origin-stat-item">
                  <span className="stat-number">12-20</span>
                  <span className="stat-label">Acres Dedicated</span>
                </div>
                <div className="origin-stat-divider"></div>
                <div className="origin-stat-item">
                  <span className="stat-number">300+</span>
                  <span className="stat-label">Alumni Scholars</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="story-cards-grid">
          {/* Phase 1 */}
          <div className="story-milestone-card">
            <div className="milestone-ribbon ribbon-amber">
              <span>PHASE 1 (1994–2002) • THE GENESIS</span>
            </div>
            <div className="milestone-content">
              <h3>Inauguration &amp; Campus Foundation</h3>
              <p>
                On the auspicious day of <strong>Vyasa Poornima, 22nd July 1994</strong>, the opening of Shubham Karoti Gurukula was blessed and inaugurated by <strong>Poojya Swamiji Sri Sri Sri Vishveshwara Teertha</strong> of Sri Pejawar Matha, Udupi, alongside visionary philanthropist <strong>Sri Ramdas Kamath</strong> and <strong>Sri Pramod Kamath</strong>.
              </p>
              <p>
                Spread across 12 to 20 green acres in Ramohalli near Bengaluru&apos;s historic Big Banyan Tree, the campus was lovingly constructed and funded directly by the family. In the initial period, the renowned social service organization <em>Hindu Seva Prathishtana</em> provided invaluable guidance in establishing authentic Gurukula methodology.
              </p>
              <div className="story-quote-card">
                <div className="quote-mark">“</div>
                <p>Shubham Karoti means &apos;Do Good Deeds&apos; in Sanskrit — an enduring commitment to build a cultured, virtuous society.</p>
              </div>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="story-milestone-card">
            <div className="milestone-ribbon ribbon-emerald">
              <span>PHASE 2 (2002–2014) • FLOURISHING SHISHYAS</span>
            </div>
            <div className="milestone-content">
              <h3>First Graduating Batches &amp; Expansion</h3>
              <p>
                Following the demise of Sri Ramdas Kamath in 2002, the Gurukula carried forward its sacred mission guided by eminent educationists including Sri Suresh Kulkarni, Sri Prakash Kulkarni, and Sri Purshottam.
              </p>
              <p>
                In the year 2000, the first batch of girls completed their 6 years of Gurukula education and advanced into higher collegiate studies with distinction. By 2014, <strong>15 batches comprising over 300 students</strong> had successfully graduated, proving that traditional Gurukula pedagogy fosters extraordinary academic competence.
              </p>
              <div className="story-quote-card quote-emerald">
                <div className="quote-mark">“</div>
                <p>When you educate a girl in wisdom, virtue, and self-reliance, you illuminate the entire nation&apos;s future.</p>
              </div>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="story-milestone-card" style={{ gridColumn: "1 / -1" }}>
            <div className="milestone-ribbon ribbon-amber">
              <span>PHASE 3 (2014 &amp; ONWARDS) • INTENSIVE MATRUSHREE MENTORSHIP</span>
            </div>
            <div className="milestone-content">
              <h3>Full-Time Dedication &amp; Global Impact</h3>
              <p>
                In 2014, <strong>Sri Pramod Kamath</strong> retired from his business enterprises to dedicate his life full-time to the Gurukula. Under his leadership and the motherly guidance of resident <em>Matrushrees</em> (lady teachers), the Gurukula expanded into an integrated center of classical and modern excellence.
              </p>
              <p>
                Today, over 300 alumni are actively serving as software engineers in national and multinational firms, medical doctors, chartered accountants, high court advocates, classical Bharatanatyam teachers, and respected community leaders — carrying our national pride and ethos forward with dignity.
              </p>
            </div>
          </div>
        </div>

        {/* Vision Statement Banner */}
        <div className="maitreyi-story-highlight">
          <div className="vision-pill">
            <Flower2 size={16} />
            <span>THE LIVING MISSION</span>
          </div>
          <h3>
            &ldquo;Swastha Susamskruta Samajada Nirmana&rdquo;
          </h3>
          <p style={{ margin: "10px 0 0", color: "#f8fafc", fontSize: "16px", opacity: 0.95 }}>
            The Creation of a Healthy, Cultured, and Virtuous Society through the empowerment of India&apos;s daughters.
          </p>
        </div>
      </div>
    </section>
  );
}

export default StorySection;
