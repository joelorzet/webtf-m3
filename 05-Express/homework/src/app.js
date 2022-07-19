const { server, port } = require('./server.js');

server.listen(port, () => console.log(`Server running on port ${port}`));
