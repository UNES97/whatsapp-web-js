const statusCodes = {
    SUCCESS: 200,
    CREATED: 201,
    AUTH_TOKEN_ROLE_ERROR: 220,
    BAD_REQUEST: 230,
    NOT_FOUND: 240,
    INTERNAL_SERVER_ERROR: 500,
    CUSTOM_ERROR: 250
};

const formatMoroccanNumber = (number) => {
    number = number.replace(/\D/g, '');
    if (number.startsWith('0')) number = number.substring(1);
    if (!number.startsWith('212')) number = '212' + number;
    return number + '@c.us';
};

module.exports = {
    statusCodes,
    formatMoroccanNumber
};
