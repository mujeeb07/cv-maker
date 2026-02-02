import { useState } from "react";
import initialCV from "../data/initialCV";
import PersonalForm from "../components/forms/PersonalForm";
import SkillsForm from "../components/forms/SkillsForm";
import EducationForm from "../components/forms/EducationForm";
import ExprienceForm from "../components/forms/ExperienceForm";
import ProjectForm from "../components/forms/ProjectsForm";

import TemplateOne from "../components/preview/TemplateOne";
import axiosInstance from "../api/axiosConfig";
import { Save, Download, FolderOpen, Layout } from 'lucide-react';
import ThemeToggle from "../components/ui/ThemeToggle";

export default function Builder() {

    const [cv, setCv] = useState(initialCV);
    const [cvId, setCvId] = useState(null)
    const [isSaving, setIsSaving] = useState(false);

    const saveCV = async () => {
        setIsSaving(true);
        try {
            if (cvId) {
                await axiosInstance.put(`/cv/${cvId}`);
                alert("CV updated successfully");
            } else {
                const response = await axiosInstance.post('/cv', cv);
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
    }

    const loadCV = async (id) => {
        if (!id) {
            alert("Invalid ID");
            return;
        }

        try {
            const response = await axiosInstance.get(`/cv/${id}`);
            const data = response.data

            const cleanCV = {
                personal: data.personal || initialCV.personal,
                skills: data.skills?.length ? data.skills : initialCV.skills,
                education: data.education?.length ? data.education : initialCV.education,
                experience: data.experience?.length ? data.experience : initialCV.experience,
                projects: data.projects?.length ? data.projects : initialCV.projects
            };

            setCv(cleanCV);
            setCvId(data._id);
            console.log("current id:", data._id)
        } catch (error) {
            console.error(error);
            alert("Failed to load CV. Check ID.");
        }
    }

    const downloadCV = () => {
        console.log(cvId)
        if (!cvId) {
            alert("Please save CV first!");
            return;
        }
        window.open(`http://localhost:5000/api/cv/${cvId}/pdf`);
    };

    return (
        <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-gray-100 font-sans transition-colors duration-300">
            {/* Top Navigation Bar */}
            <header className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 shadow-sm z-10 transition-colors duration-300">
                <div className="flex items-center space-x-3">
                    <div className="bg-indigo-600 p-2 rounded-lg text-white shadow-lg shadow-indigo-500/20">
                        <Layout className="w-5 h-5" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-white">CV Builder</h1>
                </div>

                <div className="flex items-center space-x-4">
                    <ThemeToggle />

                    <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800 mx-2"></div>

                    <button
                        onClick={() => {
                            const id = prompt("Enter CV ID to load:");
                            if (id) loadCV(id);
                        }}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        <FolderOpen className="w-4 h-4" />
                        <span>Load</span>
                    </button>

                    <button
                        onClick={saveCV}
                        disabled={isSaving}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-105"
                    >
                        <Save className="w-4 h-4" />
                        <span>{isSaving ? 'Saving...' : 'Save CV'}</span>
                    </button>

                    <button
                        onClick={downloadCV}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-sm font-medium border border-zinc-200 dark:border-zinc-700 transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left Panel - Editor */}
                <div className="w-1/2 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 overflow-y-auto custom-scrollbar transition-colors duration-300">
                    <div className="p-8 max-w-3xl mx-auto space-y-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Editor</h2>
                            <p className="text-zinc-500 dark:text-zinc-400 text-sm">Update your information below</p>
                        </div>

                        <div className="space-y-8">
                            <section className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700/50 transition-colors duration-300">
                                <PersonalForm cv={cv} setCv={setCv} />
                            </section>

                            <section className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700/50 transition-colors duration-300">
                                <SkillsForm cv={cv} setCv={setCv} />
                            </section>

                            <section className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700/50 transition-colors duration-300">
                                <EducationForm cv={cv} setCv={setCv} />
                            </section>

                            <section className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700/50 transition-colors duration-300">
                                <ExprienceForm cv={cv} setCv={setCv} />
                            </section>

                            <section className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700/50 transition-colors duration-300">
                                <ProjectForm cv={cv} setCv={setCv} />
                            </section>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Preview */}
                <div className="w-1/2 bg-zinc-100 dark:bg-zinc-950 overflow-y-auto p-8 flex justify-center items-start custom-scrollbar transition-colors duration-300">
                    <div className="w-full max-w-[210mm] print:w-full box-border">
                        <div className="shadow-2xl shadow-zinc-400/20 dark:shadow-black/50">
                            <TemplateOne cv={cv} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}