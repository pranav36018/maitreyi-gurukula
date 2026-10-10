
const configuredApiUrl = import.meta.env.VITE_API_BASE_URL?.trim();

const API_BASE_URL = (
  import.meta.env.PROD
    ? (configuredApiUrl || "/api")
    : (configuredApiUrl || "http://localhost:5000/api")
).replace(/\/+$/, "");


const request = async (endpoint, options = {}) => {
  const method = (options.method || "GET").toUpperCase();
  const maxAttempts = method === "GET" ? 8 : 1;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options.headers || {}),
        },
      });

      // Retry temporary server errors while Render wakes up.
      if (
        method === "GET" &&
        [502, 503, 504].includes(response.status) &&
        attempt < maxAttempts
      ) {
        await response.body?.cancel();
        await new Promise((resolve) => setTimeout(resolve, 5000));
        continue;
      }

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        throw new Error(
          (typeof data === "object" && data?.message) ||
            (typeof data === "string" && data) ||
            "Something went wrong"
        );
      }

      return data;
    } catch (error) {
      if (attempt >= maxAttempts) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};


// CHILDREN
export const getChildren = () => request("/children");
export const getChildById = (id) => request(`/children/${id}`);
export const createChild = (data) =>
  request("/children", { method: "POST", body: JSON.stringify(data) });
export const updateChild = (id, data) =>
  request(`/children/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteChild = (id) =>
  request(`/children/${id}`, { method: "DELETE" });

// ACADEMICS
export const getAcademicsByChild = (childId) =>
  request(`/academics/child/${childId}`);
export const createAcademic = (data) =>
  request("/academics", { method: "POST", body: JSON.stringify(data) });
export const updateAcademic = (id, data) =>
  request(`/academics/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteAcademic = (id) =>
  request(`/academics/${id}`, { method: "DELETE" });

// SKILLS
export const getSkillsByChild = (childId) =>
  request(`/skills/child/${childId}`);
export const createSkill = (data) =>
  request("/skills", { method: "POST", body: JSON.stringify(data) });
export const updateSkill = (id, data) =>
  request(`/skills/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteSkill = (id) =>
  request(`/skills/${id}`, { method: "DELETE" });

// ACHIEVEMENTS
export const getAchievementsByChild = (childId) =>
  request(`/achievements/child/${childId}`);
export const createAchievement = (data) =>
  request("/achievements", { method: "POST", body: JSON.stringify(data) });
export const updateAchievement = (id, data) =>
  request(`/achievements/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteAchievement = (id) =>
  request(`/achievements/${id}`, { method: "DELETE" });

// OBSERVATIONS
export const getObservationsByChild = (childId) =>
  request(`/observations/child/${childId}`);
export const createObservation = (data) =>
  request("/observations", { method: "POST", body: JSON.stringify(data) });
export const updateObservation = (id, data) =>
  request(`/observations/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteObservation = (id) =>
  request(`/observations/${id}`, { method: "DELETE" });

// FOLLOW-UPS
export const getFollowUps = () => request("/follow-ups");
export const getFollowUpsByChild = (childId) =>
  request(`/follow-ups/child/${childId}`);
export const createFollowUp = (data) =>
  request("/follow-ups", { method: "POST", body: JSON.stringify(data) });
export const updateFollowUp = (id, data) =>
  request(`/follow-ups/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteFollowUp = (id) =>
  request(`/follow-ups/${id}`, { method: "DELETE" });

// ADMISSIONS
export const getAdmissions = () => request("/admissions");
export const getAdmissionById = (id) => request(`/admissions/${id}`);
export const createAdmission = (data) =>
  request("/admissions", { method: "POST", body: JSON.stringify(data) });
export const updateAdmission = (id, data) =>
  request(`/admissions/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteAdmission = (id) =>
  request(`/admissions/${id}`, { method: "DELETE" });
export const convertAdmissionToChild = (id, data) =>
  request(`/admissions/${id}/convert-to-child`, {
    method: "POST",
    body: JSON.stringify(data),
  });

// WELLBEING
export const getWellbeingByChild = (childId) =>
  request(`/wellbeing/child/${childId}`);
export const createWellbeing = (data) =>
  request("/wellbeing", { method: "POST", body: JSON.stringify(data) });
export const updateWellbeing = (id, data) =>
  request(`/wellbeing/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteWellbeing = (id) =>
  request(`/wellbeing/${id}`, { method: "DELETE" });

// RESPONSIBILITIES
export const getResponsibilitiesByChild = (childId) =>
  request(`/responsibilities/child/${childId}`);
export const createResponsibility = (data) =>
  request("/responsibilities", { method: "POST", body: JSON.stringify(data) });
export const updateResponsibility = (id, data) =>
  request(`/responsibilities/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteResponsibility = (id) =>
  request(`/responsibilities/${id}`, { method: "DELETE" });

// FAMILY
export const getFamilyByChild = (childId) =>
  request(`/family/child/${childId}`);
export const createFamily = (data) =>
  request("/family", { method: "POST", body: JSON.stringify(data) });
export const updateFamily = (id, data) =>
  request(`/family/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteFamily = (id) =>
  request(`/family/${id}`, { method: "DELETE" });

// DOCUMENTS
export const getDocumentsByChild = (childId) =>
  request(`/documents/child/${childId}`);
export const createDocument = (data) =>
  request("/documents", { method: "POST", body: JSON.stringify(data) });
export const updateDocument = (id, data) =>
  request(`/documents/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteDocument = (id) =>
  request(`/documents/${id}`, { method: "DELETE" });

// MENTORS
export const getMentors = () => request("/mentors");
export const createMentor = (data) =>
  request("/mentors", { method: "POST", body: JSON.stringify(data) });
export const updateMentor = (id, data) =>
  request(`/mentors/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteMentor = (id) =>
  request(`/mentors/${id}`, { method: "DELETE" });
