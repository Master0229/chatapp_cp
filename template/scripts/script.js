const socket = io();

var name = ''
var room = ''
var joined = false

socket.on('message', message => {
    console.log(message)
    if (!joined) {
        joined = true
        document.getElementById('logincontainer').hidden = true
        document.getElementById('chatcontainer').hidden = false
    }
    document.getElementById('message_box').hidden = false
    var div1 = document.createElement('div')
    var div2 = document.createElement('div')
    var div3 = document.createElement('div')
    var p = document.createElement('p')

    if(message.user == "admin") {
        div1.className = "chat_bot_msg"
        div2.className = "received_msg justify-content-center d-flex"
        div3.className = "admin_dmsg"
        p.innerHTML = message.text + " | " + new Date().getHours() + ':' + new Date().getMinutes()
        div3.appendChild(p)
        div2.appendChild(div3)
        div1.appendChild(div2)
        document.getElementById('messagelist').append(div1)
    }
});

function setname(value) {
    name = value
}
function setroom(value) {
    room = value
}
function join() {
    console.log({ name, room })
    socket.emit('join', { name, room }, (error) => {
        if (error) {
            alert(error);
        }
    });
}