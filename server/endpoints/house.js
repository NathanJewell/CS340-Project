var defaults = require("../defaults.js");
var dbutil = require("../dbutil.js");

module.exports = {
    select: function(req, res) {
        collectionFile = "selectHouse.sql"
        idFile = "selectHouseId.sql"
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

    insertUpdate: function(req, res) {
        insertFile = "insertHouse.sql";
        updateFile = "updateHouse.sql";

        data = Object.assign({}, req.params, req.body, req.query);

        sqlFile = insertFile;
        if (data.hasOwnProperty("id") && data.id != undefined) {
            try {
                isValidId = await dbutil.entryWithId(data["id"], "house");
                if (isValidId) {
                    sqlFile = updateFile;
                }
            } catch(e) {
                console.log("UNABLE TO VALIDATE ID FOR HOUSE UPDATE/INSERT");
            }
        }

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
        //check if house exists
        //if exists, update
        //if not exists, insert
    },

    delete: function(req, res) {
        sqlFile = "deleteHouse.sql";
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
};
