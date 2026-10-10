
import { useEffect, useState } from "react";

import {
  getMentors,
  createMentor,
  updateMentor,
  deleteMentor,
} from "../../services/api";


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
    loadMentors();
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
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <h1>Mentors</h1>
      <p>Manage Gurukula mentors and their areas of responsibility.</p>

      <form
        onSubmit={submit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 14,
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 12,
          marginBottom: 28,
        }}
      >
        <h2 style={{ gridColumn: "1 / -1" }}>
          {editingId ? "Edit Mentor" : "Add New Mentor"}
        </h2>

        <label>
          Full name *
          <input name="name" value={form.name} onChange={change}
            required placeholder="Mentor's name" />
        </label>

        <label>
          Phone
          <input name="phone" value={form.phone} onChange={change}
            placeholder="Phone number" />
        </label>

        <label>
          Email
          <input name="email" type="email" value={form.email}
            onChange={change} placeholder="Email address" />
        </label>

        <label>
          Expertise
          <input name="expertise" value={form.expertise} onChange={change}
            placeholder="e.g. Sanskrit, Mathematics, Arts" />
        </label>

        <label>
          Responsibilities
          <input name="responsibilities" value={form.responsibilities}
            onChange={change} placeholder="Mentor responsibilities" />
        </label>

        <label>
          Status
          <select name="status" value={form.status} onChange={change}>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </label>

        <label style={{ gridColumn: "1 / -1" }}>
          Notes
          <textarea name="notes" value={form.notes} onChange={change}
            rows={3} placeholder="Additional information" />
        </label>

        <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10 }}>
          <button disabled={saving} type="submit">
            {saving ? "Saving..." : editingId ? "Update Mentor" : "Save Mentor"}
          </button>
          {editingId && (
            <button type="button" onClick={reset}>Cancel Edit</button>
          )}
        </div>
      </form>

      {error && <p role="alert">{error}</p>}
      {loading ? <p>Loading mentors...</p> : (
        <>
          <h2>Mentor Directory ({mentors.length})</h2>
          {mentors.length === 0 && (
            <p>No mentors added yet. Add your first mentor above.</p>
          )}

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 16,
          }}>
            {mentors.map((mentor) => (
              <article key={mentor._id} style={{
                border: "1px solid #ddd",
                borderRadius: 12,
                padding: 18,
              }}>
                <h3>{mentor.name}</h3>
                <p><strong>Status:</strong> {mentor.status}</p>
                {mentor.phone && <p><strong>Phone:</strong> {mentor.phone}</p>}
                {mentor.email && <p><strong>Email:</strong> {mentor.email}</p>}
                {mentor.expertise && <p><strong>Expertise:</strong> {mentor.expertise}</p>}
                {mentor.responsibilities && (
                  <p><strong>Responsibilities:</strong> {mentor.responsibilities}</p>
                )}
                {mentor.notes && <p>{mentor.notes}</p>}

                <button type="button" onClick={() => edit(mentor)}>
                  Edit
                </button>
                {mentor.status === "Active" && (
                  <button
                    type="button"
                    onClick={() => deactivate(mentor)}
                    style={{ marginLeft: 8 }}
                  >
                    Deactivate
                  </button>
                )}
              </article>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
