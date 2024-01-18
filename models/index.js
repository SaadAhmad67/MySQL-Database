const mysql = require('mysql2');
function connection(){
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"saad123",
    database:"fbdb"
})
return connection.promise();
}
module.exports = connection;