import React, { useState, useEffect } from 'react';
import ProfileModal from './ProfileModal';

// Shared Input Component
const Input = ({ label, type = "text", value, onChange, required = false, as = "input", rows, placeholder, helperText }) => (
  <div>
    <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
    {as === "textarea" ? (
      <textarea
        value={value}
        onChange={onChange}
        required={required}
        rows={rows || 3}
        placeholder={placeholder}
        className="w-full bg-dark border border-dark-border rounded px-3 py-2 text-white focus:outline-none focus:border-primary"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-dark border border-dark-border rounded px-3 py-2 text-white focus:outline-none focus:border-primary"
      />
    )}
    {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
  </div>
);

// ============================================================================
// Basic Info Form
// ============================================================================
export const BasicInfoForm = ({ initialData, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({ phone: '', summary: '' });
  useEffect(() => {
    if (initialData) setFormData({ phone: initialData.phone || '', summary: initialData.summary || '' });
  }, [initialData]);
  return (
    <ProfileModal title="Edit Basic Info" onClose={onClose} onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} loading={loading}>
      <Input label="Phone Number" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
      <Input label="Professional Summary" as="textarea" rows={4} placeholder="Brief overview of your professional background..." value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} />
    </ProfileModal>
  );
};

// ============================================================================
// Skill Form — fields: skill_name, skill_type
// ============================================================================
export const SkillForm = ({ initialData, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({ skill_name: '', skill_type: 'Technical' });
  useEffect(() => {
    if (initialData) setFormData({ skill_name: initialData.skill_name || '', skill_type: initialData.skill_type || 'Technical' });
  }, [initialData]);
  return (
    <ProfileModal title={initialData ? "Edit Skill" : "Add Skill"} onClose={onClose} onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} loading={loading}>
      <Input label="Skill Name" required placeholder="e.g., Python, React, SQL" value={formData.skill_name} onChange={(e) => setFormData({ ...formData, skill_name: e.target.value })} />
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1">Skill Type</label>
        <select
          value={formData.skill_type}
          onChange={(e) => setFormData({ ...formData, skill_type: e.target.value })}
          className="w-full bg-dark border border-dark-border rounded px-3 py-2 text-white focus:outline-none focus:border-primary"
        >
          <option value="Technical">Technical</option>
          <option value="Language">Language</option>
          <option value="Soft">Soft</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </ProfileModal>
  );
};

// ============================================================================
// Project Form — fields: title, description, tech_stack, github_url
// ============================================================================
export const ProjectForm = ({ initialData, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({ title: '', tech_stack: '', github_url: '', description: '' });
  useEffect(() => {
    if (initialData) setFormData({
      title: initialData.title || '',
      tech_stack: initialData.tech_stack || '',
      github_url: initialData.github_url || '',
      description: initialData.description || '',
    });
  }, [initialData]);
  return (
    <ProfileModal title={initialData ? "Edit Project" : "Add Project"} onClose={onClose} onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} loading={loading}>
      <Input label="Project Title" required placeholder="My Awesome Project" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
      <Input label="Tech Stack (comma separated)" placeholder="React, Node.js, PostgreSQL" value={formData.tech_stack} onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })} />
      <Input label="GitHub URL" type="url" placeholder="https://github.com/..." value={formData.github_url} onChange={(e) => setFormData({ ...formData, github_url: e.target.value })} />
      <Input label="Description" as="textarea" rows={3} required placeholder="Short description of the project..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
    </ProfileModal>
  );
};

// ============================================================================
// Experience Form — fields: company_name, role, duration, description
// ============================================================================
export const ExperienceForm = ({ initialData, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({ 
    company_name: '', 
    role: '', 
    duration: '', 
    start_date: '', 
    end_date: '', 
    description: '' 
  });
  const [isCurrent, setIsCurrent] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        company_name: initialData.company_name || '',
        role: initialData.role || '',
        duration: initialData.duration || '',
        start_date: initialData.start_date || '',
        end_date: initialData.end_date || '',
        description: initialData.description || '',
      });
      setIsCurrent(initialData.is_current === true || (initialData.start_date && !initialData.end_date && !initialData.duration));
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = { ...formData };
    if (isCurrent) {
        submissionData.end_date = null;
    }
    onSubmit(submissionData);
  };

  return (
    <ProfileModal title={initialData ? "Edit Experience" : "Add Experience"} onClose={onClose} onSubmit={handleSubmit} loading={loading}>
      <Input label="Company" required placeholder="Acme Corp" value={formData.company_name} onChange={(e) => setFormData({ ...formData, company_name: e.target.value })} />
      <Input label="Role / Title" required placeholder="Software Engineer" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} />
      
      <div className="grid grid-cols-2 gap-4">
        <Input 
          label="Start Date" 
          type="date" 
          required 
          value={formData.start_date || ""} 
          onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} 
        />
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-400 mb-1">End Date</label>
          <input 
            type="date" 
            value={formData.end_date || ""} 
            disabled={isCurrent}
            min={formData.start_date || ""}
            onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} 
            className="w-full bg-dark border border-dark-border rounded px-3 py-2 text-white focus:outline-none focus:border-primary disabled:opacity-50"
          />
        </div>
      </div>
      
      <div className="flex items-center mb-1">
        <input
          type="checkbox"
          id="isCurrentExp"
          checked={isCurrent}
          onChange={(e) => {
            setIsCurrent(e.target.checked);
            if (e.target.checked) setFormData(prev => ({ ...prev, end_date: '' }));
          }}
          className="mr-2"
        />
        <label htmlFor="isCurrentExp" className="text-sm text-gray-300 cursor-pointer">Currently Working</label>
      </div>

      <Input label="Description" as="textarea" rows={4} placeholder="Describe responsibilities and achievements..." value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
    </ProfileModal>
  );
};

// ============================================================================
// Education Form — fields: college, degree, year
// ============================================================================
export const EducationForm = ({ initialData, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({ college: '', degree: '', year: '' });
  useEffect(() => {
    if (initialData) setFormData({
      college: initialData.college || '',
      degree: initialData.degree || '',
      year: initialData.year || '',
    });
  }, [initialData]);
  return (
    <ProfileModal title={initialData ? "Edit Education" : "Add Education"} onClose={onClose} onSubmit={(e) => { e.preventDefault(); onSubmit({ ...formData, year: formData.year ? parseInt(formData.year) : null }); }} loading={loading}>
      <Input label="College / University" required placeholder="MIT" value={formData.college} onChange={(e) => setFormData({ ...formData, college: e.target.value })} />
      <Input label="Degree" required placeholder="B.Tech, M.Sc, MBA" value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} />
      <Input label="Graduation Year" type="number" placeholder="2024" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} />
    </ProfileModal>
  );
};

// ============================================================================
// Certification Form — fields: title, issuer, issue_date, credential_id, credential_url
// ============================================================================
export const CertificationForm = ({ initialData, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({ title: '', issuer: '', issue_date: '', credential_id: '', credential_url: '' });
  useEffect(() => {
    if (initialData) setFormData({
      title: initialData.title || '',
      issuer: initialData.issuer || '',
      issue_date: initialData.issue_date || '',
      credential_id: initialData.credential_id || '',
      credential_url: initialData.credential_url || '',
    });
  }, [initialData]);
  return (
    <ProfileModal title={initialData ? "Edit Certification" : "Add Certification"} onClose={onClose} onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} loading={loading}>
      <Input label="Certification Title" required placeholder="AWS Certified Developer" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
      <Input label="Issuer / Organization" required placeholder="Amazon Web Services" value={formData.issuer} onChange={(e) => setFormData({ ...formData, issuer: e.target.value })} />
      <Input label="Issue Date" type="date" value={formData.issue_date || ""} onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}/>
      <Input label="Credential ID" placeholder="ABCD-1234 (optional)" value={formData.credential_id} onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })} />
      <Input label="Credential URL" type="url" placeholder="https://verify.example.com/..." value={formData.credential_url} onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })} />
    </ProfileModal>
  );
};

// ============================================================================
// Social Link Form — fields: platform, url, username
// ============================================================================
const extractUsername = (url) => {
  try {
    const parsed = new URL(url);
    const parts = parsed.pathname.split("/").filter(Boolean);

    if (!parts.length) return "";

    const host = parsed.hostname.toLowerCase();

    if (host.includes("linkedin.com") && parts[0] === "in") return parts[1];
    if (host.includes("hackerrank.com") && parts[0] === "profile") return parts[1];
    if (host.includes("leetcode.com") && parts[0] === "u") return parts[1];
    if (host.includes("codechef.com") && parts[0] === "users") return parts[1];

    return parts[0];
  } catch {
    return "";
  }
};

export const SocialLinkForm = ({ initialData, onClose, onSubmit, loading }) => {
  const [formData, setFormData] = useState({ platform: '', url: '', username: '' });
  const [isManuallyEdited, setIsManuallyEdited] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({ 
        platform: initialData.platform || '', 
        url: initialData.url || '',
        username: initialData.username || ''
      });
      if (initialData.username) setIsManuallyEdited(true);
    }
  }, [initialData]);

  useEffect(() => {
    if (formData.url && !isManuallyEdited) {
      const extracted = extractUsername(formData.url);
      if (extracted && extracted !== formData.username) {
        setFormData(prev => ({ ...prev, username: extracted }));
      }
    }
  }, [formData.url, isManuallyEdited]);

  const handleUsernameChange = (e) => {
    setIsManuallyEdited(true);
    setFormData({ ...formData, username: e.target.value });
  };

  return (
    <ProfileModal title={initialData ? "Edit Social Link" : "Add Social Link"} onClose={onClose} onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} loading={loading}>
      <Input label="Platform (e.g., linkedin, github, twitter)" required placeholder="linkedin" value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value })} />
      <Input label="Profile URL" type="url" required placeholder="Enter profile URL" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} />
      <Input label="Username" placeholder="Username (auto-filled)" value={formData.username} onChange={handleUsernameChange} helperText="Auto-filled from URL, editable" />
    </ProfileModal>
  );
};
