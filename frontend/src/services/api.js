const configuredApiUrl = import.meta.env.VITE_API_BASE_URL?.trim();

const API_BASE_URL = (
  configuredApiUrl ||
  (import.meta.env.PROD
    ? "/api"
    : "http://localhost:5000/api")
).replace(/\/+$/, "");

let wakeUpStarted = false;

export const wakeUpBackend = () => {
  if (wakeUpStarted) return;

  wakeUpStarted = true;

  fetch(`${API_BASE_URL}/health`, {
    method: "GET",
    cache: "no-store",
  }).catch(() => {});
};

const request = async (endpoint, options = {}) => {
  const method = (options.method || "GET").toUpperCase();
  const maxAttempts = method === "GET" ? 2 : 1;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...(options.headers || {}),
          "Content-Type": "application/json",
        },
      });

      if (
        method === "GET" &&
        [502, 503, 504].includes(response.status) &&
        attempt < maxAttempts
      ) {
        await response.body?.cancel().catch(() => {});
        await new Promise((resolve) => setTimeout(resolve, 1500));
        continue;
      }

      const contentType = response.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        const message =
          (typeof data === "object" && data?.message) ||
          (typeof data === "string" && data) ||
          `Request failed with status ${response.status}`;
        const error = new Error(message);
        error.status = response.status;
        throw error;
      }

      return data;
    } catch (error) {
      if (error.status && error.status >= 400 && error.status < 500) {
        throw error;
      }

      if (attempt >= maxAttempts) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  throw new Error("Unable to connect to the server.");
};

// CHILDREN

export const getChildren = () => request("/children");

export const getChildById = (id) =>
  request(`/children/${id}`);

export const createChild = (childData) =>
  request("/children", {
    method: "POST",
    body: JSON.stringify(childData),
  });

export const updateChild = (id, childData) =>
  request(`/children/${id}`, {
    method: "PUT",
    body: JSON.stringify(childData),
  });

export const deleteChild = (id) =>
  request(`/children/${id}/archive`, {
    method: "PATCH",
  });

export const restoreChild = (id) =>
  request(`/children/${id}/restore`, {
    method: "PATCH",
  });

// ACADEMICS

export const getAcademics = () => request("/academics");

export const getAcademicsByChild = (childId) =>
  request(`/academics/child/${childId}`);

export const createAcademic = (academicData) =>
  request("/academics", {
    method: "POST",
    body: JSON.stringify(academicData),
  });

export const updateAcademic = (id, academicData) =>
  request(`/academics/${id}`, {
    method: "PUT",
    body: JSON.stringify(academicData),
  });

export const deleteAcademic = (id) =>
  request(`/academics/${id}`, {
    method: "DELETE",
  });

// SKILLS

export const getSkills = () => request("/skills");

export const getSkillsByChild = (childId) =>
  request(`/skills/child/${childId}`);

export const createSkill = (skillData) =>
  request("/skills", {
    method: "POST",
    body: JSON.stringify(skillData),
  });

export const updateSkill = (id, skillData) =>
  request(`/skills/${id}`, {
    method: "PUT",
    body: JSON.stringify(skillData),
  });

export const deleteSkill = (id) =>
  request(`/skills/${id}`, {
    method: "DELETE",
  });

// ACHIEVEMENTS

export const getAchievements = () => request("/achievements");

export const getAchievementsByChild = (childId) =>
  request(`/achievements/child/${childId}`);

export const createAchievement = (achievementData) =>
  request("/achievements", {
    method: "POST",
    body: JSON.stringify(achievementData),
  });

export const updateAchievement = (id, achievementData) =>
  request(`/achievements/${id}`, {
    method: "PUT",
    body: JSON.stringify(achievementData),
  });

export const deleteAchievement = (id) =>
  request(`/achievements/${id}`, {
    method: "DELETE",
  });

// OBSERVATIONS

export const getObservations = () => request("/observations");

export const getObservationsByChild = (childId) =>
  request(`/observations/child/${childId}`);

export const createObservation = (observationData) =>
  request("/observations", {
    method: "POST",
    body: JSON.stringify(observationData),
  });

export const updateObservation = (id, observationData) =>
  request(`/observations/${id}`, {
    method: "PUT",
    body: JSON.stringify(observationData),
  });

export const deleteObservation = (id) =>
  request(`/observations/${id}`, {
    method: "DELETE",
  });

// FOLLOW-UPS

export const getFollowUps = () => request("/follow-ups");

export const getFollowUpsByChild = (childId) =>
  request(`/follow-ups/child/${childId}`);

export const createFollowUp = (followUpData) =>
  request("/follow-ups", {
    method: "POST",
    body: JSON.stringify(followUpData),
  });

export const updateFollowUp = (id, followUpData) =>
  request(`/follow-ups/${id}`, {
    method: "PUT",
    body: JSON.stringify(followUpData),
  });

export const deleteFollowUp = (id) =>
  request(`/follow-ups/${id}`, {
    method: "DELETE",
  });

// ADMISSIONS

export const convertAdmissionToChild = (id, data) =>
  request(`/admissions/${id}/convert-to-child`, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const getAdmissions = () => request("/admissions");

export const getAdmissionById = (id) =>
  request(`/admissions/${id}`);

export const createAdmission = (admissionData) =>
  request("/admissions", {
    method: "POST",
    body: JSON.stringify(admissionData),
  });

export const updateAdmission = (id, admissionData) =>
  request(`/admissions/${id}`, {
    method: "PUT",
    body: JSON.stringify(admissionData),
  });

export const deleteAdmission = (id) =>
  request(`/admissions/${id}`, {
    method: "DELETE",
  });

// WELLBEING

export const getWellbeings = () => request("/wellbeing");

export const getWellbeingByChild = (childId) =>
  request(`/wellbeing/child/${childId}`);

export const createWellbeing = (wellbeingData) =>
  request("/wellbeing", {
    method: "POST",
    body: JSON.stringify(wellbeingData),
  });

export const updateWellbeing = (id, wellbeingData) =>
  request(`/wellbeing/${id}`, {
    method: "PUT",
    body: JSON.stringify(wellbeingData),
  });

export const deleteWellbeing = (id) =>
  request(`/wellbeing/${id}`, {
    method: "DELETE",
  });

// RESPONSIBILITIES

export const getResponsibilities = () => request("/responsibilities");

export const getResponsibilitiesByChild = (childId) =>
  request(`/responsibilities/child/${childId}`);

export const createResponsibility = (responsibilityData) =>
  request("/responsibilities", {
    method: "POST",
    body: JSON.stringify(responsibilityData),
  });

export const updateResponsibility = (id, responsibilityData) =>
  request(`/responsibilities/${id}`, {
    method: "PUT",
    body: JSON.stringify(responsibilityData),
  });

export const deleteResponsibility = (id) =>
  request(`/responsibilities/${id}`, {
    method: "DELETE",
  });

// FAMILY

export const getFamilies = () => request("/family");

export const getFamilyByChild = (childId) =>
  request(`/family/child/${childId}`);

export const createFamily = (familyData) =>
  request("/family", {
    method: "POST",
    body: JSON.stringify(familyData),
  });

export const updateFamily = (id, familyData) =>
  request(`/family/${id}`, {
    method: "PUT",
    body: JSON.stringify(familyData),
  });

export const deleteFamily = (id) =>
  request(`/family/${id}`, {
    method: "DELETE",
  });

// DOCUMENTS

export const getDocuments = () => request("/documents");

export const getDocumentsByChild = (childId) =>
  request(`/documents/child/${childId}`);

export const createDocument = (documentData) =>
  request("/documents", {
    method: "POST",
    body: JSON.stringify(documentData),
  });

export const updateDocument = (id, documentData) =>
  request(`/documents/${id}`, {
    method: "PUT",
    body: JSON.stringify(documentData),
  });

export const deleteDocument = (id) =>
  request(`/documents/${id}`, {
    method: "DELETE",
  });

// MENTORS

export const getMentors = () => request("/mentors");

export const createMentor = (data) =>
  request("/mentors", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateMentor = (id, data) =>
  request(`/mentors/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteMentor = (id) =>
  request(`/mentors/${id}`, {
    method: "DELETE",
  });