
import { Trash2, Plus } from 'lucide-react';

export default function ProjectForm({ cv, setCv }) {

    const handleChange = (index, field, value) => {
        const newProject = [...cv.projects];
        newProject[index][field] = value;
        setCv({
            ...cv,
            projects: newProject
        });
    };

    const addProject = () => {
        setCv({
            ...cv,
            projects: [...cv.projects, { title: "", description: "", tech: "" }]
        });
    };

    const removeProject = (index) => {
        const newProjects = cv.projects.filter((_, i) => i !== index)
        setCv({
            ...cv,
            projects: newProjects.length ? newProjects : [{ title: "", description: "", tech: "" }]
        });
    };

    return (
        <div className="mb-6">
            <h2 className='text-xl font-bold mb-4 text-zinc-900 dark:text-gray-100 flex items-center'>Projects</h2>

            <div className="space-y-4">
                {cv.projects.map((pro, index) => (
                    <div key={index} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/50 transition-all hover:border-indigo-300 dark:hover:border-indigo-700/50 shadow-sm">
                        <div className="mb-3">
                            <input
                                placeholder="Project Title"
                                value={pro.title}
                                onChange={(e) => handleChange(index, "title", e.target.value)}
                                className="input font-semibold"
                            />
                        </div>

                        <div className="mb-3">
                            <textarea
                                placeholder="Project Description"
                                value={pro.description}
                                onChange={(e) => handleChange(index, "description", e.target.value)}
                                className="input min-h-[80px] resize-y"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                placeholder="Technologies Used (Comma separated)"
                                value={pro.tech}
                                onChange={(e) => handleChange(index, "tech", e.target.value)}
                                className="input mb-0"
                            />

                            <button
                                onClick={() => removeProject(index)}
                                className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Remove Project"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addProject}
                className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
            >
                <Plus className="w-4 h-4" />
                <span>Add Projects</span>
            </button>
        </div>
    )
}