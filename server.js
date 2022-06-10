// Import http package from node_modules
const http = require('http');

// Create a server response
const server = http.createServer((req, res) => {
    res.end('This is my server response!');
});

// Listen for requests on environment port or 3000 for development
server.listen(process.env.PORT || 3000);