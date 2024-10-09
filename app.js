// 세션을 만드는 걸 도와주는 라이브러리
//const session = require('express-session')
//const passport = require('passport')
// 아이디 비번 방식 회원인증을 사용할 때 쓰는 라이브러리
//const LocalStrategy = require('passport-local')

//const login_post = require('./login/login_post')
const express = require('express')
const app = express()
const port = 8080

const bodyParser = require('body-parser') // id, pwd 불러오기
app.use(bodyParser.json());
//app.use(express.json());

//app.use('/login', login_post);

app.use(bodyParser.urlencoded({extended: false}));

const mysql = require('mysql2/promise') // sql 넣기



//app.use(passport.session)

// mysql-express 연동확인
const pool = mysql.createPool({
  host : 'localhost',
  port : '3306',
  user : 'root',
  password : 'rkdwhdgns1106!!1',
  database : 'login_member'
});

const getConn = async() => {
  return await pool.getConnection(async(conn) => conn);
};

app.get('/info', async(req,res) => {
  const conn = await getConn();
  const query = 'SELECT id, pwd FROM member'
  let[rows, fields] = await conn.query(query, []);
  
  res.send(rows)
})
// mysql-express 연동확인


app.post('/info', async(req, res) => {
    const id = req.body.id;
    const pwd = req.body.pwd;
    const conn = await getConn();
    const query = `SELECT id, pwd FROM member where id = '${id}' and pwd = '${pwd}' `
    //const query = `SELECT count(id) as cnt FROM member where id = '${id}' and pwd = '${pwd}' `
     let[rows, fields] = await conn.query(query, []);
     console.log('row:', rows);
   // let[r, upwd] = await conn.query(query, []);
    console.log('id:', id);
    console.log('pwd:', pwd);
    console.log('req.body.id:', req.body.id);

    console.log(rows.length)
    //console.log('uid:', rows[0].id); 
    if(rows.length === 1) {

      if( rows[0].id === req.body.id){
        res.redirect("http://localhost:3000/login/success");
      }
      else{
        console.log('실패')
        res.redirect("http://localhost:3000/login");
      }
    } else {
      console.log('실패') 
      res.redirect("http://localhost:3000/login");
    }
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
