import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => {
    // OAuth2 form format
    const formData = new URLSearchParams();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);
    return api.post('/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  getMe: () => api.get('/auth/me'),
};

// Job APIs
export const jobAPI = {
  getAll: (status = null) => {
    const params = status ? { status } : {};
    return api.get('/jobs/', { params });
  },
  getById: (id) => api.get(`/jobs/${id}`),
  updateStatus: (id, status) => api.patch(`/jobs/${id}`, { status }),
  delete: (id) => api.delete(`/jobs/${id}`),
};

// AI APIs
export const aiAPI = {
  analyzeJob: (jobData) => api.post('/ai/analyze-job', jobData),
};

// Interview Feedback APIs
export const interviewFeedbackAPI = {
  submit: (jobId, feedbackData) => api.post(`/jobs/${jobId}/interview-feedback`, feedbackData),
  get: (jobId) => api.get(`/jobs/${jobId}/interview-feedback`),
  generateImprovementPlan: (jobId) => api.post(`/jobs/${jobId}/improvement-plan`),
};

export default api;
