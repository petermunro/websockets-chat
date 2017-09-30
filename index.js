let express = require('express');

let port = 4800;
let app = express();
let server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(express.static('public'));
