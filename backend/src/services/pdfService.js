const { generatePdf } = require("html-pdf-node");

const generatePDF = async (html) => {
  const file = { content: html };

  const options = {
    format: "A4",
    printBackground: true, 
    margin: {
      top: "0px",
      bottom: "0px",
      left: "0px",
      right: "0px"
    }
  };

  const pdfBuffer = await generatePdf(file, options);

  return pdfBuffer;
};

module.exports = generatePDF;
