const socket = io('http://localhost/');
socket.on('server-send-failed', () => {
	alert('Failed');
});
socket.on('server-send-success', (data) => {
	$('#currentUser').html(data);
	$('#loginForm').hide(2000);
	$('#chatForm').show(1000);
});
socket.on('server-send-userList', (userList) => {
	$('#boxContent').html('');
	userList.forEach((user) => {
		$('#boxContent').append(`<div class='user'> ${user} </div>`);
	});
});
socket.on('server-send-message', (data) => {
	$('#listMessages').append(`<div class='message'> ${data} </div>`);
});
socket.on('someone-on-typing', (data) => {
	$('#onTyping').html(`${data} is typing`);
});
socket.on('someone-stop-typing', (data) => {
	$('#onTyping').html('');
});
$(document).ready(() => {
	$('#loginForm').show();
	$('#chatForm').hide();
	$('#txtMessage').focusin(() => {
		socket.emit('on-typing');
	});
	$('#txtMessage').focusout(() => {
		socket.emit('stop-typing');
	});
	$('#btnRegister').click(() => {
		socket.emit('client-send-username', $('#txtUsername').val());
	});
	$('#btnLogout').click(() => {
		socket.emit('logout');
		$('#chatForm').hide(2000);
		$('#loginForm').show(1000);
	});
	$('#btnSendMessage').click(() => {
		socket.emit('user-send-message', $('#txtMessage').val());
	});
});
