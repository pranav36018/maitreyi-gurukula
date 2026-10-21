import {
  Sparkles,
  Globe,
  HeartHandshake,
  GraduationCap,
  ShieldCheck,
  Compass,
  Award,
  Flower2,
  BookOpen,
} from "lucide-react";

function StorySection() {
  return (
    <section className="maitreyi-story" id="story">
      <div className="story-container">
        {/* ================= SECTION HEADER ================= */}
        <div className="maitreyi-story-heading">
          <div className="story-badge">
            <Sparkles size={14} />
            <span>OUR SACRED ORIGIN &amp; 30-YEAR LEGACY</span>
          </div>
          <h2>
            The Awakening that Built a
            <br />
            <span className="story-title-highlight">Sanctuary of Dignity.</span>
          </h2>
          <p className="story-heading-desc">
            How an overseas encounter in 1994 inspired the Kamath family to dedicate 12 to 20 acres of family land
            and three decades of selfless seva to India&apos;s daughters.
          </p>
        </div>

        {/* ================= 3-ACT CHRONOLOGICAL JOURNEY (SYMMETRICAL 3-CARD GRID) ================= */}
        <div className="story-journey-grid">
          {/* Act 01 */}
          <div className="story-act-card card-amber-glow">
            <div className="act-header">
              <span className="act-num-badge">01</span>
              <div className="act-meta">
                <span className="act-tag">1994 • THE OVERSEAS SPARK</span>
                <h4>Dignity Over Bitterness</h4>
              </div>
            </div>
            <p className="act-desc">
              While traveling to England in 1994, visionary entrepreneur <strong>Sri Pramod Kamath</strong> and his father <strong>Sri Ramdas Kamath</strong> faced discriminatory airport transit scrutiny while British passengers passed freely. Deeply moved, they resolved not to harbor bitterness, but to forge national self-respect from within by building an educational sanctuary back home.
            </p>
            <div className="act-footer-pill">
              <Globe size={13} />
              <span>National Pride Built From Within</span>
            </div>
          </div>

          {/* Act 02 */}
          <div className="story-act-card card-emerald-glow">
            <div className="act-header">
              <span className="act-num-badge">02</span>
              <div className="act-meta">
                <span className="act-tag">PEJAWAR SWAMIJI BLESSINGS</span>
                <h4>12-20 Acres for Daughters</h4>
              </div>
            </div>
            <p className="act-desc">
              With the divine guidance of <strong>Poojya Sri Sri Vishveshwara Teertha Swamiji</strong> (Sri Pejawar Matha, Udupi), the Kamath family dedicated <strong>12 to 20 acres of prime land in Ramohalli near Big Banyan Tree</strong>. Believing that educating a daughter uplifts entire families and society, they established a 100% free residential Gurukula funded directly as personal seva.
            </p>
            <div className="act-footer-pill">
              <HeartHandshake size={13} />
              <span>100% Free Family Seva</span>
            </div>
          </div>

          {/* Act 03 */}
          <div className="story-act-card card-gold-glow">
            <div className="act-header">
              <span className="act-num-badge">03</span>
              <div className="act-meta">
                <span className="act-tag">30 YEARS • 1994 TO PRESENT</span>
                <h4>300+ Alumni Scholars Globally</h4>
              </div>
            </div>
            <p className="act-desc">
              Across 30 years and 15+ graduating batches, over <strong>300 young shishyas</strong> have mastered conversational Sanskrit, classical Bharatanatyam, and SSLC/PUC board academics. Today, our alumni excel globally as software engineers in tech multinationals, medical doctors, CAs, and advocates, carrying our civilizational values forward with pride.
            </p>
            <div className="act-footer-pill">
              <GraduationCap size={13} />
              <span>300+ Scholars Serving Globally</span>
            </div>
          </div>
        </div>

        {/* ================= 4 KEY HALLMARKS STRIP ================= */}
        <div className="story-hallmarks-grid">
          <div className="story-hallmark-box">
            <div className="hallmark-icon-wrap box-emerald">
              <ShieldCheck size={20} />
            </div>
            <div className="hallmark-text">
              <strong>100% Free of Cost</strong>
              <p>Tuition, residential stay, satvic meals, uniforms, and healthcare fully sponsored at zero cost from 6th Std through 2nd PUC.</p>
            </div>
          </div>

          <div className="story-hallmark-box">
            <div className="hallmark-icon-wrap box-teal">
              <Compass size={20} />
            </div>
            <div className="hallmark-text">
              <strong>12–20 Acre Sanctuary</strong>
              <p>Serene green campus in Ramohalli near Bengaluru&apos;s Big Banyan Tree with sacred Yajnashala and open-air Vriksha Katte.</p>
            </div>
          </div>

          <div className="story-hallmark-box">
            <div className="hallmark-icon-wrap box-amber">
              <Award size={20} />
            </div>
            <div className="hallmark-text">
              <strong>Triple Accreditations</strong>
              <p>Rigorous dual-stream curriculum preparing students for Karnataka State SSLC, Pre-University (PUC), and Sanskrit University.</p>
            </div>
          </div>

          <div className="story-hallmark-box">
            <div className="hallmark-icon-wrap box-saffron">
              <BookOpen size={20} />
            </div>
            <div className="hallmark-text">
              <strong>Living Shastras &amp; Arts</strong>
              <p>Fluent conversational Sanskrit, Gandhari Vidya (sensory perception), Harikatha, Bharatanatyam, and Ghosh marching band.</p>
            </div>
          </div>
        </div>

        {/* ================= ARCHIVAL MEMORIAL PHOTO SHOWCASE ================= */}
        <div className="story-memorial-grid">
          <div className="story-memorial-card">
            <img
              src="/images/students/student-learning-1.webp"
              alt="Memorial Bust of Founder Late Sri Ramdas Kamath"
              loading="lazy"
            />
            <div className="memorial-card-caption">
              <strong>Founder Late Sri Ramdas Kamath Memorial</strong>
              <span>Revered bronze bust in the tranquil Ramohalli campus garden pavilion</span>
            </div>
          </div>

          <div className="story-memorial-card">
            <img
              src="/images/campus/campus-panoramic.webp"
              alt="Bhagavan Veda Vyasa Sannidhi and 1994 Founding Charter"
              loading="lazy"
            />
            <div className="memorial-card-caption">
              <strong>Bhagavan Veda Vyasa Sannidhi &amp; Charter</strong>
              <span>Inscribed with &lsquo;Swastha Susamskruta Samajada Nirmana&rsquo; (Est. Vyasa Poornima 1994)</span>
            </div>
          </div>
        </div>

        {/* ================= THE LIVING MISSION BANNER ================= */}
        <div className="maitreyi-story-highlight">
          <div className="vision-pill">
            <Flower2 size={16} />
            <span>THE SACRED CHARTER</span>
          </div>
          <h3>&ldquo;Swastha Susamskruta Samajada Nirmana&rdquo;</h3>
          <p className="vision-subtext">
            &ldquo;The Creation of a Healthy, Cultured, and Virtuous Society through the holistic empowerment of India&apos;s daughters.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}

export default StorySection;
