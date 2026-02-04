module.exports = (cv) => {
  const {
    personal = {},
    skills = [],
    education = [],
    experience = [],
    projects = []
  } = cv;

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>CV</title>
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        padding: 40px;
        color: #333;
      }

      h1 {
        margin-bottom: 5px;
        font-size: 28px;
        text-transform: uppercase;
      }

      .contact {
        font-size: 14px;
        margin-bottom: 20px;
        color: #555;
      }

      h2 {
        font-size: 16px;
        margin-top: 25px;
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 2px solid #000;
        text-transform: uppercase;
      }

      .section {
        margin-bottom: 15px;
      }

      .item {
        margin-bottom: 10px;
      }

      .title {
        font-weight: bold;
      }

      .sub {
        font-size: 13px;
        color: #555;
      }

      ul {
        padding-left: 18px;
        margin: 5px 0;
      }

      li {
        margin-bottom: 4px;
      }

      .row {
        display: flex;
        justify-content: space-between;
      }

    </style>
  </head>
  <body>

    <!-- Header -->
    <h1>${personal.fullName || ""}</h1>

    <div class="contact">
      ${personal.email || ""} 
      ${personal.phone ? " | " + personal.phone : ""}
      ${personal.linkedin ? " | " + personal.linkedin : ""}
      ${personal.github ? " | " + personal.github : ""}
    </div>

    <!-- Skills -->
    ${
      skills.length
        ? `
      <h2>Skills</h2>
      <div class="section">
        <ul>
          ${skills.map(skill => `<li>${skill}</li>`).join("")}
        </ul>
      </div>
    `
        : ""
    }

    <!-- Experience -->
    ${
      experience.length
        ? `
      <h2>Experience</h2>
      <div class="section">
        ${experience
          .map(
            (exp) => `
          <div class="item">
            <div class="row">
              <div class="title">${exp.role || ""} - ${exp.company || ""}</div>
              <div class="sub">${exp.start || ""} - ${exp.end || ""}</div>
            </div>
            <div class="sub">${exp.description || ""}</div>
          </div>
        `
          )
          .join("")}
      </div>
    `
        : ""
    }

    <!-- Projects -->
    ${
      projects.length
        ? `
      <h2>Projects</h2>
      <div class="section">
        ${projects
          .map(
            (proj) => `
          <div class="item">
            <div class="title">${proj.title || ""}</div>
            <div class="sub">${proj.tech || ""}</div>
            <div>${proj.description || ""}</div>
          </div>
        `
          )
          .join("")}
      </div>
    `
        : ""
    }

    <!-- Education -->
    ${
      education.length
        ? `
      <h2>Education</h2>
      <div class="section">
        ${education
          .map(
            (edu) => `
          <div class="item">
            <div class="row">
              <div class="title">${edu.degree || ""} - ${edu.institute || ""}</div>
              <div class="sub">${edu.year || ""}</div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `
        : ""
    }

  </body>
  </html>
  `;
};
