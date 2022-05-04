const path = require('path');
const express = require('express');
const http = require('http'); // createServer()
const socketio = require('socket.io');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Setup Websocket

const server = http.createServer(app);

const io = socketio(server);

// ----------------------------------- //

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));

// Serve frontend

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

// Run when a client connects

let users = [];

const messages = {
  General: [],
  Random: [],
  Jokes: [],
  Javascript: [],
}

io.on('connection', socket => {
  console.log(`Connected to socket as : ${socket.id}`)
  socket.on('join server', (username) => {
    const user = {
      username,
      id:socket.id
    }
    users.push(user);
    io.emit('new user', users)
  })

  socket.on('join room', (roomName, cb) => {
    socket.join(roomName)
    cb(messages[roomName])
  });

  socket.on('send message', ({content, to, sender, chatName, isChannel}) => {
    if (isChannel) {
      const payload = {
        content, 
        chatName,
        sender,
      };
      socket.to(to).emit('new message', payload);
    } else {
      const payload = {
        content, 
        chatName: sender,
        sender,
      }
      socket.to(to).emit('new message', payload);
    }
    if(messages[chatName]) {
      messages[chatName].push({
        sender, 
        content
      })
    }
  })

  socket.on('disconnect', () => {
    users = users.filter(u => u.id !== socket.id)
    io.emit('new user', users)
  })
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  
});

