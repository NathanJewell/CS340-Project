var defaults = require("./defaults.js");

module.exports = {
    loadQueryString: function(queryFile) {
        var queryString = "";
        var lineReader = require('lineread').createInterface({
            input: require('fs').createReadStream(queryFile)
        });

        lineReader.on('line', function(line) {
            if (line.startsWith("--") == false) {
                queryString += line.replace(/^\s+|\s+$/g, '');
            }
        });

        return queryString;
    },

    fillAndExecute: function(queryString, data, response) {
        mysql = require('promise-mysql');
        return new Promise((resolve, reject) => {

            //do parameter substituion from passed qstring
            for (let [key, val] of Object.entries(data)) {
                queryString.replace(key, val);
            }

            //check for limit/offset to enable pagination
            let keys = Object.keys(data);

            if (keys.includes("@limit")) {
                if (keys.includes("@offset")) {
                    queryString += ` OFFSET ${data["@offset"]}`;
                }
                queryString += ` LIMIT ${data["@limit"]}`;
            } else {
                queryString += ` LIMIT ${defaults.limit}`;
            }

            if (queryString.includes("@")) {
                reject([400, "Missing required fields."]);
            }

            mysql.pool.then((pool) => {
                pool.query(queryString).then((err, result) => {
                    if (err) {
                        reject(err);
                    }
                    console.log("Successfully executed query: \n\t" + queryString);
                    resolve(result);

                });
            }).catch((err) => {
                console.log("")
            });
        });
    }
};