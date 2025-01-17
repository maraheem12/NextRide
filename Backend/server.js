const http = require('http');
const app = require('./app');
const port = process.env.PORT;
const userRoutes = require('./routes/user.routes');
const server = http.createServer(app);  
  
server.listen(port, () => {  
    console.log(`Server file ${port}`);
});