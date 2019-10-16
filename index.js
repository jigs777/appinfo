var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require("body-parser");
var con= mysql.createConnection({
  host: "appinfo.mysql.database.azure.com",
  user: "appinfo@appinfo",
  password: "Plkj@1234",
  database: "appinfo"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  });
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res) {
   // res.send('<html><body><h1>Hello World</h1></body></html>');
   res.sendFile(__dirname + '/index.html');
});

app.get('/getdata', function (req, res) {
	var URL="";
 	var sql = "select * from appinfo where bundleId="+req.query.appId+" order by bundleId desc";
  	con.query(sql,function (result,fields,URL) {
    URL="{\"appId\":\""+fields[0].bundleId+"\",\"url\":\""+fields[0].address +"\",\"status\":\""+fields[0].status+"\"}";
   res.send("Getting data : "+URL);
  });
  
    
});

app.post('/submit-data', function (req, res) {
	var status=req.body.status;
	var URL= req.body.url;
	var bundle= req.body.bundle;
	

  var sql = "INSERT INTO appinfo (status,address,bundleId) VALUES ('"+status+"','"+URL+"','"+bundle+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;    console.log("1 record inserted");
  });

    res.send('Your request has been completed successfully');
});

app.put('/update-data', function (req, res) {
    res.send('PUT Request');
});

app.delete('/delete-data', function (req, res) {
    res.send('DELETE Request');
});

var server = app.listen(8080, function () {
    console.log('Node server is running..');
});
