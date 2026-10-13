import { useEffect, useState } from "react";
import { getAchievements, createAchievement, getChildren } from "../../services/api";
import "./Achievements.css";

function Achievements() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [achievementsRes, childrenRes] = await Promise.all([
        getAchievements().catch(() => ({ data: [] })),
        getChildren().catch(() => ({ data: [] })),
      ]);
      setAchievements(achievementsRes.data || []);
      setChildren(childrenRes.data || []);
    } catch (err) {
      setError(err.message || "Unable to load achievements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      getAchievements().catch(() => ({ data: [] })),
      getChildren().catch(() => ({ data: [] })),
    ])
      .then(([achievementsRes, childrenRes]) => {
        if (isMounted) {
          setAchievements(achievementsRes.data || []);
          setChildren(childrenRes.data || []);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message || "Unable to load achievements.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    "All",
    "Academic",
    "Sports",
    "Arts",
    "Leadership",
    "Cultural",
    "Other",
  ];

  const filteredAchievements =
    activeCategory === "All"
      ? achievements
      : achievements.filter(
          (item) => item.category === activeCategory
        );

  const handleAddAchievement = async (event) => {
    event.preventDefault();

    const form = event.target;
    const childId = form.child.value;
    const title = form.title.value.trim();
    const category = form.category.value;
    const level = form.level.value;
    const achievementDate = form.date.value || undefined;
    const description = form.description.value.trim();

    if (!childId) {
      alert("Please select a child.");
      return;
    }

    try {
      setSaving(true);
      await createAchievement({
        child: childId,
        title,
        category,
        level,
        achievementDate,
        description,
      });

      setShowForm(false);
      form.reset();
      await loadData();
    } catch (err) {
      alert(err.message || "Unable to save achievement.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="achievements-page">
      {/* HEADER */}
      <div className="achievements-header">
        <div>
          <p className="achievements-eyebrow">
            CHILD JOURNEY
          </p>
          <h1>Achievement Wall</h1>
          <p className="achievements-description">
            Preserve the moments when children participate,
            perform, compete, lead and discover what they
            are capable of.
          </p>
        </div>
        <button
          className="achievement-add-button"
          onClick={() => setShowForm(true)}
        >
          + Add Achievement
        </button>
      </div>
{/* CATEGORY FILTERS */}
      <div className="achievement-category-bar">
        <span>EXPLORE BY AREA</span>
        <div>
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "achievement-category active"
                  : "achievement-category"
              }
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
{/* ACHIEVEMENT COUNT */}
      <div className="achievement-wall-heading">
        <div>
          <span>
            {activeCategory === "All"
              ? "ALL ACHIEVEMENTS"
              : activeCategory.toUpperCase()}
          </span>
          <h2>
            {filteredAchievements.length}{" "}
            {filteredAchievements.length === 1
              ? "moment"
              : "moments"}{" "}
            recorded.
          </h2>
        </div>
        <p>
          Achievements remain part of the child's
          journey and can be viewed alongside her
          learning, skills and responsibilities.
        </p>
      </div>
{/* WALL */}

      {error ? (
        <div className="achievement-empty" style={{ borderColor: "rgba(220, 53, 69, 0.3)" }}>
          <p style={{ color: "#c0392b" }}>{error}</p>
        </div>
      ) : loading ? (
        <div className="achievement-empty">
          <p>Loading achievements...</p>
        </div>
      ) : filteredAchievements.length > 0 ? (
        <div className="achievement-wall">
          {filteredAchievements.map((achievement, index) => {
            const childName =
              achievement.child?.fullName ||
              achievement.child?.name ||
              (achievement.child && typeof achievement.child === "object"
                ? [achievement.child.firstName, achievement.child.lastName].filter(Boolean).join(" ")
                : "") ||
              (typeof achievement.child === "string" ? achievement.child : "") ||
              "Gurukula Child";

            const dateStr = achievement.achievementDate
              ? new Date(achievement.achievementDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : achievement.date || "Date not recorded";

            return (
              <button
                className="achievement-card"
                key={achievement._id || achievement.id || index}
                onClick={() =>
                  setSelectedAchievement({
                    ...achievement,
                    childName,
                    dateStr,
                  })
                }
              >
                <div className="achievement-card-top">
                  <span className="achievement-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="achievement-card-category">
                    {achievement.category}
                  </span>
                </div>
                <div className="achievement-symbol">
                  ✦
                </div>
                <div className="achievement-card-content">
                  <span>
                    {achievement.level || "Gurukula"}
                  </span>
                  <h3>{achievement.title}</h3>
                  <p>
                    {childName}
                  </p>
                </div>
                <div className="achievement-card-bottom">
                  <span>
                    {dateStr}
                  </span>
                  <strong>→</strong>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="achievement-empty">
          <div>✦</div>
          <h2>No achievements recorded yet.</h2>
          <p>
            When achievements are added, they will
            appear here as part of the child's journey.
          </p>
          <button
            onClick={() => setShowForm(true)}
          >
            Add the first achievement →
          </button>
        </div>
      )}

{/* ADD ACHIEVEMENT FORM */}

      {showForm && (
        <div className="achievement-overlay">
          <div className="achievement-form-panel">
            <button
              className="achievement-close"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>
            <span className="achievement-form-label">
              CHILD JOURNEY
            </span>
            <h2>Record an achievement.</h2>
            <p className="achievement-form-intro">
              Capture the achievement while the moment
              is still clear, so it becomes part of the
              child's long-term journey.
            </p>
            <form
              className="achievement-form"
              onSubmit={handleAddAchievement}
            >
              <div className="achievement-form-field">
                <label>Registered Child</label>
                <select name="child" required>
                  <option value="">Select registered child</option>
                  {children.map((child) => (
                    <option key={child._id} value={child._id}>
                      {child.fullName || child.name || child.firstName} (Grade {child.grade})
                    </option>
                  ))}
                </select>
              </div>
              <div className="achievement-form-field">
                <label>Achievement Title</label>
                <input
                  name="title"
                  type="text"
                  placeholder="Example: Sanskrit Recitation"
                  required
                />
              </div>
              <div className="achievement-form-row">
                <div className="achievement-form-field">
                  <label>Category</label>
                  <select name="category" required>
                    <option value="">Select category</option>
                    <option value="Academic">Academic</option>
                    <option value="Sports">Sports</option>
                    <option value="Arts">Arts</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="achievement-form-field">
                  <label>Level / Context</label>
                  <select name="level" required defaultValue="Gurukula">
                    <option value="Gurukula">Gurukula</option>
                    <option value="School">School</option>
                    <option value="District">District</option>
                    <option value="State">State</option>
                    <option value="National">National</option>
                    <option value="International">International</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="achievement-form-field">
                <label>Date</label>
                <input name="date" type="date" />
              </div>
              <div className="achievement-form-field">
                <label>Description</label>
                <textarea
                  name="description"
                  rows="4"
                  placeholder="Add a short description..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="achievement-submit"
                disabled={saving}
              >
                {saving ? "Saving..." : "Record Achievement"}
                <span>→</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* DETAIL PANEL */}
      {selectedAchievement && (
        <div className="achievement-overlay">
          <div className="achievement-detail-panel">
            <button
              className="achievement-close"
              onClick={() => setSelectedAchievement(null)}
            >
              ×
            </button>
            <span className="achievement-form-label">ACHIEVEMENT</span>
            <div className="achievement-detail-symbol">✦</div>
            <h2>{selectedAchievement.title}</h2>
            <p className="achievement-detail-child">
              {selectedAchievement.childName || selectedAchievement.child}
            </p>
            <div className="achievement-detail-grid">
              <div>
                <span>CATEGORY</span>
                <strong>{selectedAchievement.category}</strong>
              </div>
              <div>
                <span>LEVEL</span>
                <strong>{selectedAchievement.level || "—"}</strong>
              </div>
              <div>
                <span>DATE</span>
                <strong>
                  {selectedAchievement.dateStr || selectedAchievement.date}
                </strong>
              </div>
            </div>
            <div className="achievement-detail-description">
              <span>ABOUT THIS MOMENT</span>
              <p>
                {selectedAchievement.description ||
                  "No additional description recorded."}
              </p>
            </div>
            <button
              className="achievement-detail-close-button"
              onClick={() =>
                setSelectedAchievement(null)
              }
            >
              Close
            </button>
          </div>
        </div>
      )}

{/* BANNER */}
      <section className="achievement-journey-banner">
        <div>
          <span>MORE THAN A RESULT</span>
          <h2>
            Every achievement
            tells us something
            about the child.
          </h2>
        </div>
        <p>
          Competitions, performances, certifications
          and moments of participation help create a
          richer picture of each child's interests,
          confidence, abilities and growth.
        </p>
      </section>
    </div>
  );
}

export default Achievements;