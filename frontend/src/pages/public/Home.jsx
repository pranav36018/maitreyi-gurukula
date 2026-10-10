function Home({ onLogin }) {
  return (
    <div className="maitreyi-home">

      {/* ================= NAVIGATION ================= */}

      <nav className="maitreyi-nav">

        <div className="maitreyi-brand">

          <div className="maitreyi-brand-mark">
            M
          </div>

          <div>
            <strong>
              Maitreyi
            </strong>

            <span>
              Gurukula
            </span>
          </div>

        </div>


        <div className="maitreyi-nav-links">

          <a href="#story">
            Our Story
          </a>

          <a href="#philosophy">
            Philosophy
          </a>

          <a href="#unique">
            What Makes Us Different
          </a>

          <a href="#journey">
            Child Journey
          </a>

        </div>


        <button
          className="maitreyi-nav-login"
          onClick={onLogin}
        >
          Login
        </button>

      </nav>


      {/* ================= HERO ================= */}

      <section className="maitreyi-hero">

        <div className="maitreyi-hero-content">

          <div className="maitreyi-hero-label">
            SHUBHAM KAROTI MAITREYI GURUKULA
          </div>


          <h1>
            Education that
            <br />
            <span>shapes a life.</span>
          </h1>


          <p className="maitreyi-hero-description">
            A Gurukula where education goes beyond
            classrooms — nurturing knowledge, values,
            culture, skills and character in every girl.
          </p>


          <div className="maitreyi-hero-actions">

            <a
              href="#story"
              className="maitreyi-button-primary"
            >
              Discover our story
              <span>↗</span>
            </a>

            <a
              href="#journey"
              className="maitreyi-button-text"
            >
              Explore the child journey
              <span>→</span>
            </a>

          </div>

        </div>


        <div className="maitreyi-hero-art">

          <div className="hero-art-circle hero-art-circle-one"></div>

          <div className="hero-art-circle hero-art-circle-two"></div>

          <div className="hero-art-card">

            <span>
              MAITREYI
            </span>

            <strong>
              30+
            </strong>

            <p>
              Years of nurturing
              <br />
              knowledge & values
            </p>

          </div>

          <div className="hero-art-line"></div>

        </div>


        <div className="maitreyi-hero-bottom">

          <span>
            BENGALURU
          </span>

          <span>
            EST. 30+ YEARS
          </span>

          <span>
            A JOURNEY OF VALUES
          </span>

        </div>

      </section>


      {/* ================= INTRO ================= */}

      <section className="maitreyi-intro">

        <div className="maitreyi-section-label">
          THE IDEA
        </div>

        <div className="maitreyi-intro-grid">

          <h2>
            Education is not
            <br />
            only about what
            <em> she learns.</em>
          </h2>

          <div>

            <p>
              It is also about who she becomes.
            </p>

            <p>
              Maitreyi Gurukula was created with a
              vision of giving girls an education rooted
              in self-respect, cultural pride, strong
              values and confidence.
            </p>

          </div>

        </div>

      </section>


      {/* ================= STORY ================= */}

      <section
        className="maitreyi-story"
        id="story"
      >

        <div className="maitreyi-story-heading">

          <div className="maitreyi-section-label">
            OUR STORY
          </div>

          <h2>
            A question that
            <br />
            became a vision.
          </h2>

        </div>


        <div className="maitreyi-story-content">

          <div className="story-number">
            01
          </div>

          <div>

            <h3>
              How it began
            </h3>

            <p>
              About 30 years ago, businessman Pramod
              Kamath and his father Ramdas Kamath travelled
              to England. At the airport, they were stopped
              and questioned in a way that made them feel
              their identity and ability were being doubted.
            </p>

            <p>
              The experience stayed with the family.
              Back in India, they already ran a large
              factory with more than 3,000 workers.
              But the experience inspired a deeper question:
              how could children grow up with self-respect,
              confidence and pride in who they are?
            </p>

          </div>

        </div>


        <div className="maitreyi-story-content">

          <div className="story-number">
            02
          </div>

          <div>

            <h3>
              A school with a purpose
            </h3>

            <p>
              In Bengaluru, the family decided to build
              a school specifically for girls, believing
              that educating women creates a lasting impact
              on families and society.
            </p>

            <p>
              With the blessings of the holy seers of
              Pejavara Matha, Shubham Karoti Maitreyi
              Gurukula began its journey in Ramohalli,
              near Kengeri's Big Banyan Tree.
            </p>

          </div>

        </div>


        <div className="maitreyi-story-highlight">

          <span>
            THE VISION
          </span>

          <h3>
            To give every girl the
            confidence to know who
            she is and what she can become.
          </h3>

        </div>

      </section>


      {/* ================= PHILOSOPHY ================= */}

      <section
        className="maitreyi-philosophy"
        id="philosophy"
      >

        <div className="maitreyi-philosophy-heading">

          <div className="maitreyi-section-label">
            OUR PHILOSOPHY
          </div>

          <h2>
            More than
            <br />
            a classroom.
          </h2>

        </div>


        <div className="maitreyi-philosophy-list">

          <div className="philosophy-row">

            <span>
              01
            </span>

            <h3>
              Knowledge
            </h3>

            <p>
              Learning that prepares a girl for
              education, understanding and life.
            </p>

          </div>


          <div className="philosophy-row">

            <span>
              02
            </span>

            <h3>
              Values
            </h3>

            <p>
              A strong foundation of character,
              self-respect and cultural understanding.
            </p>

          </div>


          <div className="philosophy-row">

            <span>
              03
            </span>

            <h3>
              Community
            </h3>

            <p>
              Learning to participate, take responsibility,
              serve and grow with others.
            </p>

          </div>

        </div>

      </section>


      {/* ================= UNIQUE ================= */}

      <section
        className="maitreyi-unique"
        id="unique"
      >

        <div className="maitreyi-unique-heading">

          <div className="maitreyi-section-label">
            WHAT MAKES US DIFFERENT
          </div>

          <h2>
            An education
            <br />
            with roots.
          </h2>

          <p>
            The Gurukula combines formal education with
            cultural learning, Sanskrit, traditional arts
            and skills.
          </p>

        </div>


        <div className="maitreyi-unique-grid">

          <article>

            <span>
              01
            </span>

            <h3>
              100% Free of Cost
            </h3>

            <p>
              Girls can study through 12th grade
              with food, stay, clothes, books and
              classes provided free of cost.
            </p>

          </article>


          <article>

            <span>
              02
            </span>

            <h3>
              Three Final Exams
            </h3>

            <p>
              Students complete final examinations
              through the State Board, Sanskrit
              University board and Gurukula's own exams.
            </p>

          </article>


          <article>

            <span>
              03
            </span>

            <h3>
              Living Sanskrit
            </h3>

            <p>
              Sanskrit is part of everyday life
              on campus, not simply a subject
              studied for examinations.
            </p>

          </article>


          <article>

            <span>
              04
            </span>

            <h3>
              Ancient Arts & Skills
            </h3>

            <p>
              Students are introduced to traditional
              arts and skills including Bharatanatyam,
              Harikatha and Vedic astrology.
            </p>

          </article>

        </div>

      </section>


      {/* ================= JOURNEY ================= */}

      <section
        className="maitreyi-journey"
        id="journey"
      >

        <div className="maitreyi-journey-heading">

          <div className="maitreyi-section-label">
            THE CHILD JOURNEY
          </div>

          <h2>
            Every child has
            <br />
            a story worth keeping.
          </h2>

          <p>
            The Student Journey Tracking System preserves
            the child's growth from admission through the
            Gurukula years and beyond.
          </p>

        </div>


        <div className="maitreyi-journey-list">

          <div>
            <span>01</span>
            <strong>Admission</strong>
            <p>
              Where her Gurukula journey begins.
            </p>
          </div>

          <div>
            <span>02</span>
            <strong>Learning</strong>
            <p>
              Academic progress across her years.
            </p>
          </div>

          <div>
            <span>03</span>
            <strong>Skills & Talents</strong>
            <p>
              Interests, abilities and special skills.
            </p>
          </div>

          <div>
            <span>04</span>
            <strong>Responsibilities</strong>
            <p>
              Participation and responsibilities held.
            </p>
          </div>

          <div>
            <span>05</span>
            <strong>Achievements</strong>
            <p>
              Competitions, performances and milestones.
            </p>
          </div>

          <div>
            <span>06</span>
            <strong>Wellbeing</strong>
            <p>
              Observations, support and development.
            </p>
          </div>

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}

      <section className="maitreyi-final">

        <div className="maitreyi-final-mark">
          M
        </div>

        <div className="maitreyi-section-label">
          SHUBHAM KAROTI MAITREYI GURUKULA
        </div>

        <h2>
          A journey of
          <br />
          <em>values.</em>
        </h2>

        <p>
          A journey of growth.
        </p>

        <a
          href="#story"
          className="maitreyi-final-button"
        >
          Explore the story
          <span>↗</span>
        </a>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="maitreyi-footer">

        <div>

          <strong>
            Maitreyi Gurukula
          </strong>

          <p>
            A journey of values.
            A journey of growth.
          </p>

        </div>


        <div className="maitreyi-footer-links">

          <a href="#story">
            Our Story
          </a>

          <a href="#philosophy">
            Philosophy
          </a>

          <a href="#unique">
            What Makes Us Different
          </a>

          <a href="#journey">
            Child Journey
          </a>

        </div>


        <div className="maitreyi-footer-bottom">

          © 2026 Maitreyi Gurukula

        </div>

      </footer>

    </div>
  );
}

export default Home;