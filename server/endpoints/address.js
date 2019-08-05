var defaults = require("../defaults.js");

module.exports = {
    select: function(req, res) {
        sqlFile = "selectAddress.sql";
    },

    insert: function(req, res) {
        sqlFile = "insertAddress.sql";
    }

};