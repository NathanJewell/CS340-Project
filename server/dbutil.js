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

    fillAndExecute: function(queryString, data) {
        mysql = require('promise-mysql');
        return new Promise((resolve, reject) => {

            //do parameter substituion from passed qstring
            for (let [key, val] of Object.entries(data)) {
                queryString.replace(key, val);
            }

            if (queryString.includes("@")) {
                reject([400, "Missing required fields."])
            }

            mysql.pool.query(fillString, function(err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);

            });
        });
    }
};