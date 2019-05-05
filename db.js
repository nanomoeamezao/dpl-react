let mysql = require('mysql');
let db_settings = require('./hosts/db_settings.json');
let active = require('./hosts/active.json');
let settings= db_settings[active.active];
let db;

function connectDatabase() {
    if (!db) {
        db = mysql.createConnection(settings);
        db.connect(function (err) {
            if (!err) {
                console.log('Database is connected!');
            } else {
                console.log('Error connecting database!');
            }
        });
    }
    return db;
}

function getTable(callback){
    console.log('called getTable');
    db.query('SELECT * FROM applications', function (err, data, f) {
        if (err) throw err;
        console.log(data);
        callback(data);
    })
}
function insertData(data){
    console.log("called insertData");
    var query = db.query('INSERT INTO applications (name, theme) VALUES (?, ?)', [data.name, data.theme], function(err, res, f){
        if (err) throw err;
        console.log(res);
        var d = new Date();
        var query2 = db.query("INSERT INTO logs VALUES (?, ?, ?)", [res.insertId, "Заявка добавлена", d], function(error, ress, f1){
            if (err) throw err;
            console.log('updated log for id ' + res.insertId);
        })
    });

}

function getLogs(id, callbalck) {
    console.log('called getLogs for id ' + id);
    db.query("SELECT * FROM logs WHERE id = ?", [id], (err,data,f)=>{
        if (err) throw err;
        console.log("last log: ");
        var l = data.length-1;
        console.log(data[l]);
        callbalck(data);
    });
}

function getApp(id, callback){
    console.log('called getApp by id ' + id);
    db.query("SELECT * FROM applications WHERE id = ?", [id], (err,data,f)=>{
        if (err) throw err;
        console.log(data);
        console.log('getting log for id from getapp' + id);
        db.query("SELECT message, date FROM logs WHERE id = ?", [id], (err, logs, f)=>{
            callback([data, logs]);
        });

    })
}

function insertLog(data) {
    console.log("called insertLog for "+ data.id);
    var query = db.query("INSERT INTO logs VALUES (?, ?, ?)", [data.id, "Статус обновлен на "+ data.status , new Date()], (error, res1, f1)=>{
        if (error) throw error;
        console.log('updated log for id from updatestatus ' + data.id);
    });
}

function updateStatus(data){
    console.log('called updateStatus for id: '+data.id + ' with ' + data.status);
    db.query("UPDATE applications SET status = ? WHERE id = ?", [data.status, data.id], (err, res, f)=>{
        if (err) throw err;
    });
}

module.exports = connectDatabase();
module.exports.getTable = getTable;
module.exports.insertData = insertData;
module.exports.getApp = getApp;
module.exports.updateStatus = updateStatus;
module.exports.getLogs = getLogs;
module.exports.insertLog = insertLog;