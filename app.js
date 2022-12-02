const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;


const connection=mysql.createConnection({
    host:"covid19.cnm3irxx2zg2.us-east-1.rds.amazonaws.com",
    user:"sinch",
    password:"sinch123",
    database:"covid19",
    port:"3306",
    connectionLimit: 15,
    queueLimit: 30,
    acquireTimeout: 1000000
})

connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log("Database connection established");

});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var covidtable = 'Covid_details';

app.get('/', (req, res) => {
    // res.send({
    //     title:"starting node server"
    // })
    
    let createquery = "CREATE TABLE IF NOT EXISTS ?? (ID int NOT NULL AUTO_INCREMENT,State_Name VARCHAR(255), Date_of_Record date,No_of_Samples int(11),numofdeaths int(11),No_of_Positive int(11),No_of_Negative int(11),No_of_Discharge int(11),PRIMARY KEY (ID))"
    
    let starterquery = connection.query(createquery,[covidtable],(err,rows)=>{
        if(err) throw err;
        console.log("create query executed");
    });

    // let insertQuery = "Insert into ?? (State_Name, Date_of_Record, No_of_Samples,numofdeaths,No_of_Positive,No_of_Negative,No_of_Discharge) values ('kerala','2018-10-20',12,8,5,3,2)";
    // let insquery = connection.query(insertQuery,covidtable,(err,rows)=>{
    //     if(err) throw err;
    //     else console.log("insert query executed")
    // });

    let sql = "SELECT * FROM ??";
    let query = connection.query(sql,[covidtable],(err,rows,res1)=>{
        if(err) throw err;
    res.render('user_index',{
        title:"Covid Data Bank",
        covidlist : rows
    });
});
});

app.get('/add', (req, res) => {
    res.render('user_add',{
        title:"Add User",
    });
});

app.get('/test', (req, res) => {
    res.send({
        title:"starting node server"
    })});

app.post('/save', (req, res) => {
    let data = {
        State_Name: req.body.State_Name,
        Date_of_Record: req.body.Date_of_Record,
        No_of_Samples: req.body.No_of_Samples,
        numofdeaths: req.body.numofdeath,
        No_of_Positive: req.body.No_of_Positive,
        No_of_Negative: req.body.No_of_Negative,
        No_of_Discharge: req.body.No_of_Discharge,
    }

    let sql = "INSERT INTO ?? SET ?";
    let insQuery = connection.query(sql,[covidtable,data],(err,results)=>{
        if(err) throw err
        else console.log("insert sucess");
        res.redirect('/');

    });
});


app.get('/edit/:ID', (req, res) => {
    const ID = req.params.ID;
    let sql = `Select * from ?? where ID = ${ID}`
    let query = connection.query(sql,[covidtable],(err,results)=>{
        if(err) throw err;
        res.render('user_edit',{
            title: "Edit Info",
            covidlist :results[0],
        })
    });
});

app.post('/update', (req, res) => {
    const ID = req.body.ID;
    let sql = "update ?? SET State_Name='"+req.body.State_Name+"',  Date_of_Record='"+req.body.Date_of_Record+"',  No_of_Samples='"+req.body.No_of_Samples+"',numofdeaths='"+req.body.numofdeath+"',No_of_Positive='"+req.body.No_of_Positive+"',No_of_Negative='"+req.body.No_of_Negative+"',No_of_Discharge='"+req.body.No_of_Discharge+"' where id ="+ID;;
    let insQuery = connection.query(sql,[covidtable],(err,results)=>{
        if(err) throw err
        else console.log("update sucess");
        res.redirect('/');

    });
});

app.get('/delete/:ID', (req, res) => {
    const ID = req.params.ID;
    let sql = `DELETE from ?? where ID = ${ID}`
    let query = connection.query(sql,[covidtable],(err,results)=>{
        if(err) throw err;
        else console.log("delete success");
        res.redirect('/');
    });
});

app.listen(port,()=>{
    console.log('listening on port:', port);
});

