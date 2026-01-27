
export default function ProjectForm({cv, setCv}) {

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
            projects: [...cv.projects, {title:"", description:"", tech:""}]
        });
    };

    const removeProject = (index) => {
        const newProjects = cv.projects.filter((_,i) => i !== index)
        setCv({
            ...cv,
            projects: newProjects.length ? newProjects : [{title:"", description:"", tech:""}]
        });
    };

    return (
        <div className="mb-6">
            <h2 className='text-xl font-bold mb-2'>Projects</h2>
            {cv.projects.map((pro, index) => (
                <div key={index} className="border p-2 mb-2 rounded">
                    <input
                        placeholder="Title"
                        value={pro.title}
                        onChange={(e) => handleChange(index, "title", e.target.value)}
                        className="input"
                    />

                    <input
                        placeholder="Description"
                        value={pro.description}
                        onChange={(e) => handleChange(index, "description", e.target.value)}
                        className="input"
                    />

                    <input
                        placeholder="Tech"
                        value={pro.tech}
                        onChange={(e) => handleChange(index, "tech", e.target.value)}
                        className="input"
                    />

                    <button
                        onClick={() => removeProject(index)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Remove
                    </button>
                </div>
            ))}

            <button 
                onClick={addProject}
                className="px-4 py-2 bg-black text-white rounded"
            >
                + Add Projects
            </button>
        </div>
    )
}