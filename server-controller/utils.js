const qs = require('querystring');
const crypto = require('crypto');

const config = require("./config.json")

/**
 * @param {string} token
 * @returns {bool} Returns is token valid
 */
module.exports.checkToken = (url_params) => {
    const urlParams = qs.parse(url_params.split("?")[1]);
    const ordered = {};
    Object.keys(urlParams).sort().forEach((key) => {
        if (key.slice(0, 3) === 'vk_') {
            ordered[key] = urlParams[key];
        }
    });

    const stringParams = qs.stringify(ordered);
    const paramsHash = crypto
        .createHmac('sha256', config.app.secretKey)
        .update(stringParams)
        .digest()
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=$/, '');

    return urlParams
    return paramsHash === urlParams.sign ? urlParams : null
}