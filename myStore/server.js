var http = require('http');
var express = require('express');
var mongodb = require('mongodb');
var app = express();
var port = process.env.port || 1337;
var theDb = null;

app.get('/', function (req, res) {
    res.redirect("/htmls/index.html");
});

function getdb(next){

    if (theDb == null) {
        
        mongodb.MongoClient.connect("mongodb://127.0.0.1:27017/theBoard", function (err, db) {
            
            if (err) {
                next(err, null);
            }
            else {
                theDb = db;
                next(null, db);
            }
        });
    }
    else {
        next(null, theDb);
    }
}

function getPhones(next)
{
    getdb(function (err, db) {
    
        if (err) {
            next(err, null);
        }
        else {
            db.collection("Phones").find().toArray(next);
        }
    
    });


}

function getTablets(next) {
    getdb(function (err, db) {
        
        if (err) {
            next(err, null);
        }
        else {
            db.collection("Tablets").find().toArray(next);
        }
    
    });


}

function getChromebooks(next) {
    getdb(function (err, db) {
        
        if (err) {
            next(err, null);
        }
        else {
            db.collection("Chromebooks").find().toArray(next);
        }
    
    });


}
function savePhonesData(phone,next){

    getdb(function (err, db) {
        
        if (err) {
            next(err, null);
        }
        else {
            db.collection("phones").insert(phone,next);
        }
    
    });


}


function GetProducts(next) {
    getdb(function (err, db) {
        
        if (err) {
            next(err, null);
        }
        else {
            db.collection("products").find().toArray(next);
        }
    
    });
}


function getPhone(newphone,next){
    getdb(function (err, db) {
        
        if (err) {
            next(err, null);
        }
        else {
            db.collection("phones").findOne({ name: newphone }, next);
        }
    
    });
}

function updatePhone(phone, next){


}


app.get('/api/phones', function (req, res) {
    
    
        getPhones(function (err, phones) {
    
        if (err) {
            res.send("Couldnt get phones");
        }
        else {

            res.set("Content-Type", "application/json");
            res.send(phones);
        }
    
    
    });


});

app.get('/api/tablets', function (req, res) {
    
    
    getTablets(function (err, tablets) {
        
        if (err) {
            res.send("Couldnt get tablets");
        }
        else {
            
            res.set("Content-Type", "application/json");
            res.send(tablets);
        }
    
    
    });


});


app.get('/api/chromebooks', function (req, res) {
    
    
    getChromebooks(function (err, chromebooks) {
        
        if (err) {
            res.send("Couldnt get chromebooks");
        }
        else {
            
            res.set("Content-Type", "application/json");
            res.send(chromebooks);
        }
    
    
    });


});


app.get('/api/getPhones/:phone', function (req, res) {
    
    var newphone = req.params.phone;

    getPhone(newphone,function (err, newphone) {
        
        if (err) {
            res.send("Couldnt get phones");
        }
        else {
            
            res.set("Content-Type", "application/json");
            res.send(newphone);
        }
    
    
    });


});

app.get('/api/GetProducts', function (req, res) {
    
    //var newphone = req.params.phone;
    
    GetProducts(function (err, products) {
        
        if (err) {
            res.send("Couldnt get products");
        }
        else {
            
            res.set("Content-Type", "application/json");
            res.send(products);
        }
    });

});


app.post('/api/phones', function (req, res) {
    
    var phone = {};
    phone.color=req.body.color;
    Phone.image = req.body.image;
    phone.Memorysize = req.body.Memorysize;
    phone.phoneName = req.body.phoneName;
    phone.price = req.body.price;
    phone.qty = req.body.qty;

    savePhonesData(phone, function(err,phone) { 
    
        if (err) {
            res.send("couldnt save phone into db");
        }
        else {
            res.set("Content-Type: application/json");
            res.send(phone);
            }
    });

});

app.post('/api/updatephone', function (req, res) {
    
    var phone = {};
    phone.color = req.body.color;
    Phone.image = req.body.image;
    phone.Memorysize = req.body.Memorysize;
    phone.phoneName = req.body.phoneName;
    phone.price = req.body.price;
    phone.qty = req.body.qty;
    
    updatePhone(phone, function (err, phone) {
        
        if (err) {
            res.send("couldnt update phone data into db");
        }
        else {
            
            res.send("successfully updated the phone");
        }
    });

});

app.use(express.static(__dirname + '/public'));
http.createServer(app).listen(port);

