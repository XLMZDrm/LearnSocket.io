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
});
app.get('/', (req, res) => {
	res.render('home');
});
