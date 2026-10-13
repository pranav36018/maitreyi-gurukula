
import { useEffect, useState } from "react";

import {
  getMentors,
  createMentor,
  updateMentor,
  deleteMentor,
} from "../../services/api";
import "./Mentors.css";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  expertise: "",
  responsibilities: "",
  status: "Active",
  notes: "",
};

export default function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadMentors = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await getMentors();
      setMentors(result.data || []);
    } catch (err) {
      setError(err.message || "Unable to load mentors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    getMentors()
      .then((result) => {
        if (isMounted) {
          setMentors(result.data || []);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Unable to load mentors.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const change = (e) =>
    setForm((old) => ({ ...old, [e.target.name]: e.target.value }));

  const reset = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const edit = (mentor) => {
    setEditingId(mentor._id);
    setForm({
      name: mentor.name || "",
      phone: mentor.phone || "",
      email: mentor.email || "",
      expertise: mentor.expertise || "",
      responsibilities: mentor.responsibilities || "",
      status: mentor.status || "Active",
      notes: mentor.notes || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert("Please enter the mentor's name.");
      return;
    }

    try {
      setSaving(true);
      if (editingId) {
        await updateMentor(editingId, form);
      } else {
        await createMentor(form);
      }
      reset();
      await loadMentors();
    } catch (err) {
      alert(err.message || "Unable to save mentor.");
    } finally {
      setSaving(false);
    }
  };

  const deactivate = async (mentor) => {
    if (
      !window.confirm(
        `Deactivate ${mentor.name}? Their existing child records will be kept.`
      )
    ) return;

    try {
      await deleteMentor(mentor._id);
      await loadMentors();
    } catch (err) {
      alert(err.message || "Unable to deactivate mentor.");
    }
  };

  return (
    <main className="mentors-page">
      <div className="mentors-header">
        <span className="mentors-eyebrow">GURUKULA MENTORS</span>
        <h1>Mentors</h1>
        <p>Manage Gurukula mentors and their areas of guidance and responsibility.</p>
      </div>

      <form onSubmit={submit} className="mentor-form-card">
        <h2>{editingId ? "Edit Mentor" : "Add New Mentor"}</h2>
        
        <div className="mentor-form-grid">
          <div className="mentor-form-field">
            <label htmlFor="mentor-name">Full name *</label>
            <input
              id="mentor-name"
              name="name"
              value={form.name}
              onChange={change}
              required
              placeholder="Mentor's full name"
            />
          </div>

          <div className="mentor-form-field">
            <label htmlFor="mentor-phone">Phone number</label>
            <input
              id="mentor-phone"
              name="phone"
              value={form.phone}
              onChange={change}
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="mentor-form-field">
            <label htmlFor="mentor-email">Email address</label>
            <input
              id="mentor-email"
              name="email"
              type="email"
              value={form.email}
              onChange={change}
              placeholder="mentor@gurukula.org"
            />
          </div>

          <div className="mentor-form-field">
            <label htmlFor="mentor-expertise">Areas of Expertise</label>
            <input
              id="mentor-expertise"
              name="expertise"
              value={form.expertise}
              onChange={change}
              placeholder="e.g. Sanskrit, Mathematics, Music, Yoga"
            />
          </div>

          <div className="mentor-form-field">
            <label htmlFor="mentor-responsibilities">Responsibilities</label>
            <input
              id="mentor-responsibilities"
              name="responsibilities"
              value={form.responsibilities}
              onChange={change}
              placeholder="e.g. Senior Shishya Guidance, Library"
            />
          </div>

          <div className="mentor-form-field">
            <label htmlFor="mentor-status">Status</label>
            <select
              id="mentor-status"
              name="status"
              value={form.status}
              onChange={change}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="mentor-form-field full-width">
            <label htmlFor="mentor-notes">Notes / Background</label>
            <textarea
              id="mentor-notes"
              name="notes"
              value={form.notes}
              onChange={change}
              rows={3}
              placeholder="Additional background, guidance focus, or notes"
            />
          </div>

          <div className="mentor-form-actions">
            <button
              className="mentor-btn-primary"
              disabled={saving}
              type="submit"
            >
              {saving ? "Saving..." : editingId ? "Update Mentor" : "Save Mentor"}
            </button>
            {editingId && (
              <button
                className="mentor-btn-secondary"
                type="button"
                onClick={reset}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>
      </form>

      {error && <p className="mentors-empty" role="alert" style={{ borderColor: "#fad2cf", color: "#c5221f" }}>{error}</p>}

      {loading ? (
        <div className="mentors-empty">Loading mentors from database...</div>
      ) : (
        <>
          <div className="mentors-section-title">
            <h2>Mentor Directory</h2>
            <span>{mentors.length} {mentors.length === 1 ? "Mentor" : "Mentors"}</span>
          </div>

          {mentors.length === 0 ? (
            <div className="mentors-empty">
              No mentors added yet. Add your first mentor using the form above.
            </div>
          ) : (
            <div className="mentors-grid">
              {mentors.map((mentor) => (
                <article key={mentor._id} className="mentor-card">
                  <div>
                    <div className="mentor-card-top">
                      <h3>{mentor.name}</h3>
                      <span className={`mentor-badge ${mentor.status === "Active" ? "active" : "inactive"}`}>
                        {mentor.status}
                      </span>
                    </div>

                    <div className="mentor-info-list">
                      {mentor.phone && (
                        <div className="mentor-info-item">
                          <strong>Phone:</strong>
                          <span>{mentor.phone}</span>
                        </div>
                      )}
                      {mentor.email && (
                        <div className="mentor-info-item">
                          <strong>Email:</strong>
                          <span>{mentor.email}</span>
                        </div>
                      )}
                      {mentor.expertise && (
                        <div className="mentor-info-item">
                          <strong>Expertise:</strong>
                          <span>{mentor.expertise}</span>
                        </div>
                      )}
                      {mentor.responsibilities && (
                        <div className="mentor-info-item">
                          <strong>Duties:</strong>
                          <span>{mentor.responsibilities}</span>
                        </div>
                      )}
                      {mentor.notes && (
                        <div className="mentor-info-item">
                          <strong>Notes:</strong>
                          <span>{mentor.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mentor-card-actions">
                    <button
                      className="mentor-btn-edit"
                      type="button"
                      onClick={() => edit(mentor)}
                    >
                      Edit Mentor
                    </button>
                    {mentor.status === "Active" && (
                      <button
                        className="mentor-btn-deactivate"
                        type="button"
                        onClick={() => deactivate(mentor)}
                      >
                        Deactivate
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
