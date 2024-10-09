var mysql = require("mysql2")

var db_info = {
    host: "localhost",
    port : "3306",
    user : "root",
    password : "rkdwhdgns1106!!1",
    database : "login_member"
}

MediaSourceHandle.exprots = {
    init : function() {
        return mysql.createConnection(db_info);
    },
    connect: function(conn) {
        if(err) console.error("mysql connetcion error : " + err);
        else console.log("mysql is connected successfully!")
    }
}