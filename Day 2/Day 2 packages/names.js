const axios = require('axios');
const fs = require('fs');
axios.get('https://raw.githubusercontent.com/dominictarr/random-name/refs/heads/master/first-names.json')
    .then(function (res) {
        for (var j = 65; j <= 90; j++) {
            var newdata = [];
            for (var i = 0; i < res.data.length; i++) {
                if (res.data[i][0].charCodeAt(0) === j) {
                    newdata.push(res.data[i]);
                }
            }
            fs.writeFile(`names/${String.fromCharCode(j)}.txt`, JSON.stringify(newdata), "utf-8", function (err) {
                if (err) console.error(err);
            });
        }
    });