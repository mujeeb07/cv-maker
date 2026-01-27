let puppeteer =  require("puppeteer");

const generatePdf = async () => {
    try {
        const browser = puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html, {waitUntil:"networkidle0"});
        const buffer = await page.pdf({
            format: "A4",
            printBackground:true
        });
        await browser.close();
        return buffer;
    } catch (error) {
        
    }
}

module.exports = generatePdf;