import {
  Sparkles,
  Sun,
  GraduationCap,
  Palette,
  Users,
  Award,
  Activity,
} from "lucide-react";

function JourneySection() {
  return (
    <section className="maitreyi-journey" id="journey">
      <div className="journey-container">
        <div className="maitreyi-journey-heading">
          <div className="maitreyi-section-label">
            <Sparkles size={14} />
            <span>THE 6-YEAR SHISHYA JOURNEY</span>
          </div>
          <h2>
            Every child has a sacred story
            <br />
            <span className="journey-title-highlight">worth treasuring.</span>
          </h2>
          <p>
            Our Student Journey Tracking System lovingly monitors each child&apos;s holistic growth across six foundational dimensions from 5th standard admission through graduation and active alumni life.
          </p>
        </div>

        <div className="journey-stages-grid">
          {/* Stage 1 */}
          <div className="journey-stage-card j-stage-saffron">
            <div className="j-stage-header">
              <div className="j-stage-icon">
                <Sun size={24} />
              </div>
              <span className="j-stage-step">STAGE 01</span>
            </div>
            <h3>Admission &amp; Welcome (Pravesha)</h3>
            <p>
              Entering at age 10 after 5th standard. Family background intake, health assessment, initial aspirations, and joyful initiation into the Gurukula sisterhood.
            </p>
            <div className="j-stage-chip">
              <span>Warm Initiation &amp; Foundation</span>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="journey-stage-card j-stage-teal">
            <div className="j-stage-header">
              <div className="j-stage-icon">
                <GraduationCap size={24} />
              </div>
              <span className="j-stage-step">STAGE 02</span>
            </div>
            <h3>Academic Learning (Vidya)</h3>
            <p>
              Continuous scholastic progress tracking across State Board subjects (Science, Math, Social Studies, English, Kannada) and Sanskrit Shastras toward annual board excellence.
            </p>
            <div className="j-stage-chip">
              <span>Scholastic Excellence</span>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="journey-stage-card j-stage-rose">
            <div className="j-stage-header">
              <div className="j-stage-icon">
                <Palette size={24} />
              </div>
              <span className="j-stage-step">STAGE 03</span>
            </div>
            <h3>Skills &amp; Cultural Talents (Kala)</h3>
            <p>
              Cultivating classical arts including Bharatanatyam, Carnatic vocal music, Harikatha, debate, painting, handicraft making, and Vedic astrology.
            </p>
            <div className="j-stage-chip">
              <span>Classical Artistry</span>
            </div>
          </div>

          {/* Stage 4 */}
          <div className="journey-stage-card j-stage-emerald">
            <div className="j-stage-header">
              <div className="j-stage-icon">
                <Users size={24} />
              </div>
              <span className="j-stage-step">STAGE 04</span>
            </div>
            <h3>Responsibilities &amp; Seva (Dharma)</h3>
            <p>
              Active leadership participation: morning prayer coordination, mentoring younger peers, dining seva, environmental upkeep, and team roles.
            </p>
            <div className="j-stage-chip">
              <span>Dharma &amp; Leadership</span>
            </div>
          </div>

          {/* Stage 5 */}
          <div className="journey-stage-card j-stage-indigo">
            <div className="j-stage-header">
              <div className="j-stage-icon">
                <Award size={24} />
              </div>
              <span className="j-stage-step">STAGE 05</span>
            </div>
            <h3>Achievements &amp; Honors (Siddhi)</h3>
            <p>
              Commemorating milestones: district competitions, Sanskrit board distinctions, stage performances, leadership awards, and public accolades.
            </p>
            <div className="j-stage-chip">
              <span>Celebrated Milestones</span>
            </div>
          </div>

          {/* Stage 6 */}
          <div className="journey-stage-card j-stage-terracotta">
            <div className="j-stage-header">
              <div className="j-stage-icon">
                <Activity size={24} />
              </div>
              <span className="j-stage-step">STAGE 06</span>
            </div>
            <h3>Alumni Network &amp; Mentorship</h3>
            <p>
              Continuing lifelong bonds after graduation. Alumni mentor younger batches, share collegiate guidance, and carry Gurukula values into professional careers.
            </p>
            <div className="j-stage-chip">
              <span>Lifelong Alumni Sisterhood</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JourneySection;
