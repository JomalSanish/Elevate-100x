let num = 0;
window.onload = function(){
    fetch("http://localhost:3000/", {
        method: "GET",
    })
        .then(response => response.text())
        .then(newdata => {
            const data = JSON.parse(newdata);
            if (data.length > 0) {
                num = Math.max(...data.map(item => item.num));
            }
            data.forEach(element => {
                var newdiv = document.createElement("div");
                newdiv.innerHTML = `<br><div  id="${element.num}"style="display: flex;"><button onClick=remove(this)>*</button><h4>${element.newentry}</h4></div>`;
                document.body.appendChild(newdiv);
            });
        })
}


function add() {
    let task = document.getElementById("todo").value.trim();
    if (task === ""){
        alert("Enter something");    
        return;
    }
    num += 1;
    document.getElementById("todo").value = ""

    fetch("http://localhost:3000", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "num":num,
            "newentry": task
        })
    })
        .then(response => response.json())
        .then(data => {
            var newdiv = document.createElement("div");
            newdiv.innerHTML = `<br><div  id="${num}"style="display: flex;"><button onClick=remove(this)>*</button><h4>${data.newentry}</h4></div>`;
            document.body.appendChild(newdiv);
        })
}

function remove(button) {
    button.parentElement.remove();
    fetch("http://localhost:3000", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "id":button.parentElement.id
        })
    });
}