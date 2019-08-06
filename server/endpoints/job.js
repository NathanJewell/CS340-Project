var defaults = require("../defaults.js");
var dbutil = require("../dbutil.js");

module.exports = {
    select: function(req, res) {
        collectionFile = "selectJob.sql"
        idFile = "selectJobId.sql"
        data = Object.assign({}, req.params, req.body, req.query);

        sqlFile = collectionFile;
        if (data.hasOwnProperty("id") && data.id != undefined) {
            sqlFile = idFile;
        }
        query = dbutil.loadQueryString(defaults.dmlDir + sqlFile);

        dbutil.fillAndExecute(query, data).then(
            (sqlData) => {
                res.status = 200;
                res.json(sqlData);
                res.send("Query Successful")
            }).catch((err) => {
            res.status = err.status;
            res.send(err.reason)
        });
    },
    insert: function(req, res) {
        sqlFile = "insertJob.sql";
        data = Object.assign({}, req.params, req.body, req.query);
        query = dbutil.loadQueryString(defaults.dmlDir + sqlFile);

        dbutil.fillAndExecute(query, data, false).then(
            (sqlData) => {
                res.status = 200;
                res.json(sqlData);
                res.send("Query Successful")
            }).catch((err) => {
            res.status = err.status;
            res.send(err.reason)
        });
    }



}