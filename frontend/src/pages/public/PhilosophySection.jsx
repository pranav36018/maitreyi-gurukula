import { Sparkles, BookOpen, HeartHandshake } from "lucide-react";

function PhilosophySection() {
  return (
    <section className="maitreyi-philosophy" id="philosophy">
      <div className="philosophy-container">
        <div className="maitreyi-philosophy-heading">
          <div className="maitreyi-section-label">
            <Sparkles size={14} />
            <span>OUR PHILOSOPHY • SIDDHANTA</span>
          </div>
          <h2>
            Living, Learning &amp; Growing
            <br />
            <span className="philosophy-title-highlight">as One Family.</span>
          </h2>
          <p className="philosophy-subtitle">
            True Gurukula education does not merely train students for examinations.
            It harmonizes intellect, character, spiritual equanimity, and practical self-reliance into a noble, complete existence.
          </p>
        </div>

        <div className="philosophy-cards-grid">
          {/* Card 1: Guru-Shishya Kutumba */}
          <div className="philosophy-card card-teal">
            <div className="philosophy-card-glow"></div>
            <div className="philosophy-card-top-row">
              <div className="philosophy-card-icon-wrap icon-teal">
                <BookOpen size={28} />
              </div>
              <div className="philosophy-card-num">01</div>
            </div>
            <h3>Guru-Shishya Parampara</h3>
            <p>
              The hallmark of our Gurukula is that teachers (Acharyas and Matrushrees) and students stay, learn, eat, and cherish life together as one united family, creating deep trust and lifelong moral guidance.
            </p>
            <div className="philosophy-card-tags">
              <span>Family Living</span>
              <span>Motherly Guidance</span>
              <span>Moral Clarity</span>
            </div>
          </div>

          {/* Card 2: Living Sanskrit & Shastras */}
          <div className="philosophy-card card-saffron">
            <div className="philosophy-card-glow"></div>
            <div className="philosophy-card-top-row">
              <div className="philosophy-card-icon-wrap icon-saffron">
                <Sparkles size={28} />
              </div>
              <div className="philosophy-card-num">02</div>
            </div>
            <h3>Living Spoken Sanskrit (संस्कृतम्)</h3>
            <p>
              Sanskrit is not treated as a dead subject — it is the vibrant medium of daily conversation. Students naturally converse, debate, and compose in Sanskrit, awakening sharper intellect and cultural resonance.
            </p>
            <div className="philosophy-card-tags">
              <span>Conversational Sanskrit</span>
              <span>Veda Chanting</span>
              <span>Memory Power</span>
            </div>
          </div>

          {/* Card 3: Girl Child Empowerment */}
          <div className="philosophy-card card-rose">
            <div className="philosophy-card-glow"></div>
            <div className="philosophy-card-top-row">
              <div className="philosophy-card-icon-wrap icon-rose">
                <HeartHandshake size={28} />
              </div>
              <div className="philosophy-card-num">03</div>
            </div>
            <h3>Girl Child Self-Reliance (ಸ್ವಾವಲಂಬನೆ)</h3>
            <p>
              Equipping young girls from humble backgrounds with unshakeable self-confidence, fearless speech, scholastic excellence, and financial self-sufficiency to become breadwinners and pillars of their homes.
            </p>
            <div className="philosophy-card-tags">
              <span>Self-Confidence</span>
              <span>Economic Dignity</span>
              <span>Character Building</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhilosophySection;
