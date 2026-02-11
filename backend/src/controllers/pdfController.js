const generatePDF = require("../services/pdfService");

const downloadFromHTML = async (req, res) => {
    try {
        const { html } = req.body;

        if(!html) {
            res.status(400).json({message: "HTML content required."});
        }

        const pdfBuffer = await generatePDF(html);
        res.setHeader("Content-Type","application/pdf");
        res.setHeader("Content-Disposition", 'attachment; filename="cv.pdf" ');
        res.setHeader("Content-Length", pdfBuffer.length);
        
        res.end(pdfBuffer);
    } catch (error) {
        console.log("Error:", error)
        res.status(500).json({message:"Error whiler creating PDF"})
    }
}

module.exports = { downloadFromHTML };
