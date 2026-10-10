import { useState } from "react";
import "./NewEnquiry.css";

function NewEnquiry({ onBack }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="new-enquiry-page">

      <div className="new-enquiry-header">
        <div>
          <p className="new-enquiry-eyebrow">
            ADMISSION JOURNEY
          </p>

          <h1>New Enquiry</h1>

          <p>
            Begin a child's admission journey by recording
            her basic information, family details, interview
            observations and next steps.
          </p>
        </div>

        <button
          className="new-enquiry-back"
          onClick={onBack}
        >
          ← Back to Admissions
        </button>
      </div>

      {submitted && (
        <div className="new-enquiry-success">
          <strong>Enquiry recorded for this session.</strong>
          <span>
            The form is currently frontend-only. Database
            saving will be connected when the backend is built.
          </span>
        </div>
      )}

      <form
        className="new-enquiry-form"
        onSubmit={handleSubmit}
      >

        {/* CHILD INFORMATION */}

        <section className="enquiry-section">

          <div className="enquiry-section-heading">
            <span>01</span>

            <div>
              <p>CHILD INFORMATION</p>
              <h2>About the child</h2>
            </div>
          </div>

          <div className="enquiry-grid">

            <div className="enquiry-field">
              <label>Child's Name</label>
              <input
                type="text"
                placeholder="Enter child's full name"
                required
              />
            </div>

            <div className="enquiry-field">
              <label>Date of Birth</label>
              <input type="date" />
            </div>

            <div className="enquiry-field">
              <label>Current School</label>
              <input
                type="text"
                placeholder="Enter current school"
              />
            </div>

            <div className="enquiry-field">
              <label>Current Grade</label>

              <select>
                <option value="">Select grade</option>
                <option>Grade 1</option>
                <option>Grade 2</option>
                <option>Grade 3</option>
                <option>Grade 4</option>
                <option>Grade 5</option>
                <option>Grade 6</option>
                <option>Grade 7</option>
                <option>Grade 8</option>
                <option>Grade 9</option>
                <option>Grade 10</option>
                <option>Grade 11</option>
                <option>Grade 12</option>
              </select>
            </div>

          </div>
        </section>


        {/* FAMILY INFORMATION */}

        <section className="enquiry-section">

          <div className="enquiry-section-heading">
            <span>02</span>

            <div>
              <p>FAMILY INFORMATION</p>
              <h2>Family & guardians</h2>
            </div>
          </div>

          <div className="enquiry-grid">

            <div className="enquiry-field">
              <label>Parent / Guardian Name</label>
              <input
                type="text"
                placeholder="Enter name"
              />
            </div>

            <div className="enquiry-field">
              <label>Relationship</label>

              <select>
                <option value="">Select relationship</option>
                <option>Mother</option>
                <option>Father</option>
                <option>Guardian</option>
                <option>Other</option>
              </select>
            </div>

            <div className="enquiry-field">
              <label>Phone Number</label>
              <input
                type="tel"
                placeholder="Enter phone number"
              />
            </div>

            <div className="enquiry-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email address"
              />
            </div>

            <div className="enquiry-field full-width">
              <label>Family Information</label>

              <textarea
                rows="4"
                placeholder="Add relevant family information..."
              ></textarea>
            </div>

          </div>
        </section>


        {/* ENQUIRY DETAILS */}

        <section className="enquiry-section">

          <div className="enquiry-section-heading">
            <span>03</span>

            <div>
              <p>ENQUIRY DETAILS</p>
              <h2>How the journey began</h2>
            </div>
          </div>

          <div className="enquiry-grid">

            <div className="enquiry-field">
              <label>Enquiry Date</label>
              <input type="date" />
            </div>

            <div className="enquiry-field">
              <label>Referral Source</label>

              <select>
                <option value="">Select source</option>
                <option>Family / Friend</option>
                <option>Gurukula Community</option>
                <option>Website</option>
                <option>School Visit</option>
                <option>Other</option>
              </select>
            </div>

            <div className="enquiry-field full-width">
              <label>How did the family hear about the Gurukula?</label>

              <textarea
                rows="3"
                placeholder="Add details..."
              ></textarea>
            </div>

          </div>
        </section>


        {/* INTERVIEW */}

        <section className="enquiry-section">

          <div className="enquiry-section-heading">
            <span>04</span>

            <div>
              <p>INTERVIEW & ASSESSMENT</p>
              <h2>Understanding the child</h2>
            </div>
          </div>

          <div className="enquiry-grid">

            <div className="enquiry-field">
              <label>Interview Date</label>
              <input type="date" />
            </div>

            <div className="enquiry-field">
              <label>Assessment / Activity</label>
              <input
                type="text"
                placeholder="Interview, assessment or activity"
              />
            </div>

            <div className="enquiry-field full-width">
              <label>Observations</label>

              <textarea
                rows="5"
                placeholder="Record observations about the child..."
              ></textarea>
            </div>

          </div>
        </section>


        {/* STATUS */}

        <section className="enquiry-section">

          <div className="enquiry-section-heading">
            <span>05</span>

            <div>
              <p>ADMISSION STATUS</p>
              <h2>Where is the journey now?</h2>
            </div>
          </div>

          <div className="enquiry-grid">

            <div className="enquiry-field">
              <label>Current Status</label>

              <select required>
                <option value="">
                  Select current status
                </option>

                <option>Application Received</option>
                <option>Selected for Interview</option>
                <option>Invited</option>
                <option>Selected as Student</option>
                <option>Not Interested</option>
                <option>Not Eligible</option>
                <option>Admission Not Taken</option>
                <option>To be Followed Up Later</option>
              </select>
            </div>

            <div className="enquiry-field">
              <label>Next Action</label>

              <input
                type="text"
                placeholder="What should happen next?"
              />
            </div>

            <div className="enquiry-field">
              <label>Follow-up Date</label>
              <input type="date" />
            </div>

          </div>
        </section>


        {/* ACTIONS */}

        <div className="new-enquiry-actions">

          <button
            type="button"
            className="new-enquiry-cancel"
            onClick={onBack}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="new-enquiry-submit"
          >
            Record Enquiry
            <span>→</span>
          </button>

        </div>

      </form>
    </div>
  );
}

export default NewEnquiry;