import { useEffect, useState } from "react";

import {
  getAcademics,
  getAchievements,
  getObservations,
} from "../../services/api";

function DashboardActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadActivity = async () => {
      try {
        const [
          academicResponse,
          achievementResponse,
          observationResponse,
        ] = await Promise.all([
          getAcademics().catch(() => ({ data: [] })),
          getAchievements().catch(() => ({ data: [] })),
          getObservations().catch(() => ({ data: [] })),
        ]);

        const academics = academicResponse.data || [];
        const achievements = achievementResponse.data || [];
        const observations = observationResponse.data || [];

        const activityRecords = [];

        const getRecordChildName = (child) => {
          if (!child) return "Gurukula Child";
          if (typeof child === "string") return "Gurukula Child";
          return (
            child.fullName ||
            child.name ||
            [child.firstName, child.middleName, child.lastName]
              .filter(Boolean)
              .join(" ") ||
            "Gurukula Child"
          );
        };

        academics.forEach((item) => {
          activityRecords.push({
            type: "Academic Progress",
            title: item.subject || "Academic Progress",
            description: item.remarks || "Academic progress recorded.",
            childName: getRecordChildName(item.child),
            date: item.createdAt || item.updatedAt,
          });
        });

        achievements.forEach((item) => {
          activityRecords.push({
            type: "Achievement",
            title:
              item.title ||
              item.achievementName ||
              "Achievement",
            description:
              item.description || "New achievement recorded.",
            childName: getRecordChildName(item.child),
            date: item.createdAt || item.updatedAt,
          });
        });

        observations.forEach((item) => {
          activityRecords.push({
            type: "Mentor Observation",
            title: item.category || "Mentor Observation",
            description:
              item.note ||
              item.observation ||
              "New mentor observation recorded.",
            childName: getRecordChildName(item.child),
            date:
              item.observedAt ||
              item.createdAt ||
              item.updatedAt,
          });
        });

        activityRecords.sort(
          (a, b) =>
            new Date(b.date || 0) - new Date(a.date || 0)
        );

        if (isMounted) {
          setActivities(activityRecords.slice(0, 6));
        }
      } catch (error) {
        console.error(
          "Unable to load dashboard activity:",
          error
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadActivity();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="dashboard-activity-list">
        <p>
          Loading recent journey updates...
        </p>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="dashboard-activity-list">
        <div className="dashboard-activity">
          <div className="activity-index">
            —
          </div>

          <div>
            <strong>
              No journey updates yet
            </strong>

            <p>
              Academic progress,
              achievements and mentor
              observations will appear here
              when records are added.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-activity-list">
      {activities.map((activity, index) => (
        <div
          className="dashboard-activity"
          key={`${activity.type}-${index}`}
        >
          <div className="activity-index">
            {String(index + 1).padStart(2, "0")}
          </div>

          <div>
            <strong>
              {activity.title}
            </strong>

            <p>
              {activity.childName} ·{" "}
              {activity.description}
            </p>
          </div>

          <small>
            {activity.date
              ? new Date(
                  activity.date
                ).toLocaleDateString(
                  "en-IN",
                  {
                    day: "2-digit",
                    month: "short",
                  }
                )
              : "—"}
          </small>
        </div>
      ))}
    </div>
  );
}

export default DashboardActivity;