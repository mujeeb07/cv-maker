import React from "react";

export default function SidebarPreview({ cv }) {
  const { personal = {}, skills = [], education = [], experience = [], projects = [] } = cv;

  return (
    <div className="bg-white text-gray-800 min-h-[297mm] w-[210mm] mx-auto shadow-xl flex">

      {/* LEFT SIDEBAR */}
      <div className="w-1/3 bg-gray-100 p-8">

        <h1 className="text-xl font-bold mb-4">
          {personal.fullName}
        </h1>

        <div className="text-xs text-gray-600 mb-6">
          <p>{personal.email}</p>
          {personal.phone && <p>{personal.phone}</p>}
          {personal.linkedin && <p>{personal.linkedin}</p>}
          {personal.github && <p>{personal.github}</p>}
        </div>

        {skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs uppercase font-semibold tracking-wider mb-3">
              Skills
            </h2>
            <ul className="text-sm space-y-1">
              {skills.filter(Boolean).map((skill, i) => (
                <li key={i}>• {skill}</li>
              ))}
            </ul>
          </div>
        )}

        {education.length > 0 && (
          <div>
            <h2 className="text-xs uppercase font-semibold tracking-wider mb-3">
              Education
            </h2>
            {education.map((edu, i) => (
              <div key={i} className="mb-3 text-sm">
                <p className="font-medium">{edu.degree}</p>
                <p className="text-xs text-gray-600">{edu.institute}</p>
                <p className="text-xs text-gray-500">{edu.year}</p>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* RIGHT CONTENT */}
      <div className="w-2/3 p-10">

        {personal.summary && (
          <section className="mb-8">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-3">
              Professional Summary
            </h2>
            <p className="text-sm leading-relaxed">
              {personal.summary}
            </p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
              Experience
            </h2>

            {experience.map((exp, i) => (
              <div key={i} className="mb-6">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-sm">
                    {exp.role}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {exp.start} - {exp.end}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {exp.company}
                </p>
                <p className="text-sm mt-2">
                  {exp.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {projects.length > 0 && (
          <section>
            <h2 className="text-sm uppercase tracking-wider text-gray-500 mb-4">
              Projects
            </h2>

            {projects.map((proj, i) => (
              <div key={i} className="mb-6">
                <h3 className="font-semibold text-sm">
                  {proj.title}
                </h3>
                <p className="text-xs text-gray-500">
                  {proj.tech}
                </p>
                <p className="text-sm mt-2">
                  {proj.description}
                </p>
              </div>
            ))}
          </section>
        )}

      </div>
    </div>
  );
}
