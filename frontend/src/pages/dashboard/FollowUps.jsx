import { useEffect, useState } from "react";

import {
  getFollowUps,
  createFollowUp,
  updateFollowUp,
  deleteFollowUp,
} from "../../services/api";

import { getChildren } from "../../services/api";

import "./FollowUps.css";

const initialForm = {
  child: "",
  title: "",
  category: "Academic Support",
  dueDate: "",
  assignedTo: "",
  note: "",
  status: "Pending",
};

const categories = [
  "Academic Support",
  "Skill Development",
  "Wellbeing",
  "Mentorship",
  "Family",
  "Admission",
  "Other",
];

const FollowUps = () => {
  const [followUps, setFollowUps] = useState([]);

  const [children, setChildren] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [filter, setFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState(initialForm);

  const loadFollowUps = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getFollowUps();

      setFollowUps(response.data || []);
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Unable to load follow-ups"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      getFollowUps().catch((err) => {
        console.error(err);
        if (isMounted) {
          setError(err.message || "Unable to load follow-ups");
        }
        return { data: [] };
      }),
      getChildren().catch((err) => {
        console.error("Unable to load children:", err);
        return { data: [] };
      }),
    ])
      .then(([followUpsRes, childrenRes]) => {
        if (isMounted) {
          setFollowUps(followUpsRes.data || []);
          setChildren(childrenRes.data || []);
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
      dueDate: new Date()
        .toISOString()
        .split("T")[0],
    });

    setShowForm(true);
  };

  const openEditForm = (followUp) => {
    setEditingId(followUp._id);

    setForm({
      child:
        followUp.child?._id ||
        followUp.child ||
        "",

      title:
        followUp.title || "",

      category:
        followUp.category ||
        "Academic Support",

      dueDate:
        followUp.dueDate
          ? followUp.dueDate.split("T")[0]
          : "",

      assignedTo:
        followUp.assignedTo || "",

      note:
        followUp.note || "",

      status:
        followUp.status || "Pending",
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

    if (!form.child) {
      alert("Please select a child.");
      return;
    }

    if (!form.title.trim()) {
      alert("Please enter a follow-up title.");
      return;
    }

    if (!form.dueDate) {
      alert("Please select a due date.");
      return;
    }

    try {
      setSaving(true);

      const followUpData = {
        child: form.child,

        title: form.title,

        category: form.category,

        dueDate: form.dueDate,

        assignedTo: form.assignedTo,

        note: form.note,

        status: form.status,
      };

      if (editingId) {
        await updateFollowUp(
          editingId,
          followUpData
        );
      } else {
        await createFollowUp(
          followUpData
        );
      }

      closeForm();

      await loadFollowUps();
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

  const changeStatus = async (
    id,
    status
  ) => {
    try {
      await updateFollowUp(id, {
        status,

        ...(status === "Completed"
          ? {
              completedAt:
                new Date().toISOString(),
            }
          : {
              completedAt: null,
            }),
      });

      await loadFollowUps();
    } catch (err) {
      alert(
        err.message ||
          "Unable to update follow-up"
      );
    }
  };

  const removeFollowUp = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this follow-up?"
    );

    if (!confirmed) return;

    try {
      await deleteFollowUp(id);

      await loadFollowUps();
    } catch (err) {
      alert(
        err.message ||
          "Unable to delete follow-up"
      );
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "No date";
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

  const getChildName = (child) => {
    if (!child) {
      return "Unknown Child";
    }

    return [
      child.firstName,
      child.middleName,
      child.lastName,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const isOverdue = (followUp) => {
    if (followUp.status === "Completed") {
      return false;
    }

    if (!followUp.dueDate) {
      return false;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(
      followUp.dueDate
    );

    dueDate.setHours(0, 0, 0, 0);

    return dueDate < today;
  };

  const isDueToday = (followUp) => {
    if (followUp.status === "Completed") {
      return false;
    }

    if (!followUp.dueDate) {
      return false;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const dueDate = new Date(
      followUp.dueDate
    );

    dueDate.setHours(0, 0, 0, 0);

    return (
      dueDate.getTime() ===
      today.getTime()
    );
  };

  const filteredFollowUps =
    followUps.filter((followUp) => {
      if (filter === "All") {
        return true;
      }

      if (filter === "Overdue") {
        return isOverdue(followUp);
      }

      if (filter === "Due Today") {
        return isDueToday(followUp);
      }

      if (filter === "Pending") {
        return followUp.status === "Pending";
      }

      if (filter === "In Progress") {
        return (
          followUp.status === "In Progress"
        );
      }

      if (filter === "Completed") {
        return (
          followUp.status === "Completed"
        );
      }

      return true;
    });

  const totalCount = followUps.length;

  const pendingCount = followUps.filter(
    (item) =>
      item.status === "Pending"
  ).length;

  const inProgressCount =
    followUps.filter(
      (item) =>
        item.status === "In Progress"
    ).length;

  const completedCount =
    followUps.filter(
      (item) =>
        item.status === "Completed"
    ).length;

  const overdueCount =
    followUps.filter(
      (item) => isOverdue(item)
    ).length;

  const dueTodayCount =
    followUps.filter(
      (item) => isDueToday(item)
    ).length;

  if (loading) {
    return (
      <div className="followups-page">
        <div className="followups-heading">
          <span>CHILD JOURNEY</span>
          <h1>Follow-ups</h1>
          <p>
            Track actions and support that
            need continued attention.
          </p>
        </div>
        <div className="followups-state">
          Loading follow-ups...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="followups-page">
        <div className="followups-heading">
          <span>CHILD JOURNEY</span>
          <h1>Follow-ups</h1>
          <p>
            Track actions and support that
            need continued attention.
          </p>
        </div>
        <div className="followups-error">
          <strong>
            Unable to load follow-ups
          </strong>
          <p>{error}</p>
          <button onClick={loadFollowUps}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="followups-page">
      {/* HEADER */}
      <div className="followups-header">
        <div className="followups-heading">
          <span>CHILD JOURNEY</span>
          <h1>Follow-ups</h1>
          <p>
            Track actions, support, and
            continued attention for each
            child.
          </p>
        </div>
        <button
          className="followups-new-button"
          onClick={
            showForm
              ? closeForm
              : openNewForm
          }
        >
          {showForm
            ? "Close Form"
            : "+ Add Follow-up"}
        </button>
      </div>
      {/* SUMMARY */}
      <div className="followups-summary">
        <div>
          <span>TOTAL</span>
          <strong>{totalCount}</strong>
        </div>
        <div>
          <span>OVERDUE</span>
          <strong>{overdueCount}</strong>
        </div>
        <div>
          <span>DUE TODAY</span>
          <strong>{dueTodayCount}</strong>
        </div>
        <div>
          <span>PENDING</span>
          <strong>{pendingCount}</strong>
        </div>
        <div>
          <span>IN PROGRESS</span>
          <strong>{inProgressCount}</strong>
        </div>
        <div>
          <span>COMPLETED</span>
          <strong>{completedCount}</strong>
        </div>
      </div>
      {/* ADD / EDIT FORM */}

      {showForm && (
        <form
          className="followup-form"
          onSubmit={handleSubmit}
        >
          <div className="followup-form-heading">
            <span>
              {editingId
                ? "UPDATE FOLLOW-UP"
                : "NEW FOLLOW-UP"}
            </span>
            <h2>
              {editingId
                ? "Edit Follow-up"
                : "Create Follow-up"}
            </h2>
          </div>
          <div className="followup-form-grid">
            <label>
              Child *
              <select
                name="child"
                value={form.child}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select child
                </option>
                {children.map((child) => (
                  <option
                    key={child._id}
                    value={child._id}
                  >
                    {getChildName(child)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Follow-up Title *
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Example: Mathematics support review"
                required
              />
            </label>
            <label>
              Category
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                {categories.map(
                  (category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  )
                )}
              </select>
            </label>
            <label>
              Due Date *
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Assigned To
              <input
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                placeholder="Teacher / Mentor"
              />
            </label>
            <label>
              Status
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option value="Pending">
                  Pending
                </option>
                <option value="In Progress">
                  In Progress
                </option>
                <option value="Completed">
                  Completed
                </option>
              </select>
            </label>
          </div>
          <label className="followup-full-field">
            Note
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              rows="4"
              placeholder="What needs to be followed up?"
            />
          </label>
          <div className="followup-form-actions">
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
                ? "Update Follow-up"
                : "Save Follow-up"}
            </button>
          </div>
        </form>
      )}

      {/* FILTERS */}
      <div className="followups-filters">
        {[
          "All",
          "Overdue",
          "Due Today",
          "Pending",
          "In Progress",
          "Completed",
        ].map((item) => (
          <button
            key={item}
            className={
              filter === item
                ? "active"
                : ""
            }
            onClick={() =>
              setFilter(item)
            }
          >
            {item}
          </button>
        ))}
      </div>
      {/* LIST */}

      {filteredFollowUps.length === 0 ? (
        <div className="followups-empty">
          <span>
            {filter === "All"
              ? "NO FOLLOW-UPS"
              : filter.toUpperCase()}
          </span>
          <h2>
            {filter === "All"
              ? "Everything is clear for now."
              : "No follow-ups in this view."}
          </h2>
          <p>
            Follow-ups created for children
            will appear here.
          </p>
        </div>
      ) : (
        <div className="followups-list">
          {filteredFollowUps.map(
            (followUp) => (
              <article
                className={`followup-card ${
                  isOverdue(followUp)
                    ? "overdue"
                    : ""
                }`}
                key={followUp._id}
              >
                {/* TOP */}
                <div className="followup-top">
                  <div>
                    <span className="followup-category">
                      {followUp.category}
                    </span>
                    <h2>
                      {followUp.title}
                    </h2>
                    <p className="followup-child">
                      {getChildName(
                        followUp.child
                      )}

                      {followUp.child?.grade
                        ? ` · ${followUp.child.grade}`
                        : ""}
                    </p>
                  </div>
                  <span
                    className={`followup-status ${followUp.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {followUp.status}
                  </span>
                </div>
                {/* DETAILS */}
                <div className="followup-details">
                  <div>
                    <span>DUE DATE</span>
                    <strong>
                      {formatDate(
                        followUp.dueDate
                      )}
                    </strong>
                  </div>
                  <div>
                    <span>ASSIGNED TO</span>
                    <strong>
                      {followUp.assignedTo ||
                        "Not assigned"}
                    </strong>
                  </div>
                </div>
                {/* NOTE */}

                {followUp.note && (
                  <div className="followup-note">
                    <span>NOTE</span>
                    <p>
                      {followUp.note}
                    </p>
                  </div>
                )}

                {/* OVERDUE */}

                {isOverdue(followUp) && (
                  <div className="followup-overdue">
                    Follow-up is overdue
                  </div>
                )}

                {/* DUE TODAY */}

                {isDueToday(followUp) && (
                  <div className="followup-today">
                    Follow-up is due today
                  </div>
                )}

                {/* ACTIONS */}
                <div className="followup-actions">
                  <button
                    onClick={() =>
                      openEditForm(
                        followUp
                      )
                    }
                  >
                    Edit
                  </button>
                  {followUp.status !==
                    "In Progress" &&
                    followUp.status !==
                      "Completed" && (
                    <button
                      onClick={() =>
                        changeStatus(
                          followUp._id,
                          "In Progress"
                        )
                      }
                    >
                      Mark In Progress
                    </button>
                  )}

                  {followUp.status !==
                    "Completed" && (
                    <button
                      className="complete-button"
                      onClick={() =>
                        changeStatus(
                          followUp._id,
                          "Completed"
                        )
                      }
                    >
                      Mark Completed
                    </button>
                  )}

                  {followUp.status ===
                    "Completed" && (
                    <button
                      onClick={() =>
                        changeStatus(
                          followUp._id,
                          "Pending"
                        )
                      }
                    >
                      Reopen
                    </button>
                  )}
                  <button
                    className="delete-button"
                    onClick={() =>
                      removeFollowUp(
                        followUp._id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </article>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default FollowUps;