const http = require('http');
const socketIO = require('socket.io');

const express = require('express');
const app = express();

const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3000;

app.get('/page-master', (req,res) => {
  res.sendFile(__dirname + '/public/index.html');
})


const io = socketIO(httpServer, {
  cors: {
    //https://client-side-production.up.railway.app
    origin: 'http://localhost:5500' , //`http://localhost:${PORT}`],
    credentials : true
  }
})

// Configurações adicionais do Socket.IO
io.on('connection', (socket) => {
    console.log('Um cliente se conectou');

    socket.on('message', (message) => {
      console.log('mensage vinda de um client', message);
      io.emit('message', message);
    })

    socket.on('disconnect', () => {
        console.log('Um cliente se desconectou');
    });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor HTTP e WebSocket escutando na porta ${PORT}`);
});
