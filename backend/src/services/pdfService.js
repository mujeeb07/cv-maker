const { generatePdf } = require("html-pdf-node");

const generatePDF = async (html) => {
  const file = { content: html };
  const pdfBuffer = await generatePdf(file, { format: "A4" });
  return pdfBuffer;
};

module.exports = generatePDF;
