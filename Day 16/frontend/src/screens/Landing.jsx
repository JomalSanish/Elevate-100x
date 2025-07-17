import { useState , useEffect} from "react";

function Landing() {
    const [chat, setChat] = useState("");
    const [answer, setAnswer] = useState("");
    const [model, setModel] = useState("flash");
    const [isLoading, setIsLoading] = useState(false);
    const [websocket, setWebsocket] = useState(null)

    useEffect(() => {

        const ws = new WebSocket('ws://localhost:3000')

        ws.onopen = function () {
            console.log('connected to server')
        }

        ws.onmessage = function (response) {
            setChat("")
            setAnswer(response.data)
            setIsLoading(false);
        }

        setWebsocket(ws)

        return function cleanup() {
            if (ws) {
                ws.close();
                console.log('WebSocket connection closed');
            }
        }

    }, [])

    function handleClick() {
        if (!chat.trim()) {
            alert("Enter something");
            return;
        }
        setIsLoading(true);
        setAnswer("");
        if (websocket) {
            websocket.send(JSON.stringify({
                "chat": chat,
                "model": model
            }))
        }
        else {
            console.error("WebSocket is not connected");
        }

    }

    return (
        <div>

            <input type="text" placeholder="Enter chat" value={chat} onChange={(e) => setChat(e.target.value)} />
            <div>
                <label><input type="radio" name="model" value="flash" checked={model === "flash"} onChange={(e) => setModel(e.target.value)} />flash</label>
                <label><input type="radio" name="model" value="flash-lite" checked={model === "flash-lite"} onChange={(e) => setModel(e.target.value)} />flash-lite</label>
            </div>
            <button onClick={handleClick}>{isLoading ? "Loading.." : "Ask"}</button>
            <br></br>
            <textarea value={answer}></textarea>
        </div>
    )

}

export default Landing