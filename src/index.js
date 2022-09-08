import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
const app = express();
let userList = [];
function arrayRemove(arr, value) {
	return arr.filter(function (ele) {
		return ele != value;
	});
}

app.use(express.static('./src/public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');
const server = http.Server(app);
server.listen(80, () => {
	console.log(`OK: 80`);
});
const io = new Server(server);
io.on('connection', (socket) => {
	console.log(`Connected: ${socket.id}`);
	socket.on('disconnect', () => {
		console.log(`Disconnected: ${socket.id}`);
	});
	socket.on('client-send-username', (data) => {
		if (userList.indexOf(data) >= 0) {
			socket.emit('server-send-failed');
		} else {
			userList.push(data);
			socket.username = data;
			socket.emit('server-send-success', data);
			io.sockets.emit('server-send-userList', userList);
		}
	});
	socket.on('logout', () => {
		userList = arrayRemove(userList, socket.username);
		socket.broadcast.emit('server-send-userList', userList);
	});
	socket.on('user-send-message', (data) => {
		io.sockets.emit('server-send-message', `${socket.username}: ${data}`);
	});
	socket.on('on-typing', () => {
		socket.broadcast.emit('someone-on-typing', socket.username);
	});
	socket.on('stop-typing', () => {
		socket.broadcast.emit('someone-stop-typing');
	});
});
app.get('/', (req, res) => {
	res.render('home');
});
