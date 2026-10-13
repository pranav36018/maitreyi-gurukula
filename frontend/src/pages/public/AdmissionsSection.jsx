import {
  Sparkles,
  CheckCircle2,
  Download,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Users,
  FileText,
  HelpCircle,
  Award,
} from "lucide-react";

function AdmissionsSection() {
  const steps = [
    {
      num: "01",
      title: "Enquiry & Application Form",
      desc: "Parents download the application form or submit an online enquiry. Completed application details with academic history from 5th standard are submitted.",
      badge: "Step 1 • Intake",
    },
    {
      num: "02",
      title: "General Assessment Test",
      desc: "A simple, child-friendly general assessment designed to gauge the girl's grasping power, language aptitude, and curiosity rather than rote learning.",
      badge: "Step 2 • Assessment",
    },
    {
      num: "03",
      title: "Personal Interview & Interaction",
      desc: "A warm, interactive dialogue with the prospective student and her parents to understand family alignment with Gurukula ethos and cultural values.",
      badge: "Step 3 • Dialogue",
    },
    {
      num: "04",
      title: "Selection & District Representation",
      desc: "To ensure broad representation, 15 to 20 girls representing different districts are selected per annual batch based on merit and mutual readiness.",
      badge: "Step 4 • Merit List",
    },
    {
      num: "05",
      title: "Auspicious Initiation & Welcome",
      desc: "Selected shishyas are joyfully welcomed into the Gurukula family during the sacred academic commencement ceremony with blessings from the Acharyas.",
      badge: "Step 5 • Initiation",
    },
  ];

  return (
    <section className="maitreyi-admissions-section" id="admissions">
      <div className="section-container">
        {/* Header */}
        <div className="section-header-centered">
          <div className="section-pill-badge">
            <Sparkles size={14} />
            <span>ADMISSIONS • SHISHYA PRAVESHA</span>
          </div>
          <h2>
            Admissions Process &amp;
            <br />
            <span className="section-title-highlight">Eligibility Information</span>
          </h2>
          <p className="section-subtitle">
            Providing equal opportunity to deserving daughters from all districts.
            Our admissions prioritize wholesome character, eagerness to learn, and commitment to traditional values.
          </p>
        </div>

        {/* Highlight Banner: 100% Free of Cost */}
        <div className="admissions-highlight-banner">
          <div className="highlight-banner-icon">
            <ShieldCheck size={36} />
          </div>
          <div className="highlight-banner-text">
            <span className="banner-eyebrow">CHARITABLE RESIDENTIAL INSTITUTION</span>
            <h3>100% Free Education, Lodging, Food &amp; Clothing (6th Std – 2nd PUC)</h3>
            <p>
              Founded and self-funded as pure seva by the Kamath family, Shubham Karoti Maitreyi Gurukula does not charge any tuition or boarding fees.
              Every admitted student receives complete residential accommodation, hygienic satvic meals, clothing,
              textbooks, healthcare, and education from 6th standard through 2nd PUC completely free of cost.
            </p>
          </div>
          <div className="highlight-banner-actions">
            <a href="#contact" className="banner-cta-primary">
              <span>Apply Online</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* 3 Core Criteria Cards */}
        <div className="admissions-criteria-grid">
          <div className="criteria-card criteria-card-emerald">
            <div className="criteria-icon-wrap icon-emerald">
              <Calendar size={24} />
            </div>
            <h4>Eligibility Age &amp; Schooling</h4>
            <ul className="criteria-points-list">
              <li>
                <CheckCircle2 size={16} className="point-icon" />
                <span><strong>Age Requirement:</strong> Girls aged 10 years and 10 months.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="point-icon" />
                <span><strong>Completed Schooling:</strong> Must have successfully completed 5th standard.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="point-icon" />
                <span><strong>Batch Size:</strong> 15 to 20 girls admitted annually for personalized acharya mentorship.</span>
              </li>
            </ul>
          </div>

          <div className="criteria-card criteria-card-saffron">
            <div className="criteria-icon-wrap icon-saffron">
              <Users size={24} />
            </div>
            <h4>Selection Criteria</h4>
            <ul className="criteria-points-list">
              <li>
                <CheckCircle2 size={16} className="point-icon" />
                <span><strong>One Child per Family:</strong> Encouraging broad community upliftment across households.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="point-icon" />
                <span><strong>District Representation:</strong> Welcoming girl students from various districts across Karnataka.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="point-icon" />
                <span><strong>Cultural Alignment:</strong> Parents committed to supporting Gurukula discipline and sanskaras.</span>
              </li>
            </ul>
          </div>

          <div className="criteria-card criteria-card-teal">
            <div className="criteria-icon-wrap icon-teal">
              <Award size={24} />
            </div>
            <h4>Accreditations &amp; Exams</h4>
            <ul className="criteria-points-list">
              <li>
                <CheckCircle2 size={16} className="point-icon" />
                <span><strong>State Board (SSLC):</strong> Full regular curriculum in science, math, social, and languages.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="point-icon" />
                <span><strong>Karnataka Sanskrit Univ.:</strong> Official Sanskrit degree and Sahitya certification.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="point-icon" />
                <span><strong>Gurukula Honours:</strong> Comprehensive shastric, yogic, and arts certifications.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Real Visual Showcase: Admitted Student Cohort & Study Life */}
        <div className="admissions-visual-showcase">
          <div className="admissions-visual-card">
            <img
              src="/images/students/student-group-1.webp"
              alt="Maitreyi Gurukula Admitted Students"
              loading="lazy"
            />
            <div className="visual-card-caption">
              <h5>Close-Knit Student Sisterhood</h5>
              <p>Admitted students form lifelong bonds of sisterhood under the maternal care of resident Matrushrees.</p>
            </div>
          </div>
          <div className="admissions-visual-card">
            <img
              src="/images/students/student-learning-2.webp"
              alt="Classroom Study at Gurukula"
              loading="lazy"
            />
            <div className="visual-card-caption">
              <h5>Personalized Acharya Attention</h5>
              <p>Small batches of 15–20 shishyas ensure every girl receives 1:1 mentorship in academics and Sanskrit.</p>
            </div>
          </div>
        </div>

        {/* 5-Step Admissions Journey */}
        <div className="admissions-steps-container">
          <div className="steps-header">
            <h3>Five Steps to Gurukula Admission</h3>
            <p>From initial application to the auspicious initiation day on campus</p>
          </div>

          <div className="steps-cards-grid">
            {steps.map((step) => (
              <div key={step.num} className="admission-step-card">
                <div className="step-card-top">
                  <span className="step-num-pill">{step.num}</span>
                  <span className="step-badge">{step.badge}</span>
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Download Form & Action Bar */}
        <div className="admissions-download-bar">
          <div className="download-bar-left">
            <div className="download-icon-box">
              <FileText size={28} />
            </div>
            <div>
              <h4>Ready to submit your application?</h4>
              <p>Download the official admission form to submit by post or fill out our instant online enquiry below.</p>
            </div>
          </div>

          <div className="download-bar-buttons">
            <a
              href="https://shubhamkarotigurukula.com/wp-content/uploads/2026/05/APPLICATION_2026__NO_1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="download-pdf-btn"
            >
              <Download size={16} />
              <span>Download Application PDF</span>
            </a>

            <a href="#contact" className="online-enquiry-jump-btn">
              <span>Online Enquiry Form</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdmissionsSection;
