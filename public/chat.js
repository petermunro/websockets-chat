let socket = io.connect();


// select DOM elements
let usernameField = document.getElementById('username');
let messageField = document.getElementById('message');
let messages = document.getElementById('messages');
let status = document.getElementById('status');
let form = document.getElementsByTagName('form')[0];

// initialize state
let typingState = 'EMPTY';

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
  typingState = 'EMPTY';
  e.preventDefault();
});


// handle messages received from the server
socket.on('chat-message', message => {
  status.innerHTML = '';
  messages.insertAdjacentHTML('beforeEnd', `<p>${message.username}: ${message.message}</p>`);
});

// handle typing status updates received from the server
socket.on('typing-update', ({username, isTyping}) => {
  if (isTyping) {
    status.insertAdjacentHTML('beforeEnd', `<p class="text-muted"><em>${username} is typing...</em></p>`);
  }
});

// send 'is typing...' updates
messageField.addEventListener('input', e => {
  if (typingState === 'EMPTY') {
    if (e.target.value) {
      socket.emit('typing-update', { username, isTyping: true });
      typingState = 'NON_EMPTY';
    }
  } else if (typingState === 'NON_EMPTY') {
    if (!e.target.value) {
      socket.emit('typing-update', { username, isTyping: false });
      typingState = 'EMPTY';
    }
  }
});



/*
Typing status updates are sent according to the following
state diagram:

  ___   e && value
 |   |  ----------
 |   |  null
 |   v
------------ non-empty ------------------------------------
 ^                       |                         |
 |                       |                         |
 | e && value            | e && !value             | send
 | ----------            | -----------             | --------
 | emit 'is typing'      | emit 'stopped typing'   | null
 |                       v                         v
------------ empty ----------------------------------------
                    ^    |
                    |    | e && !value
                    |    | -----------
                    |    | null
                     ----

*/
