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
    console.log('getting table');
    db.query('SELECT * FROM applications', function (err, data, f) {
        if (err) throw err;
        console.log(data);
        callback(data);
    })
}
function insertData(data){
    console.log("inserting data");
    var query = db.query('INSERT INTO applications (name, theme) VALUES (?, ?)', [data.name, data.theme], function(err, res, f){
        if (err) throw error;
    });

}

module.exports = connectDatabase();
module.exports.getTable = getTable;
module.exports.insertData = insertData;