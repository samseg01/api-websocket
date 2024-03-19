const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
// const bodyParser = require('body-parser');
const cors = require('cors');
const { hostname } = require('os');

const app = express();
const server = http.createServer(app);
const io = socketIO(server)

//liberar o uso livre da api
app.use(cors());

app.get('/config', (req, res) => {
    const socketAddress = `http://${req.hostname}`;
    //${server.address().port}  
    res.json({ socketAddress });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor HTTP e WebSocket escutando na porta ${PORT}`);
});

// Configurações adicionais do Socket.IO
io.on('connection', (socket) => {
    console.log('Um cliente se conectou');

    socket.on('disconnect', () => {
        console.log('Um cliente se desconectou');
    });
  // Manipule outros eventos do Socket.IO conforme necessário
});

