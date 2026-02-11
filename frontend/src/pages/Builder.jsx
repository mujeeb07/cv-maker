import React, { useState, useRef } from "react";

import initialCV from "../data/initialCV";
import PersonalForm from "../components/forms/PersonalForm";
import SkillsForm from "../components/forms/SkillsForm";
import EducationForm from "../components/forms/EducationForm";
import ExprienceForm from "../components/forms/ExperienceForm";
import ProjectForm from "../components/forms/ProjectsForm";
import PreviewRenderer from "../components/preview/PreviewRenderer";

import axiosInstance from "../api/axiosConfig";
import { Save, Download, FolderOpen, Layout as LayoutIcon } from "lucide-react";
import Layout from "../components/Layout";
import { Button } from "../components/ui/Button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/Accordion";
import { Card } from "../components/ui/Card";
import ThemeToggle from "../components/ui/ThemeToggle";

export default function Builder() {
  const [cv, setCv] = useState(initialCV);
  const [cvId, setCvId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const previewRef = useRef(null);
  // Accordion State
  const [openSection, setOpenSection] = useState("personal");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  const saveCV = async () => {
    setIsSaving(true);
    try {
      if (cvId) {
        await axiosInstance.put(`/cv/${cvId}`, cv);
        console.log("CV:", cv);
        alert("CV updated successfully");
      } else {
        const response = await axiosInstance.post("/cv", cv);
        console.log("Response axios:", response.data);
        setCvId(response.data._id);
        // alert("CV saved with ID:" + response.data._id);
        alert("CV saved successfully!");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to save CV");
    } finally {
      setIsSaving(false);
    }
  };

  const loadCV = async (id) => {
    if (!id) {
      alert("Invalid ID");
      return;
    }

    try {
      const response = await axiosInstance.get(`/cv/${id}`);
      const data = response.data;

      const cleanCV = {
        personal: data.personal || initialCV.personal,
        skills: data.skills?.length ? data.skills : initialCV.skills,
        education: data.education?.length
          ? data.education
          : initialCV.education,
        experience: data.experience?.length
          ? data.experience
          : initialCV.experience,
        projects: data.projects?.length ? data.projects : initialCV.projects,
        template: data.template || initialCV.template,
      };

      setCv(cleanCV);
      setCvId(data._id);
      console.log("current id:", data._id);
    } catch (error) {
      console.error(error);
      alert("Failed to load CV. Check ID.");
    }
  };

//   const downloadCV = async () => {
//     try {
//       const htmlContent = previewRef.current.innerHTML;

//       const fullHtml = `
//             <!DOCTYPE html>
//             <html>
//                 <head>
//                     <meta charset="UTF-8" />
//                     <script src="https://cdn.tailwindcss.com"></script>
//                     <style>
//                     @page {
//                         size: A4;
//                         margin: 20mm;
//                     }

//                     body {
//                         margin: 0;
//                     }

//                     .page {
//                         width: 170mm;
//                         margin: 0 auto;
//                     }
//                     </style>
//                 </head>
//                 <body>
//                     <div class="page">
//                         ${htmlContent}
//                     </div>
//                 </body>
//             </html>
//             `;

//       const response = await axiosInstance.post(
//         "/cv/download-html",
//         { html: fullHtml },
//         { responseType: "blob" },
//       );

//       const blob = new Blob([response.data], { type: "application/pdf" });
//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "cv.pdf";

//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Download failed:", error);
//     }
//   };


// const downloadCV = async () => {
//   try {
//     const htmlContent = previewRef.current.innerHTML;

//     const fullHtml = `
//           <!DOCTYPE html>
//           <html>
//               <head>
//                   <meta charset="UTF-8" />
//                   <script src="https://cdn.tailwindcss.com"></script>
//                   <style>
//                   @page {
//                       size: A4;
//                       margin: 10mm 8mm;
//                   }

//                   body {
//                       margin: 0;
//                       padding: 0;
//                   }

//                   </style>
//               </head>
//               <body>
//                   <div class="page">
//                       ${htmlContent}
//                   </div>
//               </body>
//           </html>
//           `;

//     const response = await axiosInstance.post(
//       "/cv/download-html",
//       { html: fullHtml },
//       { responseType: "blob" },
//     );

//     const blob = new Blob([response.data], { type: "application/pdf" });
//     const url = window.URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "cv.pdf";

//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//     window.URL.revokeObjectURL(url);
//   } catch (error) {
//     console.error("Download failed:", error);
//   }
// };

// const downloadCV = async () => {
//   try {
//     const htmlContent = previewRef.current.innerHTML;

//     const fullHtml = `
//           <!DOCTYPE html>
//           <html>
//               <head>
//                   <meta charset="UTF-8" />
//                   <script src="https://cdn.tailwindcss.com"></script>
//                   <style>
//                   @page {
//                       size: A4;
//                       margin: 0;
//                   }

//                   html, body {
//                       margin: 0;
//                       padding: 0;
//                   }

//                   /* Remove shadow and min-height for PDF */
//                   .shadow-xl, .shadow-2xl {
//                       box-shadow: none !important;
//                   }
                  
//                   [class*="min-h-"] {
//                       min-height: auto !important;
//                   }
//                   </style>
//               </head>
//               <body>
//                   ${htmlContent}
//               </body>
//           </html>
//           `;

//     const response = await axiosInstance.post(
//       "/cv/download-html",
//       { html: fullHtml },
//       { responseType: "blob" },
//     );

//     const blob = new Blob([response.data], { type: "application/pdf" });
//     const url = window.URL.createObjectURL(blob);

//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "cv.pdf";

//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//     window.URL.revokeObjectURL(url);
//   } catch (error) {
//     console.error("Download failed:", error);
//   }
// };


const downloadCV = async () => {
  try {
    const htmlContent = previewRef.current.innerHTML;

    const fullHtml = `
          <!DOCTYPE html>
          <html>
              <head>
                  <meta charset="UTF-8" />
                  <script src="https://cdn.tailwindcss.com"></script>
                  <style>
                  @page {
                      size: A4;
                      margin: 0;
                  }

                  * {
                      -webkit-print-color-adjust: exact;
                      print-color-adjust: exact;
                      box-sizing: border-box;
                  }

                  html, body {
                      margin: 0;
                      padding: 0;
                      width: 100%;
                      height: auto;
                  }

                  body > * {
                      /* Remove shadows from PDF */
                      box-shadow: none !important;
                      /* Remove forced min-height that causes blank pages */
                      min-height: auto !important;
                      /* Ensure proper width */
                      width: 210mm !important;
                      max-width: 210mm !important;
                      margin: 0 auto !important;
                  }

                  /* Prevent orphaned content */
                  h1, h2, h3, h4, h5, h6 {
                      page-break-after: avoid;
                      break-after: avoid;
                  }

                  section, div[class*="mb-"] {
                      page-break-inside: avoid;
                      break-inside: avoid;
                  }

                  /* Allow natural page breaks for long content */
                  @media print {
                      body {
                          height: auto;
                      }
                  }
                  </style>
              </head>
              <body>
                  ${htmlContent}
              </body>
          </html>
          `;

    const response = await axiosInstance.post(
      "/cv/download-html",
      { html: fullHtml },
      { responseType: "blob" },
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "cv.pdf";

    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
  }
};
return (
    <Layout showThemeToggle={false}>
      <div className="flex flex-col h-screen">
        {/* Top Navigation Bar */}
        <header className="h-16 bg-[var(--bg-card)] border-b border-[var(--border-color)] flex items-center justify-between px-6 shadow-sm z-20 relative">
          <div className="flex items-center space-x-3">
            <div className="bg-[var(--primary-color)] p-2 rounded-lg text-white shadow-lg shadow-indigo-500/20">
              <LayoutIcon className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
              CV Builder
            </h1>
          </div>

          <div className="flex items-center space-x-3">
            <ThemeToggle />

            <div className="h-6 w-px bg-[var(--border-color)] mx-2 hidden md:block"></div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const id = prompt("Enter CV ID to load:");
                if (id) loadCV(id);
              }}
              className="hidden md:flex gap-2"
            >
              <FolderOpen className="w-4 h-4" />
              <span>Load</span>
            </Button>

            <Button onClick={saveCV} disabled={isSaving} className="gap-2">
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : "Save"}</span>
            </Button>

            <Button
              variant="outline"
              onClick={downloadCV}
              className="gap-2 hidden md:flex"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Editor */}
          <div className="w-full md:w-[400px] lg:w-[450px] bg-[var(--bg-secondary)] border-r border-[var(--border-color)] overflow-y-auto custom-scrollbar flex flex-col z-10">
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                  Editor
                </h2>
                <p className="text-[var(--text-secondary)] text-sm">
                  Customize your resume sections
                </p>
              </div>

              {/* Template Selection */}
              <Card className="p-4 space-y-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  Select Template
                </h3>
                <select
                  value={cv.template}
                  onChange={(e) => setCv({ ...cv, template: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-background)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition-colors text-sm"
                >
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                  <option value="minimal">Minimal</option>
                  <option value="sidebar">Sidebar</option>
                  <option value="ats">ATS Friendly</option>
                </select>
              </Card>

              <Accordion className="space-y-2">
                <AccordionItem className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] px-4">
                  <AccordionTrigger
                    onClick={() => toggleSection("personal")}
                    isOpen={openSection === "personal"}
                  >
                    Personal Details
                  </AccordionTrigger>
                  <AccordionContent isOpen={openSection === "personal"}>
                    <PersonalForm cv={cv} setCv={setCv} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] px-4">
                  <AccordionTrigger
                    onClick={() => toggleSection("education")}
                    isOpen={openSection === "education"}
                  >
                    Education
                  </AccordionTrigger>
                  <AccordionContent isOpen={openSection === "education"}>
                    <EducationForm cv={cv} setCv={setCv} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] px-4">
                  <AccordionTrigger
                    onClick={() => toggleSection("experience")}
                    isOpen={openSection === "experience"}
                  >
                    Experience
                  </AccordionTrigger>
                  <AccordionContent isOpen={openSection === "experience"}>
                    <ExprienceForm cv={cv} setCv={setCv} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] px-4">
                  <AccordionTrigger
                    onClick={() => toggleSection("skills")}
                    isOpen={openSection === "skills"}
                  >
                    Skills
                  </AccordionTrigger>
                  <AccordionContent isOpen={openSection === "skills"}>
                    <SkillsForm cv={cv} setCv={setCv} />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] px-4">
                  <AccordionTrigger
                    onClick={() => toggleSection("projects")}
                    isOpen={openSection === "projects"}
                  >
                    Projects
                  </AccordionTrigger>
                  <AccordionContent isOpen={openSection === "projects"}>
                    <ProjectForm cv={cv} setCv={setCv} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Right Panel - Preview(PDF) */}
          <div className="flex-1 bg-[var(--bg-background)] overflow-y-auto p-8 flex justify-center items-start relative">
            {/* Background dots */}
            <div
              className="absolute inset-0 z-0 opacity-[0.4]"
              style={{
                backgroundImage:
                  "radial-gradient(var(--text-tertiary) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Screen preview wrapper (with shadow) */}
            <div className="relative z-10 my-6 shadow-2xl shadow-zinc-900/10 dark:shadow-black/60">
              {/* Printable content ONLY */}
              <div ref={previewRef} className="bg-white w-[800px] max-w-full">
                <PreviewRenderer cv={cv} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}