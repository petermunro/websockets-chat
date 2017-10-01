console.log('chat.js');
let socket = io.connect();


// select DOM elements
let usernameField = document.getElementById('username');
let messageField = document.getElementById('message');
let messages = document.getElementById('messages');
let form = document.getElementsByTagName('form')[0];


// Grab username
let username = '';
usernameField.addEventListener('change', e => {
  username = e.target.value;
});


// handle message 'Send' button (form submit event)
form.addEventListener('submit', e => {
  socket.emit('chat-message', {
    username,
    message: messageField.value,
  });
  messageField.value = '';
  e.preventDefault();
});


// handle messages received from the server
socket.on('chat-message', message => {
  messages.insertAdjacentHTML('beforeEnd', `<p>${message.username}: ${message.message}</p>`);
});
