var express = require('express');
var app = express();
var fs = require("fs"); //read file .json

//GET method to pull all user data
app.get('/getUsers', function(req, res) {
  fs.readFile(__dirname + "/" + "user.json", 'utf8', function (err, data) {
    console.log( data ); //data of json file
    res.end(data); //send data
  });
});

//GET method users["INTERNAL_CLADDING1"]
app.get('/getUsers/:id', function(req,res){
  fs.readFile(__dirname + "/" + "user.json",'utf8', function(err,data){
    var users = JSON.parse(data); //convert data (all users)
    var user = users["INTERNAL_CLADDING"+ req.params.id]; //add condition(find user by id)
    console.log(user);
    res.end(JSON.stringify(user));
  });
});


var user = {
    "INTERNAL_CLADDING2": {
        "Transaction Record": "example1",
        "Ownership ID": "77889911",
        "Element ID": "77889911",
        "Production Date": "4/7/2021",
        "Production Location": "Melbourne",
        "Installation Date": "4/7/2021",
        "Warranty Start Date": "4/7/2021",
        "Warranty Duration ": "1 year",
        "Warranty Description": "The details pertaining to the warranty including what is covered and not covered under the warranty conditions.",
        "Maintenance Scope": "The extent of the maintenance required to be performed for each product, material or assembly including defect rectification, cleaning etc.",
        "Maintenance Instructions": "The procedures required to be completed in order to keep a product, material or assembly in good working order.",
        "id" : 2
    }
}

app.post('/addUser',function(req,res){
  fs.readFile(__dirname + "/" + "user.json", 'utf8', function(err,data){
    data = JSON.parse(data);
    data["INTERNAL_CLADDING2"] = user["INTERNAL_CLADDING2"]; // add data
    //console.log(data);
    res.end(JSON.stringify(data));
  });
});

var server = app.listen(8081, function() {
  var host = server.address().address
  var port = server.address().port
  console.log("Application Run At http://%s:%s",host,port)
});
