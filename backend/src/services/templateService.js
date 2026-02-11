const ats = require("../templates/ats");
const classic = require("../templates/classic");
const minimal = require("../templates/minimal");
const modern = require("../templates/modern");
const sidebar = require("../templates/sidebar");


const renderTemplate = (cv) => {
    switch (cv.template) {
        case "modern":
            return modern(cv);
        case "ats":
            return ats(cv);
        case "classic":
            return classic(cv);
        case "minimal":
            return minimal(cv);
        case "sidebar":
            return sidebar(cv);
        
        default:
            return modern(cv)
    }
}

module.exports = renderTemplate;
