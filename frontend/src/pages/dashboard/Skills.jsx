import { useEffect, useState } from "react";
import { getSkills, createSkill, getChildren } from "../../services/api";
import "./Skills.css";

function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [skills, setSkills] = useState([]);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [skillsRes, childrenRes] = await Promise.all([
        getSkills().catch(() => ({ data: [] })),
        getChildren().catch(() => ({ data: [] })),
      ]);
      setSkills(skillsRes.data || []);
      setChildren(childrenRes.data || []);
    } catch (err) {
      setError(err.message || "Unable to load skills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    Promise.all([
      getSkills().catch(() => ({ data: [] })),
      getChildren().catch(() => ({ data: [] })),
    ])
      .then(([skillsRes, childrenRes]) => {
        if (isMounted) {
          setSkills(skillsRes.data || []);
          setChildren(childrenRes.data || []);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err.message || "Unable to load skills.");
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
    "Arts",
    "Sports",
    "Academic",
    "Cultural",
    "Leadership",
    "Other",
  ];

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter(
          (item) => item.category === activeCategory
        );

  const handleAddSkill = async (event) => {
    event.preventDefault();

    const form = event.target;
    const childId = form.child.value;
    const skillName = form.skill.value.trim();
    const category = form.category.value;
    const developmentLevel = form.level.value;
    const interestLevel = form.interest.value;
    const remarks = form.description.value.trim();

    if (!childId) {
      alert("Please select a child.");
      return;
    }

    try {
      setSaving(true);
      await createSkill({
        child: childId,
        skillName,
        category,
        developmentLevel,
        interestLevel,
        remarks,
      });

      setShowForm(false);
      form.reset();
      await loadData();
    } catch (err) {
      alert(err.message || "Unable to save skill.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="skills-page">
      {/* HEADER */}
      <div className="skills-header">
        <div>
          <p className="skills-eyebrow">
            HOLISTIC DEVELOPMENT
          </p>
          <h1>Skills & Talents</h1>
          <p className="skills-description">
            Discover and preserve the interests, talents,
            hobbies and special abilities that make every
            child's journey unique.
          </p>
        </div>
        <button
          className="skills-add-button"
          onClick={() => setShowForm(true)}
        >
          + Add Skill
        </button>
      </div>
{/* INTRODUCTION */}
      <section className="skills-intro">
        <div className="skills-intro-number">
          01
        </div>
        <div>
          <span>BEYOND THE CLASSROOM</span>
          <h2>
            A child's strengths are
            more than marks.
          </h2>
          <p>
            Skills & Talents gives teachers and mentors
            a place to notice what a child enjoys,
            what she is naturally drawn towards and
            where her abilities are developing.
          </p>
        </div>
      </section>
{/* FILTER */}
      <div className="skills-filter-bar">
        <span>EXPLORE BY AREA</span>
        <div>
          {categories.map((category) => (
            <button
              key={category}
              className={
                activeCategory === category
                  ? "skill-filter active"
                  : "skill-filter"
              }
              onClick={() =>
                setActiveCategory(category)
              }
            >
              {category}
            </button>
          ))}
        </div>
      </div>
{/* COUNT */}
      <div className="skills-heading">
        <div>
          <span>
            {activeCategory === "All"
              ? "RECORDED DEVELOPMENT"
              : activeCategory.toUpperCase()}
          </span>
          <h2>
            {filteredSkills.length}{" "}
            {filteredSkills.length === 1
              ? "skill"
              : "skills"}{" "}
            recorded.
          </h2>
        </div>
        <p>
          Skills can develop gradually, so the record
          should grow with the child.
        </p>
      </div>
{/* SKILL CARDS */}

      {error ? (
        <div className="skills-empty" style={{ borderColor: "rgba(220, 53, 69, 0.3)" }}>
          <p style={{ color: "#c0392b" }}>{error}</p>
        </div>
      ) : loading ? (
        <div className="skills-empty">
          <p>Loading skills...</p>
        </div>
      ) : filteredSkills.length > 0 ? (
        <div className="skills-grid">
          {filteredSkills.map((item, index) => {
            const childName =
              item.child?.fullName ||
              item.child?.name ||
              (item.child && typeof item.child === "object"
                ? [item.child.firstName, item.child.lastName].filter(Boolean).join(" ")
                : "") ||
              (typeof item.child === "string" ? item.child : "") ||
              "Gurukula Child";
            const skillName = item.skillName || item.skill;
            const level = item.developmentLevel || item.level;
            const interest = item.interestLevel || item.interest;
            const description = item.remarks || item.description || "";

            return (
              <article
                className="skill-card"
                key={item._id || item.id || index}
              >
                <div className="skill-card-top">
                  <span className="skill-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="skill-category">
                    {item.category}
                  </span>
                </div>
                <div className="skill-icon">
                  ◇
                </div>
                <span className="skill-child">
                  {childName}
                </span>
                <h3>{skillName}</h3>
                <p>
                  {description}
                </p>
                <div className="skill-card-bottom">
                  <div>
                    <span>DEVELOPMENT</span>
                    <strong>{level}</strong>
                  </div>
                  <div>
                    <span>INTEREST</span>
                    <strong>{interest}</strong>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="skills-empty">
          <div>◇</div>
          <h2>No skills recorded yet.</h2>
          <p>
            Add a skill, interest or special ability
            to begin building the child's development story.
          </p>
          <button
            onClick={() => setShowForm(true)}
          >
            Add the first skill →
          </button>
        </div>
      )}

{/* DEVELOPMENT AREAS */}
      <section className="skills-areas">
        <div className="skills-areas-heading">
          <span>DEVELOPMENT AREAS</span>
          <h2>
            Look beyond
            <br />
            one dimension.
          </h2>
        </div>
        <div className="skills-area-list">
          <div>
            <span>01</span>
            <strong>Creative Expression</strong>
            <p>
              Arts, dance, music, storytelling and
              other forms of creative expression.
            </p>
          </div>
          <div>
            <span>02</span>
            <strong>Physical Ability</strong>
            <p>
              Sports, physical activities and
              developing physical abilities.
            </p>
          </div>
          <div>
            <span>03</span>
            <strong>Cultural Learning</strong>
            <p>
              Sanskrit, traditional knowledge,
              cultural learning and participation.
            </p>
          </div>
          <div>
            <span>04</span>
            <strong>Leadership</strong>
            <p>
              Initiative, responsibility, participation
              and emerging leadership qualities.
            </p>
          </div>
        </div>
      </section>
{/* ADD FORM */}

      {showForm && (
        <div className="skills-overlay">
          <div className="skills-form-panel">
            <button
              className="skills-close"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>
            <span className="skills-form-label">
              CHILD DEVELOPMENT
            </span>
            <h2>Record a skill.</h2>
            <p className="skills-form-intro">
              Capture something the child enjoys,
              practises or is developing.
            </p>
            <form
              className="skills-form"
              onSubmit={handleAddSkill}
            >
              <div className="skills-field">
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
              <div className="skills-field">
                <label>Skill / Talent / Interest</label>
                <input
                  name="skill"
                  type="text"
                  placeholder="Example: Bharatanatyam"
                  required
                />
              </div>
              <div className="skills-form-row">
                <div className="skills-field">
                  <label>Category</label>
                  <select name="category" required>
                    <option value="">Select category</option>
                    <option value="Arts">Arts</option>
                    <option value="Sports">Sports</option>
                    <option value="Academic">Academic</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="skills-field">
                  <label>Development Level</label>
                  <select name="level" required>
                    <option value="">Select level</option>
                    <option value="Exploring">Exploring</option>
                    <option value="Developing">Developing</option>
                    <option value="Strong">Strong</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div className="skills-field">
                <label>Interest Level</label>
                <select name="interest" required defaultValue="Moderate">
                  <option value="">Select interest level</option>
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="skills-field">
                <label>Observation / Remarks</label>
                <textarea
                  name="description"
                  rows="4"
                  placeholder="What have you noticed about this skill or interest?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="skills-submit"
                disabled={saving}
              >
                {saving ? "Saving..." : "Record Skill"}
                <span>→</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Skills;