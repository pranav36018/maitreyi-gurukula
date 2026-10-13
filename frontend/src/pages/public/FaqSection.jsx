import { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, HelpCircle, ArrowRight } from "lucide-react";

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Who is eligible to apply for admission to Maitreyi Gurukula?",
      a: "Girls aged approximately 10 years and 10 months who have successfully completed the 5th standard are eligible for admission. A simple, child-friendly general assessment test and an interactive family interview are conducted. Every year, 15 to 20 girls representing various districts of Karnataka are selected to join the residential batch.",
    },
    {
      q: "What are the fees for boarding, meals, and education?",
      a: "Shubham Karoti Maitreyi Gurukula is a 100% charitable residential institution. No tuition fees, hostel fees, meal charges, or examination fees are charged. Safe lodging, wholesome satvic meals, uniforms, books, medical care, and complete educational materials are provided entirely free of cost throughout their 6-year journey.",
    },
    {
      q: "Which educational boards and certifications do students appear for?",
      a: "Students receive triple educational certifications: 1) Karnataka State Secondary Education Board (SSLC 10th standard), 2) Karnataka Sanskrit University official board degrees in Sanskrit Sahitya and Shastras, and 3) Gurukula internal certifications in classical arts, yoga, and character development.",
    },
    {
      q: "Is prior knowledge of Sanskrit required before joining?",
      a: "No prior knowledge of Sanskrit is necessary. At the Gurukula, Sanskrit is the living spoken language of daily communication. Through natural immersion, daily chanting, and child-friendly conversational methods, students begin understanding and speaking Sanskrit fluently within just a few months.",
    },
    {
      q: "Can parents visit or stay in contact with their daughters?",
      a: "Yes. The Gurukula maintains designated parent visitation days, festive celebrations (such as Deepavali, Navaratri, and Annual Days), and vacation intervals where students visit their families. In addition, scheduled parental calls ensure strong emotional bonds with home while preserving ashram focus.",
    },
    {
      q: "What careers and higher education do alumni pursue after Gurukula?",
      a: "To date, over 300 girls have graduated from the 6-year Gurukula course and pursued college and university degrees across diverse disciplines. Alumni are now flourishing as software engineers in national and multinational companies, doctors, chartered accountants, advocates, teachers, classical Bharatanatyam artists, and leaders in society.",
    },
    {
      q: "How are residential safety, nutrition, and healthcare managed?",
      a: "The 12-acre campus provides a secure, peaceful environment under round-the-clock female care. Resident Matrushrees (maternal lady wardens) stay in the dormitories with the students. The Annapurna kitchen provides freshly cooked, nutritious, satvic vegetarian food made with organic grains and ashram-grown vegetables. Regular medical checkups and on-call physicians ensure vibrant physical health.",
    },
    {
      q: "How can well-wishers and donors support or visit the Gurukula?",
      a: "Shubham Karoti Gurukula welcomes well-wishers, educationists, and donors. You can support by sponsoring a student's educational materials, supporting the Surabhi Goshala, or contributing to campus infrastructure. Donations are eligible for tax exemption under Section 80G of the Income Tax Act. Contact Sri Pramod Kamath (+91 9845403290) to learn more.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex((current) => (current === index ? -1 : index));
  };

  return (
    <section className="maitreyi-faq-section" id="faqs">
      <div className="section-container">
        <div className="section-header-centered">
          <div className="section-pill-badge">
            <Sparkles size={14} />
            <span>COMMONLY ASKED QUESTIONS • PRASHNOTTARI</span>
          </div>
          <h2>
            Frequently Asked Questions
            <br />
            <span className="section-title-highlight">for Parents &amp; Well-Wishers</span>
          </h2>
          <p className="section-subtitle">
            Find answers to common questions about eligibility, living arrangements, exams, fees,
            and daily life at Shubham Karoti Maitreyi Gurukula.
          </p>
        </div>

        <div className="faq-accordion-container">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`faq-accordion-item ${isOpen ? "open" : ""}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <div className="faq-question-text">
                    <span className="faq-q-num">Q{index + 1}.</span>
                    <span>{item.q}</span>
                  </div>
                  <div className="faq-chevron-bubble">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {isOpen && (
                  <div className="faq-answer-panel">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="faq-still-have-questions">
          <div className="shq-icon-wrap">
            <HelpCircle size={24} />
          </div>
          <div className="shq-text">
            <h4>Have a question not listed here?</h4>
            <p>Our Acharyas and office team are always happy to speak with parents and address your questions personally.</p>
          </div>
          <a href="#contact" className="shq-contact-btn">
            <span>Ask Us Directly</span>
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
