import React from "react";

export default function ClassicPreview({ cv }) {
  const { personal = {}, skills = [], education = [], experience = [], projects = [] } = cv;

  return (
    <div className="bg-white text-black p-10 min-h-[297mm] w-[210mm] mx-auto font-serif text-sm leading-relaxed shadow-xl">

      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold uppercase">
          {personal.fullName}
        </h1>

        <p className="mt-2">
          {personal.email}
          {personal.phone && ` | ${personal.phone}`}
          {personal.linkedin && ` | ${personal.linkedin}`}
          {personal.github && ` | ${personal.github}`}
        </p>
      </div>

      <hr className="border-black mb-6" />

      {/* Professional Summary */}
      {personal.summary && (
        <section className="mb-5">
          <h2 className="font-bold uppercase mb-2">
            Professional Summary
          </h2>
          <p>{personal.summary}</p>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-5">
          <h2 className="font-bold uppercase mb-2">
            Skills
          </h2>
          <ul className="list-disc ml-5">
            {skills.filter(Boolean).map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="font-bold uppercase mb-3">
            Experience
          </h2>

          {experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <p className="font-bold">
                {exp.role}
              </p>
              <p>
                {exp.company}
              </p>
              <p className="italic text-xs">
                {exp.start} - {exp.end}
              </p>
              <p className="mt-1">
                {exp.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-5">
          <h2 className="font-bold uppercase mb-3">
            Projects
          </h2>

          {projects.map((proj, i) => (
            <div key={i} className="mb-4">
              <p className="font-bold">
                {proj.title}
              </p>
              <p className="italic text-xs">
                {proj.tech}
              </p>
              <p className="mt-1">
                {proj.description}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section>
          <h2 className="font-bold uppercase mb-3">
            Education
          </h2>

          {education.map((edu, i) => (
            <div key={i} className="mb-3">
              <p className="font-bold">
                {edu.degree}
              </p>
              <p>
                {edu.institute}
              </p>
              <p className="italic text-xs">
                {edu.year}
              </p>
            </div>
          ))}
        </section>
      )}

    </div>
  );
}
