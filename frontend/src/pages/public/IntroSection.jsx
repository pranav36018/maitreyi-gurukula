import { Sparkles } from "lucide-react";

function IntroSection() {
  return (
    <section className="maitreyi-intro" id="intro">
      <div className="section-container">
        <div className="maitreyi-section-label">
          <Sparkles size={14} />
          <span>THE GUIDING ESSENCE</span>
        </div>

        <div className="maitreyi-intro-grid">
          <div className="intro-heading-col">
            <h2>
              Education is not only about what she learns.
              <br />
              <span className="intro-title-highlight">It is who she becomes.</span>
            </h2>
            <p className="intro-lead-text">
              Shubham Karoti Maitreyi Gurukula was founded on the sacred conviction that educating young girls
              with cultural pride, deep moral grounding, and modern academic excellence creates transformative
              leaders for families, communities, and the nation.
            </p>
          </div>

          <div className="intro-pillars-card">
            <div className="pillar-item">
              <div className="pillar-num">01</div>
              <div>
                <h4>Self-Respect &amp; Identity (आत्मगौरव)</h4>
                <p>Nurturing fearless confidence and unshakeable pride in our rich civilizational roots.</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-num">02</div>
              <div>
                <h4>Scholastic Mastery (ज्ञान &amp; विद्या)</h4>
                <p>Harmonizing Karnataka State Board academic rigor with Karnataka Sanskrit University scholarship.</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-num">03</div>
              <div>
                <h4>Duty &amp; Compassion (संस्कार &amp; सेवा)</h4>
                <p>Fostering discipline, sisterhood, domestic wisdom, and selfless community service.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntroSection;
