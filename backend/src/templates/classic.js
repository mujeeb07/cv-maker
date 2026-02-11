module.exports = (cv) => {
  const { personal = {}, skills = [], education = [], experience = [], projects = [] } = cv;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Classic CV</title>
    <style>

      body {
        font-family: "Times New Roman", serif;
        font-size: 13px;
        line-height: 1.6;
        color: #000;
        padding: 30px 35px;
        margin: 0;
      }

      h1 {
        text-align: center;
        font-size: 20px;
        text-transform: uppercase;
        margin-bottom: 6px;
      }

      .contact {
        text-align: center;
        font-size: 12px;
        margin-bottom: 18px;
      }

      hr {
        border: none;
        border-top: 1px solid #000;
        margin: 12px 0 20px 0;
      }

      h2 {
        font-size: 13px;
        text-transform: uppercase;
        margin: 18px 0 8px 0;
      }

      ul {
        padding-left: 18px;
        margin: 6px 0 12px 0;
      }

      .item {
        margin-bottom: 14px;
      }

      .item p {
        margin: 6px 0 0 0;
      }

      .small {
        font-size: 12px;
        font-style: italic;
      }

    </style>
  </head>
  <body>

    <h1>${personal.fullName || ""}</h1>

    <div class="contact">
      ${personal.email || ""}
      ${personal.phone ? " | " + personal.phone : ""}
      ${personal.linkedin ? " | " + personal.linkedin : ""}
      ${personal.github ? " | " + personal.github : ""}
    </div>

    <hr/>

    ${personal.summary ? `
      <h2>Professional Summary</h2>
      <p>${personal.summary}</p>
    ` : ""}

    ${skills.length ? `
      <h2>Skills</h2>
      <ul>
        ${skills.map(skill => `<li>${skill}</li>`).join("")}
      </ul>
    ` : ""}

    ${experience.length ? `
      <h2>Experience</h2>
      ${experience.map(exp => `
        <div class="item">
          <strong>${exp.role || ""}</strong><br/>
          ${exp.company || ""}<br/>
          <span class="small">${exp.start || ""} - ${exp.end || ""}</span>
          <p>${exp.description || ""}</p>
        </div>
      `).join("")}
    ` : ""}

    ${projects.length ? `
      <h2>Projects</h2>
      ${projects.map(proj => `
        <div class="item">
          <strong>${proj.title || ""}</strong><br/>
          <span class="small">${proj.tech || ""}</span>
          <p>${proj.description || ""}</p>
        </div>
      `).join("")}
    ` : ""}

    ${education.length ? `
      <h2>Education</h2>
      ${education.map(edu => `
        <div class="item">
          <strong>${edu.degree || ""}</strong><br/>
          ${edu.institute || ""}<br/>
          <span class="small">${edu.year || ""}</span>
        </div>
      `).join("")}
    ` : ""}

  </body>
  </html>
  `;
};
