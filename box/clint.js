const socket = io()
let name;
let messageArea = document.querySelector('.message_area')
let textarea = document.querySelector('#textarea')
do{
    name = prompt('please enter your name :-')
}while(!name)

textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg = {
        username : name,
        message : message.trim()
    }


    appendMessage(msg,'outgoing')

    textarea.value = ''
    scrollToBottom()

    //server
    socket.emit('message',msg)


}

function appendMessage(msg,type){
    let maindiv = document.createElement('div')
    let className = type
    maindiv.classList.add(className,'message')

    let markup = `
        <h4>${msg.username}</h4>
        <p>${msg.message}</p>
    `
    maindiv.innerHTML = markup
    messageArea.appendChild(maindiv)
}



socket.on('message',(msg) =>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})


function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}