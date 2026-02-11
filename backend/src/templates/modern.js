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
    <title>Modern CV</title>

    <style>

      body {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 13px;
        line-height: 1.6;
        color: #222;
        padding: 35px 40px;
        margin: 0;
      }

      h1 {
        font-size: 26px;
        margin: 0 0 6px 0;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .contact {
        font-size: 12px;
        color: #666;
        margin-bottom: 18px;
      }

      hr {
        border: none;
        border-top: 2px solid #000;
        margin: 12px 0 18px 0;
      }

      h2 {
        font-size: 14px;
        margin: 20px 0 8px 0;
        text-transform: uppercase;
        border-bottom: 1px solid #000;
        padding-bottom: 4px;
      }

      .section {
        margin-bottom: 14px;
      }

      .item {
        margin-bottom: 12px;
      }

      .title {
        font-weight: bold;
      }

      .sub {
        font-size: 12px;
        color: #555;
      }

      ul {
        padding-left: 18px;
        margin: 6px 0;
      }

      li {
        margin-bottom: 4px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      td {
        vertical-align: top;
      }

      .right {
        text-align: right;
        font-size: 12px;
        color: #555;
        white-space: nowrap;
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

    <hr/>

    <!-- Summary -->
    ${
      personal.summary
        ? `
      <h2>Professional Summary</h2>
      <div class="section">
        ${personal.summary}
      </div>
    `
        : ""
    }

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
            exp => `
          <div class="item">
            <table>
              <tr>
                <td class="title">${exp.role || ""} - ${exp.company || ""}</td>
                <td class="right">${exp.start || ""} - ${exp.end || ""}</td>
              </tr>
            </table>
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
            proj => `
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
            edu => `
          <div class="item">
            <table>
              <tr>
                <td class="title">${edu.degree || ""} - ${edu.institute || ""}</td>
                <td class="right">${edu.year || ""}</td>
              </tr>
            </table>
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
