import api from './api';

export const profileAPI = {
  // Returns complete profile: { basic, skills, projects, experience, education, certifications, social_links }
  getProfile: () => api.get('/user/profile'),

  // Basic Info — PUT /user/profile
  updateBasicInfo: (data) => api.put('/user/profile', data),

  // Skills
  addSkill: (data) => api.post('/user/skills', data),
  updateSkill: (id, data) => api.put(`/user/skills/${id}`, data),
  deleteSkill: (id) => api.delete(`/user/skills/${id}`),

  // Projects
  addProject: (data) => api.post('/user/projects', data),
  updateProject: (id, data) => api.put(`/user/projects/${id}`, data),
  deleteProject: (id) => api.delete(`/user/projects/${id}`),

  // Experience
  addExperience: (data) => api.post('/user/experience', data),
  updateExperience: (id, data) => api.put(`/user/experience/${id}`, data),
  deleteExperience: (id) => api.delete(`/user/experience/${id}`),

  // Education
  addEducation: (data) => api.post('/user/education', data),
  updateEducation: (id, data) => api.put(`/user/education/${id}`, data),
  deleteEducation: (id) => api.delete(`/user/education/${id}`),

  // Certifications
  addCertification: (data) => api.post('/user/certifications', data),
  updateCertification: (id, data) => api.put(`/user/certifications/${id}`, data),
  deleteCertification: (id) => api.delete(`/user/certifications/${id}`),

  // Social Links
  addSocialLink: (data) => api.post('/user/social-links', data),
  updateSocialLink: (id, data) => api.put(`/user/social-links/${id}`, data),
  deleteSocialLink: (id) => api.delete(`/user/social-links/${id}`),
};
