const override = require('../../common-configuration/webpack/webpack.config.common.app.js');

module.exports = function (config) {
    config = override(config);

    // App specific config can be added here

    return config;
};