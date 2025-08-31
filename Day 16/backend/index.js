const express = require('express')
const cors = require('cors')
const app = express()
const axios = require('axios')
const {WebSocket, WebSocketServer} = require('ws');
app.use(cors())
app.use(express.json())


const server = app.listen(3000, () => {
  console.log("Server started at port 3000")
})

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');
  ws.on('message', function (message, isBinary) {
    const data = JSON.parse(message);
    const chat = data.chat;
    const model = data.model
    if (model == "flash") {
      axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
        "contents": [
          {
            "parts": [
              {
                "text": chat
              }
            ]
          }
        ]
      }, {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": "AIzaSyCygULILuxUr_lPWYxXY2mFqcOQnpWeuyU"
        }
      }).then((response) => {
        ws.send(response.data.candidates[0].content.parts[0].text, { binary: false });
      })
    }
    else if (model == "flash-lite") {
      axios.post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite-preview-06-17:generateContent", {
        "contents": [
          {
            "parts": [
              {
                "text": chat
              }
            ]
          }
        ]
      }, {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": "AIzaSyCygULILuxUr_lPWYxXY2mFqcOQnpWeuyU"
        }
      }).then((response) => {
        ws.send(response.data.candidates[0].content.parts[0].text, { binary: false });
      })
    }
        
  });
});