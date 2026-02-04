export default function AtsPreview({ cv }) {
    const { personal, skills, education, experience, projects } = cv;

    return(
    <div className="bg-white text-black p-10 min-h-[297mm] w-[210mm] mx-auto text-sm leading-relaxed">
        {/* Header */}
        <div className="mb-6">
            <h1 className="text-2xl font-bold uppercase">
            {personal.fullName}
            </h1>

            <p>
            {personal.email}
            {personal.phone && ` | ${personal.phone}`}
            {personal.linkedin && ` | ${personal.linkedin}`}
            {personal.github && ` | ${personal.github}`}
            </p>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
            <div className="mb-5">
            <h2 className="font-bold uppercase border-b border-black mb-2">
                Skills
            </h2>
            <ul className="list-disc ml-5">
                {skills.filter(Boolean).map((skill, i) => (
                <li key={i}>{skill}</li>
                ))}
            </ul>
            </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
            <div className="mb-5">
            <h2 className="font-bold uppercase border-b border-black mb-2">
                Experience
            </h2>

            {experience.map((exp, i) => (
                <div key={i} className="mb-3">
                <p className="font-semibold">
                    {exp.role} - {exp.company}
                </p>
                <p className="text-xs">
                    {exp.start} - {exp.end}
                </p>
                <p>{exp.description}</p>
                </div>
            ))}
            </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
            <div className="mb-5">
            <h2 className="font-bold uppercase border-b border-black mb-2">
                Projects
            </h2>

            {projects.map((proj, i) => (
                <div key={i} className="mb-3">
                <p className="font-semibold">{proj.title}</p>
                <p className="text-xs">{proj.tech}</p>
                <p>{proj.description}</p>
                </div>
            ))}
            </div>
        )}

        {/* Education */}
        {education.length > 0 && (
            <div>
            <h2 className="font-bold uppercase border-b border-black mb-2">
                Education
            </h2>

            {education.map((edu, i) => (
                <div key={i} className="mb-2">
                <p className="font-semibold">
                    {edu.degree} - {edu.institute}
                </p>
                <p className="text-xs">{edu.year}</p>
                </div>
            ))}
            </div>
        )}

    </div>
    )
}