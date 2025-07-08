function max() {
    const a = document.getElementById("a").value;
    const b = document.getElementById("b").value;
    const c = document.getElementById("c").value;
    const d = document.getElementById("d").value;
    fetch(`http://localhost:3000/max/${c}?a=${a}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            "d":d
        },
        body: JSON.stringify({
            "b": b
        })
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("maxResult").innerText = `Max: ${data}`
    })
}