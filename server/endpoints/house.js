var defaults = require("../defaults.js");

module.exports = {
    select: function(req, res) {
        sqlFile = "selectHouse.sql";
    },

    insertUpdate: function(req, res) {
        selectSql = "selectHouse.sql";
        //check if house exists
        //if exists, update
        //if not exists, insert
    },

    delete: function(req, res) {
        sqlFile = "deleteHouse.sql";
    }
};