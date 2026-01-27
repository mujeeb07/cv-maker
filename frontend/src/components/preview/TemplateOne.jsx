
export default function TemplateOne({cv}) {
    const { personal } = cv;

    return(
        <div className="bg-white p-6 shadow">
            <h1 className="text-2xl font-bold ">{personal.fullName}</h1>
            <p>{personal.email}</p>
            <p>{personal.phone}</p>
            <p>{personal.linkedin}</p>
            <p>{personal.github}</p>

            <h2 className="font-bold mt-4">Skills</h2>
            <ul>
                {cv.skills.filter(Boolean).map((skill, i) => (
                    <li key={i}>• {skill}</li>
                ))}
            </ul>

            <h2 className="font-bold mt-4">Education</h2>
            {cv.education.map((edu, i) => (
                <div key={i}>
                    <p className="font-semibold">{edu.degree}</p>
                    <p>{edu.institute} - {edu.year}</p>
                </div>
            ))}

            <h2 className="font-bold mt-4">Experience</h2>
            {cv.experience.map((exp, i) => (
                <div key={i}>
                    <p className="font-semibold">{exp.company}</p>
                    <p>{exp.role}</p>
                    <p>{exp.start}-{exp.end}</p>
                    <p>{exp.description}</p>
                </div>
            ))}

            <h2 className="font-bold mt-4">Projects</h2>
            {cv.projects.map((pro, i) => (
                <div key={i}>
                    <p className="font-semibold">{pro.title}</p>
                    <p>{pro.description}</p>
                    <p>{pro.tech}</p>
                </div>
            ))}
        </div>
    )
}