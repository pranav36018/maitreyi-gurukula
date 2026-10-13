import { useEffect, useState } from "react";

import {
  getAdmissions,
  createAdmission,
  updateAdmission,
  deleteAdmission,
  convertAdmissionToChild,
  getMentors,
} from "../../services/api";

import "./Admissions.css";

const statuses = [
  "Application Received",
  "Selected for Interview",
  "Invited",
  "Selected as Student",
  "Not Interested",
  "Not Eligible",
  "Admission Not Taken",
  "To Be Followed Up Later",
];

const initialForm = {
  childFirstName: "",
  childMiddleName: "",
  childLastName: "",
  dateOfBirth: "",
  parentName: "",
  parentPhone: "",
  parentEmail: "",
  address: "",
  referralSource: "",
  enquiryDate: "",
  applicationDate: "",
  interviewDate: "",
  interviewNotes: "",
  assessmentNotes: "",
  observations: "",
  status: "Application Received",
  nextFollowUpDate: "",
  notes: "",
};

const Admissions = () => {
  const [admissions, setAdmissions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState(initialForm);

  const [editingId, setEditingId] = useState(null);

  const [joiningAdmission, setJoiningAdmission] = useState(null);
const [joiningGrade, setJoiningGrade] = useState("");
const [mentors, setMentors] = useState([]);
const [joiningMentorId, setJoiningMentorId] = useState("");
const [joiningDate, setJoiningDate] = useState(
  new Date().toISOString().split("T")[0]
);

  /*
    Stores the admission whose
    "Follow Up Later" action is open.
  */
  const [followUpId, setFollowUpId] = useState(null);

  /*
    Stores the date selected directly
    on the admission card.
  */
  const [followUpDate, setFollowUpDate] =
    useState("");

  const loadAdmissions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdmissions();

      setAdmissions(response.data || []);
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Unable to load admissions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    getAdmissions()
      .then((response) => {
        if (isMounted) {
          setAdmissions(response.data || []);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error(err);
          setError(err.message || "Unable to load admissions");
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

  useEffect(() => {
  const loadMentors = async () => {
    try {
      const response = await getMentors();

      const mentorList = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response)
          ? response
          : [];

      setMentors(
        mentorList.filter((mentor) => mentor.status === "Active")
      );
    } catch (err) {
      console.error("Unable to load mentors:", err);
      setMentors([]);
    }
  };

  loadMentors();
}, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const openNewForm = () => {
    setEditingId(null);

    setForm({
      ...initialForm,
      enquiryDate: new Date()
        .toISOString()
        .split("T")[0],
    });

    setShowForm(true);
  };

  const openEditForm = (admission) => {
    setEditingId(admission._id);

    setForm({
      childFirstName:
        admission.childFirstName || "",

      childMiddleName:
        admission.childMiddleName || "",

      childLastName:
        admission.childLastName || "",

      dateOfBirth:
        admission.dateOfBirth
          ? admission.dateOfBirth.split("T")[0]
          : "",

      parentName:
        admission.parentName || "",

      parentPhone:
        admission.parentPhone || "",

      parentEmail:
        admission.parentEmail || "",

      address:
        admission.address || "",

      referralSource:
        admission.referralSource || "",

      enquiryDate:
        admission.enquiryDate
          ? admission.enquiryDate.split("T")[0]
          : "",

      applicationDate:
        admission.applicationDate
          ? admission.applicationDate.split("T")[0]
          : "",

      interviewDate:
        admission.interviewDate
          ? admission.interviewDate.split("T")[0]
          : "",

      interviewNotes:
        admission.interviewNotes || "",

      assessmentNotes:
        admission.assessmentNotes || "",

      observations:
        admission.observations || "",

      status:
        admission.status ||
        "Application Received",

      nextFollowUpDate:
        admission.nextFollowUpDate
          ? admission.nextFollowUpDate.split("T")[0]
          : "",

      notes:
        admission.notes || "",
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);

    setEditingId(null);

    setForm(initialForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.childFirstName.trim() ||
      !form.parentName.trim()
    ) {
      alert(
        "Child first name and parent name are required."
      );

      return;
    }

    if (
      form.status ===
        "To Be Followed Up Later" &&
      !form.nextFollowUpDate
    ) {
      alert(
        "Please select the Next Follow-up Date."
      );

      return;
    }

    try {
      setSaving(true);

      const admissionData = {
        ...form,

        dateOfBirth:
          form.dateOfBirth || undefined,

        enquiryDate:
          form.enquiryDate || undefined,

        applicationDate:
          form.applicationDate || undefined,

        interviewDate:
          form.interviewDate || undefined,

        nextFollowUpDate:
          form.status ===
          "To Be Followed Up Later"
            ? form.nextFollowUpDate ||
              undefined
            : undefined,
      };

      if (editingId) {
        await updateAdmission(
          editingId,
          admissionData
        );
      } else {
        await createAdmission(
          admissionData
        );
      }

      closeForm();

      await loadAdmissions();
    } catch (err) {
      console.error(err);

      alert(
        err.message ||
          "Unable to save admission"
      );
    } finally {
      setSaving(false);
    }
  };

  /*
    STEP 1:
    User clicks "Follow Up Later".

    We DO NOT open the edit page.

    Instead, we immediately open the
    follow-up date area on that card.
  */
  const startFollowUp = (admission) => {
    setFollowUpId(admission._id);

    setFollowUpDate(
      admission.nextFollowUpDate
        ? admission.nextFollowUpDate.split(
            "T"
          )[0]
        : ""
    );
  };

  /*
    STEP 2:
    Save the follow-up directly from
    the admission card.
  */
  const saveFollowUp = async (admission) => {
    if (!followUpDate) {
      alert(
        "Please select a Next Follow-up Date."
      );

      return;
    }

    try {
      setSaving(true);

      await updateAdmission(
        admission._id,
        {
          status:
            "To Be Followed Up Later",

          nextFollowUpDate:
            followUpDate,
        }
      );

      setFollowUpId(null);

      setFollowUpDate("");

      await loadAdmissions();
    } catch (err) {
      console.error(err);

      alert(
        err.message ||
          "Unable to save follow-up"
      );
    } finally {
      setSaving(false);
    }
  };

  /*
    Cancel the inline follow-up action.
  */
  const cancelFollowUp = () => {
    setFollowUpId(null);

    setFollowUpDate("");
  };

  /*
    Change status for the other admission
    workflow actions.
  */
  const changeStatus = async (
    admission,
    status
  ) => {
    try {
      await updateAdmission(
        admission._id,
        {
          status,

          /*
            Any status other than
            Follow Up Later clears the
            follow-up date.
          */
          nextFollowUpDate: undefined,
        }
      );

      await loadAdmissions();
    } catch (err) {
      console.error(err);

      alert(
        err.message ||
          "Unable to update admission"
      );
    }
  };

const confirmChildJoining = async () => {
  if (!joiningAdmission) return;

  if (!joiningGrade.trim()) {
    alert("Please enter the child's grade.");
    return;
  }

  if (!joiningDate) {
    alert("Please select the actual joining date.");
    return;
  }

  try {
    setSaving(true);

    await convertAdmissionToChild(joiningAdmission._id, {
  grade: joiningGrade.trim(),
  joiningDate,
  mentorId: joiningMentorId || undefined,
});

    alert("Child profile created successfully!");

    setJoiningAdmission(null);
    setJoiningGrade("");
    setJoiningMentorId("");
    setJoiningDate(new Date().toISOString().split("T")[0]);

    await loadAdmissions();
  } catch (err) {
    console.error(err);
    alert(err.message || "Unable to create child profile.");
  } finally {
    setSaving(false);
  }
};

  const removeAdmission = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this admission record?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteAdmission(id);

      await loadAdmissions();
    } catch (err) {
      console.error(err);

      alert(
        err.message ||
          "Unable to delete admission"
      );
    }
  };

  const getChildName = (admission) =>
    [
      admission.childFirstName,
      admission.childMiddleName,
      admission.childLastName,
    ]
      .filter(Boolean)
      .join(" ");

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const countStatus = (status) =>
    admissions.filter(
      (item) => item.status === status
    ).length;

  if (loading) {
    return (
      <div className="admissions-page">
        <div className="admissions-heading">
          <span>GURUKULA ENTRY</span>
          <h1>Admissions</h1>
          <p>
            Track each child's journey from
            enquiry to admission.
          </p>
        </div>
        <div className="admissions-state">
          Loading admissions...
        </div>
      </div>
    );
  }

  return (
    <div className="admissions-page">
      {/* HEADER */}
      <div className="admissions-header">
        <div className="admissions-heading">
          <span>GURUKULA ENTRY</span>
          <h1>Admissions</h1>
          <p>
            Track each prospective child from
            first enquiry through admission.
          </p>
        </div>
        <button
          className="new-admission-button"
          onClick={
            showForm
              ? closeForm
              : openNewForm
          }
        >
          {showForm
            ? "Close Form"
            : "+ New Admission"}
        </button>
      </div>
      {/* ERROR */}

      {error && (
        <div className="admissions-error">
          <strong>
            Unable to load admissions
          </strong>
          <p>{error}</p>
          <button onClick={loadAdmissions}>
            Try Again
          </button>
        </div>
      )}

      {/* SUMMARY */}
      <div className="admission-summary">
        <div>
          <span>TOTAL ENQUIRIES</span>
          <strong>
            {admissions.length}
          </strong>
        </div>
        <div>
          <span>APPLICATIONS</span>
          <strong>
            {countStatus(
              "Application Received"
            )}
          </strong>
        </div>
        <div>
          <span>INTERVIEWS</span>
          <strong>
            {countStatus(
              "Selected for Interview"
            )}
          </strong>
        </div>
        <div>
          <span>SELECTED</span>
          <strong>
            {countStatus(
              "Selected as Student"
            )}
          </strong>
        </div>
      </div>
      {/* NEW / EDIT FORM */}

      {showForm && (
        <form
          className="admission-form"
          onSubmit={handleSubmit}
        >
          <div className="form-section-title">
            <span>
              {editingId
                ? "UPDATE ADMISSION"
                : "CHILD DETAILS"}
            </span>
            <h2>
              {editingId
                ? "Edit Admission"
                : "New Admission Enquiry"}
            </h2>
          </div>
          {/* CHILD DETAILS */}
          <div className="form-grid">
            <label>
              First Name *
              <input
                name="childFirstName"
                value={
                  form.childFirstName
                }
                onChange={handleChange}
                placeholder="Child's first name"
              />
            </label>
            <label>
              Middle Name
              <input
                name="childMiddleName"
                value={
                  form.childMiddleName
                }
                onChange={handleChange}
                placeholder="Middle name"
              />
            </label>
            <label>
              Last Name
              <input
                name="childLastName"
                value={
                  form.childLastName
                }
                onChange={handleChange}
                placeholder="Last name"
              />
            </label>
            <label>
              Date of Birth
              <input
                type="date"
                name="dateOfBirth"
                value={
                  form.dateOfBirth
                }
                onChange={handleChange}
              />
            </label>
            <label>
              Parent / Guardian Name *
              <input
                name="parentName"
                value={
                  form.parentName
                }
                onChange={handleChange}
                placeholder="Parent or guardian"
              />
            </label>
            <label>
              Parent Phone
              <input
                name="parentPhone"
                value={
                  form.parentPhone
                }
                onChange={handleChange}
                placeholder="Phone number"
              />
            </label>
            <label>
              Parent Email
              <input
                type="email"
                name="parentEmail"
                value={
                  form.parentEmail
                }
                onChange={handleChange}
                placeholder="Email address"
              />
            </label>
            <label>
              Referral Source
              <input
                name="referralSource"
                value={
                  form.referralSource
                }
                onChange={handleChange}
                placeholder="How did they hear about Gurukula?"
              />
            </label>
          </div>
          {/* ADDRESS */}
          <label className="full-width-field">
            Address
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Family address"
              rows="3"
            />
          </label>
          {/* PROCESS */}
          <div className="form-section-title second">
            <span>PROCESS</span>
            <h2>
              Admission Progress
            </h2>
          </div>
          <div className="form-grid">
            <label>
              Enquiry Date
              <input
                type="date"
                name="enquiryDate"
                value={
                  form.enquiryDate
                }
                onChange={handleChange}
              />
            </label>
            <label>
              Application Date
              <input
                type="date"
                name="applicationDate"
                value={
                  form.applicationDate
                }
                onChange={handleChange}
              />
            </label>
            <label>
              Interview Date
              <input
                type="date"
                name="interviewDate"
                value={
                  form.interviewDate
                }
                onChange={handleChange}
              />
            </label>
            <label>
              Current Status
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                {statuses.map(
                  (status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  )
                )}
              </select>
            </label>
          </div>
          {/* FOLLOW-UP DATE IN FORM
              ONLY IF STATUS IS FOLLOW-UP */}

          {form.status ===
            "To Be Followed Up Later" && (
            <div
              style={{
                marginTop: "20px",
                padding: "20px",
                background:
                  "#f5eee4",
                border:
                  "1px solid #dfcdb5",
                borderRadius: "12px",
              }}
            >
              <div
                style={{
                  color: "#9b5c3c",
                  fontSize: "11px",
                  fontWeight: "800",
                  letterSpacing:
                    "0.14em",
                  marginBottom: "8px",
                }}
              >
                FOLLOW-UP REQUIRED
              </div>
              <label
                style={{
                  display: "flex",
                  flexDirection:
                    "column",
                  gap: "8px",
                  color: "#183f35",
                  fontWeight: "700",
                }}
              >
                Next Follow-up Date *
                <input
                  type="date"
                  name="nextFollowUpDate"
                  value={
                    form.nextFollowUpDate
                  }
                  onChange={
                    handleChange
                  }
                  required
                  style={{
                    width: "100%",
                    boxSizing:
                      "border-box",
                    padding: "12px",
                    border:
                      "1px solid #cfc8ba",
                    borderRadius:
                      "8px",
                    background:
                      "#ffffff",
                    fontSize: "14px",
                  }}
                />
              </label>
            </div>
          )}

          {/* NOTES */}
          <div className="form-notes-grid">
            <label>
              Interview Notes
              <textarea
                name="interviewNotes"
                value={
                  form.interviewNotes
                }
                onChange={handleChange}
                rows="4"
                placeholder="Interview observations..."
              />
            </label>
            <label>
              Assessment Notes
              <textarea
                name="assessmentNotes"
                value={
                  form.assessmentNotes
                }
                onChange={handleChange}
                rows="4"
                placeholder="Assessment details..."
              />
            </label>
            <label>
              Observations
              <textarea
                name="observations"
                value={
                  form.observations
                }
                onChange={handleChange}
                rows="4"
                placeholder="General observations..."
              />
            </label>
            <label>
              Notes
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows="4"
                placeholder="Additional notes..."
              />
            </label>
          </div>
          {/* FORM ACTIONS */}
          <div className="admission-form-actions">
            <button
              type="button"
              onClick={closeForm}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                ? "Update Admission"
                : "Save Admission"}
            </button>
          </div>
        </form>
      )}

      {joiningAdmission && (
  <div
    style={{
      margin: "24px 0",
      padding: "24px",
      border: "1px solid #d8c8ad",
      borderRadius: "14px",
      background: "#fffdf8",
    }}
  >
    <h2>Confirm Child Joining</h2>
    <p>
      Child: <strong>
        {getChildName(joiningAdmission)}
      </strong>
    </p>
    <label style={{ display: "block", marginBottom: "16px" }}>
      Grade / Class *
      <input
        type="text"
        value={joiningGrade}
        onChange={(event) => setJoiningGrade(event.target.value)}
        placeholder="Enter grade or class"
        style={{
          display: "block",
          width: "100%",
          boxSizing: "border-box",
          padding: "12px",
          marginTop: "6px",
        }}
      />
    </label>
    <label style={{ display: "block", marginBottom: "16px" }}>
      Actual Joining Date *
      <input
        type="date"
        value={joiningDate}
        onChange={(event) => setJoiningDate(event.target.value)}
        style={{
          display: "block",
          width: "100%",
          boxSizing: "border-box",
          padding: "12px",
          marginTop: "6px",
        }}
      />
    </label>
<label style={{ display: "block", marginBottom: "16px" }}>
  Assign Mentor (Optional)
  <select
    value={joiningMentorId}
    onChange={(event) => setJoiningMentorId(event.target.value)}
    style={{
      display: "block",
      width: "100%",
      boxSizing: "border-box",
      padding: "12px",
      marginTop: "6px",
      border: "1px solid #cfc8ba",
      borderRadius: "8px",
      background: "#ffffff",
    }}
  >
    <option value="">No mentor assigned</option>
    {mentors.map((mentor) => (
      <option key={mentor._id} value={mentor._id}>
        {mentor.name}
        {mentor.expertise ? ` — ${mentor.expertise}` : ""}
      </option>
    ))}
  </select>
  {mentors.length === 0 && (
    <small style={{ display: "block", marginTop: "6px" }}>
      No active mentors found. Add a mentor in the Mentors section first.
    </small>
  )}
</label>
<button
      type="button"
      onClick={confirmChildJoining}
      disabled={saving}
    >
      {saving ? "Creating Profile..." : "Confirm & Create Child Profile"}
    </button>
<button
  type="button"
  onClick={() => {
    setJoiningAdmission(null);
    setJoiningGrade("");
    setJoiningMentorId("");
  }}
  disabled={saving}
  style={{ marginLeft: "10px" }}
>
  Cancel
</button>
  </div>
)}

      {/* ADMISSION LIST */}
      <div className="admission-list">
        {admissions.length === 0 ? (
          <div className="admissions-empty">
            <span>ADMISSIONS</span>
            <h2>
              No admission enquiries yet.
            </h2>
            <p>
              Add the first prospective
              child to begin the admission
              journey.
            </p>
          </div>
        ) : (
          admissions.map(
            (admission) => (
              <article
                className="admission-card"
                key={admission._id}
              >
                {/* CARD HEADER */}
                <div className="admission-card-top">
                  <div>
                    <span className="admission-label">
                      PROSPECTIVE CHILD
                    </span>
                    <h2>
                      {getChildName(
                        admission
                      )}
                    </h2>
                    <p>
                      Parent / Guardian:{" "}
                      <strong>
                        {
                          admission.parentName
                        }
                      </strong>
                    </p>
                  </div>
                  <span className="admission-status">
                    {admission.status}
                  </span>
                </div>
                {/* INFORMATION */}
                <div className="admission-info-grid">
                  <div>
                    <span>
                      ENQUIRY DATE
                    </span>
                    <strong>
                      {formatDate(
                        admission.enquiryDate
                      )}
                    </strong>
                  </div>
                  <div>
                    <span>
                      INTERVIEW
                    </span>
                    <strong>
                      {formatDate(
                        admission.interviewDate
                      )}
                    </strong>
                  </div>
                  {/* NEXT FOLLOW-UP
                      ONLY FOR FOLLOW-UP STATUS */}

                  {admission.status ===
                    "To Be Followed Up Later" && (
                    <div>
                      <span>
                        NEXT FOLLOW-UP
                      </span>
                      <strong>
                        {formatDate(
                          admission.nextFollowUpDate
                        )}
                      </strong>
                    </div>
                  )}
                  <div>
                    <span>
                      PHONE
                    </span>
                    <strong>
                      {
                        admission.parentPhone ||
                        "—"
                      }
                    </strong>
                  </div>
                </div>
                {/* INLINE FOLLOW-UP PICKER */}

                {followUpId ===
                  admission._id && (
                  <div
                    style={{
                      marginTop:
                        "18px",
                      padding:
                        "20px",
                      background:
                        "#f5eee4",
                      border:
                        "1px solid #dfcdb5",
                      borderRadius:
                        "12px",
                    }}
                  >
                    <div
                      style={{
                        color:
                          "#9b5c3c",
                        fontSize:
                          "11px",
                        fontWeight:
                          "800",
                        letterSpacing:
                          "0.14em",
                        marginBottom:
                          "8px",
                      }}
                    >
                      FOLLOW-UP REQUIRED
                    </div>
                    <div
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "flex-end",
                        gap: "12px",
                        flexWrap:
                          "wrap",
                      }}
                    >
                      <label
                        style={{
                          display:
                            "flex",
                          flexDirection:
                            "column",
                          gap: "7px",
                          color:
                            "#183f35",
                          fontWeight:
                            "700",
                          flex:
                            "1",
                          minWidth:
                            "220px",
                        }}
                      >
                        Next Follow-up Date *
                        <input
                          type="date"
                          value={
                            followUpDate
                          }
                          onChange={(event) =>
                            setFollowUpDate(
                              event.target
                                .value
                            )
                          }
                          min={
                            new Date()
                              .toISOString()
                              .split(
                                "T"
                              )[0]
                          }
                          style={{
                            padding:
                              "12px",
                            border:
                              "1px solid #cfc8ba",
                            borderRadius:
                              "8px",
                            background:
                              "#ffffff",
                            fontSize:
                              "14px",
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          saveFollowUp(
                            admission
                          )
                        }
                        disabled={saving}
                        style={{
                          padding:
                            "12px 18px",
                          background:
                            "#183f35",
                          color:
                            "#ffffff",
                          border:
                            "none",
                          borderRadius:
                            "8px",
                          fontWeight:
                            "700",
                          cursor:
                            "pointer",
                        }}
                      >
                        {saving
                          ? "Saving..."
                          : "Save Follow-up"}
                      </button>
                      <button
                        type="button"
                        onClick={
                          cancelFollowUp
                        }
                        disabled={saving}
                        style={{
                          padding:
                            "12px 18px",
                          background:
                            "#ffffff",
                          color:
                            "#183f35",
                          border:
                            "1px solid #cfc8ba",
                          borderRadius:
                            "8px",
                          fontWeight:
                            "700",
                          cursor:
                            "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                    <p
                      style={{
                        margin:
                          "10px 0 0",
                        color:
                          "#777",
                        fontSize:
                          "13px",
                      }}
                    >
                      Select the next date
                      to contact or review
                      this admission enquiry.
                    </p>
                  </div>
                )}

                {/* EXISTING FOLLOW-UP NOTICE */}

                {admission.status ===
                  "To Be Followed Up Later" &&
                  followUpId !==
                    admission._id && (
                  <div
                    style={{
                      marginTop:
                        "16px",
                      padding:
                        "12px 14px",
                      background:
                        "#f5eee4",
                      borderRadius:
                        "8px",
                      color:
                        "#7a5a3a",
                      fontSize:
                        "13px",
                    }}
                  >
                    <strong>
                      Follow-up scheduled
                    </strong>
                    {" · "}

                    {admission.nextFollowUpDate
                      ? formatDate(
                          admission.nextFollowUpDate
                        )
                      : "Date not selected"}
                  </div>
                )}

                {/* OBSERVATIONS */}

                {admission.observations && (
                  <div className="admission-observation">
                    <span>
                      OBSERVATIONS
                    </span>
                    <p>
                      {
                        admission.observations
                      }
                    </p>
                  </div>
                )}

                {/* ACTIONS */}
                <div className="admission-actions">
                  {/* EDIT */}
                  <button
                    onClick={() =>
                      openEditForm(
                        admission
                      )
                    }
                  >
                    Edit
                  </button>
                  {/* MOVE TO INTERVIEW */}

                  {admission.status !==
                    "Selected for Interview" && (
                    <button
                      onClick={() =>
                        changeStatus(
                          admission,
                          "Selected for Interview"
                        )
                      }
                    >
                      Move to Interview
                    </button>
                  )}

                  {/* INVITED */}

                  {admission.status !==
                    "Invited" && (
                    <button
                      onClick={() =>
                        changeStatus(
                          admission,
                          "Invited"
                        )
                      }
                    >
                      Mark Invited
                    </button>
                  )}

                  {/* SELECTED */}

                  {admission.status !==
                    "Selected as Student" && (
                    <button
                      className="select-button"
                      onClick={() =>
                        changeStatus(
                          admission,
                          "Selected as Student"
                        )
                      }
                    >
                      Select as Student
                    </button>
                  )}
                  {admission.status === "Selected as Student" &&
  !admission.convertedChild && (
    <button
      type="button"
      className="select-button"
      onClick={() => {
        setJoiningAdmission(admission);
        setJoiningGrade("");
        setJoiningDate(
          new Date().toISOString().split("T")[0]
        );
      }}
    >
      Confirm Joined & Create Child
    </button>
  )}

  {admission.convertedChild && (
  <div style={{ width: "100%", marginTop: "10px" }}>
    <strong>Child profile linked:</strong>{" "}
    {admission.convertedChild.firstName}{" "}
    {admission.convertedChild.lastName || ""}{" "}
    — {admission.convertedChild.admissionNumber}
  </div>
)}

                  {/* FOLLOW UP LATER */}

                  {admission.status !==
                    "To Be Followed Up Later" &&
                    followUpId !==
                      admission._id && (
                    <button
                      onClick={() =>
                        startFollowUp(
                          admission
                        )
                      }
                    >
                      Follow Up Later
                    </button>
                  )}

                  {/* DELETE */}
                  <button
                    className="delete-button"
                    onClick={() =>
                      removeAdmission(
                        admission._id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </article>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Admissions;