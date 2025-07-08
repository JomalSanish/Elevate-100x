const fs = require("fs");
fs.readFile("hi.txt", "utf-8", function (err, data) {
    let newdata = "";
    for (let i = 0; i < data.length; i++) {
        if (data[i] != " ") {
            newdata += data[i];
        }
    }
    fs.writeFile("newhi.txt", newdata, "utf-8", function (err) {
        fs.readFile("newhi.txt", "utf-8", function (err, data) {
            let newdata = data.replaceAll("a", " ");
            fs.writeFile("new.txt", newdata, "utf-8", function (err) {
            });
        });
    });
});

