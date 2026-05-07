import React from 'react';

const ResumePreview = ({ resume }) => {
  if (!resume?.resume_data) return null;
  const data = resume.resume_data;

  return (
    <div className="space-y-6">

      {/* The Actual Document Preview (White Background for realism) */}
      <div className="bg-white text-gray-900 mx-auto rounded shadow-xl overflow-hidden print:shadow-none" style={{ minHeight: '1056px', width: '100%', maxWidth: '816px', padding: '48px 56px' }}>
        
        {/* Header / Personal Info */}
        {data.personal_info && (
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wide mb-1">
              {data.personal_info.first_name} {data.personal_info.last_name}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-sm text-gray-600">
              {data.personal_info.email && <span>{data.personal_info.email}</span>}
              {data.personal_info.phone && <span>• {data.personal_info.phone}</span>}
              {data.social_links?.linkedin && <span>• {data.social_links.linkedin}</span>}
              {data.social_links?.github && <span>• {data.social_links.github}</span>}
            </div>
          </div>
        )}

        {/* Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-800 uppercase border-b-2 border-gray-800 pb-1 mb-2">Professional Summary</h2>
            <p className="text-sm text-gray-700 leading-relaxed text-justify">
              {data.summary}
            </p>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-800 uppercase border-b-2 border-gray-800 pb-1 mb-2">Technical Skills</h2>
            <div className="text-sm text-gray-700">
               <div className="flex flex-wrap gap-x-2 gap-y-1">
                  {data.skills.map((skill, index) => (
                    <span key={index} className="font-medium">
                      {skill.name}{index < data.skills.length - 1 ? ',' : ''}
                    </span>
                  ))}
               </div>
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-800 uppercase border-b-2 border-gray-800 pb-1 mb-3">Professional Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-gray-900">{exp.role}</h3>
                    <span className="text-sm text-gray-600 font-medium whitespace-nowrap ml-4">
                      {exp.start_date ? exp.start_date.substring(0, 7) : ''} - {exp.is_current ? 'Present' : (exp.end_date ? exp.end_date.substring(0, 7) : '')}
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 font-medium italic mb-2">{exp.company_name}</div>
                  {exp.description && (
                    <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                      {exp.description.split('\n').filter(line => line.trim().length > 0).map((line, i) => (
                        <li key={i} className="pl-1 leading-snug text-justify">
                          {line.replace(/^[-*]\s*/, '')}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-800 uppercase border-b-2 border-gray-800 pb-1 mb-3">Projects</h2>
            <div className="space-y-4">
              {data.projects.map((proj, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-gray-900">{proj.title}</h3>
                        {proj.github_url && <a href={proj.github_url} className="text-xs text-blue-600 hover:underline">Link</a>}
                    </div>
                  </div>
                  {proj.tech_stack && proj.tech_stack.length > 0 && (
                    <div className="text-xs text-gray-600 italic mb-2">Technologies: {proj.tech_stack.join(', ')}</div>
                  )}
                  {proj.description && (
                    <ul className="list-disc list-outside ml-4 text-sm text-gray-700 space-y-1">
                      {proj.description.split('\n').filter(line => line.trim().length > 0).map((line, i) => (
                        <li key={i} className="pl-1 leading-snug text-justify">
                          {line.replace(/^[-*]\s*/, '')}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education & Certifications (Two column approach if both exist, otherwise block) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.education && data.education.length > 0 && (
            <div>
                <h2 className="text-sm font-bold text-gray-800 uppercase border-b-2 border-gray-800 pb-1 mb-3">Education</h2>
                <div className="space-y-3">
                {data.education.map((edu, idx) => (
                    <div key={idx}>
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-sm font-bold text-gray-900">{edu.degree}</h3>
                        </div>
                        <div className="text-sm text-gray-700">{edu.college}</div>
                        {edu.year && <div className="text-xs text-gray-600 font-medium">Graduated: {edu.year}</div>}
                    </div>
                ))}
                </div>
            </div>
            )}

            {data.certifications && data.certifications.length > 0 && (
            <div>
                <h2 className="text-sm font-bold text-gray-800 uppercase border-b-2 border-gray-800 pb-1 mb-3">Certifications</h2>
                <div className="space-y-3">
                {data.certifications.map((cert, idx) => (
                    <div key={idx}>
                        <h3 className="text-sm font-bold text-gray-900">{cert.title}</h3>
                        <div className="text-sm text-gray-700">{cert.issuer}</div>
                        {cert.issue_date && <div className="text-xs text-gray-600 font-medium">{cert.issue_date.substring(0, 4)}</div>}
                    </div>
                ))}
                </div>
            </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default ResumePreview;
