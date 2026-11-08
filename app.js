const express = require("express");
const app = express();
const mysql= require("mysql");
const settings = require("./setting.json");

const IP=settings.IP;
const PORT=settings.PORT;
const mysql_host=settings.mysql_host;
const mysql_name=settings.mysql_username;
const mysql_pass=settings.mysql_password;

function mysql_conntect(query){
let res;
let con = mysql.createConnection({
  host: mysql_host,
  user: mysql_name,
  password: mysql_pass
});

con.connect(function(err) {
  if (err) throw err;
  let sql=query;
  con.query(sql,function(err,result){
    if(err) throw err;
    res=result;
  });
});
con.end();
return res;
}
app.use(express.json());
app.get("/", (req, res) => {
    res.status(200).send("/user/register parameters: username, password \n/user/login parameters: username, password \n/user/logout parameters: none \n/user/profile parameters: username \n/user/update parameters: username, password \n/user/delete parameters: username \n/user/change-password parameters: username, password")
});
app.post("/user/register", (req, res) => {
    try{
    const { username, password } = req.body;
    const query = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`;
    mysql_conntect(query);
    res.status(200).json("{process: 'success'}")
    }
    catch (e){
        res.status(500).json("{process: 'error'}");
    }

});
app.post("/user/login", (req, res) => {
    try{
    const { username, password } = req.body;
    const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
    const result = mysql_conntect(query);
    res.status(200).json(result);
    }
    catch (e){
        res.status(500).json("{process: 'error'}");
    }
});
app.post("/user/logout", (req, res) => {
    try{
        //your logout logic here(session function to destroy the session)
        res.status(200).json("{process: 'success'}");
    }
    catch (e){
        res.status(500).json("{process: 'error'}");
    }
});
app.post("/user/profile", (req, res) => {
    try{
        const { username } = req.body;
        const query = `SELECT * FROM users WHERE username='${username}'`;
        const result = mysql_conntect(query);
        res.status(200).json(result);
    }
    catch (e){
        res.status(500).json("{process: 'error'}");
    }
});
app.post("/user/update", (req, res) => {
    try{
        const { username, password } = req.body;
        const query = `UPDATE users SET password='${password}' WHERE username='${username}'`;
        mysql_conntect(query);
        res.status(200).json("{process: 'success'}");
    }
    catch (e){
        res.status(500).json("{process: 'error'}");
    }
});
app.delete("/user/delete", (req, res) => {
    try{
        const { username } = req.body;
        const query = `DELETE FROM users WHERE username='${username}'`;
        mysql_conntect(query);
        res.status(200).json("{process: 'success'}");
    }
    catch (e){
        res.status(500).json("{process: 'error'}");
    }
});
app.post("/user/change-password", (req, res) => {
    try{
        const { username, password } = req.body;
        const query = `UPDATE users SET password='${password}' WHERE username='${username}'`;
        mysql_conntect(query);
        res.status(200).json("{process: 'success'}");
    }
    catch (e){
        res.status(500).json("{process: 'error'}");
    }
});
app.listen(PORT, IP, () => {
    console.log(`Server is running on http://${IP}:${PORT}`);
});