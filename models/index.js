const mysql = require('mysql2');
function connection(){
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Enter your password here",
    database:"Enter your database name here"
})
return connection.promise();
}
module.exports = connection;