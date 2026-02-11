import React from "react";

export default function MinimalPreview({ cv }) {
  const { personal = {}, skills = [], education = [], experience = [], projects = [] } = cv;

  return (
    <div className="bg-white text-gray-800 p-14 min-h-[297mm] w-[210mm] mx-auto font-sans shadow-xl">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-light tracking-wide">
          {personal.fullName}
        </h1>

        <p className="text-xs text-gray-500 mt-3">
          {personal.email}
          {personal.phone && ` · ${personal.phone}`}
          {personal.linkedin && ` · ${personal.linkedin}`}
          {personal.github && ` · ${personal.github}`}
        </p>
      </div>

      {/* Summary */}
      {personal.summary && (
        <section className="mb-10">
          <p className="text-sm leading-relaxed text-gray-700">
            {personal.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">
            Experience
          </h2>

          {experience.map((exp, i) => (
            <div key={i} className="mb-8">
              <div className="flex justify-between">
                <h3 className="font-medium text-sm">
                  {exp.role}
                </h3>
                <span className="text-xs text-gray-400">
                  {exp.start} – {exp.end}
                </span>
              </div>

              <p className="text-xs text-gray-500">
                {exp.company}
              </p>

              <p className="text-sm mt-2 text-gray-700 leading-relaxed">
                {exp.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">
            Projects
          </h2>

          {projects.map((proj, i) => (
            <div key={i} className="mb-8">
              <h3 className="font-medium text-sm">
                {proj.title}
              </h3>

              {proj.tech && (
                <p className="text-xs text-gray-400">
                  {proj.tech}
                </p>
              )}

              <p className="text-sm mt-2 text-gray-700 leading-relaxed">
                {proj.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">
            Skills
          </h2>

          <p className="text-sm text-gray-700">
            {skills.filter(Boolean).join(" · ")}
          </p>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section>
          <h2 className="text-xs uppercase tracking-widest text-gray-400 mb-6">
            Education
          </h2>

          {education.map((edu, i) => (
            <div key={i} className="mb-6">
              <h3 className="font-medium text-sm">
                {edu.degree}
              </h3>

              <p className="text-xs text-gray-500">
                {edu.institute}
              </p>

              <p className="text-xs text-gray-400">
                {edu.year}
              </p>
            </div>
          ))}
        </section>
      )}

    </div>
  );
}
