require('dotenv').config()
const { statusCodes } = require("../utils");

const validateToken = (req, res, next) => {
    
    const token = process.env.APP_ACCESS_TOKEN;
    let providedToken = req.headers["x-access-token"];

    if (!providedToken) {
        return res.status(statusCodes.AUTH_TOKEN_ROLE_ERROR).json({
            message: 'No access TOKEN supplied',
            statusCode: statusCodes.AUTH_TOKEN_ROLE_ERROR
        });
    }

    if (providedToken != token) {
        return res.status(statusCodes.AUTH_TOKEN_ROLE_ERROR).json({
            message: 'Invalid access TOKEN',
            statusCode: statusCodes.AUTH_TOKEN_ROLE_ERROR
        });
    }
    next();
};

module.exports = {
    validateToken
}