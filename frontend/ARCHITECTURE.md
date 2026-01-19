# MindWise Component Hierarchy

```
App.jsx (Main Router)
├── AuthProvider (Global Auth Context)
│   ├── Navbar (Always visible)
│   │
│   └── Routes
│       ├── Home (/)
│       │   └── Landing page with features
│       │
│       ├── Login (/login)
│       │   ├── Form with email/password
│       │   └── Loader (during submission)
│       │
│       ├── Register (/register)
│       │   ├── Form with user details
│       │   └── Loader (during submission)
│       │
│       ├── Dashboard (/dashboard) [PROTECTED]
│       │   ├── Filter buttons (by status)
│       │   ├── Loader (while loading)
│       │   └── JobCard[] (grid of job cards)
│       │       ├── StatusBadge
│       │       └── Match score display
│       │
│       ├── Analyze (/analyze) [PROTECTED]
│       │   ├── Job analysis form
│       │   └── Loader (during analysis)
│       │
│       ├── JobDetail (/jobs/:id) [PROTECTED]
│       │   ├── Job header with StatusBadge
│       │   ├── Status selector buttons
│       │   ├── Job description section
│       │   ├── AI Analysis section
│       │   │   ├── MatchScore (circular chart)
│       │   │   ├── SkillList (Required skills)
│       │   │   ├── SkillList (Your skills)
│       │   │   ├── SkillList (Skill gaps)
│       │   │   └── Preparation tips
│       │   └── Notes
│       │       ├── Note form
│       │       ├── Loader (while loading notes)
│       │       └── Note list with delete buttons
│       │
│       ├── Profile (/profile) [PROTECTED]
│       │   └── User information display
│       │
│       └── NotFound (/404 and *)
│           └── 404 error page
│
└── Toaster (Global toast notifications)
```

## Component Dependencies

### Shared Components
- **Navbar**: Used on all pages
- **Loader**: Used in Login, Register, Dashboard, Analyze, JobDetail, Notes
- **StatusBadge**: Used in JobCard and JobDetail
- **JobCard**: Used in Dashboard (array)
- **MatchScore**: Used in JobDetail
- **SkillList**: Used in JobDetail (3 instances)
- **Notes**: Used in JobDetail

### Context & Hooks
- **AuthContext**: Provides global auth state
- **useAuth**: Hook to access auth context
- **PrivateRoute**: Wrapper for protected routes

### API Layer
- **api.js**: Centralized API configuration
  - authAPI: register, login, getMe
  - jobAPI: getAll, getById, updateStatus, delete
  - aiAPI: analyzeJob
  - notesAPI: getAll, create, delete

## Data Flow

### Authentication
```
Register/Login Form
  → authAPI.register/login
  → Store token in localStorage
  → AuthContext.login()
  → Redirect to Dashboard
```

### Job Analysis
```
Analyze Form
  → aiAPI.analyzeJob(jobData)
  → Backend processes
  → Returns job with AI analysis
  → Redirect to JobDetail
```

### Job Management
```
Dashboard
  → jobAPI.getAll(status)
  → Display JobCard[] grid
  
JobCard Click
  → Navigate to /jobs/:id
  
JobDetail
  → jobAPI.getById(id)
  → Display full job + AI analysis
  → Load notes via notesAPI.getAll(jobId)
  
Status Update
  → jobAPI.updateStatus(id, status)
  → Update local state
```

### Notes Management
```
Notes Component
  → Load: notesAPI.getAll(jobId)
  → Add: notesAPI.create(jobId, content)
  → Delete: notesAPI.delete(noteId)
  → Update local state after each action
```

## Route Protection

**Public Routes:**
- `/` - Home
- `/login` - Login
- `/register` - Register
- `/404` - Not Found

**Protected Routes** (require authentication):
- `/dashboard` - Dashboard
- `/analyze` - Analyze Job
- `/jobs/:id` - Job Detail
- `/profile` - Profile

All protected routes wrapped in `<PrivateRoute>` which:
1. Checks if user is authenticated
2. Shows Loader while checking
3. Redirects to /login if not authenticated
4. Renders children if authenticated

## Styling System

**Tailwind Configuration:**
- Custom colors (primary, accent, dark variants)
- Custom animations (pulse-slow)
- Responsive breakpoints (sm, md, lg)

**Consistent Patterns:**
- Cards: `bg-dark-card border border-dark-border rounded-lg p-6`
- Buttons: `bg-primary hover:bg-primary-dark text-white rounded-lg`
- Inputs: `bg-dark-lighter border border-dark-border focus:ring-2 focus:ring-primary`
- Text: `text-white` (headers), `text-gray-400` (secondary)
