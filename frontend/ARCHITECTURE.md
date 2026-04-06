# MindWise Frontend - Resume & Profile Architecture

## Overview
The MindWise frontend was expanded to include a fully functional **AI Resume System** and a comprehensive **Profile Management System**. These modules integrate deeply with the existing job tracking application, enabling users to manage their foundational profile data and instantly generate, view, and download AI-tailored ATS-friendly resumes for specific jobs.

---

## 1. Directory Structure Additions
```text
src/
├── api/
│   ├── resumeApi.js        # AI Resume API endpoints
│   └── profileApi.js       # Profile CRUD endpoints
├── components/
│   ├── profile/            # Modular UI components for the Profile system
│   │   ├── ProfileForms.jsx
│   │   ├── ProfileModal.jsx
│   │   └── SectionCard.jsx
│   └── JobCard.jsx         # (Updated) Contains inline resume generation capabilities
└── pages/
    ├── Profile.jsx         # (Updated) Master Profile dashboard
    ├── ResumeList.jsx      # View all generated resumes
    └── ResumePreview.jsx   # ATS-friendly resume viewer/generator
```

---

## 2. Core Modules

### 2.1. AI Resume System
A seamless workflow that allows the user to generate, preview, and export customized resumes.
- **`ResumeList.jsx`**: A dedicated page (`/resumes`) fetching from `/resume/list` to display all generated resumes paired with their target company and job title.
- **`ResumePreview.jsx`**: An ATS-compliant read-only document layout rendered cleanly via Tailwind. 
  - **Generation Logic**: If a given `job_id` does not yet possess a generated resume (or returns a 404), an interactive "Generate Resume" workflow takes over.
  - **Exporting**: Once generated, users can click "Download PDF" (which parses a backend `blob` into a readable file) or "Regenerate" to rewrite the resume text.

### 2.2. Profile Management System
A fully dynamic CRUD platform replacing the previously static user profile page. 
- **The 7 Entities**: Managing `Basic Info`, `Skills`, `Projects`, `Experience`, `Education`, `Certifications`, and `Social Links`.
- **State Architecture**: `Profile.jsx` acts purely as the master state container. It maps out user sub-entities and orchestrates `BasicInfoForm`, `SkillForm`, `ExperienceForm`, etc., based on which `activeModal` state is invoked.
- **Reusable Atoms (`components/profile/`)**:
  - `SectionCard.jsx`: Standardizes borders, headings, and "Add" button inline placements.
  - `ProfileModal.jsx`: Ensures forms are elevated safely overlaying out of DOM bounds, enforcing mobile-friendly scrolling.
  - `ProfileForms.jsx`: Contains lightweight functional components mapped to standard input handling.

### 2.3. Job Board Interactivity (`JobCard.jsx`)
To enhance UX, the primary Dashboard was augmented so users do not have to leave the job list to request resumes.
- Checks `job.has_resume`. 
- Incorporates `e.stopPropagation()` to prevent overlapping link redirects.
- Features real-time state manipulation (`loading`, `downloading`) and auto-refreshes the Dashboard layout immediately following a successful generation operation.

---

## 3. Communication & API Layer
Instead of cluttering a single file, endpoints were strictly separated to align contextually with their controllers:

### `resumeApi.js`
Handles the core document automation.
- `getList()` – `GET /resume/list`
- `getPreview(jobId)` – `GET /resume/preview/{job_id}`
- `generate(jobId)` – `POST /resume/generate/{job_id}`
- `download(jobId)` – `GET /resume/download/{job_id}` (Specifies `responseType: 'blob'`)

### `profileApi.js`
Standardized REST interface establishing 18+ endpoints interacting with standard HTTP methods (`POST`, `PUT`, `DELETE`).
- `getProfile()` – `GET /user/profile` merges down arrays of entity objects.
- Endpoint patterns strictly map individual arrays (e.g., `POST /user/skills`, `DELETE /user/skills/{id}`).

---

## 4. State Management, UI & UX Best Practices
- **Data Hydration**: Shared forms (`ProfileForms`) automatically hydrate `initialData` into local `formData` state to simplify differences between *Editing* and *Adding* a record.
- **UX Blocking**: Async calls lock inputs via `disabled={loading}` and provide localized spinners mitigating double-submits.
- **Notifications**: Integrated cleanly with `react-hot-toast` mapping API failures effortlessly, guaranteeing immediate system success/failure updates.
- **Tailwind Restraints**: Styling adheres tightly to existing variables mapping purely to Dark Card backgrounds with standard `#1a1f26` and `primary` boundaries as previously declared in configuration rules.
