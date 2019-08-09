var defaults = require("../defaults.js");
var dbutil = require("../dbutil.js");

module.exports = {
    select: function(req, res) {
        sqlFile = "selectNeighbor.sql";
        data = Object.assign({}, req.params, req.body, req.query);
        query = dbutil.loadQueryString(defaults.dmlDir + sqlFile);

        dbutil.fillAndExecute(query, data).then(
            (sqlData) => {
                res.status = 200;
                res.json(sqlData);
            }).catch((err) => {
            res.status = err.status;
            res.send(err.reason)
        });
    },

    insert: function(req, res) {
        sqlFile = "insertNeighbor.sql"
        data = Object.assign({}, req.params, req.body, req.query);
        query = dbutil.loadQueryString(defaults.dmlDir + sqlFile);

        dbutil.fillAndExecute(query, data, false).then(
            (sqlData) => {
                res.status = 200;
                res.json(sqlData);
            }).catch((err) => {
            res.status = err.status;
            res.send(err.reason)
        });
    },

    delete: function(req, res) {
        sqlFile = "deleteNeighbor.sql"
        data = Object.assign({}, req.params, req.body, req.query);
        query = dbutil.loadQueryString(defaults.dmlDir + sqlFile);

        dbutil.fillAndExecute(query, data, false).then(
            (sqlData) => {
                res.status = 200;
                res.json(sqlData);
            }).catch((err) => {
            res.status = err.status;
            res.send(err.reason)
        });

    }

};