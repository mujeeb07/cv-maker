const CV = require("../models/CV");
const generatePdf =  require("../services/pdfService")
const cvTemplate = require("../services/cvTemplate");

const createCV = async (req, res) => {
    try{
        const cv = await CV.create(req.body);
        // console.log("create cv data:", cv)
        res.json(cv);
    }catch(err) {
        res.status(500).json({message:"Failed to save CV"});
        console.error("Error:",err);
    }
};

const getCV = async (req, res) => {
    try {
        const cv = await CV.findById(req.params.id);
        // console.log("getCV:",cv)
        res.json(cv);
    } catch (error) {
        console.error("Error:",error);
        res.status(500).json({message:"Failed to get CV"});
    }
}

const updateCV = async (req, res) => {
    try {
        const cv = await CV.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.json(cv)
    } catch (error) {
        console.error("Error:", err);
        res.status(500).json({message:"Failed to update CV"});
    }
}

const downloadCV = async (req, res) => {
    try {
        const { id } = req.params;
        const cv = await CV.findById(id);
        if(!cv) return res.status(404).json({message:"CV Not found"});

        const html = cvTemplate(cv);
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