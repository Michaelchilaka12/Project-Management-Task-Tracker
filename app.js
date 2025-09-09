const express = require('express');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const projectRouter = require('./routes/projectRoutes');
const kanbanRouter = require('./routes/kanbanRoutes');
const comment = require('./routes/commentRoutes')
const http = require("http");
// const {Server} = require("socket.io");
const socket = require('./controllers/socket');



const app = express();
const server = http.createServer(app);

// Initialize socket.io
const io = socket.init(server);

io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);
});





// //body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));
app.use(cookieParser());


//mounting route
app.use('/api/v1/users', userRouter);
app.use('/api/v1/projects', projectRouter);
app.use('/api/v1/kanban', kanbanRouter)
app.use('/api/v1/comment',comment)



module.exports = {server,io};