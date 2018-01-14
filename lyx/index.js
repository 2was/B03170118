
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');
mongoose.connection.openUri('mongodb://2was:2was@ds255347.mlab.com:55347/lyx');
var orderSchema = new mongoose.Schema({
  item:String
  /*OrderID:String
  CustomerName:String
  Juice:String
  Address:String
  Phone:String*/
});
var Order = mongoose.model('Order', orderSchema);
//var mysql = require('mysql');

/*var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ex02"
});*/
/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});*/

app.use(express.static('public'));
app.use('/product',express.static(__dirname + '/image'));
app.set('view engine', 'ejs');
//index.ejs
app.get("/",function(req,res){
  console.log('server start..');
  res.render('index');
});
//home.ejs
app.get("/Home",function(req,res){
  console.log('server start../Home');
  res.render('home');
});
//product.ejs
app.get("/Product",function(req,res){
  console.log('server start../Product');
  res.render('product');
});
//login.ejs
app.get("/login",function(req,res){
  console.log('server start../login');
  res.render('login');
});
//signup.ejs
app.get("/signup",function(req,res){
  console.log('server start../signup');
  res.render('signup');
});
//order.ejs
//app.get("/order",function(req,res){
//  console.log('server start../order');
  //res.render('order');
//});

app.get('/order', function(req, res){
  Todo.find({}, function(err, data){
    if(err) throw err;
    console.log('server start at get /order..');
    res.render('order', {data:data});
  });
});

app.post('/order', urlencodedParser, function(req, res){
  var newOrder = Order(req.body).save(function(err, data){
    if (err) throw err;
    console.log('server  at post /order..');
    res.redirect('/order');
  });

});

/*app.get('/signup', function(req, res){
  var sql = "select * from `users`;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log('server start at get /sign..');
    res.render('signup', {data:result});
  });
});*/

/*app.post('/signup', urlencodedParser, function(req, res){
    var sql = "INSERT INTO `users`(`username`, `email`, `password`) VALUES ('user6','user6@ci','user6');";
    con.query(sql, function (err, result) {
      if (err) throw err;
    console.log('server at post /signup..');
    res.redirect('/signup');
  });

});*/

app.listen(3000);
