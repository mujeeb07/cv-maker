const CV = require("../models/CV");
const renderTemplate = require("../services/templateService");
const generatePdf =  require("../services/pdfService")



const createCV = async (req, res) => {
    try{
        // const cv = await CV.create(req.body);
        const cv = await CV.create({
            ...req.body,
            user: req.userId
        })

        // console.log("create cv data:", cv)
        res.json(cv);
    }catch(err) {
        res.status(500).json({message:"Failed to save CV"});
        console.error("Error:",err);
    }
};

const getCV = async (req, res) => {
    console.log(req)
    // const {id} = req.userId;
    try {
        const cv = await CV.findOne({
            // _id: id,
            user: req.userId
        })
        console.log("getCV:",cv)
        res.json(cv);
    } catch (error) {
        console.error("Error:",error);
        res.status(500).json({message:"Failed to get CV"});
    }
}

const updateCV = async (req, res) => {
    try {
        
    const updatedCV = await CV.findByIdAndUpdate(
        req.params.id,
        {
            $set: {
            personal: req.body.personal,
            skills: req.body.skills,
            education: req.body.education,
            experience: req.body.experience,
            projects: req.body.projects,
            template: req.body.template
            }
        },
        {
            new: true,
            runValidators: true
        }
    );

    if(!updateCV) {
        res.status(404).json({message:"CV not founnd"});
    }

    res.status(200).json(updatedCV);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({message:"Failed to update CV"});
    }
}

const downloadCV = async (req, res) => {
    try {
        const { id } = req.params;
        const cv = await CV.findById(id);
        if(!cv) return res.status(404).json({message:"CV Not found"});

        const html = renderTemplate(cv);
        const pdfBuffer = await generatePdf(html);

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="cv.pdf"');
        res.setHeader("Content-Length", pdfBuffer.length);
        res.end(pdfBuffer);
    } catch (error) {
        console.error("PDF Error:",error);
        res.status(500).json({message:"Failed to generate pdf"});
    }
}


module.exports = { createCV, getCV, updateCV, downloadCV };