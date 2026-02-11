module.exports = (cv) => {
  const { personal = {}, skills = [], education = [], experience = [], projects = [] } = cv;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Sidebar CV</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
      }

      .container {
        display: flex;
      }

      .left {
        width: 30%;
        background: #f2f2f2;
        padding: 30px;
        font-size: 13px;
      }

      .right {
        width: 70%;
        padding: 40px;
        font-size: 13px;
      }

      h1 {
        font-size: 18px;
        margin-bottom: 10px;
      }

      h2 {
        font-size: 12px;
        text-transform: uppercase;
        margin-top: 20px;
        margin-bottom: 8px;
      }

      .item {
        margin-bottom: 15px;
      }

      .small {
        font-size: 11px;
        color: #666;
      }

    </style>
  </head>
  <body>

    <div class="container">

      <div class="left">
        <h1>${personal.fullName || ""}</h1>

        <div class="small">
          ${personal.email || ""}<br/>
          ${personal.phone || ""}<br/>
          ${personal.linkedin || ""}<br/>
          ${personal.github || ""}
        </div>

        ${skills.length ? `
          <h2>Skills</h2>
          <ul>
            ${skills.map(skill => `<li>${skill}</li>`).join("")}
          </ul>
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
      </div>

      <div class="right">

        ${personal.summary ? `
          <h2>Professional Summary</h2>
          <p>${personal.summary}</p>
        ` : ""}

        ${experience.length ? `
          <h2>Experience</h2>
          ${experience.map(exp => `
            <div class="item">
              <strong>${exp.role || ""}</strong>
              <span class="small">${exp.start || ""} - ${exp.end || ""}</span><br/>
              ${exp.company || ""}
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

      </div>

    </div>

  </body>
  </html>
  `;
};
