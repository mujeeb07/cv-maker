import React from "react";

export default function ModernPreview({ cv }) {
  const { personal = {}, skills = [], education = [], experience = [], projects = [] } = cv;

  return (
    <div className="bg-white text-gray-800 p-10 min-h-[297mm] w-[210mm] mx-auto shadow-xl">

      {/* Header */}
      <div className="border-b-2 border-gray-800 pb-4 mb-6">
        <h1 className="text-3xl font-bold tracking-wide">
          {personal.fullName}
        </h1>

        <p className="text-sm text-gray-600 mt-2">
          {personal.email}
          {personal.phone && ` | ${personal.phone}`}
          {personal.linkedin && ` | ${personal.linkedin}`}
          {personal.github && ` | ${personal.github}`}
        </p>
      </div>

      {/* Summary / About */}
      {personal.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-700 mb-3">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">
            {personal.summary}
          </p>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-700 mb-3">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.filter(Boolean).map((skill, i) => (
              <span
                key={i}
                className="bg-gray-200 text-sm px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-700 mb-3">
            Experience
          </h2>

          {experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-md">
                  {exp.role} - {exp.company}
                </h3>
                <span className="text-xs text-gray-500">
                  {exp.start} - {exp.end}
                </span>
              </div>

              <p className="text-sm text-gray-700 mt-1">
                {exp.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-700 mb-3">
            Projects
          </h2>

          {projects.map((proj, i) => (
            <div key={i} className="mb-4">
              <h3 className="font-semibold text-md">{proj.title}</h3>
              <p className="text-xs text-gray-500">{proj.tech}</p>
              <p className="text-sm mt-1">{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold uppercase tracking-wide text-gray-700 mb-3">
            Education
          </h2>

          {education.map((edu, i) => (
            <div key={i} className="mb-3 flex justify-between">
              <div>
                <p className="font-semibold">
                  {edu.degree} - {edu.institute}
                </p>
              </div>
              <span className="text-xs text-gray-500">
                {edu.year}
              </span>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
