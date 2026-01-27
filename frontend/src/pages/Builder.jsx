import { useState } from "react";
import initialCV from "../data/initialCV";
import PersonalForm from "../components/forms/PersonalForm";
import SkillsForm from "../components/forms/SkillsForm";
import EducationForm from "../components/forms/EducationForm";
import ExprienceForm from "../components/forms/ExperienceForm";
import ProjectForm from "../components/forms/ProjectsForm";

import TemplateOne from "../components/preview/TemplateOne";

export default function Builer() {

    const [cv, setCv] = useState(initialCV);
    const [cvId, setCvId] = useState(null)
    const saveCV = async () => {

        if(cvId) {
            const res = await fetch(`http://localhost:5000/api/cv/${cvId}`, {
                method:"PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(cv)
            });

            const data = await res.json();
            alert("CV updated");
        }else{
            const res = await fetch('http://localhost:5000/api/cv', {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify(cv)
            });
    
            const data = await res.json();
            // console.log("Data, response", data, cv)
            alert("CV saved with ID:" + data._id);
        }
    }

    const loadCV = async (id) => {
        if(!id) {
            alert("Invalid ID");
            return;
        }

        const res = await fetch(`http://localhost:5000/api/cv/${id}`);
        const data = await res.json();

        const cleanCV = {
            personal: data.personal || initialCV.personal,
            skills: data.skills?.length ? data.skills : initialCV.skills,
            education: data.education?.length ? data.education : initialCV.education,
            experience: data.experience?.length ? data.experience : initialCV.experience,
            projects: data.projects?.length ? data.projects : initialCV.projects
        };

        setCv(cleanCV);
        setCvId(data._id);
    }

    const downloadCV = () => {
        console.log(cvId)
        if(!cvId) {
            alert("Please save CV first!");
            return;
        }
        window.open(`http://localhost:5000/api/cv/${cvId}/pdf`);
    };

    return(
        <div className="flex h-screen">
            {/* Left - Form */}
            <div className="w-1/2 p-4 overflow-y-auto border-r">
                <PersonalForm cv={cv} setCv={setCv}/>
                <SkillsForm cv={cv} setCv={setCv}/>
                <EducationForm cv={cv} setCv={setCv}/>
                <ExprienceForm cv={cv} setCv={setCv} />
                <ProjectForm cv={cv} setCv={setCv}/>
            </div>

            {/* Right - Preview */}
            <div className="w-1/2 p-4 overflow-y-auto bg-gray-100">
                <TemplateOne cv={cv}/>
            </div>

            <button
                onClick={saveCV}
                className="fixed bottom-5 right-5 bg-green-600 text-white px-6 py-3 rounded"
            >
                Save CV
            </button>

            <button
                onClick={() => {
                    const id = prompt("Enter CV id:");
                    if(id) loadCV(id);

                }}

                className="fixed bottom-5 right-50 bg-blue-600 text-white px-6 py-3 rounded"
            >
                Load CV
            </button>

            <button
                onClick={downloadCV}
                className="fixed bottom-5 right-100 bg-blue-600 text-white px-6 py-3 rounded"
            >
                Downnload
            </button>
        </div>
    )
}