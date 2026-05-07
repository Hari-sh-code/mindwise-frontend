import api from './api';

export const resumeApi = {
  // Generate optimized resume based on job description
  generateResume: (data) => api.post('/resume/generate', data),
  
  // Get all paginated resumes for the user
  getResumes: (page = 1, pageSize = 10) => 
    api.get(`/resume/?page=${page}&page_size=${pageSize}`),
  
  // Get a specific resume by ID
  getResumeById: (id) => api.get(`/resume/${id}`),
  
  // Update resume data (editor)
  updateResume: (id, data) => api.put(`/resume/${id}`, data),
  
  // Compare two resumes
  compareResumes: (data) => api.post('/resume/compare', data),

  downloadResumePdf: async (id) => {
  const response = await api.get(`/resume/${id}/download`, {
    responseType: "blob",
  });
  return response.data;
},

};
