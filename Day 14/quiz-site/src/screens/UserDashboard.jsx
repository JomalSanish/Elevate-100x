import { useState, useEffect } from 'react';
import axios from 'axios';

function UserDashboard() {
    const [websocket, setWebsocket] = useState(null);


    useEffect(() => {
        const ws = new WebSocket('ws://localhost:3000');
        ws.onopen = () => console.log('WebSocket connected');

        setWebsocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    if (websocket) {
    websocket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            console.log('Message from server:', data.type);
        } catch (err) {
            console.error('Error parsing message from server:', err, event.data);
        }
    };
}

}



export default UserDashboard;
