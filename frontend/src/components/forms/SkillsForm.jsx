export default function SkillsForm({cv, setCv}) {
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

    return(
        <div className="mb-6">
            <h2 className='text-xl font-bold mb-2'>Skills</h2>
            {cv.skills.map((skill, index) => (
                <div key={index} className="flex gap-2 mb-2">
                    <input 
                        value={skill}
                        onChange={(e) => handleChange(index, e.target.value)}
                        placeholder="Skill"
                        className="input"
                    />

                    <button 
                        onClick={() => removeSkill(index)}
                        className="px-3 bg-red-500 text-white rounded"
                    >
                        X
                    </button>
                </div>
            ))}

            <button 
                onClick={addSkill}
                className="px-4 py-2 bg-black text-white rounded"
            >
               + Add Skill
            </button>
        </div>
    )
}