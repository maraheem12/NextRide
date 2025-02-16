const http = require('http');
const app = require('./app');
//const port = process.env.PORT;
const port = process.env.PORT;
const userRoutes = require('./routes/user.routes');
const server = http.createServer(app);  
const express = require('express');             
const cors = require('cors');


// Middleware for parsing JSON
app.use(express.json());
app.use(cors());
app.use("/api/user", require("./routes/user.routes")); 

server.listen(port, () => {  
    console.log(`Server file ${port}`);
});