import { useState } from "react";
import "./Achievements.css";

function Achievements() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const [achievements, setAchievements] = useState([
    {
      id: 1,
      child: "Ananya",
      title: "Sanskrit Recitation",
      category: "Cultural",
      level: "Gurukula",
      date: "05 Sep 2026",
      description:
        "Participated in the Gurukula Sanskrit recitation activity.",
    },
    {
      id: 2,
      child: "Shreya",
      title: "Classical Dance Performance",
      category: "Arts",
      level: "Inter-school",
      date: "18 Aug 2026",
      description:
        "Participated in a classical dance performance representing the Gurukula.",
    },
    {
      id: 3,
      child: "Kavya",
      title: "Athletics Participation",
      category: "Sports",
      level: "District",
      date: "12 Jul 2026",
      description:
        "Participated in a district-level athletics event.",
    },
  ]);

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

  const handleAddAchievement = (event) => {
    event.preventDefault();

    const form = event.target;

    const newAchievement = {
      id: Date.now(),
      child: form.child.value,
      title: form.title.value,
      category: form.category.value,
      level: form.level.value,
      date: form.date.value
        ? new Date(form.date.value).toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          )
        : "Date not recorded",
      description: form.description.value,
    };

    setAchievements((current) => [
      newAchievement,
      ...current,
    ]);

    setShowForm(false);
    form.reset();
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

      {filteredAchievements.length > 0 ? (

        <div className="achievement-wall">

          {filteredAchievements.map((achievement, index) => (

            <button
              className="achievement-card"
              key={achievement.id}
              onClick={() =>
                setSelectedAchievement(achievement)
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
                  {achievement.level}
                </span>

                <h3>{achievement.title}</h3>

                <p>
                  {achievement.child}
                </p>

              </div>

              <div className="achievement-card-bottom">

                <span>
                  {achievement.date}
                </span>

                <strong>→</strong>

              </div>

            </button>

          ))}

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
                <label>Child's Name</label>

                <input
                  name="child"
                  type="text"
                  placeholder="Enter child's name"
                  required
                />
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

                  <select
                    name="category"
                    required
                  >
                    <option value="">
                      Select category
                    </option>

                    <option>Academic</option>
                    <option>Sports</option>
                    <option>Arts</option>
                    <option>Leadership</option>
                    <option>Cultural</option>
                    <option>Other</option>
                  </select>

                </div>


                <div className="achievement-form-field">

                  <label>Level / Context</label>

                  <input
                    name="level"
                    type="text"
                    placeholder="School, District, State..."
                  />

                </div>

              </div>


              <div className="achievement-form-field">

                <label>Date</label>

                <input
                  name="date"
                  type="date"
                />

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
              >
                Record Achievement
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
              onClick={() =>
                setSelectedAchievement(null)
              }
            >
              ×
            </button>

            <span className="achievement-form-label">
              ACHIEVEMENT
            </span>

            <div className="achievement-detail-symbol">
              ✦
            </div>

            <h2>
              {selectedAchievement.title}
            </h2>

            <p className="achievement-detail-child">
              {selectedAchievement.child}
            </p>

            <div className="achievement-detail-grid">

              <div>
                <span>CATEGORY</span>
                <strong>
                  {selectedAchievement.category}
                </strong>
              </div>

              <div>
                <span>LEVEL</span>
                <strong>
                  {selectedAchievement.level || "—"}
                </strong>
              </div>

              <div>
                <span>DATE</span>
                <strong>
                  {selectedAchievement.date}
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