
import { useEffect, useState } from "react";

import {
  getChildren,
  getAdmissions,
  getFollowUps,
  getAcademicsByChild,
  getSkillsByChild,
  getAchievementsByChild,
  getObservationsByChild,
  getWellbeingByChild,
  getResponsibilitiesByChild,
} from "../../services/api";

import "./Dashboard.css";

const reportTypes = [
  {
    id: "children",
    number: "01",
    title: "Child Directory",
    description: "Child names, grades, admission details and status.",
  },
  {
    id: "academics",
    number: "02",
    title: "Academic Progress",
    description: "Subject-wise performance and academic remarks.",
  },
  {
    id: "skills",
    number: "03",
    title: "Skills & Talents",
    description: "Skills, interests and development levels.",
  },
  {
    id: "achievements",
    number: "04",
    title: "Achievements",
    description: "Recorded achievements and recognition.",
  },
  {
    id: "wellbeing",
    number: "05",
    title: "Wellbeing",
    description: "Wellbeing records and support status.",
  },
  {
    id: "followups",
    number: "06",
    title: "Follow-ups",
    description: "Pending actions, due dates and assigned staff.",
  },
  {
    id: "admissions",
    number: "07",
    title: "Admissions",
    description: "Prospective children and admission progress.",
  },
  {
    id: "observations",
    number: "08",
    title: "Mentor Observations",
    description: "Observations recorded for each child.",
  },
  {
    id: "responsibilities",
    number: "09",
    title: "Responsibilities",
    description: "Leadership, seva and other responsibilities.",
  },
];

function getChildName(child) {
  if (!child) return "Unknown Child";

  return (
    child.fullName ||
    child.name ||
    [
      child.firstName,
      child.middleName,
      child.lastName,
    ]
      .filter(Boolean)
      .join(" ") ||
    "Unnamed Child"
  );
}

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-IN");
}

function downloadCsv(filename, rows) {
  if (!rows.length) {
    alert("There are no records to download for this report.");
    return;
  }

  const headers = Object.keys(rows[0]);

  const escapeCsv = (value) => {
    const text = String(value ?? "");
    return `"${text.replace(/"/g, '""')}"`;
  };

  const csv = [
    headers.map(escapeCsv).join(","),
    ...rows.map((row) =>
      headers.map((header) => escapeCsv(row[header])).join(",")
    ),
  ].join("\r\n");

  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

function Reports() {
  const [selectedReport, setSelectedReport] = useState("children");
  const [reportData, setReportData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadReports() {
      setLoading(true);
      setError("");

      try {
        const [
          childrenResponse,
          admissionsResponse,
          followUpsResponse,
        ] = await Promise.all([
          getChildren(),
          getAdmissions(),
          getFollowUps(),
        ]);

        const children = childrenResponse.data || [];
        const admissions = admissionsResponse.data || [];
        const followUps = followUpsResponse.data || [];

        const reportRecords = {
          children: children.map((child) => ({
            "Child Name": getChildName(child),
            "Admission Number": child.admissionNumber || "",
            Grade: child.grade || "",
            "Admission Year":
              child.admissionYear ||
              (child.admissionDate
                ? new Date(child.admissionDate).getFullYear()
                : ""),
            Status: child.status || "Active",
            Mentor: child.mentor || "",
          })),

          admissions: admissions.map((item) => ({
            "Child Name": getChildName(item),
            "Parent / Guardian": item.parentName || "",
            Phone: item.parentPhone || "",
            Status: item.status || "",
            "Enquiry Date": formatDate(item.enquiryDate),
            "Interview Date": formatDate(item.interviewDate),
            "Next Follow-up": formatDate(item.nextFollowUpDate),
          })),

          followups: followUps.map((item) => ({
            "Child Name": getChildName(item.child),
            Title: item.title || "",
            Category: item.category || "",
            Status: item.status || "",
            "Due Date": formatDate(item.dueDate),
            "Assigned To": item.assignedTo || "",
            Note: item.note || "",
          })),
        };

        const academicRows = [];
        const skillRows = [];
        const achievementRows = [];
        const wellbeingRows = [];
        const observationRows = [];
        const responsibilityRows = [];

        for (const child of children) {
          if (!child._id) continue;

          const [
            academicsResponse,
            skillsResponse,
            achievementsResponse,
            wellbeingResponse,
            observationsResponse,
            responsibilitiesResponse,
          ] = await Promise.all([
            getAcademicsByChild(child._id),
            getSkillsByChild(child._id),
            getAchievementsByChild(child._id),
            getWellbeingByChild(child._id),
            getObservationsByChild(child._id),
            getResponsibilitiesByChild(child._id),
          ]);

          const childName = getChildName(child);

          (academicsResponse.data || []).forEach((item) => {
            academicRows.push({
              "Child Name": childName,
              "Academic Year": item.academicYear || "",
              Subject: item.subject || "",
              Performance: item.performance || "",
              Remarks: item.remarks || "",
            });
          });

          (skillsResponse.data || []).forEach((item) => {
            skillRows.push({
              "Child Name": childName,
              Skill: item.skillName || "",
              Category: item.category || "",
              "Development Level": item.developmentLevel || "",
              "Interest Level": item.interestLevel || "",
              Remarks: item.remarks || "",
            });
          });

          (achievementsResponse.data || []).forEach((item) => {
            achievementRows.push({
              "Child Name": childName,
              Title: item.title || "",
              Category: item.category || "",
              Level: item.level || "",
              Date: formatDate(item.achievementDate),
              Description: item.description || "",
            });
          });

          (wellbeingResponse.data || []).forEach((item) => {
            wellbeingRows.push({
              "Child Name": childName,
              Area: item.area || "",
              Status: item.status || "",
              Observation: item.observation || "",
              "Support Provided": item.supportProvided || "",
              "Observed Date": formatDate(item.observedAt),
              "Follow-up Required": item.followUpRequired ? "Yes" : "No",
              "Follow-up Date": formatDate(item.followUpDate),
            });
          });

          (observationsResponse.data || []).forEach((item) => {
            observationRows.push({
              "Child Name": childName,
              Category: item.category || "",
              Tags: Array.isArray(item.tags)
                ? item.tags.join("; ")
                : item.tags || "",
              Note: item.note || item.observation || "",
              Date: formatDate(
                item.observedAt || item.createdAt
              ),
              "Follow-up Required": item.followUpRequired ? "Yes" : "No",
              "Follow-up Date": formatDate(item.followUpDate),
            });
          });

          (responsibilitiesResponse.data || []).forEach((item) => {
            responsibilityRows.push({
              "Child Name": childName,
              Title: item.title || "",
              Category: item.category || "",
              Description: item.description || "",
              Status: item.status || "",
              "Start Date": formatDate(item.startDate),
              "End Date": formatDate(item.endDate),
              Remarks: item.remarks || "",
            });
          });
        }

        reportRecords.academics = academicRows;
        reportRecords.skills = skillRows;
        reportRecords.achievements = achievementRows;
        reportRecords.wellbeing = wellbeingRows;
        reportRecords.observations = observationRows;
        reportRecords.responsibilities = responsibilityRows;

        if (!cancelled) {
          setReportData(reportRecords);
        }
      } catch (err) {
        console.error("Unable to load reports:", err);

        if (!cancelled) {
          setError(
            err.message ||
              "Unable to load report data. Please check the backend."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadReports();

    return () => {
      cancelled = true;
    };
  }, []);

  const activeReport = reportTypes.find(
    (report) => report.id === selectedReport
  );

  const rows = reportData[selectedReport] || [];

  const handleDownload = () => {
    const safeName = activeReport.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    downloadCsv(
      `gurukula-${safeName}-${new Date().toISOString().slice(0, 10)}.csv`,
      rows
    );
  };

  return (
    <div className="reports-page">
      <div className="reports-heading">
        <span>GURUKULA RECORDS</span>
        <h1>Reports & Insights</h1>
        <p>
          Explore records from the Gurukula database and download
          reports for review and planning.
        </p>
      </div>

      <div className="reports-summary" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "14px",
        marginTop: "25px",
      }}>
        {[
          ["Children", reportData.children?.length ?? "—"],
          ["Admissions", reportData.admissions?.length ?? "—"],
          ["Achievements", reportData.achievements?.length ?? "—"],
          ["Open Follow-ups", reportData.followups
            ? reportData.followups.filter(
                (item) =>
                  item.Status !== "Completed" &&
                  item.Status !== "Closed"
              ).length
            : "—"],
        ].map(([label, value]) => (
          <div key={label} style={{
            padding: "20px",
            background: "#ffffff",
            border: "1px solid #e4e2d9",
            borderRadius: "14px",
          }}>
            <span style={{
              display: "block",
              fontSize: "12px",
              fontWeight: 700,
              marginBottom: "10px",
            }}>
              {label.toUpperCase()}
            </span>
            <strong style={{
              display: "block",
              fontSize: "30px",
              color: "#183f35",
            }}>
              {loading ? "…" : value}
            </strong>
          </div>
        ))}
      </div>

      {error && (
        <div role="alert" style={{
          marginTop: "24px",
          padding: "18px",
          background: "#fff0ed",
          border: "1px solid #e8b9ae",
          borderRadius: "12px",
          color: "#8c3327",
        }}>
          <strong>Reports could not be loaded</strong>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      )}

      <div className="reports-grid">
        {reportTypes.map((report) => (
          <button
            type="button"
            key={report.id}
            className={
              selectedReport === report.id
                ? "report-card report-card-active"
                : "report-card"
            }
            onClick={() => setSelectedReport(report.id)}
          >
            <span>{report.number}</span>
            <h3>{report.title}</h3>
            <p>{report.description}</p>
            <p style={{ marginTop: "12px", fontWeight: 700 }}>
              {loading
                ? "Loading records…"
                : `${reportData[report.id]?.length || 0} records`}
            </p>
          </button>
        ))}
      </div>

      <section style={{
        marginTop: "28px",
        padding: "24px",
        background: "#ffffff",
        border: "1px solid #e4e2d9",
        borderRadius: "16px",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          flexWrap: "wrap",
        }}>
          <div>
            <span style={{
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.12em",
            }}>
              SELECTED REPORT
            </span>
            <h2 style={{ margin: "8px 0" }}>
              {activeReport?.title}
            </h2>
            <p>
              {rows.length} record{rows.length === 1 ? "" : "s"} available
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            disabled={loading || Boolean(error) || rows.length === 0}
            style={{
              padding: "12px 18px",
              border: 0,
              borderRadius: "9px",
              background: "#183f35",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Download CSV
          </button>
        </div>

        {loading ? (
          <p style={{ marginTop: "24px" }}>Loading report records…</p>
        ) : rows.length === 0 ? (
          <div className="report-empty">
            <div className="report-empty-icon">—</div>
            <h3>No records available yet</h3>
            <p>
              Once records are added for this category, they will
              appear here and can be downloaded as a CSV file.
            </p>
          </div>
        ) : (
          <div style={{ overflowX: "auto", marginTop: "22px" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontSize: "13px",
            }}>
              <thead>
                <tr>
                  {Object.keys(rows[0]).map((header) => (
                    <th key={header} style={{
                      padding: "12px",
                      borderBottom: "2px solid #e4e2d9",
                      whiteSpace: "nowrap",
                    }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 25).map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, cellIndex) => (
                      <td key={cellIndex} style={{
                        padding: "12px",
                        borderBottom: "1px solid #eeeae2",
                        minWidth: "100px",
                      }}>
                        {String(value ?? "") || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {rows.length > 25 && (
              <p style={{ marginTop: "12px" }}>
                Previewing 25 records. Download the CSV to view all{" "}
                {rows.length} records.
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default Reports;
