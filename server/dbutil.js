var defaults = require("./defaults.js");

module.exports = {
    loadQueryString: function(queryFile) {
        var queryString = "";
        var lines = require('fs').readFileSync(queryFile, 'utf-8').split('\n');

        for (let line of lines) {
            if (line.startsWith("--") == false) {
                if (line.includes("--")) {
                    line = line.substring(0, line.indexOf("--"));
                }
                queryString += line.replace(/^\s+|\s+$/g, '') + ' ';
            }
        }

        return queryString;
    },

    fillAndExecute: function(queryString, data, usePaginationFeatures = true) {
        mysql = require('./dbcon.js');
        return new Promise((resolve, reject) => {
            //do parameter substituion from passed qstring
            for (let [key, val] of Object.entries(data)) {
                queryString = queryString.replace('@' + key, val);
            }

            //check for limit/offset to enable pagination
            let keys = Object.keys(data);

            if (usePaginationFeatures) {
                if (keys.includes("limit")) {
                    queryString += ` LIMIT ${data["limit"]}`;
                } else {
                    queryString += ` LIMIT ${defaults.limit}`;
                }
                if (keys.includes("offset")) {
                    queryString += ` OFFSET ${data["offset"]}`;
                }

            }

            //must reject if unfilled params remain
            if (queryString.includes("@")) {
                reject({
                    status: 400,
                    reason: "Missing required fields."
                });
            }

            mysql.pool.then((pool) => {
                pool.query(queryString).then((sqlResponse) => {
                    console.log("Successfully executed query: \n\t" + queryString);
                    resolve(sqlResponse);

                }).catch((err) => {
                    reject({
                        status: 400,
                        reason: "Query did not execute successfully:\n" + err + "\n" + queryString,
                        query: queryString
                    });
                });
            }).catch((err) => {
                console.log("Unable to connect to db.\n" + err);
            });
        });
    },

    entryWithId: function(id, table) {
        mysql = require('./dbcon.js');
        return new Promise((resolve, reject) => {
            queryString = "SELECT 1 FROM " + table + " t WHERE t.id=" + id;
            //must reject if unfilled params remain
            mysql.pool.then((pool) => {
                pool.query(queryString).then((sqlResponse) => {
                    if (sqlResponse.length) {
                        resolve(true);
                    }
                    resolve(sqlResponse);

                }).catch((err) => {
                    reject({
                        status: 400,
                        reason: "ID CHECK query failed:\n" + err
                    });
                });
            }).catch((err) => {
                console.log("Unable to connect to db.\n" + err);
            });
        });
    }
};