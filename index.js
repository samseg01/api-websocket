// const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { hostname } = require('os');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server)

const httpServer = http.createServer();
const io = socketIO(httpServer, {
  cors: {
    //https://client-side-production.up.railway.app/
    origin: 'https://client-side-production.up.railway.app',
    credentials : true
  }
})


//liberar o uso livre da api
// app.use(cors());

// app.get('/config', (req, res) => {
//     const socketAddress = `wss://${req.hostname}:${server.address().port}/`;  
//     res.json({ socketAddress });
// });

// Configurações adicionais do Socket.IO
io.on('connection', (socket) => {
    console.log('Um cliente se conectou');

    socket.on('disconnect', () => {
        console.log('Um cliente se desconectou');
    });
  // Manipule outros eventos do Socket.IO conforme necessário
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Servidor HTTP e WebSocket escutando na porta ${PORT}`);
});
