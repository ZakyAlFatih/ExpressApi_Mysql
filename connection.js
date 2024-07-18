const mysql=require("mysql")

const db= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'telkomuniversity',
    port : 3308
})


module.exports =db