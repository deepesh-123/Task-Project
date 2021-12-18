var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors')
//var con = require('./db.js')

var mysql = require('mysql');

app.use(bodyParser.json())
app.use(cors({
    origin: '*'
}));

var conn = mysql.createConnection({
    host :"localhost",
    user:"root",
    password:"123578951",
    database :"task_management"
});

conn.connect(function(err){
    if(err)
    throw err;
    console.log(" connected successfully");
});


app.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    conn.query(`Select * from user WHERE email="${email}" and password="${password}"`, function (err, result, fields) {
        var err_msg = {
            "message":"Invalid credentail!",
            "result" : 0
        }
        var success_msg = {
            "message":"login successful!",
            "result" : 1
        }
        console.log(result)
        if (result.length == 0){
            res.send(err_msg);
        }
        else {
            res.send(success_msg);
        }
      });
})



app.post('/register', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;

    conn.query(`INSERT INTO user (email, password, name) VALUES ("${email}", "${password}", "${name}")`, function (err, result, fields) {
            var response = {
                "message" :" registered succussfully",
                "result": 1
            }
            res.send(response);
      });
})

app.get('/getTasks', function (req, res) {
    conn.query("Select * from task", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
   res.send(result);

      });
   
})

app.get('/getTaskByEmail/:email', function (req, res) {
    var com = [];
    var inc =[];
    var email = req.params.email;
    console.log("email -"+email);
    conn.query(`Select * from task where email="${email}" ORDER BY priority DESC`, function (err, result, fields) {
        if (err) throw err;
        for (val in result){
            if(result[val].status== 1){
                if(result[val].priority==2){
                    result[val].priority="High"
                }
                if(result[val].priority==1){
                    result[val].priority="Medium"
                }
                if(result[val].priority==0){
                    result[val].priority="Low"
                }
                result[val].status="complete"
                com.push(result[val]);
            }
            else{
                result[val].status="Under Progress"
                inc.push(result[val]);
            }
        }
        var final = inc.concat(com);

        res.send(final);
      });
})

app.get('/getTask/:task_id', function (req, res) {
    var task_id = req.params.task_id;
    conn.query("Select * from task where task_id="+task_id, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
   res.send(result);

      });
   
})

app.post('/createTask', function (req, res) {
    var data = req.body;
    var date = req.body.deadLine.split("T")[0];
    if(data.status ="underProgress"){
        new_status = 1;
    }
    else{
        new_status =0;
    }
    if(data.priority="High"){
new_priority= 2
    }
    if(data.priority="Medium"){
        new_priority= 1
            }
            if(data.priority="Low"){
                new_priority= 0
                    }
    conn.query(`INSERT INTO task (title, description, priority,deadline, status, email) VALUES ("${data.taskName}", "${data.description}", "${new_priority}", "${date}", "${new_status}", "${data.email}")`, function (err, result, fields) {
        if (err) throw err;
        var response = {
            "message":"task created",
            "result" : 1
        }
        res.send(response);
      });
   
})

app.put('/updateTask/:task_id', function (req, res) {
    var task_id = req.params.task_id;
    var data = req.body;

    conn.query(`UPDATE task SET title="${data}", description="${data.description}", priority="${data.priority}", deadline="${data.deadLine}", status="${data.status}" where task_id="${task_id}"`, function (err, result, fields) {
        if (err) throw err;
        var response = {
            "message":"Task updated"
        }

        res.send(response);

      });
   
})

app.delete('/deleteTask/:task_id', function (req, res) {
    var task_id = req.params.task_id;
    conn.query("DELETE FROM task where task_id="+task_id, function (err, result, fields) {
        if (err) throw err;
        var response = {
            "message":"task deleted"
        }
      res.send(response);

      });
})

var server = app.listen(8081, function () {
  
   console.log("Example app listening at")
})


app.post('/signup', function(req, res){
    let name ="dee";
    let email ="eed@.com";
    let password = " 123";

})