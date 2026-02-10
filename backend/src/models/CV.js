const mongoose = require("mongoose");

const cvSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
            required: true
        },
        personal: {
            fullName: String,
            email: String,
            phone: String,
            linkedin: String,
            github: String,
            summary: String
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
        ],
        template: {
            type: String,
            default: "modern"
        }
    },
    {timestamps: true}
);

module.exports = mongoose.model("CV", cvSchema);