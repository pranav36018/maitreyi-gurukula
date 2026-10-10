import { useState } from "react";
import "./Skills.css";

function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);

  const [skills, setSkills] = useState([
    {
      id: 1,
      child: "Ananya",
      skill: "Sanskrit",
      category: "Cultural",
      level: "Developing",
      interest: "High",
      description:
        "Shows interest in Sanskrit learning and participation.",
    },
    {
      id: 2,
      child: "Shreya",
      skill: "Classical Dance",
      category: "Arts",
      level: "Strong",
      interest: "High",
      description:
        "Shows strong interest in classical dance and performance.",
    },
    {
      id: 3,
      child: "Kavya",
      skill: "Music",
      category: "Arts",
      level: "Developing",
      interest: "High",
      description:
        "Enjoys participating in music-related activities.",
    },
  ]);

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

  const handleAddSkill = (event) => {
    event.preventDefault();

    const form = event.target;

    const newSkill = {
      id: Date.now(),
      child: form.child.value,
      skill: form.skill.value,
      category: form.category.value,
      level: form.level.value,
      interest: form.interest.value,
      description: form.description.value,
    };

    setSkills((current) => [
      newSkill,
      ...current,
    ]);

    setShowForm(false);
    form.reset();
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

      {filteredSkills.length > 0 ? (

        <div className="skills-grid">

          {filteredSkills.map((item, index) => (

            <article
              className="skill-card"
              key={item.id}
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
                {item.child}
              </span>

              <h3>{item.skill}</h3>

              <p>
                {item.description}
              </p>

              <div className="skill-card-bottom">

                <div>
                  <span>DEVELOPMENT</span>
                  <strong>{item.level}</strong>
                </div>

                <div>
                  <span>INTEREST</span>
                  <strong>{item.interest}</strong>
                </div>

              </div>

            </article>

          ))}

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

                <label>Child's Name</label>

                <input
                  name="child"
                  type="text"
                  placeholder="Enter child's name"
                  required
                />

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

                  <select
                    name="category"
                    required
                  >
                    <option value="">
                      Select category
                    </option>

                    <option>Arts</option>
                    <option>Sports</option>
                    <option>Academic</option>
                    <option>Cultural</option>
                    <option>Leadership</option>
                    <option>Other</option>
                  </select>

                </div>


                <div className="skills-field">

                  <label>Development Level</label>

                  <select
                    name="level"
                    required
                  >
                    <option value="">
                      Select level
                    </option>

                    <option>Emerging</option>
                    <option>Developing</option>
                    <option>Strong</option>
                    <option>Advanced</option>
                  </select>

                </div>

              </div>


              <div className="skills-field">

                <label>Interest Level</label>

                <select
                  name="interest"
                  required
                >
                  <option value="">
                    Select interest level
                  </option>

                  <option>Exploring</option>
                  <option>Moderate</option>
                  <option>High</option>
                  <option>Strong</option>
                </select>

              </div>


              <div className="skills-field">

                <label>Observation</label>

                <textarea
                  name="description"
                  rows="4"
                  placeholder="What have you noticed about this skill or interest?"
                ></textarea>

              </div>


              <button
                type="submit"
                className="skills-submit"
              >
                Record Skill
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