// StudentSupportInfo 컨트롤러
const asyncHandler = require("express-async-handler");

const test = (req, res) => {
    try{
        res.send("test complete :)");
    } catch(error) {
        console.error(error);
        res.status(500);
    }
}


module.exports = { test };