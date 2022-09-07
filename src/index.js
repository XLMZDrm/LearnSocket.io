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
	console.log(`${socket.id} is connecting`);
	socket.on('disconnect', () => {
		console.log(`${socket.id} disconnected`);
	});
	socket.on('Client-send-data', (data) => {
		// io.sockets.emit('Server-send-data', `${data} test`);
		// socket.emit('Server-send-data', 'test');
		// socket.broadcast.emit('Server-send-data', 'test');
	});
	socket.on('sendNumberData', (data) => {
		var result = parseInt(data.A) + parseInt(data.B);
		socket.broadcast.emit('receiveResultData', result);
	});
});
app.get('/', (req, res) => {
	res.render('home');
});
