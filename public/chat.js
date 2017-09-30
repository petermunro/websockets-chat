console.log('chat.js');
let socket = io.connect();


// select DOM elements
let usernameField = document.getElementById('username');
let messageField = document.getElementById('message');
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
