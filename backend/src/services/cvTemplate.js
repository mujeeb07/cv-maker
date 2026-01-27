const cvTemplate = (cv) => {
    const {personal, skills, education, experience , projects} = cv
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <title>CV</title>
            <style>
            body { font-family: Arial; padding: 30px; }
            h1 { margin-bottom: 5px; }
            h2 { border-bottom: 1px solid #000; margin-top: 20px; }
            .item { margin-bottom: 8px; }
            </style>
        </head>
        <body>

            <h1>${personal.fullName || ""}</h1>
            <p>${personal.email || ""} | ${personal.phone || ""}</p>
            <p>${personal.linkedin || ""} | ${personal.github || ""}</p>

            <h2>Skills</h2>
            <ul>
            ${skills.map(s => `<li>${s}</li>`).join("")}
            </ul>

            <h2>Education</h2>
            ${education.map(e => `
            <div class="item">
                <b>${e.degree}</b> - ${e.institute} (${e.year})
            </div>
            `).join("")}

            <h2>Experience</h2>
            ${experience.map(e => `
            <div class="item">
                <b>${e.role}</b> at ${e.company} (${e.start} - ${e.end})
                <div>${e.description}</div>
            </div>
            `).join("")}

            <h2>Projects</h2>
            ${projects.map(p => `
            <div class="item">
                <b>${p.title}</b> (${p.tech})
                <div>${p.description}</div>
            </div>
            `).join("")}

        </body>
        </html>
    `;
};

module.exports = cvTemplate;