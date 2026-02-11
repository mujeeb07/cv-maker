module.exports = (cv) => {
  const { personal = {}, skills = [], education = [], experience = [], projects = [] } = cv;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Minimal CV</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 50px;
        font-size: 13px;
        line-height: 1.6;
        color: #333;
      }

      h1 {
        font-weight: 300;
        font-size: 24px;
        margin-bottom: 5px;
      }

      .contact {
        font-size: 12px;
        color: #666;
        margin-bottom: 30px;
      }

      h2 {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 2px;
        color: #888;
        margin-top: 30px;
        margin-bottom: 10px;
      }

      .item {
        margin-bottom: 20px;
      }

      .small {
        font-size: 11px;
        color: #777;
      }

    </style>
  </head>
  <body>

    <h1>${personal.fullName || ""}</h1>

    <div class="contact">
      ${personal.email || ""}
      ${personal.phone ? " · " + personal.phone : ""}
      ${personal.linkedin ? " · " + personal.linkedin : ""}
      ${personal.github ? " · " + personal.github : ""}
    </div>

    ${personal.summary ? `
      <div class="item">
        <p>${personal.summary}</p>
      </div>
    ` : ""}

    ${experience.length ? `
      <h2>Experience</h2>
      ${experience.map(exp => `
        <div class="item">
          <strong>${exp.role || ""}</strong>
          <span class="small">${exp.start || ""} – ${exp.end || ""}</span><br/>
          <span class="small">${exp.company || ""}</span>
          <p>${exp.description || ""}</p>
        </div>
      `).join("")}
    ` : ""}

    ${projects.length ? `
      <h2>Projects</h2>
      ${projects.map(proj => `
        <div class="item">
          <strong>${proj.title || ""}</strong>
          <span class="small">${proj.tech || ""}</span>
          <p>${proj.description || ""}</p>
        </div>
      `).join("")}
    ` : ""}

    ${skills.length ? `
      <h2>Skills</h2>
      <p>${skills.join(" · ")}</p>
    ` : ""}

    ${education.length ? `
      <h2>Education</h2>
      ${education.map(edu => `
        <div class="item">
          <strong>${edu.degree || ""}</strong><br/>
          <span class="small">${edu.institute || ""}</span><br/>
          <span class="small">${edu.year || ""}</span>
        </div>
      `).join("")}
    ` : ""}

  </body>
  </html>
  `;
};
