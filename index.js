require('dotenv').config();
const server = require('./api/server'); // import api endpoints
const port = process.env.PORT || 7100;
server.listen(port, () => console.log(`## lsnotes - api running on port ${port} ##`));