var express = require('express');
var http = require('http');
var ip = require('ip')
var app = express();
var server = http.createServer(app);

var io = require('socket.io')(server);
var path = require('path');


app.use(express.static(path.join(__dirname, './template')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/template/index.html');
});
app.get('/getusers', (req, res) => {
  res.send(users);
});
app.get('/getmessages', (req, res) => {
  console.log(req.query)
  var filteresmsgs = messages.filter(x => x.fromm == req.query.clientid || x.to == req.query.clientid)
  res.send(filteresmsgs);
});

var users = []
var name
var uhash
var userdetails = {}
var messages = []
io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('join', (username, hash) => {
    name = username;
    uhash = hash
    if (name && uhash) {
      var obj = { name: name, hash: uhash, socketid: socket.client.id }
      userdetails[uhash] = socket
      users.push(obj)
    }
    io.emit('users', users);
  });

  socket.on('disconnect', () => {
    console.log(name + ' disconnected with hash ' + uhash);
    users = users.filter(x => x.hash != uhash)
    io.emit('chat message', users);

  });
  socket.on('new_message', (msg) => {
    messages.push(msg)
    if (msg.to)
      userdetails[msg.to].emit('new_message', "newmessage")
  });
});

var ser = server.listen(3000, '192.168.1.2', () => {
  console.log('Server listening on: http://' + ser.address().address + ':' + ser.address().port);
});


