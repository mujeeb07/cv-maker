
export default function EducationForm({cv, setCv}) {
    
    const handleChange = (index, field, value) => {
        const newEdu = [...cv.education];
        newEdu[index][field]  = value;
        setCv({
            ...cv, 
            education: newEdu
        });
    };

    const addEducation = () => {
        setCv({
            ...cv,
            education: [...cv.education, {degree:"", institute:"", year:""}]
        });
    };

    const removeEducation = (index) => {
        const newEdu = cv.education.filter((_, i) => i !== index)
        setCv({
            ...cv,
            education: newEdu.length ? newEdu : [{degree:"", institute:"", year:""}]
        })
    }

    return(
        <div className="mb-6">
            <h2 className='text-xl font-bold mb-2'>Education</h2>

            {cv.education.map((edu, index) => (
                <div key={index} className="border p-2 mb-2 rounded">
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

                    <input 
                        placeholder="Year"
                        value={edu.year}
                        onChange={(e) => handleChange(index, "year", e.target.value)}
                        className="input"
                    />

                    <button
                        onClick={() => removeEducation(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Remove
                    </button>
                </div>
            ))}

            <button
                onClick={addEducation}
                className="px-4 py-2 bg-black text-white rounded"
            >
                + Add Education
            </button>
        </div>
    );
}