import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import SectionCard from '../components/profile/SectionCard';
import Loader from '../components/Loader';
import { profileAPI } from '../api/profileApi';

const ActionButtons = ({ onEdit, onDelete }) => (
  <div className="flex gap-2 shrink-0 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-200">
    <button onClick={onEdit} className="text-gray-300 hover:text-white transition-colors p-1.5 bg-gray-700/50 hover:bg-gray-600 rounded" title="Edit">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
    </button>
    <button onClick={onDelete} className="text-red-400 hover:text-red-300 transition-colors p-1.5 bg-gray-700/50 hover:bg-gray-600 rounded" title="Delete">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
    </button>
  </div>
);

import {
  BasicInfoForm,
  SkillForm,
  ProjectForm,
  ExperienceForm,
  EducationForm,
  CertificationForm,
  SocialLinkForm
} from '../components/profile/ProfileForms';

const formatDate = (date) =>
  new Date(date).toLocaleString("default", {
    month: "short",
    year: "numeric",
  });

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Complete profile state — matches backend CompleteProfileResponse shape
  const [basic, setBasic] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [activeModal, setActiveModal] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await profileAPI.getProfile();
      const data = response.data;
      console.log('[Profile] API response:', data);

      // Map response into individual state slices
      setBasic(data?.basic || null);
      setSkills(data?.skills || []);
      setProjects(data?.projects || []);
      setExperience(data?.experience || []);
      setEducation(data?.education || []);
      setCertifications(data?.certifications || []);
      setSocialLinks(data?.social_links || []);
    } catch (error) {
      console.error('[Profile] Failed to load profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const openModal = (type, item = null) => {
    setActiveModal(type);
    setEditItem(item);
  };
  const closeModal = () => {
    setActiveModal(null);
    setEditItem(null);
  };

  const handleSubmit = async (apiCall, successMsg) => {
    try {
      setSaving(true);
      const result = await apiCall();
      console.log('[Profile] Save result:', result?.data);
      toast.success(successMsg);
      await fetchProfile();
      closeModal();
    } catch (error) {
      console.error('[Profile] Save failed:', error?.response?.data || error);
      const detail = error?.response?.data?.detail;
      toast.error(typeof detail === 'string' ? detail : 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (apiCall, successMsg) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await apiCall();
      toast.success(successMsg);
      await fetchProfile();
    } catch (error) {
      console.error('[Profile] Delete failed:', error?.response?.data || error);
      toast.error('Failed to delete item');
    }
  };

  if (!user || loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen bg-dark">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
            <p className="text-gray-400">Manage your resume information and preferences</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded transition-colors text-sm"
          >
            Logout
          </button>
        </div>

        {/* Basic Info */}
        <SectionCard
          title="Basic Information"
          onAdd={() => openModal('basic', { phone: basic?.phone || '', summary: basic?.summary || '' })}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500 text-xs uppercase tracking-wider">Name</label>
              <p className="text-white text-lg">{user?.first_name} {user?.last_name}</p>
            </div>
            <div>
              <label className="text-gray-500 text-xs uppercase tracking-wider">Email</label>
              <p className="text-white text-lg">{user?.email}</p>
            </div>
            <div>
              <label className="text-gray-500 text-xs uppercase tracking-wider">Phone</label>
              <p className="text-white text-lg">{basic?.phone || 'Not set'}</p>
            </div>
            <div className="md:col-span-2">
              <label className="text-gray-500 text-xs uppercase tracking-wider">Professional Summary</label>
              <p className="text-white text-base mt-1 whitespace-pre-wrap">
                {basic?.summary || 'Add a summary to enhance your AI generated resumes.'}
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Skills */}
        <SectionCard title="Skills" onAdd={() => openModal('skill')}>
          {skills.length === 0 ? <p className="text-gray-500 text-sm">No skills added yet.</p> : (
            <div className="flex flex-wrap gap-3">
              {skills.map(skill => (
                <div key={skill.id} className="bg-[#1f2937] border border-gray-700 rounded-lg px-3 py-2 flex items-center gap-2 group hover:bg-[#374151] transition-all duration-200">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">{skill.skill_type}</span>
                  <span className="text-white text-sm font-medium ml-1 mr-1">{skill.skill_name}</span>
                  <div className="pl-3 border-l border-gray-600 flex items-center">
                    <ActionButtons onEdit={() => openModal('skill', skill)} onDelete={() => handleDelete(() => profileAPI.deleteSkill(skill.id), 'Skill deleted')} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Projects */}
        <SectionCard title="Projects" onAdd={() => openModal('project')}>
          {projects.length === 0 ? <p className="text-gray-500 text-sm">No projects added yet.</p> : (
            <div className="space-y-3">
              {projects.map(proj => (
                <div key={proj.id} className="group p-4 rounded-xl border border-transparent hover:border-gray-700 hover:bg-[#1f2937] transition-all duration-200">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-1">{proj.title}</h4>
                      {proj.github_url && <a href={proj.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline inline-block mb-1 break-all">GitHub Link</a>}
                      {proj.tech_stack && <p className="text-sm text-gray-400 mb-2 font-mono break-all">{proj.tech_stack}</p>}
                      <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{proj.description}</p>
                    </div>
                    <ActionButtons onEdit={() => openModal('project', proj)} onDelete={() => handleDelete(() => profileAPI.deleteProject(proj.id), 'Project deleted')} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Experience */}
        <SectionCard title="Experience" onAdd={() => openModal('experience')}>
          {experience.length === 0 ? <p className="text-gray-500 text-sm">No experience added yet.</p> : (
            <div className="space-y-3">
              {experience.map(exp => (
                <div key={exp.id} className="group p-4 rounded-xl border border-transparent hover:border-gray-700 hover:bg-[#1f2937] transition-all duration-200">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white">{exp.role}</h4>
                      <div className="text-blue-400 font-medium text-sm mt-1">{exp.company_name}</div>
                      <div className="text-gray-400 text-sm mt-1 mb-2">
                        {exp.start_date ? (
                          <span>
                            {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : "Present"}
                          </span>
                        ) : (
                          exp.duration
                        )}
                      </div>
                      {exp.description && <p className="text-gray-300 text-sm whitespace-pre-wrap leading-relaxed">{exp.description}</p>}
                    </div>
                    <ActionButtons onEdit={() => openModal('experience', exp)} onDelete={() => handleDelete(() => profileAPI.deleteExperience(exp.id), 'Experience deleted')} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Education */}
        <SectionCard title="Education" onAdd={() => openModal('education')}>
          {education.length === 0 ? <p className="text-gray-500 text-sm">No education added yet.</p> : (
            <div className="space-y-3">
              {education.map(edu => (
                <div key={edu.id} className="group p-4 rounded-xl border border-transparent hover:border-gray-700 hover:bg-[#1f2937] transition-all duration-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white">{edu.college}</h4>
                      <div className="text-gray-300 text-sm mt-1">
                        <span className="font-medium text-blue-400">{edu.degree}</span>
                      </div>
                      <div className="text-gray-400 text-sm mt-1">Graduated: {edu.year || 'N/A'}</div>
                    </div>
                    <ActionButtons onEdit={() => openModal('education', edu)} onDelete={() => handleDelete(() => profileAPI.deleteEducation(edu.id), 'Education deleted')} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Certifications & Social Links */}
        <div className="flex flex-col gap-6">
          <SectionCard title="Certifications" onAdd={() => openModal('certification')}>
            {certifications.length === 0 ? <p className="text-gray-500 text-sm">No certs added yet.</p> : (
              <div className="space-y-3">
                {certifications.map(cert => (
                  <div key={cert.id} className="group p-4 rounded-xl border border-transparent hover:border-gray-700 hover:bg-[#1f2937] transition-all duration-200">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white">{cert.title}</h4>
                        <div className="text-blue-400 text-sm mt-1">{cert.issuer}</div>
                        {cert.issue_date && <div className="text-gray-400 text-sm mt-1">Issued: {cert.issue_date}</div>}
                        {cert.credential_url && (
                          <a href={cert.credential_url} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-blue-400 hover:text-blue-300 text-sm hover:underline break-all">
                            View Credential
                          </a>
                        )}
                      </div>
                      <ActionButtons onEdit={() => openModal('certification', cert)} onDelete={() => handleDelete(() => profileAPI.deleteCertification(cert.id), 'Certification deleted')} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </SectionCard>

          <SectionCard title="Social Links" onAdd={() => openModal('socialLink')}>
            {socialLinks.length === 0 ? <p className="text-gray-500 text-sm">No social links added yet.</p> : (
              <div className="space-y-3">
                {socialLinks.map(link => (
                  <div key={link.id} className="group flex flex-col md:flex-row justify-between md:items-center bg-[#1f2937] p-4 rounded-xl border border-gray-700 hover:bg-[#374151] transition-all duration-200 shadow-sm hover:shadow">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-3 flex-1 min-w-0 pr-4 mb-3 md:mb-0">
                      <span className="font-semibold text-gray-400 capitalize shrink-0">{link.platform}:</span>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm break-all font-medium">
                        {link.username ? `@${link.username}` : link.url}
                      </a>
                    </div>
                    <ActionButtons onEdit={() => openModal('socialLink', link)} onDelete={() => handleDelete(() => profileAPI.deleteSocialLink(link.id), 'Link deleted')} />
                  </div>
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        {/* Modals */}
        {activeModal === 'basic' && (
          <BasicInfoForm
            initialData={editItem}
            onClose={closeModal}
            loading={saving}
            onSubmit={(data) => handleSubmit(() => profileAPI.updateBasicInfo(data), 'Basic info updated')}
          />
        )}
        {activeModal === 'skill' && (
          <SkillForm
            initialData={editItem}
            onClose={closeModal}
            loading={saving}
            onSubmit={(data) => handleSubmit(
              () => editItem ? profileAPI.updateSkill(editItem.id, data) : profileAPI.addSkill(data),
              editItem ? 'Skill updated' : 'Skill added'
            )}
          />
        )}
        {activeModal === 'project' && (
          <ProjectForm
            initialData={editItem}
            onClose={closeModal}
            loading={saving}
            onSubmit={(data) => handleSubmit(
              () => editItem ? profileAPI.updateProject(editItem.id, data) : profileAPI.addProject(data),
              editItem ? 'Project updated' : 'Project added'
            )}
          />
        )}
        {activeModal === 'experience' && (
          <ExperienceForm
            initialData={editItem}
            onClose={closeModal}
            loading={saving}
            onSubmit={(data) => handleSubmit(
              () => editItem ? profileAPI.updateExperience(editItem.id, data) : profileAPI.addExperience(data),
              editItem ? 'Experience updated' : 'Experience added'
            )}
          />
        )}
        {activeModal === 'education' && (
          <EducationForm
            initialData={editItem}
            onClose={closeModal}
            loading={saving}
            onSubmit={(data) => handleSubmit(
              () => editItem ? profileAPI.updateEducation(editItem.id, data) : profileAPI.addEducation(data),
              editItem ? 'Education updated' : 'Education added'
            )}
          />
        )}
        {activeModal === 'certification' && (
          <CertificationForm
            initialData={editItem}
            onClose={closeModal}
            loading={saving}
            onSubmit={(data) => handleSubmit(
              () => editItem ? profileAPI.updateCertification(editItem.id, data) : profileAPI.addCertification(data),
              editItem ? 'Certification updated' : 'Certification added'
            )}
          />
        )}
        {activeModal === 'socialLink' && (
          <SocialLinkForm
            initialData={editItem}
            onClose={closeModal}
            loading={saving}
            onSubmit={(data) => handleSubmit(
              () => editItem ? profileAPI.updateSocialLink(editItem.id, data) : profileAPI.addSocialLink(data),
              editItem ? 'Social link updated' : 'Social link added'
            )}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
