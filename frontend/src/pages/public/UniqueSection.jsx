import { Sparkles, ShieldCheck, Award, Scroll, Palette } from "lucide-react";

function UniqueSection() {
  return (
    <section className="maitreyi-unique" id="unique">
      <div className="unique-container">
        <div className="maitreyi-unique-heading">
          <div>
            <div className="maitreyi-section-label">
              <Sparkles size={14} />
              <span>WHAT MAKES US DIFFERENT</span>
            </div>
            <h2>
              An education with deep roots
              <br />
              <span className="unique-title-highlight">and soaring wings.</span>
            </h2>
          </div>
          <p className="unique-heading-desc">
            Bridging the profound depth of ancient heritage with the expansive ambitions of contemporary life.
          </p>
        </div>

        <div className="maitreyi-unique-grid">
          {/* Feature 01 */}
          <article className="unique-card u-card-emerald">
            <div className="u-card-header">
              <div className="u-card-icon icon-emerald">
                <ShieldCheck size={26} />
              </div>
              <span className="u-card-badge badge-emerald">01 • COMPLETE SUPPORT</span>
            </div>
            <h3>100% Free of Cost</h3>
            <p>
              Every girl admitted is fully sponsored throughout her 6-year education. Safe residential lodging, wholesome satvic meals, uniforms, books, medical care, and tuition are provided completely free of charge.
            </p>
            <div className="u-card-pill pill-emerald">
              <span>🌿 Food, Stay, Clothing, Books &amp; Healthcare Included</span>
            </div>
          </article>

          {/* Feature 02 */}
          <article className="unique-card u-card-saffron">
            <div className="u-card-header">
              <div className="u-card-icon icon-saffron">
                <Award size={26} />
              </div>
              <span className="u-card-badge badge-saffron">02 • TRIPLE CREDENTIALS</span>
            </div>
            <h3>Three Final Board Exams</h3>
            <p>
              Students achieve three prestigious credentials upon graduation: Karnataka State Board exams (SSLC), Karnataka Sanskrit University degree examinations, and Gurukula internal comprehensive shastric honours.
            </p>
            <div className="u-card-pill pill-saffron">
              <span>📜 State Board • Sanskrit Univ • Gurukula Honours</span>
            </div>
          </article>

          {/* Feature 03 */}
          <article className="unique-card u-card-teal">
            <div className="u-card-header">
              <div className="u-card-icon icon-teal">
                <Scroll size={26} />
              </div>
              <span className="u-card-badge badge-teal">03 • DAILY IMMERSION</span>
            </div>
            <h3>Living Spoken Sanskrit</h3>
            <p>
              Sanskrit is the living pulse of our campus. Students chat, debate, recite, and create in conversational Sanskrit naturally from morning to evening, developing exceptional linguistic and cognitive mastery.
            </p>
            <div className="u-card-pill pill-teal">
              <span>🪷 Conversational Sanskrit Fluency in Daily Life</span>
            </div>
          </article>

          {/* Feature 04 */}
          <article className="unique-card u-card-terracotta">
            <div className="u-card-header">
              <div className="u-card-icon icon-terracotta">
                <Palette size={26} />
              </div>
              <span className="u-card-badge badge-terracotta">04 • TRADITIONAL MASTERY</span>
            </div>
            <h3>Ancient Arts &amp; Practical Skills</h3>
            <p>
              Girls are systematically trained in classical Bharatanatyam, Gandhari Vidya (blindfolded sensory perception), Harikatha storytelling, Vedic astrology (Jyotisha), yoga, organic agriculture, goshala care, and domestic self-reliance.
            </p>
            <div className="u-card-pill pill-terracotta">
              <span>🎨 Bharatanatyam • Gandhari Vidya • Harikatha • Jyotisha</span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default UniqueSection;
