const axios = require('axios');
const fs = require('fs');

axios.get('https://raw.githubusercontent.com/dominictarr/random-name/refs/heads/master/first-names.json')
    .then(function (res) {
        var newdata = {};

        for (var i = 0; i < res.data.length; i++) {
            if (!newdata[res.data[i][0]]) {
                newdata[res.data[i][0]] = [];
            }
            newdata[res.data[i][0]].push(res.data[i]);
        }

        for (var key in newdata) {
            fs.writeFile(`names1/${key}.txt`, JSON.stringify(newdata[key], null, 2), "utf-8", function (err) {
                if (err) console.error(err);
            });
        }
    });
