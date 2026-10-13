import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  CheckCircle2,
  Sparkles,
  Building,
  Navigation,
} from "lucide-react";
import { createAdmission } from "../../services/api";

function ContactSection({ onOpenDirections }) {
  const [form, setForm] = useState({
    parentName: "",
    applicantName: "",
    parentPhone: "",
    parentEmail: "",
    targetGrade: "Class 5",
    enquiryType: "Admission Enquiry",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.parentName.trim() || !form.parentPhone.trim()) {
      setError("Please provide parent/guardian name and a contact phone number.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      await createAdmission({
        applicantName: form.applicantName.trim() || "Prospective Student",
        parentName: form.parentName.trim(),
        parentPhone: form.parentPhone.trim(),
        parentEmail: form.parentEmail.trim() || undefined,
        targetGrade: form.targetGrade,
        referralSource: `Website Form - ${form.enquiryType}`,
        notes: `Enquiry Type: ${form.enquiryType} | Student: ${form.applicantName || "Not specified"} | Message: ${form.notes || "None"}`,
        status: "Enquiry",
      });

      setSubmitted(true);
      setForm({
        parentName: "",
        applicantName: "",
        parentPhone: "",
        parentEmail: "",
        targetGrade: "Class 5",
        enquiryType: "Admission Enquiry",
        notes: "",
      });
    } catch (err) {
      console.error("Unable to submit enquiry:", err);
      setError(
        err.message ||
          "Unable to submit your enquiry at this moment. Please reach out via phone or WhatsApp directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="maitreyi-contact-section" id="contact">
      <div className="section-container">
        <div className="section-header-centered">
          <div className="section-pill-badge">
            <Sparkles size={14} />
            <span>CONNECT WITH US</span>
          </div>
          <h2>
            Contact the Gurukula
            <br />
            <span className="section-title-highlight">&amp; Submit an Enquiry</span>
          </h2>
          <p className="section-subtitle">
            Whether you wish to enquire about admissions for your daughter, plan a campus visit,
            or learn more about our traditional Gurukula education, our Acharyas are here to guide you.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Contact Details, WhatsApp, Office Info */}
          <div className="contact-details-col">
            <div className="contact-card primary-contact-card">
              <div className="contact-card-header">
                <div className="contact-icon-bubble">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3>Campus Location</h3>
                  <span className="contact-card-tag">Ramohalli, Bengaluru</span>
                </div>
              </div>
              <p className="contact-address-text">
                <strong>Shubham Karoti (Maitreyi Gurukula)</strong>
                <br />
                No 52 / 1, Big Banyan Tree Road,
                <br />
                Ramohalli, Kengeri Hobli,
                <br />
                Bengaluru 560 074, Karnataka, India
              </p>
              <div className="landmark-note">
                <span>🌿 Landmark:</span> Located 25 km from city centre, right near the famous Dodda Alada Mara (Big Banyan Tree).
              </div>
              {onOpenDirections && (
                <button
                  type="button"
                  className="contact-card-directions-btn"
                  onClick={onOpenDirections}
                >
                  <Navigation size={18} />
                  <span>Open Directions &amp; Transit Guide</span>
                </button>
              )}
            </div>

            <div className="contact-card numbers-contact-card">
              <div className="contact-card-header">
                <div className="contact-icon-bubble bubble-phone">
                  <Phone size={22} />
                </div>
                <div>
                  <h3>Direct Phone Contacts</h3>
                  <span className="contact-card-tag">Call our trustees &amp; staff</span>
                </div>
              </div>

              <div className="phone-rows-list">
                <a href="tel:+919845403290" className="phone-row-item">
                  <div className="phone-info">
                    <strong>+91 9845403290</strong>
                    <span>Sri. Pramod Kamat (Managing Trustee)</span>
                  </div>
                  <span className="call-action-pill">Call Now</span>
                </a>

                <a href="tel:+916362133847" className="phone-row-item">
                  <div className="phone-info">
                    <strong>+91 6362133847</strong>
                    <span>Gurukula Campus Office</span>
                  </div>
                  <span className="call-action-pill">Call Now</span>
                </a>

                <a href="tel:+919900216373" className="phone-row-item">
                  <div className="phone-info">
                    <strong>+91 9900216373</strong>
                    <span>Sri. Venugopal (Administrator)</span>
                  </div>
                  <span className="call-action-pill">Call Now</span>
                </a>
              </div>
            </div>

            {/* Email & WhatsApp Quick Buttons */}
            <div className="contact-actions-row">
              <a
                href="https://wa.me/919845403290?text=Namaste%20Shubham%20Karoti%20Maitreyi%20Gurukula,%20I%20would%20like%20to%20enquire%20about%20admissions%20for%20my%20daughter."
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-quick-btn"
              >
                <MessageCircle size={20} />
                <div className="wa-text-block">
                  <strong>Chat on WhatsApp</strong>
                  <span>Quick response on +91 9845403290</span>
                </div>
              </a>

              <a
                href="mailto:shubhamkarotimaitreyigurukula@gmail.com"
                className="email-quick-btn"
              >
                <Mail size={20} />
                <div className="email-text-block">
                  <strong>Send Official Email</strong>
                  <span>shubhamkarotimaitreyigurukula@gmail.com</span>
                </div>
              </a>
            </div>

            {/* Administrative Office & Visiting Hours */}
            <div className="contact-card-sub info-sub-card">
              <div className="info-sub-item">
                <Building size={18} className="info-sub-icon" />
                <div>
                  <strong>Administrative Office:</strong>
                  <p>No. 37, 1st Main, Ramachandra Puram, Bengaluru 560 021, Karnataka</p>
                </div>
              </div>
              <div className="info-sub-item">
                <Clock size={18} className="info-sub-icon" />
                <div>
                  <strong>Visiting Hours:</strong>
                  <p>Monday – Saturday: 9:00 AM – 5:00 PM (Prior appointment recommended)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Admission / Enquiry Form */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <div className="form-card-badge">
                <Sparkles size={14} />
                <span>ONLINE ADMISSION ENQUIRY</span>
              </div>
              <h3>Send an Enquiry to the Acharyas</h3>
              <p className="form-card-desc">
                Fill in your details below. Our admissions team will review your enquiry
                and reach out to you with information regarding admission tests, eligibility, and campus visits.
              </p>

              {submitted ? (
                <div className="form-success-banner" role="status">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4>Dhanyavadah! Enquiry Submitted Successfully.</h4>
                  <p>
                    Your enquiry has been securely registered in the Gurukula admissions registry.
                    Our administration team will contact you shortly on the provided phone number.
                  </p>
                  <button
                    type="button"
                    className="submit-another-btn"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="maitreyi-enquiry-form">
                  {error && (
                    <div className="form-error-banner" role="alert">
                      {error}
                    </div>
                  )}

                  <div className="form-row-2">
                    <div className="form-field-group">
                      <label htmlFor="parentName">
                        Parent / Guardian Name <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        value={form.parentName}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Sharma"
                        required
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="applicantName">Student (Daughter&apos;s) Name</label>
                      <input
                        type="text"
                        id="applicantName"
                        name="applicantName"
                        value={form.applicantName}
                        onChange={handleChange}
                        placeholder="e.g. Ananya Sharma"
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-field-group">
                      <label htmlFor="parentPhone">
                        Contact Phone Number <span className="req">*</span>
                      </label>
                      <input
                        type="tel"
                        id="parentPhone"
                        name="parentPhone"
                        value={form.parentPhone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        required
                      />
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="parentEmail">Email Address (Optional)</label>
                      <input
                        type="email"
                        id="parentEmail"
                        name="parentEmail"
                        value={form.parentEmail}
                        onChange={handleChange}
                        placeholder="e.g. parent@example.com"
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-field-group">
                      <label htmlFor="targetGrade">Applying for Grade</label>
                      <select
                        id="targetGrade"
                        name="targetGrade"
                        value={form.targetGrade}
                        onChange={handleChange}
                      >
                        <option value="Class 5">Class 5 (Standard Entry Age ~10 yrs 10 mos)</option>
                        <option value="Class 6">Class 6</option>
                        <option value="Class 7">Class 7</option>
                        <option value="Class 8">Class 8</option>
                      </select>
                    </div>

                    <div className="form-field-group">
                      <label htmlFor="enquiryType">Enquiry Type</label>
                      <select
                        id="enquiryType"
                        name="enquiryType"
                        value={form.enquiryType}
                        onChange={handleChange}
                      >
                        <option value="Admission Enquiry">Admission Enquiry</option>
                        <option value="Campus Visit Request">Campus Visit Request</option>
                        <option value="Sponsorship & Donation">Support / Donation</option>
                        <option value="General Question">General Information</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label htmlFor="notes">Questions or Remarks</label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Please mention your hometown, district, or any specific questions you have about Gurukula life, curriculum, or admission..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="enquiry-submit-button"
                    disabled={submitting}
                  >
                    <span>{submitting ? "Submitting to Registry..." : "Submit Admission Enquiry"}</span>
                    <Send size={16} />
                  </button>

                  <p className="form-privacy-note">
                    🔒 Your contact details are kept strictly confidential and used solely for communication from Maitreyi Gurukula.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Google Maps Embed Section */}
        <div className="contact-map-wrapper">
          <div className="map-header">
            <div className="map-header-left">
              <MapPin size={20} className="map-pin-icon" />
              <div>
                <h4>Interactive Google Maps Location</h4>
                <p>Visit us at Ramohalli, near the monumental Big Banyan Tree in Bengaluru</p>
              </div>
            </div>
            <div className="map-header-actions">
              {onOpenDirections && (
                <button
                  type="button"
                  className="open-directions-modal-btn"
                  onClick={onOpenDirections}
                >
                  <Navigation size={16} />
                  <span>Directions Popup</span>
                </button>
              )}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Shubham+Karoti+Gurukula+Ramohalli+Bengaluru"
                target="_blank"
                rel="noopener noreferrer"
                className="open-maps-link"
              >
                Open in Maps App ↗
              </a>
            </div>
          </div>

          <div className="map-frame-box">
            <iframe
              title="Shubham Karoti Maitreyi Gurukula Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.016386997602!2d77.42642911430382!3d12.906667719793104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae38f96b4a72b7%3A0xe52a35b7bcd34570!2sShubham+Karoti+Gurukula!5e0!3m2!1sen!2sin!4v1540203970102"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
