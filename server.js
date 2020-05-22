let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let app = express();
let db = require('./db.js');
// view engine setup
const port = process.env.PORT || 3001;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
let server = app.listen(port);
app.use(express.static(__dirname));
let sio = require('socket.io').listen(server);


sio.on('connect', (socket)=> {
    socket.on("dataRequest", function () {
        console.log("recieved dataRequest");
        db.getTable(function (data) {
            if(data){
                socket.emit("dataResponse", data);
            }
        })
    });
    socket.on("dataSubmit", data =>{
        console.log('recieved dataSubmit');
        console.log(data);
        db.insertData(data);
        socket.emit('dataSuccess');
        db.getTable(function (data) {
            if(data){
                sio.emit("dataResponse", data);
            }
        });
    });
    socket.on("reqApp", id => {
        console.log('recieved reqApp with id: ' +id);
        db.getApp(id, (data)=>{
            if(data)
                console.log(data);
                socket.emit("resApp", data);
        })
    });
    socket.on("updateStatus", msg=>{
        console.log('recieved updateStatus, id: '+ msg.id);
        db.updateStatus(msg);
        db.insertLog(msg);
        sio.emit("statusUpdated", msg);
        db.getLogs(msg.id, data=>{
            console.log("got logs for id " + msg.id);
            sio.emit("logsUpdate", data);
        })
    })


});

module.exports = app;
