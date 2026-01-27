
export default function ExprienceForm({cv, setCv}) {
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
            experience: [...cv.experience, {company:"", role:"", start:"", end:"", description:""}]
        })
    };

    const removeExperience = (index) => {
        const newExpr = cv.experience.filter((_, i) => i !== index);
        setCv({
            ...cv,
            experience: newExpr.length ? newExpr : [{company:"", role:"", start:"", end:"", description:""}]
        })
    };

    return(
        <div className="mb-6">
            <h2 className='text-xl font-bold mb-2'>Experience</h2>
            {cv.experience.map((exp, index) => (
                <div key={index} className="border p-2 mb-2 rounded">
                    <input 
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => handleChange(index, "company", e.target.value)}
                        className="input"
                    />

                    <input 
                        placeholder="Role"
                        value={exp.role}
                        onChange={(e) => handleChange(index, "role", e.target.value)}
                        className="input"
                    />

                    <input 
                        placeholder="Start"
                        value={exp.start}
                        onChange={(e) => handleChange(index, "start", e.target.value)}
                        className="input"
                    />

                    <input 
                        placeholder="End"
                        value={exp.end}
                        onChange={(e) => handleChange(index, "end", e.target.value)}
                        className="input"
                    />

                    <input 
                        placeholder="Description"
                        value={exp.description}
                        onChange={(e) => handleChange(index, "description", e.target.value)}
                        className="input"
                    />

                    <button
                        onClick={() => removeExperience(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Remove
                    </button>
                </div>
            ))}
            <button
                onClick={addExperience}
                className="px-4 py-2 bg-black text-white rounded"
            >
                + Add Experience
            </button>
        </div>
    )
}