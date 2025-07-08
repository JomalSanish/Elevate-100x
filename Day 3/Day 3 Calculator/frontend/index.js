const { response } = require("express");

function calculate(operation) {
    // const num1 = document.getElementById("num1").value;
    // const num2 = document.getElementById("num2").value;

    // fetch(`http://localhost:3000/${operation}`, {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         "num1": num1, "num2": num2
    //     }),
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         document.getElementById('ans').innerText = data.answer;
    //     }
    //     )


    const value1 = document.getElementById("num1").value;
    const value2 = document.getElementById("num2").value;
    axios.post(`http://localhost:3000/${operation}`, {
        "num1": value1,
        "num2": value2
    })
    .then(function(response) {
        document.getElementById('ans').innerText = `Result ${response.data.answer}`;
    }
)
    axios.get(`http://localhost:3000/${operation}/${value1}/${value2}`)
    .then(function(response) {
        document.getElementById('ans').innerText = `Result ${response.data.answer}`;
    }
)
    axios.get(`http://localhost:3000/${operation}/?num1=${value1}&num2=${value2}`)
    .then(function(response) {
        document.getElementById('ans').innerText = `Result ${response.data.answer}`;
    }
)

};

