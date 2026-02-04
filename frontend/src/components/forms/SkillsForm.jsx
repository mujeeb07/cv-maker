
import { X, Plus } from 'lucide-react';

export default function SkillsForm({ cv, setCv }) {
    const handleChange = (index, value) => {
        const newSkills = [...cv.skills];
        newSkills[index] = value;

        setCv({
            ...cv,
            skills: newSkills
        });
    };

    const addSkill = () => {
        setCv({
            ...cv,
            skills: [...cv.skills, ""]
        });
    };

    const removeSkill = (index) => {
        const newSkills = cv.skills.filter((_, i) => i !== index);
        setCv({
            ...cv,
            skills: newSkills.length ? newSkills : [""]
        })
    }

    return (
        <div className="mb-6">
            <h2 className='text-xl font-bold mb-4 text-zinc-900 dark:text-gray-100 flex items-center'>Skills</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cv.skills.map((skill, index) => (
                    <div key={index} className="flex gap-2 items-center">
                        <input
                            value={skill}
                            onChange={(e) => handleChange(index, e.target.value)}
                            placeholder="Skill"
                            className="input mb-0"
                        />

                        <button
                            onClick={() => removeSkill(index)}
                            className="p-3 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Remove Skill"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={addSkill}
                className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
            >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
            </button>
        </div>
    )
}