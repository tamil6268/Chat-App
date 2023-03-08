const express=require('express');
const socket=require('socket.io');
const path=require('path');
const app=express();
app.use(express.static(path.join(__dirname,'/public')));
app.get('/',(req,res)=>{
    res.sendFile(__dirname,'/public/index.html');
})
const server=app.listen(https://heisenberg-tamil-chat-app.onrender.com,()=>{
    console.log("Server Started at http://localhost:8080");
})

const io=socket(server,{cors:{origin:"*"}});
const users={};
let Name;
io.on('connection',(socket)=>{
    socket.on('user-joined',(username)=>{
        users[socket.id]=username;
        socket.broadcast.emit('user-joined-in',username);
        Name=username;
    });

    socket.on('send',(message)=>{
        socket.broadcast.emit('reached',{message:message,name:users[socket.id]});
     })

    socket.on('disconnect',()=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    })
})
