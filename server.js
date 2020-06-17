let express = require('express')
let passport = require('passport')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
let app = express()
let db = require('./db.js')
let authCheckMiddleware = require('./auth-check.js')
const authRoute = require('./routes/authRoute.js')
let localLoginStrategy = require('./local-login.js')
let cors = require('cors')
// view engine setup
const port = process.env.PORT || 3001

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())
app.use(cors())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

// app.use(express.static(__dirname));
passport.use('local-login', localLoginStrategy)
app.use('/auth', authRoute)
// app.use("/", authCheckMiddleware);
// AFTER ALL ROUTES
app.use(express.static(path.join(__dirname, 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'))
})

let server = app.listen(port)
let sio = require('socket.io').listen(server)
sio.on('connect', (socket) => {
    socket.on('dataRequest', function () {
        console.log('recieved dataRequest')
        db.getTable(function (data) {
            if (data) {
                socket.emit('dataResponse', data)
            }
        })
    })
    socket.on('dataSubmit', (data) => {
        console.log('recieved dataSubmit')
        console.log(data)
        db.insertData(data)
        socket.emit('dataSuccess')
        db.getTable(function (data) {
            if (data) {
                sio.emit('dataResponse', data)
            }
        })
    })
    socket.on('reqApp', (id) => {
        console.log('recieved reqApp with id: ' + id)
        db.getApp(id, (data) => {
            if (data) socket.emit('resApp', data)
        })
    })
    socket.on('updateStatus', (msg) => {
        console.log('recieved updateStatus, id: ' + msg.id)
        db.updateStatus(msg)
        db.insertLog(msg)
        sio.emit('statusUpdated', msg)
        db.getLogs(msg.id, (data) => {
            console.log('got logs for id ' + msg.id)
            sio.emit('logsUpdate', data)
        })
    })
})

module.exports = app
