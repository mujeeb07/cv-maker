import React from "react";
export default function ModernPreview({ cv }) {
  const { personal = {}, skills = [], education = [], experience = [], projects = [] } = cv;

  return (
    <div className="bg-white text-gray-900 p-12 min-h-[297mm] w-[210mm] mx-auto shadow-xl">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-wide">
          {personal.fullName}
        </h1>

        <div className="mt-3 text-sm text-gray-600">
          {personal.email}
          {personal.phone && ` | ${personal.phone}`}
          {personal.linkedin && ` | ${personal.linkedin}`}
          {personal.github && ` | ${personal.github}`}
        </div>
      </div>

      {/* Divider */}
      <div className="h-[2px] bg-gray-300 mb-8"></div>

      {/* Professional Summary */}
      {personal.summary && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            {personal.summary}
          </p>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-3">
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {skills.filter(Boolean).map((skill, i) => (
              <span
                key={i}
                className="bg-gray-100 border border-gray-300 text-xs px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">
            Experience
          </h2>

          {experience.map((exp, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-base">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {exp.company}
                  </p>
                </div>

                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {exp.start} - {exp.end}
                </span>
              </div>

              <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">
            Projects
          </h2>

          {projects.map((proj, i) => (
            <div key={i} className="mb-6">
              <h3 className="font-semibold text-base">
                {proj.title}
              </h3>

              {proj.tech && (
                <p className="text-xs text-gray-500 mt-1">
                  {proj.tech}
                </p>
              )}

              <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                {proj.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">
            Education
          </h2>

          {education.map((edu, i) => (
            <div key={i} className="mb-4 flex justify-between">
              <div>
                <h3 className="font-semibold text-base">
                  {edu.degree}
                </h3>
                <p className="text-sm text-gray-600">
                  {edu.institute}
                </p>
              </div>

              <span className="text-xs text-gray-500 whitespace-nowrap">
                {edu.year}
              </span>
            </div>
          ))}
        </section>
      )}

    </div>
  );
}
