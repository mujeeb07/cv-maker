
import { Trash2, Plus } from 'lucide-react';

export default function EducationForm({ cv, setCv }) {

    const handleChange = (index, field, value) => {
        const newEdu = [...cv.education];
        newEdu[index][field] = value;
        setCv({
            ...cv,
            education: newEdu
        });
    };

    const addEducation = () => {
        setCv({
            ...cv,
            education: [...cv.education, { degree: "", institute: "", year: "" }]
        });
    };

    const removeEducation = (index) => {
        const newEdu = cv.education.filter((_, i) => i !== index)
        setCv({
            ...cv,
            education: newEdu.length ? newEdu : [{ degree: "", institute: "", year: "" }]
        })
    }

    return (
        <div className="mb-6">
            <h2 className='text-xl font-bold mb-4 text-zinc-900 dark:text-gray-100 flex items-center'>
                Education
            </h2> 

            <div className="space-y-4">
                {cv.education.map((edu, index) => (
                    <div key={index} className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700/50 bg-white dark:bg-zinc-800/50 transition-all hover:border-indigo-300 dark:hover:border-indigo-700/50 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                            <input
                                placeholder="Degree"
                                value={edu.degree}
                                onChange={(e) => handleChange(index, "degree", e.target.value)}
                                className="input"
                            />

                            <input
                                placeholder="Institute/College"
                                value={edu.institute}
                                onChange={(e) => handleChange(index, "institute", e.target.value)}
                                className="input"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                placeholder="Year (e.g. 2020 - 2024)"
                                value={edu.year}
                                onChange={(e) => handleChange(index, "year", e.target.value)}
                                className="input mb-0"
                            />

                            <button
                                onClick={() => removeEducation(index)}
                                className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Remove Education"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={addEducation}
                className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
            >
                <Plus className="w-4 h-4" />
                <span>Add Education</span>
            </button>
        </div>
    );
}