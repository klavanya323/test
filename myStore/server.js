var http = require('http');
var express = require('express');
var mongodb = require('mongodb');
var app = express();
var port = process.env.port || 1337;
var theDb = null;
var count = 0;

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
            db.collection("Phones").findOne({ name: newphone }, next);
        }
    
    });
}

function updatePhone(phone, next){


}
function saveCartData(cartData,next){
    
    
    getdb(function (err, db) {
        
        if (err) {
            next(err, null);
        }
        else {
            count++;
            db.collection("cart").insert(cartData, function (err, count) {
                if (err) {
                    next(err, --count);
                }
                else {
                    next(null, count);
                }
            
            });
        }
    
    });

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


app.get('/getPhones/:phonename', function (req, res) {
    
    var selectedPhone = req.params.phonename;

    getPhone(selectedPhone,function (err, selectedPhone) {
        
        if (err) {
            res.send("Couldnt get selected phone");
        }
        else {
            
            res.set("Content-Type", "application/json");
            res.send(selectedPhone);
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

app.post('/api/productAddedToCart', function (req, res) {
    
    var productAdded = {};
    
    productAdded.name = req.body.name;
    productAdded.description = req.body.description;
    productAdded.price = req.body.price;
  
    
    saveCartData(productAdded, function (err, count) {
        
        if (err) {
            res.send("couldnt save phone into db"+ "and cart count is :"+count);
        }
        else {
            res.set("Content-Type: application/json");
            res.send(count);
        }
    });

});


app.use(express.static(__dirname + '/public'));
http.createServer(app).listen(port);

