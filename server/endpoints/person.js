var defaults = require("../defaults.js");
var dbutil = require("../dbutil.js");

module.exports = {
    select: function(req, res) {
        collectionFile = "selectPerson.sql"
        idFile = "selectPersonId.sql"

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
        insertFile = "insertPerson.sql";
        updateFile = "updatePerson.sql";

        data = Object.assign({}, req.params, req.body, req.query);

        sqlFile = insertFile;
        if (data.hasOwnProperty("id") && data.id != undefined) {
            try {
                isValidId = await dbutil.entryWithId(data["id"], "person");
                if (isValidId) {
                    sqlFile = updateFile;
                }
            } catch (e) {
                console.log("UNABLE TO VALIDATE ID FOR PERSON UPDATE/INSERT");
                res.status = e.status;
                res.send(e.reason);
            }
        }

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