module.exports = (cv) => {
  const { personal = {}, skills = [], education = [], experience = [], projects = [] } = cv;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>ATS CV</title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        padding: 40px;
        font-size: 14px;
        line-height: 1.6;
        color: #000;
      }

      h1 {
        font-size: 22px;
        margin-bottom: 5px;
        text-transform: uppercase;
      }

      h2 {
        font-size: 14px;
        margin-top: 20px;
        margin-bottom: 8px;
        border-bottom: 1px solid #000;
        text-transform: uppercase;
      }

      .section {
        margin-bottom: 15px;
      }

      ul {
        padding-left: 18px;
        margin: 5px 0;
      }

      li {
        margin-bottom: 4px;
      }

      .item {
        margin-bottom: 10px;
      }

      .small {
        font-size: 12px;
      }

    </style>
  </head>
  <body>

    <h1>${personal.fullName || ""}</h1>
    <div class="section">
      ${personal.email || ""}
      ${personal.phone ? " | " + personal.phone : ""}
      ${personal.linkedin ? " | " + personal.linkedin : ""}
      ${personal.github ? " | " + personal.github : ""}
    </div>

    ${skills.length ? `
      <h2>Skills</h2>
      <div class="section">
        <ul>
          ${skills.map(skill => `<li>${skill}</li>`).join("")}
        </ul>
      </div>
    ` : ""}

    ${experience.length ? `
      <h2>Experience</h2>
      <div class="section">
        ${experience.map(exp => `
          <div class="item">
            <strong>${exp.role || ""} - ${exp.company || ""}</strong><br/>
            <span class="small">${exp.start || ""} - ${exp.end || ""}</span>
            <div>${exp.description || ""}</div>
          </div>
        `).join("")}
      </div>
    ` : ""}

    ${projects.length ? `
      <h2>Projects</h2>
      <div class="section">
        ${projects.map(proj => `
          <div class="item">
            <strong>${proj.title || ""}</strong><br/>
            <span class="small">${proj.tech || ""}</span>
            <div>${proj.description || ""}</div>
          </div>
        `).join("")}
      </div>
    ` : ""}

    ${education.length ? `
      <h2>Education</h2>
      <div class="section">
        ${education.map(edu => `
          <div class="item">
            <strong>${edu.degree || ""} - ${edu.institute || ""}</strong><br/>
            <span class="small">${edu.year || ""}</span>
          </div>
        `).join("")}
      </div>
    ` : ""}

  </body>
  </html>
  `;
};
