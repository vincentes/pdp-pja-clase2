var express = require("express");
var path = require('path');
var fs = require('fs');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var config = require("./config/properties.json");
var compression = require('compression');
var objectRouter = require("./routes/object");
var objectTypeRouter = require("./routes/objectType");
var app = express(); 
const apiUrl = '/api';
var staticRoot = __dirname + '/';
var env = process.env.NODE_ENV || 'development';

app.set('port', (process.env.PORT || 5000));
app.use(compression());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
     "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
     "PUT, POST, GET, DELETE, OPTIONS");
     next();
});

app.use(apiUrl, objectRouter);
app.use(apiUrl, objectTypeRouter);

app.use(function(req, res, next) {
    //if the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml');
    if (accept !== 'html') {
        return next();
    }

    // if the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    if (ext !== '') {
        return next();
    }

    fs.createReadStream(staticRoot + 'index.html').pipe(res);
})

app.use(express.static(staticRoot));

mongoose.connect(config.mongo_url, { useNewUrlParser: true })
.then(()=>{
    console.log("MongoDB successfully connected!");

    app.listen(config.port, () => console.log(
        "Application is running under port " + config.port));

}).catch((err) => {
    console.log("Error connecting with MongoDB :-(");
})



