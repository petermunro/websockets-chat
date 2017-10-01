let express = require('express');
let socket = require('socket.io');

let port = 4800;
let app = express();
let server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(express.static('public'));

let io = socket(server);
io.on('connection', socket => {
  console.log('a socket connected');

  socket.on('disconnect', () => console.log('a socket disconnected'));
  socket.on('chat-message', message => {
    console.log(`message:`, message);
    io.emit('chat-message', message);
  });
});
