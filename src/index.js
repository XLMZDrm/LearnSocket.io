import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
const app = express();
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
	socket.on('create-room', (data) => {
		socket.join(data);
		socket.room = data;
		let rooms = [];
		for (let room of io.sockets.adapter.rooms) {
			rooms.push(room[0]);
		}
		io.sockets.emit('server-send-rooms', rooms);
		socket.emit('server-send-currentRoom', data);
	});
	socket.on('user-chat', (data) => {
		io.sockets.to(socket.room).emit('server-chat', data);
	});
});
app.get('/', (req, res) => {
	res.render('home');
});
