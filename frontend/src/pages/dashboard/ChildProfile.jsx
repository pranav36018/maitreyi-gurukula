import { useEffect, useState } from "react";

import "./ChildProfile.css";
import FamilySection from "./FamilySection";
import DocumentSection from "./DocumentSection";
import { getMentors, updateChild } from "../../services/api";

import {
  getAcademicsByChild,

  createAcademic,

  getSkillsByChild,

  createSkill,

  getAchievementsByChild,

  createAchievement,

  getObservationsByChild,

  createObservation,

  getWellbeingByChild,

  createWellbeing,

  getResponsibilitiesByChild,

  createResponsibility,
} from "../../services/api";

function ChildProfile({ child, onBack }) {
    const [mentors, setMentors] = useState([]);
  const [selectedMentorId, setSelectedMentorId] = useState(
    child?.mentorId?._id || child?.mentorId || ""
  );
  const [assignedMentorName, setAssignedMentorName] = useState(
    child?.mentor || child?.mentorId?.name || ""
  );
  const [mentorSaving, setMentorSaving] = useState(false);
  const [mentorMessage, setMentorMessage] = useState("");
  const [currentStatus, setCurrentStatus] = useState(child?.status || "Active");
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    try {
      setStatusUpdating(true);
      setStatusMessage("");
      await updateChild(child._id, { status: newStatus });
      setCurrentStatus(newStatus);
      setStatusMessage(`Journey status updated to ${newStatus}.`);
    } catch (error) {
      console.error("Unable to update journey status:", error);
      setStatusMessage(error.message || "Unable to update status.");
    } finally {
      setStatusUpdating(false);
    }
  };

  const [activeTab, setActiveTab] =

    useState("Overview");

const [showObservation, setShowObservation] =

    useState(false);

useEffect(() => {
    const loadMentors = async () => {
      try {
        const response = await getMentors();
        const list = Array.isArray(response) ? response : response?.data || [];
        setMentors(list.filter((item) => item.status === "Active"));
      } catch (error) {
        console.error("Unable to load mentors:", error);
        setMentorMessage("Unable to load mentors. Please try again.");
      }
    };

    loadMentors();
  }, []);

  const handleMentorSave = async (event) => {
    event.preventDefault();

    const selectedMentor = mentors.find(
      (item) => item._id === selectedMentorId
    );

    if (selectedMentorId && !selectedMentor) {
      setMentorMessage("Please select a valid active mentor.");
      return;
    }

    try {
      setMentorSaving(true);
      setMentorMessage("");

      const mentorName = selectedMentor?.name || "";

      await updateChild(child._id, {
        mentorId: selectedMentorId || null,
        mentor: mentorName,
      });

      setAssignedMentorName(mentorName);
      setMentorMessage(
        mentorName
          ? `Mentor assigned successfully: ${mentorName}`
          : "Mentor assignment removed successfully."
      );
    } catch (error) {
      console.error("Unable to save mentor:", error);
      setMentorMessage(
        error.message || "Unable to save mentor assignment."
      );
    } finally {
      setMentorSaving(false);
    }
  };

// =====================================

  // ACADEMIC STATE

  // =====================================

const [academics, setAcademics] =

    useState([]);

const [academicLoading, setAcademicLoading] =

    useState(false);

const [academicError, setAcademicError] =

    useState("");

const [showAcademicForm, setShowAcademicForm] =

    useState(false);

const [academicForm, setAcademicForm] =

    useState({
      academicYear: "",

      subject: "",

      performance: "",

      remarks: "",
    });

// =====================================

  // SKILL STATE

  // =====================================

const [skills, setSkills] =

    useState([]);

const [skillLoading, setSkillLoading] =

    useState(false);

const [skillError, setSkillError] =

    useState("");

const [showSkillForm, setShowSkillForm] =

    useState(false);

const [skillForm, setSkillForm] =

    useState({
      skillName: "",

      category: "",

      developmentLevel: "",

      interestLevel: "Moderate",

      remarks: "",
    });

// =====================================

// ACHIEVEMENT STATE

// =====================================

const [achievements, setAchievements] =

  useState([]);

const [

  achievementLoading,

  setAchievementLoading,

] = useState(false);

const [

  achievementError,

  setAchievementError,

] = useState("");

const [

  showAchievementForm,

  setShowAchievementForm,

] = useState(false);

const [

  achievementForm,

  setAchievementForm,

] = useState({
  title: "",

  category: "",

  achievementDate: "",

  level: "Gurukula",

  description: "",
});

// =====================================

// OBSERVATION STATE

// =====================================

const [observations, setObservations] =

  useState([]);

const [

  observationLoading,

  setObservationLoading,

] = useState(false);

const [

  observationError,

  setObservationError,

] = useState("");

const [

  observationForm,

  setObservationForm,

] = useState({
  category: "General",

  tags: "",

  note: "",

  followUpRequired: false,

  followUpDate: "",
});

const [wellbeing, setWellbeing] = useState([]);

const [wellbeingForm, setWellbeingForm] = useState({
  area: "General Wellbeing",

  status: "Doing Well",

  observation: "",

  supportProvided: "",

  followUpRequired: false,

  followUpDate: "",
});

const [responsibilities, setResponsibilities] = useState([]);

  const [responsibilityLoading, setResponsibilityLoading] = useState(false);

  const [responsibilityError, setResponsibilityError] = useState("");

  const [responsibilityForm, setResponsibilityForm] = useState({
    title: "",
    category: "Classroom",
    description: "",
    startDate: "",
    endDate: "",
    status: "Active",
    remarks: "",
  });

  // =====================================

  // TABS

  // =====================================

const tabs = [

    "Overview",

    "Journey",

    "Academics",

    "Skills",

    "Responsibilities",

    "Achievements",

    "Wellbeing",

    "Observations",

    "Family",

    "Documents",

  ];

// =====================================

  // CHILD INFORMATION

  // =====================================

const fullName = [

    child?.firstName,

    child?.middleName,

    child?.lastName,

  ]

    .filter(Boolean)

    .join(" ");

const childName =

    fullName || "Unnamed Child";

const grade = child?.grade

    ? `Grade ${child.grade}`

    : "Grade not available";

const admissionYear =

    child?.admissionYear ||

    (child?.admissionDate

      ? new Date(
          child.admissionDate
        ).getFullYear()

      : "Not available");

const mentor =
    assignedMentorName || child?.mentorId?.name || child?.mentor || "Not assigned";

const status =
    currentStatus || child?.status || "Active";

const dateOfBirth =

    child?.dateOfBirth

      ? new Date(
          child.dateOfBirth
        ).toLocaleDateString(
          "en-IN",

          {
            day: "2-digit",

            month: "short",

            year: "numeric",
          }
        )

      : "Not available";

const phone =

    child?.phone || "Not available";

const email =

    child?.email || "Not available";

const address =

    child?.address || "Not available";

// =====================================

  // LOAD ACADEMICS

  // =====================================

useEffect(() => {
    const loadAcademics = async () => {
      if (!child?._id) return;

try {
        setAcademicLoading(true);

        setAcademicError("");

const response =

          await getAcademicsByChild(
            child._id
          );

setAcademics(
          response.data || []
        );
      } catch (error) {
        console.error(error);

setAcademicError(
          error.message ||

            "Unable to load academic records."
        );
      } finally {
        setAcademicLoading(false);
      }
    };

loadAcademics();
  }, [child?._id]);

// =====================================

  // LOAD SKILLS

  // =====================================

useEffect(() => {
    const loadSkills = async () => {
      if (!child?._id) return;

try {
        setSkillLoading(true);

        setSkillError("");

const response =

          await getSkillsByChild(
            child._id
          );

setSkills(
          response.data || []
        );
      } catch (error) {
        console.error(error);

setSkillError(
          error.message ||

            "Unable to load skills."
        );
      } finally {
        setSkillLoading(false);
      }
    };

loadSkills();
  }, [child?._id]);

// =====================================

// LOAD ACHIEVEMENTS

// =====================================

useEffect(() => {
  const loadAchievements = async () => {
    if (!child?._id) return;

try {
      setAchievementLoading(true);

      setAchievementError("");

const response =

        await getAchievementsByChild(
          child._id
        );

setAchievements(
        response.data || []
      );
    } catch (error) {
      console.error(error);

setAchievementError(
        error.message ||

          "Unable to load achievements."
      );
    } finally {
      setAchievementLoading(false);
    }
  };

loadAchievements();
}, [child?._id]);

// =====================================

// LOAD OBSERVATIONS

// =====================================

useEffect(() => {
  const loadObservations = async () => {
    if (!child?._id) return;

try {
      setObservationLoading(true);

      setObservationError("");

const response =

        await getObservationsByChild(
          child._id
        );

setObservations(
        response.data || []
      );
    } catch (error) {
      console.error(error);

setObservationError(
        error.message ||

          "Unable to load observations."
      );
    } finally {
      setObservationLoading(false);
    }
  };

loadObservations();
}, [child?._id]);

useEffect(() => {
  if (!child?._id) return;

const loadWellbeing = async () => {
    try {
      const response = await getWellbeingByChild(child._id);

      setWellbeing(response.data || []);
    } catch (error) {
      console.error("Unable to load wellbeing:", error);
    }
  };

loadWellbeing();
}, [child?._id]);

// =====================================
  // LOAD RESPONSIBILITIES
  // =====================================

  useEffect(() => {
    const loadResponsibilities = async () => {
      if (!child?._id) return;
      try {
        setResponsibilityLoading(true);
        setResponsibilityError("");
        const response = await getResponsibilitiesByChild(child._id);
        setResponsibilities(response.data || []);
      } catch (error) {
        console.error(error);
        setResponsibilityError(error.message || "Unable to load responsibilities.");
      } finally {
        setResponsibilityLoading(false);
      }
    };
    loadResponsibilities();
  }, [child?._id]);

  // =====================================
  // SAVE RESPONSIBILITY
  // =====================================

  const handleResponsibilitySubmit = async (event) => {
    event.preventDefault();
    if (!responsibilityForm.title.trim() || !responsibilityForm.description.trim()) {
      setResponsibilityError("Responsibility title and description are required.");
      return;
    }
    try {
      setResponsibilityError("");
      await createResponsibility({
        child: child._id,
        ...responsibilityForm,
        startDate: responsibilityForm.startDate || undefined,
        endDate: responsibilityForm.endDate || undefined,
      });
      const response = await getResponsibilitiesByChild(child._id);
      setResponsibilities(response.data || []);
      setResponsibilityForm({ title: "", category: "Classroom", description: "", startDate: "", endDate: "", status: "Active", remarks: "" });
    } catch (error) {
      console.error(error);
      setResponsibilityError(error.message || "Unable to save responsibility.");
    }
  };

  // =====================================

  // SAVE ACADEMIC RECORD

  // =====================================

const handleAcademicSubmit = async (
    event
  ) => {
    event.preventDefault();

if (
      !academicForm.academicYear ||

      !academicForm.subject ||

      !academicForm.performance
    ) {
      setAcademicError(
        "Academic year, subject and performance are required."
      );

return;
    }

try {
      setAcademicError("");

await createAcademic({
        child: child._id,

        academicYear:

          academicForm.academicYear,

        subject:

          academicForm.subject,

        performance:

          academicForm.performance,

        remarks:

          academicForm.remarks,
      });

const response =

        await getAcademicsByChild(
          child._id
        );

setAcademics(
        response.data || []
      );

setAcademicForm({
        academicYear: "",

        subject: "",

        performance: "",

        remarks: "",
      });

setShowAcademicForm(false);
    } catch (error) {
      console.error(error);

setAcademicError(
        error.message ||

          "Unable to save academic record."
      );
    }
  };

// =====================================

  // SAVE SKILL

  // =====================================

const handleSkillSubmit = async (
    event
  ) => {
    event.preventDefault();

if (
      !skillForm.skillName ||

      !skillForm.category ||

      !skillForm.developmentLevel
    ) {
      setSkillError(
        "Skill name, category and development level are required."
      );

return;
    }

try {
      setSkillError("");

await createSkill({
        child: child._id,

        skillName:

          skillForm.skillName,

        category:

          skillForm.category,

        developmentLevel:

          skillForm.developmentLevel,

        interestLevel:

          skillForm.interestLevel,

        remarks:

          skillForm.remarks,
      });

const response =

        await getSkillsByChild(
          child._id
        );

setSkills(
        response.data || []
      );

setSkillForm({
        skillName: "",

        category: "",

        developmentLevel: "",

        interestLevel: "Moderate",

        remarks: "",
      });

setShowSkillForm(false);
    } catch (error) {
      console.error(error);

setSkillError(
        error.message ||

          "Unable to save skill."
      );
    }
  };

// =====================================

// SAVE ACHIEVEMENT

// =====================================

const handleAchievementSubmit = async (
  event
) => {
  event.preventDefault();

if (
    !achievementForm.title ||

    !achievementForm.category
  ) {
    setAchievementError(
      "Achievement title and category are required."
    );

return;
  }

try {
    setAchievementError("");

await createAchievement({
      child: child._id,

      title: achievementForm.title,

      category:

        achievementForm.category,

      achievementDate:

        achievementForm.achievementDate ||

        undefined,

      level:

        achievementForm.level,

      description:

        achievementForm.description,
    });

const response =

      await getAchievementsByChild(
        child._id
      );

setAchievements(
      response.data || []
    );

setAchievementForm({
      title: "",

      category: "",

      achievementDate: "",

      level: "Gurukula",

      description: "",
    });

setShowAchievementForm(false);
  } catch (error) {
    console.error(error);

setAchievementError(
      error.message ||

        "Unable to save achievement."
    );
  }
};

// =====================================

// SAVE OBSERVATION

// =====================================

const handleObservationSubmit = async (
  event
) => {
  event.preventDefault();

if (!observationForm.note.trim()) {
    setObservationError(
      "Please enter an observation."
    );

return;
  }

try {
    setObservationError("");

const tags = observationForm.tags

      .split(",")

      .map((tag) => tag.trim())

      .filter(Boolean);

await createObservation({
      child: child._id,

category:

        observationForm.category,

tags,

note:

        observationForm.note,

followUpRequired:

        observationForm.followUpRequired,

followUpDate:

        observationForm.followUpDate ||

        undefined,

observer: "Gurukula Mentor",
    });

const response =

      await getObservationsByChild(
        child._id
      );

setObservations(
      response.data || []
    );

setObservationForm({
      category: "General",

      tags: "",

      note: "",

      followUpRequired: false,

      followUpDate: "",
    });

setShowObservation(false);
  } catch (error) {
    console.error(error);

setObservationError(
      error.message ||

        "Unable to save observation."
    );
  }
};

const handleWellbeingSubmit = async (event) => {
  event.preventDefault();

if (!wellbeingForm.observation.trim()) {
    alert("Please enter an observation.");

    return;
  }

try {
    await createWellbeing({
      child: child._id,

      ...wellbeingForm,

      followUpDate:

        wellbeingForm.followUpDate || undefined,
    });

const response = await getWellbeingByChild(child._id);

setWellbeing(response.data || []);

setWellbeingForm({
      area: "General Wellbeing",

      status: "Doing Well",

      observation: "",

      supportProvided: "",

      followUpRequired: false,

      followUpDate: "",
    });
  } catch (error) {
    alert(error.message || "Unable to save wellbeing record");
  }
};

  // =====================================

  // TAB CONTENT

  // =====================================

const renderContent = () => {
    // ===================================

    // OVERVIEW

    // ===================================

if (activeTab === "Overview") {
      return (
        <>
          <div className="profile-overview-grid">
            <section className="profile-card profile-about">
              <span className="profile-card-label">
                ABOUT THE CHILD
              </span>
<h2>{childName}</h2>
<p>
                This child profile brings

                together learning, skills,

                responsibilities,

                achievements, wellbeing

                and the child's Gurukula

                journey.
              </p>
<div className="profile-detail-grid">
                <div>
                  <span>GRADE</span>
                  <strong>{grade}</strong>
                </div>
<div>
                  <span>JOURNEY</span>
                  <strong>{status}</strong>
                </div>
<div>
                  <span>ADMISSION</span>
                  <strong>
                    {admissionYear}
                  </strong>
                </div>
<div>
                  <span>MENTOR</span>
                  <strong>
                    {mentor}
                  </strong>
                </div>
              </div>
            </section>
<section className="profile-card">
              <span className="profile-card-label">
                CHILD INFORMATION
              </span>
<div className="profile-detail-grid">
                <div>
                  <span>
                    DATE OF BIRTH
                  </span>
<strong>
                    {dateOfBirth}
                  </strong>
                </div>
<div>
                  <span>
                    ADMISSION NUMBER
                  </span>
<strong>
                    {child?.admissionNumber ||

                      "Not available"}
                  </strong>
                </div>
<div>
                  <span>PHONE</span>
<strong>
                    {phone}
                  </strong>
                </div>
<div>
                  <span>EMAIL</span>
<strong>
                    {email}
                  </strong>
                </div>
                <div>
                  <span>ADDRESS</span>
                  <strong>
                    {address}
                  </strong>
                </div>
              </div>
            </section>
          </div>
<section className="profile-card" style={{ marginBottom: "24px" }}>
            <span className="profile-card-label">MENTOR ASSIGNMENT</span>
            <h3>Assign a mentor to {childName}</h3>
            <p>
              Current mentor: <strong>{mentor}</strong>
            </p>
            <form onSubmit={handleMentorSave}>
              <label htmlFor="child-mentor-select">Select Mentor</label>
              <select
                id="child-mentor-select"
                value={selectedMentorId}
                onChange={(event) => {
                  setSelectedMentorId(event.target.value);
                  setMentorMessage("");
                }}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px",
                  margin: "10px 0 16px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Not assigned</option>
                {mentors.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}{item.expertise ? ` — ${item.expertise}` : ""}
                  </option>
                ))}
              </select>
              {mentorMessage && (
                <p role="status" style={{ marginBottom: "12px" }}>
                  {mentorMessage}
                </p>
              )}
              <button
                type="submit"
                className="profile-primary-button"
                disabled={mentorSaving}
              >
                {mentorSaving ? "Saving..." : "Save Mentor Assignment"}
              </button>
            </form>
          </section>
          <section className="profile-card" style={{ marginBottom: "24px" }}>
            <span className="profile-card-label">JOURNEY STATUS &amp; ALUMNI PROGRESSION</span>
            <h3>Manage Student Journey State</h3>
            <p>
              Current status: <strong>{status}</strong>
            </p>
            <div style={{ marginTop: "12px" }}>
              <label htmlFor="child-status-select" style={{ display: "block", marginBottom: "6px", fontWeight: "600", fontSize: "14px" }}>
                Update Journey / Alumni Status
              </label>
              <select
                id="child-status-select"
                value={status}
                onChange={handleStatusChange}
                disabled={statusUpdating}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "12px",
                  margin: "6px 0 12px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "14.5px",
                }}
              >
                <option value="Active">Active (Currently Studying)</option>
                <option value="Alumni">Alumni (Graduated &amp; Maintaining Interaction)</option>
                <option value="Completed">Completed (Graduated Gurukula)</option>
                <option value="Inactive">Inactive</option>
              </select>
              {statusMessage && (
                <p role="status" style={{ color: "#047857", fontWeight: "600", margin: "6px 0 0" }}>
                  {statusMessage}
                </p>
              )}
            </div>
          </section>
          <div className="profile-card">
            <span className="profile-card-label">
              JOURNEY AT A GLANCE
            </span>
<div className="profile-milestones">
              <div>
                <strong>
                  {admissionYear}
                </strong>
<p>
                  Joined Gurukula
                </p>
              </div>
<div>
                <strong>
                  Current
                </strong>
<p>
                  Continuing Gurukula

                  journey
                </p>
              </div>
<div>
                <strong>
                  {status}
                </strong>
<p>
                  Current journey

                  status
                </p>
              </div>
            </div>
          </div>
<div className="profile-section-heading">
            <div>
              <span>
                HOLISTIC DEVELOPMENT
              </span>
<h2>
                Growing in many

                directions.
              </h2>
            </div>
          </div>
<div className="profile-growth-grid">
            <div>
              <span>01</span>
<strong>
                Academics
              </strong>
<p>
                Learning and subject

                progress.
              </p>
            </div>
<div>
              <span>02</span>
<strong>
                Skills
              </strong>
<p>
                Talents, interests

                and abilities.
              </p>
            </div>
<div>
              <span>03</span>
<strong>
                Achievements
              </strong>
<p>
                Participation and

                accomplishments.
              </p>
            </div>
<div>
              <span>04</span>
<strong>
                Wellbeing
              </strong>
<p>
                Health and general

                wellbeing.
              </p>
            </div>
          </div>
        </>
      );
    }

// ===================================

    // JOURNEY

    // ===================================

if (activeTab === "Journey") {
  const journeyEvents = [];

  if (child?.admissionDate || child?.admissionYear) {
    journeyEvents.push({
      id: "admission",
      date: child.admissionDate || `${child.admissionYear}-01-01`,
      title: "Gurukula Admission",
      description: child.admissionDate
        ? `Admission recorded on ${new Date(
            child.admissionDate
          ).toLocaleDateString("en-IN")}.`
        : `Admission year recorded as ${child.admissionYear}.`,
    });
  }

  academics.forEach((item) => {
    journeyEvents.push({
      id: `academic-${item._id}`,
      date: item.createdAt || item.updatedAt || item.academicYear,
      title: `Academic Progress${item.subject ? ` — ${item.subject}` : ""}`,
      description: [
        item.performance,
        item.remarks,
      ].filter(Boolean).join(" · ") || "Academic record added.",
    });
  });

  skills.forEach((item) => {
    journeyEvents.push({
      id: `skill-${item._id}`,
      date: item.createdAt || item.updatedAt,
      title: `Skill Developed — ${item.skillName || "Skill"}`,
      description: [
        item.category,
        item.developmentLevel,
        item.remarks,
      ].filter(Boolean).join(" · "),
    });
  });

  achievements.forEach((item) => {
    journeyEvents.push({
      id: `achievement-${item._id}`,
      date: item.achievementDate || item.createdAt || item.updatedAt,
      title: item.title || "Achievement",
      description: [
        item.category,
        item.level,
        item.description,
      ].filter(Boolean).join(" · "),
    });
  });

  observations.forEach((item) => {
    journeyEvents.push({
      id: `observation-${item._id}`,
      date: item.observedAt || item.createdAt || item.updatedAt,
      title: item.category
        ? `Mentor Observation — ${item.category}`
        : "Mentor Observation",
      description: item.note || item.observation || "Observation recorded.",
    });
  });

  wellbeing.forEach((item) => {
    journeyEvents.push({
      id: `wellbeing-${item._id}`,
      date: item.observedAt || item.createdAt || item.updatedAt,
      title: `Wellbeing — ${item.area || "General"}`,
      description: [
        item.status,
        item.observation,
        item.supportProvided,
      ].filter(Boolean).join(" · "),
    });
  });

  const datedEvents = journeyEvents
    .filter((event) => event.date && !Number.isNaN(new Date(event.date).getTime()))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <section className="profile-content-card">
      <span>THE JOURNEY</span>
      <h2>{childName}'s Gurukula Journey</h2>
      <p>
        A timeline of admission, learning, skills, achievements,
        observations and wellbeing records saved for this child.
      </p>
      <div className="timeline">
        {datedEvents.length === 0 ? (
          <div className="profile-empty">
            <h3>No journey milestones recorded yet</h3>
            <p>
              When admission details or child journey records are
              saved, they will appear here in date order.
            </p>
          </div>
        ) : (
          datedEvents.map((event) => (
            <div key={event.id}>
              <strong>
                {new Date(event.date).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </strong>
              <article>
                <h3>{event.title}</h3>
                <p>{event.description || "Record saved."}</p>
              </article>
            </div>
          ))
        )}
      </div>
      <div style={{ marginTop: "24px" }}>
        <span>CURRENT JOURNEY STATUS</span>
        <h3>{status}</h3>
        <p>
          {grade} · Mentor: {mentor}
        </p>
      </div>
    </section>
  );
}

// ===================================

    // ACADEMICS

    // ===================================

if (activeTab === "Academics") {
      return (
        <section className="profile-content-card">
          <div className="profile-content-heading">
            <div>
              <span>
                ACADEMIC PROGRESS
              </span>
<h2>
                Learning journey
              </h2>
<p>
                Subject-wise academic

                progress for{" "}

                {childName}.
              </p>
            </div>
<button

              className="profile-primary-button"

              onClick={() =>
                setShowAcademicForm(
                  true
                )
              }

            >
              + Add Academic Record
            </button>
          </div>
{academicError && (
            <p

              style={{
                marginTop: "16px",

                color: "#9b3d2e",
              }}

            >
              {academicError}
            </p>
          )}

{academicLoading ? (
            <div className="academic-list">
              <div className="academic-row">
                <div>
                  <strong>
                    Loading academic

                    records...
                  </strong>
<p>
                    Please wait.
                  </p>
                </div>
              </div>
            </div>
          ) : academics.length ===

            0 ? (
            <div className="academic-list">
              <div className="academic-row">
                <div>
                  <strong>
                    No academic

                    records yet
                  </strong>
<p>
                    Add the first

                    academic record

                    for{" "}

                    {childName}.
                  </p>
                </div>
<span>
                  EMPTY
                </span>
              </div>
            </div>
          ) : (
            <div className="academic-list">
              {academics.map(
                (academic) => (
                  <div

                    className="academic-row"

                    key={
                      academic._id
                    }

                  >
                    <div>
                      <strong>
                        {
                          academic.subject
                        }
                      </strong>
<p>
                        {
                          academic.academicYear
                        }

{academic.remarks

                          ? ` • ${academic.remarks}`

                          : ""}
                      </p>
                    </div>
<span>
                      {
                        academic.performance
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          )}

{showAcademicForm && (
            <div className="observation-overlay">
              <div className="observation-modal">
                <button

                  className="observation-close"

                  onClick={() =>
                    setShowAcademicForm(
                      false
                    )
                  }

                >
                  ×
                </button>
<span>
                  ACADEMIC RECORD
                </span>
<h2>
                  Add academic

                  progress
                </h2>
<p>
                  Add subject-wise

                  academic

                  information for{" "}

                  {childName}.
                </p>
<form

                  onSubmit={
                    handleAcademicSubmit
                  }

                >
                  <label>
                    Academic Year
                  </label>
<input

                    type="text"

                    placeholder="e.g. 2026-27"

                    value={
                      academicForm.academicYear
                    }

                    onChange={(event) =>
                      setAcademicForm({
                        ...academicForm,

                        academicYear:

                          event.target

                            .value,
                      })
                    }

                  />
<label>
                    Subject
                  </label>
<input

                    type="text"

                    placeholder="e.g. Mathematics"

                    value={
                      academicForm.subject
                    }

                    onChange={(event) =>
                      setAcademicForm({
                        ...academicForm,

                        subject:

                          event.target

                            .value,
                      })
                    }

                  />
<label>
                    Performance
                  </label>
<select

                    value={
                      academicForm.performance
                    }

                    onChange={(event) =>
                      setAcademicForm({
                        ...academicForm,

                        performance:

                          event.target

                            .value,
                      })
                    }

                  >
                    <option value="">
                      Select

                      performance
                    </option>
<option value="Excellent">
                      Excellent
                    </option>
<option value="Strong">
                      Strong
                    </option>
<option value="Developing">
                      Developing
                    </option>
<option value="Needs Support">
                      Needs Support
                    </option>
                  </select>
<label>
                    Remarks
                  </label>
<textarea

                    rows="4"

                    placeholder="Short note about the child's progress..."

                    value={
                      academicForm.remarks
                    }

                    onChange={(event) =>
                      setAcademicForm({
                        ...academicForm,

                        remarks:

                          event.target

                            .value,
                      })
                    }

                  />
<button

                    type="submit"

                    className="profile-primary-button full"

                  >
                    Save Academic

                    Record
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>
      );
    }

// ===================================

    // SKILLS

    // ===================================

if (activeTab === "Skills") {
      return (
        <section className="profile-content-card">
          <div className="profile-content-heading">
            <div>
              <span>
                SKILLS & TALENTS
              </span>
<h2>
                Areas of development
              </h2>
<p>
                Skills, talents,

                interests and

                special abilities

                of {childName}.
              </p>
            </div>
<button

              className="profile-primary-button"

              onClick={() =>
                setShowSkillForm(
                  true
                )
              }

            >
              + Add Skill
            </button>
          </div>
{skillError && (
            <p

              style={{
                marginTop: "16px",

                color: "#9b3d2e",
              }}

            >
              {skillError}
            </p>
          )}

{skillLoading ? (
            <div className="profile-item-grid">
              <article>
                <h3>
                  Loading skills...
                </h3>
<p>
                  Please wait.
                </p>
              </article>
            </div>
          ) : skills.length ===

            0 ? (
            <div className="profile-item-grid">
              <article>
                <span>
                  NO RECORDS
                </span>
<h3>
                  No skills added

                  yet
                </h3>
<p>
                  Add the first

                  skill or talent

                  for {childName}.
                </p>
              </article>
            </div>
          ) : (
            <div className="profile-item-grid">
              {skills.map(
                (skill) => (
                  <article

                    key={
                      skill._id
                    }

                  >
                    <span>
                      {
                        skill.category
                      }
                    </span>
<h3>
                      {
                        skill.skillName
                      }
                    </h3>
<p>
                      Development:{" "}
                      <strong>
                        {
                          skill.developmentLevel
                        }
                      </strong>
                    </p>
<small>
                      Interest:{" "}

                      {
                        skill.interestLevel
                      }
                    </small>
{skill.remarks && (
                      <p>
                        {
                          skill.remarks
                        }
                      </p>
                    )}
                  </article>
                )
              )}
            </div>
          )}

{showSkillForm && (
            <div className="observation-overlay">
              <div className="observation-modal">
                <button

                  className="observation-close"

                  onClick={() =>
                    setShowSkillForm(
                      false
                    )
                  }

                >
                  ×
                </button>
<span>
                  SKILL & TALENT
                </span>
<h2>
                  Add a skill
                </h2>
<p>
                  Record a skill,

                  talent or area

                  of interest for{" "}

                  {childName}.
                </p>
<form

                  onSubmit={
                    handleSkillSubmit
                  }

                >
                  <label>
                    Skill / Talent
                  </label>
<input

                    type="text"

                    placeholder="e.g. Bharatanatyam"

                    value={
                      skillForm.skillName
                    }

                    onChange={(event) =>
                      setSkillForm({
                        ...skillForm,

                        skillName:

                          event.target

                            .value,
                      })
                    }

                  />
<label>
                    Category
                  </label>
<select

                    value={
                      skillForm.category
                    }

                    onChange={(event) =>
                      setSkillForm({
                        ...skillForm,

                        category:

                          event.target

                            .value,
                      })
                    }

                  >
                    <option value="">
                      Select

                      category
                    </option>
<option value="Arts">
                      Arts
                    </option>
<option value="Cultural">
                      Cultural
                    </option>
<option value="Sports">
                      Sports
                    </option>
<option value="Leadership">
                      Leadership
                    </option>
<option value="Academic">
                      Academic
                    </option>
<option value="Communication">
                      Communication
                    </option>
<option value="Other">
                      Other
                    </option>
                  </select>
<label>
                    Development

                    Level
                  </label>
<select

                    value={
                      skillForm.developmentLevel
                    }

                    onChange={(event) =>
                      setSkillForm({
                        ...skillForm,

                        developmentLevel:

                          event.target

                            .value,
                      })
                    }

                  >
                    <option value="">
                      Select

                      development

                      level
                    </option>
<option value="Exploring">
                      Exploring
                    </option>
<option value="Developing">
                      Developing
                    </option>
<option value="Strong">
                      Strong
                    </option>
<option value="Advanced">
                      Advanced
                    </option>
                  </select>
<label>
                    Interest Level
                  </label>
<select

                    value={
                      skillForm.interestLevel
                    }

                    onChange={(event) =>
                      setSkillForm({
                        ...skillForm,

                        interestLevel:

                          event.target

                            .value,
                      })
                    }

                  >
                    <option value="Low">
                      Low
                    </option>
<option value="Moderate">
                      Moderate
                    </option>
<option value="High">
                      High
                    </option>
                  </select>
<label>
                    Remarks
                  </label>
<textarea

                    rows="4"

                    placeholder="Short note..."

                    value={
                      skillForm.remarks
                    }

                    onChange={(event) =>
                      setSkillForm({
                        ...skillForm,

                        remarks:

                          event.target

                            .value,
                      })
                    }

                  />
<button

                    type="submit"

                    className="profile-primary-button full"

                  >
                    Save Skill
                  </button>
                </form>
              </div>
            </div>
          )}
        </section>
      );
    }

// ===================================

    // RESPONSIBILITIES

    // ===================================

    if (activeTab === "Responsibilities") {
      return (
        <section className="profile-content-card">
          <div className="profile-content-heading">
            <div>
              <span>RESPONSIBILITIES & LEADERSHIP</span>
              <h2>Leadership journey</h2>
              <p>Record responsibilities, participation, leadership roles, and seva contributions throughout {childName}'s Gurukula journey.</p>
            </div>
          </div>
          {responsibilityError && <p style={{ marginTop: "16px", color: "#9b3d2e" }}>{responsibilityError}</p>}
          <form className="journey-form" onSubmit={handleResponsibilitySubmit}>
            <div className="journey-form-grid">
              <label>
                Responsibility / Role
                <input type="text" placeholder="e.g. Class Leader, Prayer Coordinator" value={responsibilityForm.title} onChange={(event) => setResponsibilityForm({ ...responsibilityForm, title: event.target.value })} />
              </label>
              <label>
                Category
                <select value={responsibilityForm.category} onChange={(event) => setResponsibilityForm({ ...responsibilityForm, category: event.target.value })}>
                  <option value="Classroom">Classroom</option>
                  <option value="Gurukula">Gurukula</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Seva">Seva</option>
                  <option value="Cultural">Cultural</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </div>
            <label>
              Description
              <textarea rows="4" placeholder="Describe the responsibility and participation..." value={responsibilityForm.description} onChange={(event) => setResponsibilityForm({ ...responsibilityForm, description: event.target.value })} />
            </label>
            <div className="journey-form-grid">
              <label>Start Date<input type="date" value={responsibilityForm.startDate} onChange={(event) => setResponsibilityForm({ ...responsibilityForm, startDate: event.target.value })} /></label>
              <label>End Date<input type="date" value={responsibilityForm.endDate} onChange={(event) => setResponsibilityForm({ ...responsibilityForm, endDate: event.target.value })} /></label>
            </div>
            <div className="journey-form-grid">
              <label>
                Status
                <select value={responsibilityForm.status} onChange={(event) => setResponsibilityForm({ ...responsibilityForm, status: event.target.value })}>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>
              <label>Remarks<input type="text" placeholder="Optional note" value={responsibilityForm.remarks} onChange={(event) => setResponsibilityForm({ ...responsibilityForm, remarks: event.target.value })} /></label>
            </div>
            <button type="submit" className="profile-primary-button full">Save Responsibility</button>
          </form>
          <div className="profile-item-grid">
            {responsibilityLoading ? (
              <article><h3>Loading responsibilities...</h3><p>Please wait.</p></article>
            ) : responsibilities.length === 0 ? (
              <article><span>NO RECORDS</span><h3>No responsibilities recorded yet</h3><p>Add the first responsibility for {childName}.</p></article>
            ) : (
              responsibilities.map((record) => (
                <article key={record._id}>
                  <span>{record.category}</span>
                  <h3>{record.title}</h3>
                  <p>{record.description}</p>
                  <small>{record.status}{record.startDate ? ` • From ${new Date(record.startDate).toLocaleDateString("en-IN")}` : ""}{record.endDate ? ` • To ${new Date(record.endDate).toLocaleDateString("en-IN")}` : ""}</small>
                  {record.remarks && <p><strong>Remarks:</strong> {record.remarks}</p>}
                </article>
              ))
            )}
          </div>
        </section>
      );
    }

    // ===================================

    // ACHIEVEMENTS

    // ===================================

if (
  activeTab ===

  "Achievements"
) {
  return (
    <section className="profile-content-card">
<div className="profile-content-heading">
        <div>
          <span>
            ACHIEVEMENT WALL
          </span>
<h2>
            Moments worth remembering
          </h2>
<p>
            Achievements and

            meaningful milestones

            in {childName}'s journey.
          </p>
        </div>
<button

          className="profile-primary-button"

          onClick={() =>
            setShowAchievementForm(true)
          }

        >
          + Add Achievement
        </button>
      </div>
{achievementError && (
        <p

          style={{
            marginTop: "16px",

            color: "#9b3d2e",
          }}

        >
          {achievementError}
        </p>
      )}

{achievementLoading ? (
        <div className="profile-item-grid">
          <article>
            <h3>
              Loading achievements...
            </h3>
<p>
              Please wait.
            </p>
          </article>
        </div>
      ) : achievements.length === 0 ? (
        <div className="profile-item-grid">
          <article>
            <span>
              NO RECORDS
            </span>
<h3>
              No achievements added yet
            </h3>
<p>
              Add an achievement or

              milestone for{" "}

              {childName}.
            </p>
          </article>
        </div>
      ) : (
        <div className="profile-item-grid">
{achievements.map(
            (achievement) => (
              <article

                key={achievement._id}

              >
                <span>
                  {achievement.category}
                </span>
<h3>
                  {achievement.title}
                </h3>
<p>
                  Level:{" "}
                  <strong>
                    {achievement.level}
                  </strong>
                </p>
{achievement.achievementDate && (
                  <small>
                    {new Date(
                      achievement.achievementDate
                    ).toLocaleDateString(
                      "en-IN",

                      {
                        day: "2-digit",

                        month: "short",

                        year: "numeric",
                      }
                    )}
                  </small>
                )}

{achievement.description && (
                  <p>
                    {
                      achievement.description
                    }
                  </p>
                )}
              </article>
            )
          )}
</div>
      )}

{showAchievementForm && (
        <div className="observation-overlay">
<div className="observation-modal">
<button

              className="observation-close"

              onClick={() =>
                setShowAchievementForm(false)
              }

            >
              ×
            </button>
<span>
              ACHIEVEMENT
            </span>
<h2>
              Add an achievement
            </h2>
<p>
              Record an achievement,

              competition, performance

              or meaningful milestone.
            </p>
<form

              onSubmit={
                handleAchievementSubmit
              }

            >
<label>
                Achievement Title
              </label>
<input

                type="text"

                placeholder="e.g. State Level Bharatanatyam Competition"

                value={
                  achievementForm.title
                }

                onChange={(event) =>
                  setAchievementForm({
                    ...achievementForm,

                    title:

                      event.target.value,
                  })
                }

              />
<label>
                Category
              </label>
<select

                value={
                  achievementForm.category
                }

                onChange={(event) =>
                  setAchievementForm({
                    ...achievementForm,

                    category:

                      event.target.value,
                  })
                }

              >
                <option value="">
                  Select category
                </option>
<option value="Academic">
                  Academic
                </option>
<option value="Sports">
                  Sports
                </option>
<option value="Arts">
                  Arts
                </option>
<option value="Leadership">
                  Leadership
                </option>
<option value="Cultural">
                  Cultural
                </option>
<option value="Other">
                  Other
                </option>
              </select>
<label>
                Achievement Date
              </label>
<input

                type="date"

                value={
                  achievementForm.achievementDate
                }

                onChange={(event) =>
                  setAchievementForm({
                    ...achievementForm,

                    achievementDate:

                      event.target.value,
                  })
                }

              />
<label>
                Level
              </label>
<select

                value={
                  achievementForm.level
                }

                onChange={(event) =>
                  setAchievementForm({
                    ...achievementForm,

                    level:

                      event.target.value,
                  })
                }

              >
                <option value="Gurukula">
                  Gurukula
                </option>
<option value="School">
                  School
                </option>
<option value="District">
                  District
                </option>
<option value="State">
                  State
                </option>
<option value="National">
                  National
                </option>
<option value="International">
                  International
                </option>
<option value="Other">
                  Other
                </option>
              </select>
<label>
                Description
              </label>
<textarea

                rows="4"

                placeholder="Short description..."

                value={
                  achievementForm.description
                }

                onChange={(event) =>
                  setAchievementForm({
                    ...achievementForm,

                    description:

                      event.target.value,
                  })
                }

              />
<button

                type="submit"

                className="profile-primary-button full"

              >
                Save Achievement
              </button>
</form>
</div>
</div>
      )}
</section>
  );
}

// ===================================

    // ===================================
    // WELLBEING
    // ===================================

    if (activeTab === "Wellbeing") {
      return (
        <section className="profile-content-card">
          <div className="profile-content-heading">
            <div>
              <span>HOLISTIC DEVELOPMENT</span>
              <h2>Health & wellbeing</h2>
              <p>
                Record physical, emotional, social, and general wellbeing
                throughout {childName}'s Gurukula journey.
              </p>
            </div>
          </div>
          <form className="journey-form" onSubmit={handleWellbeingSubmit}>
            <div className="journey-form-grid">
              <label>
                Area
                <select
                  value={wellbeingForm.area}
                  onChange={(event) =>
                    setWellbeingForm({
                      ...wellbeingForm,
                      area: event.target.value,
                    })
                  }
                >
                  <option value="Physical Health">Physical Health</option>
                  <option value="Emotional Wellbeing">Emotional Wellbeing</option>
                  <option value="Social Wellbeing">Social Wellbeing</option>
                  <option value="General Wellbeing">General Wellbeing</option>
                </select>
              </label>
              <label>
                Status
                <select
                  value={wellbeingForm.status}
                  onChange={(event) =>
                    setWellbeingForm({
                      ...wellbeingForm,
                      status: event.target.value,
                    })
                  }
                >
                  <option value="Doing Well">Doing Well</option>
                  <option value="Needs Attention">Needs Attention</option>
                  <option value="Under Support">Under Support</option>
                  <option value="Improving">Improving</option>
                </select>
              </label>
            </div>
            <label>
              Observation
              <textarea
                rows="4"
                placeholder="Write a short wellbeing observation..."
                value={wellbeingForm.observation}
                onChange={(event) =>
                  setWellbeingForm({
                    ...wellbeingForm,
                    observation: event.target.value,
                  })
                }
              />
            </label>
            <label>
              Support Provided
              <textarea
                rows="3"
                placeholder="What support was provided?"
                value={wellbeingForm.supportProvided}
                onChange={(event) =>
                  setWellbeingForm({
                    ...wellbeingForm,
                    supportProvided: event.target.value,
                  })
                }
              />
            </label>
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={wellbeingForm.followUpRequired}
                onChange={(event) =>
                  setWellbeingForm({
                    ...wellbeingForm,
                    followUpRequired: event.target.checked,
                  })
                }
              />
              Follow-up required
            </label>
            {wellbeingForm.followUpRequired && (
              <label>
                Follow-up Date
                <input
                  type="date"
                  value={wellbeingForm.followUpDate}
                  onChange={(event) =>
                    setWellbeingForm({
                      ...wellbeingForm,
                      followUpDate: event.target.value,
                    })
                  }
                />
              </label>
            )}
            <button
              type="submit"
              className="profile-primary-button full"
            >
              Save Wellbeing Record
            </button>
          </form>
          <div className="profile-item-grid">
            {wellbeing.length === 0 ? (
              <article>
                <span>NO RECORDS</span>
                <h3>No wellbeing records yet</h3>
                <p>Add the first wellbeing record for {childName}.</p>
              </article>
            ) : (
              wellbeing.map((record) => (
                <article key={record._id}>
                  <span>{record.area}</span>
                  <h3>{record.status}</h3>
                  <p>{record.observation}</p>
                  {record.supportProvided && (
                    <p>
                      <strong>Support provided:</strong>{" "}
                      {record.supportProvided}
                    </p>
                  )}

                  {record.followUpRequired && (
                    <small>
                      Follow-up required
                      {record.followUpDate
                        ? ` • ${new Date(record.followUpDate).toLocaleDateString("en-IN")}`
                        : ""}
                    </small>
                  )}
                  <small>
                    {record.observedAt
                      ? new Date(record.observedAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : ""}
                  </small>
                </article>
              ))
            )}
          </div>
        </section>
      );
    }

    // OBSERVATIONS

    // ===================================

if (
  activeTab ===

  "Observations"
) {
  return (
    <section className="profile-content-card">
<div className="profile-content-heading">
        <div>
          <span>
            MENTOR OBSERVATIONS
          </span>
<h2>
            What mentors notice
          </h2>
<p>
            Short observations that

            help capture {childName}'s

            ongoing journey.
          </p>
        </div>
<button

          className="profile-primary-button"

          onClick={() =>
            setShowObservation(true)
          }

        >
          + Quick Observation
        </button>
      </div>
{observationError && (
        <p

          style={{
            marginTop: "16px",

            color: "#9b3d2e",
          }}

        >
          {observationError}
        </p>
      )}

{observationLoading ? (
        <div className="profile-item-grid">
          <article>
            <h3>
              Loading observations...
            </h3>
<p>
              Please wait.
            </p>
          </article>
        </div>
      ) : observations.length === 0 ? (
        <div className="profile-item-grid">
          <article>
            <span>
              NO RECORDS
            </span>
<h3>
              No observations yet
            </h3>
<p>
              Add the first mentor

              observation for{" "}

              {childName}.
            </p>
          </article>
        </div>
      ) : (
        <div className="observation-list">
{observations.map(
            (observation) => (
              <article

                key={observation._id}

              >
                <div>
                  <span>
                    {observation.category}
                  </span>
<h3>
                    {observation.note}
                  </h3>
{observation.tags?.length >
                    0 && (
                    <p>
                      Tags:{" "}

                      {observation.tags.join(
                        ", "
                      )}
                    </p>
                  )}
<small>
                    {observation.observedAt

                      ? new Date(
                          observation.observedAt
                        ).toLocaleDateString(
                          "en-IN",

                          {
                            day: "2-digit",

                            month: "short",

                            year: "numeric",
                          }
                        )

                      : ""}
                  </small>
                </div>
{observation.followUpRequired && (
                  <small>
                    Follow-up required
                  </small>
                )}
              </article>
            )
          )}
</div>
      )}

{showObservation && (
        <div className="observation-overlay">
<div className="observation-modal">
<button

              className="observation-close"

              onClick={() =>
                setShowObservation(false)
              }

            >
              ×
            </button>
<span>
              QUICK OBSERVATION
            </span>
<h2>
              Add a mentor observation
            </h2>
<p>
              Capture a short observation

              as part of {childName}'s

              ongoing journey.
            </p>
<form

              onSubmit={
                handleObservationSubmit
              }

            >
<label>
                Category
              </label>
<select

                value={
                  observationForm.category
                }

                onChange={(event) =>
                  setObservationForm({
                    ...observationForm,

                    category:

                      event.target.value,
                  })
                }

              >
                <option value="Academic">
                  Academic
                </option>
<option value="Skill Development">
                  Skill Development
                </option>
<option value="Wellbeing">
                  Wellbeing
                </option>
<option value="Mentorship">
                  Mentorship
                </option>
<option value="General">
                  General
                </option>
              </select>
<label>
                Tags
              </label>
<input

                type="text"

                placeholder="e.g. confidence, participation"

                value={
                  observationForm.tags
                }

                onChange={(event) =>
                  setObservationForm({
                    ...observationForm,

                    tags:

                      event.target.value,
                  })
                }

              />
<label>
                Observation
              </label>
<textarea

                rows="5"

                placeholder="Write a short observation..."

                value={
                  observationForm.note
                }

                onChange={(event) =>
                  setObservationForm({
                    ...observationForm,

                    note:

                      event.target.value,
                  })
                }

              />
<label>
                <input

                  type="checkbox"

                  checked={
                    observationForm.followUpRequired
                  }

                  onChange={(event) =>
                    setObservationForm({
                      ...observationForm,

                      followUpRequired:

                        event.target

                          .checked,
                    })
                  }

                />
Follow-up required
              </label>
{observationForm.followUpRequired && (
                <>
                  <label>
                    Follow-up Date
                  </label>
<input

                    type="date"

                    value={
                      observationForm.followUpDate
                    }

                    onChange={(event) =>
                      setObservationForm({
                        ...observationForm,

                        followUpDate:

                          event.target

                            .value,
                      })
                    }

                  />
                </>
              )}
<button

                type="submit"

                className="profile-primary-button full"

              >
                Save Observation
              </button>
</form>
</div>
</div>
      )}
</section>
  );
}

// ===================================

    // FAMILY

    // ===================================

if (activeTab === "Family") {
  return (
    <FamilySection
      child={child}
      childName={childName}
    />
  );
}

// ===================================

    // DOCUMENTS

    // ===================================

if (activeTab === "Documents") {
  return (
    <DocumentSection
      child={child}
      childName={childName}
    />
  );
}

return null;
  };

// =====================================

  // PAGE

  // =====================================

return (
    <div className="child-profile-page">
{onBack && (
        <button

          className="child-profile-back"

          onClick={onBack}

        >
          ← Back to children
        </button>
      )}
<header className="child-profile-header">
        <div className="profile-avatar">
          {childName

            .charAt(0)

            .toUpperCase()}
        </div>
<div className="profile-header-info">
          <span>
            CHILD JOURNEY •{" "}

            {grade.toUpperCase()}
          </span>
<h1>
            {childName}
          </h1>
<p>
            Admission{" "}

            {admissionYear} • Mentor:{" "}

            {mentor}
          </p>
        </div>
<div className="profile-header-status">
          <i></i>
Journey {status}
        </div>
      </header>
<nav className="child-profile-tabs">
        {tabs.map((tab) => (
          <button

            key={tab}

            className={
              activeTab === tab

                ? "active"

                : ""
            }

            onClick={() =>
              setActiveTab(tab)
            }

          >
            {tab}
          </button>
        ))}
      </nav>
<main className="child-profile-content">
        {renderContent()}
      </main>
{showObservation && (
        <div className="observation-overlay">
          <div className="observation-modal">
            <button
              type="button"
              className="observation-close"
              onClick={() => setShowObservation(false)}
            >
              ×
            </button>
            <span>QUICK OBSERVATION</span>
            <h2>Add a mentor observation</h2>
            <p>
              Capture a short observation as part of {childName}'s ongoing journey.
            </p>
            <form onSubmit={handleObservationSubmit}>
              <label>
                Category
                <select
                  value={observationForm.category}
                  onChange={(event) =>
                    setObservationForm({ ...observationForm, category: event.target.value })
                  }
                >
                  <option value="Academic">Academic</option>
                  <option value="Skill Development">Skill Development</option>
                  <option value="Wellbeing">Wellbeing</option>
                  <option value="Mentorship">Mentorship</option>
                  <option value="General">General</option>
                </select>
              </label>
              <label>
                Tags
                <input
                  type="text"
                  placeholder="e.g. confidence, participation"
                  value={observationForm.tags}
                  onChange={(event) =>
                    setObservationForm({ ...observationForm, tags: event.target.value })
                  }
                />
              </label>
              <label>
                Observation
                <textarea
                  rows="5"
                  placeholder="Write a short observation..."
                  value={observationForm.note}
                  onChange={(event) =>
                    setObservationForm({ ...observationForm, note: event.target.value })
                  }
                />
              </label>
              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={observationForm.followUpRequired}
                  onChange={(event) =>
                    setObservationForm({ ...observationForm, followUpRequired: event.target.checked })
                  }
                />
                Follow-up required
              </label>
              {observationForm.followUpRequired && (
                <label>
                  Follow-up Date
                  <input
                    type="date"
                    value={observationForm.followUpDate}
                    onChange={(event) =>
                      setObservationForm({ ...observationForm, followUpDate: event.target.value })
                    }
                  />
                </label>
              )}

              {observationError && (
                <p style={{ marginTop: "12px", color: "#9b3d2e" }}>
                  {observationError}
                </p>
              )}
              <button type="submit" className="profile-primary-button full">
                Save Observation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChildProfile;