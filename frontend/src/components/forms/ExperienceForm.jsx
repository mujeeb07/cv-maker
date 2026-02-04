
import { Trash2, Plus, Briefcase } from 'lucide-react';

export default function ExperienceForm({ cv, setCv }) {
    const handleChange = (index, field, value) => {
        const newExpr = [...cv.experience];
        newExpr[index][field] = value;
        setCv({
            ...cv,
            experience: newExpr
        });
    };

    const addExperience = () => {
        setCv({
            ...cv,
            experience: [...cv.experience, { company: "", role: "", start: "", end: "", description: "" }]
        })
    };

    const removeExperience = (index) => {
        const newExpr = cv.experience.filter((_, i) => i !== index);
        setCv({
            ...cv,
            experience: newExpr.length ? newExpr : [{ company: "", role: "", start: "", end: "", description: "" }]
        })
    };

    return (
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <h2 className='text-xl font-bold mb-5 text-[var(--text-primary)] flex items-center gap-2'>
                <Briefcase className="w-5 h-5 text-[var(--primary-color)]" />
                Experience
            </h2>

            <div className="space-y-4">
                {cv.experience.map((exp, index) => (
                    <div key={index} className="p-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--primary-color)] hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider ml-1">Company</label>
                                <input
                                    placeholder="Company Name"
                                    value={exp.company}
                                    onChange={(e) => handleChange(index, "company", e.target.value)}
                                    className="input"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider ml-1">Role</label>
                                <input
                                    placeholder="Role / Job Title"
                                    value={exp.role}
                                    onChange={(e) => handleChange(index, "role", e.target.value)}
                                    className="input"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider ml-1">Start Date</label>
                                <input
                                    placeholder="e.g. 2020"
                                    value={exp.start}
                                    onChange={(e) => handleChange(index, "start", e.target.value)}
                                    className="input"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider ml-1">End Date</label>
                                <input
                                    placeholder="e.g. Present"
                                    value={exp.end}
                                    onChange={(e) => handleChange(index, "end", e.target.value)}
                                    className="input"
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-grow space-y-1.5">
                                <label className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider ml-1">Description</label>
                                <textarea
                                    placeholder="Describe your main responsibilities and achievements..."
                                    value={exp.description}
                                    onChange={(e) => handleChange(index, "description", e.target.value)}
                                    className="input min-h-[100px] resize-y leading-relaxed"
                                />
                            </div>

                            <button
                                onClick={() => removeExperience(index)}
                                className="mt-7 p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors duration-200 border border-transparent hover:border-red-200 dark:hover:border-red-900/30 self-start"
                                title="Remove Experience"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addExperience}
                className="mt-6 flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-[var(--primary-color)] bg-indigo-50 dark:bg-indigo-900/10 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 rounded-xl transition-all duration-200 border border-dashed border-indigo-200 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-700"
            >
                <Plus className="w-4 h-4" />
                <span>Add Another Position</span>
            </button>
        </div>
    )
}