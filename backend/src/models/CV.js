const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
    {
        personal: {
            fullName: String,
            email: String,
            phone: String,
            linkedin: String,
            github: String
        },
        skills: [String],
        education: [
            {
                degree: String,
                institute: String,
                year: String
            }
        ],
        experience: [
            {
                company: String,
                role: String,
                start: String,
                end: String,
                description: String
            }
        ],
        projects: [
            {
                title: String,
                description: String,
                tech: String
            }
        ]
    },
    {timestamps: true}
);

module.exports = mongoose.model("CV", cvSchema);