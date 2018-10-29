const server = require('./api/server'); // import api endpoints
server.listen(process.env.PORT || 7100, () => console.log(`## lsnotes - api running on port ${process.env.PORT || 7100} ##`));