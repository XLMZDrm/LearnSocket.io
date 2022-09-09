const socket = io('http://localhost/');
socket.on('server-send-rooms', (data) => {
	$('#roomList').html('');
	for (let room of data) {
		$('#roomList').append(`<h4 class='room'>${room}</h4>`);
	}
});
socket.on('server-send-currentRoom', (data) => {
	$('#currentRoom').html(data);
});
socket.on('server-chat', (data) => {
	$('#right').append(`<div>${data}</div>`);
});
$(document).ready(() => {
	$('#btnCreateRoom').click(() => {
		socket.emit('create-room', $('#txtRoom').val());
	});
	$('#btnChat').click(() => {
		socket.emit('user-chat', $('#txtMessage').val());
	});
});
