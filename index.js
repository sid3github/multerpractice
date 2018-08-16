const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Data = require('./models/form');
const multer = require('multer');

const server = express();

mongoose.connect('mongodb://localhost/project');

server.use(bodyParser.json());


server.get('/',function(req,res){
    Data.find({},function(err,data){
        if(err){
            throw err;
        }
        res.json(data);
    });
});
server.post('/form',function(req,res){
    let info = new Data();
    info.name = req.body.name;
    info.mobile = req.body.mobile;
    info.email = req.body.email;
    info.password = req.body.password;

    info.save(function(err,info){
        if(err){
            throw err;
        }
        res.json(info);

    });
});
//Below code is with using multer.
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
  });
   
  var upload = multer({ storage: storage }).single('profileImage');
 
server.post('/profile', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
        throw err;
    }
    res.json({success: true,
        message:'image uploaded!'
    });
  });
});



server.listen(7007,function(){
    console.log('port running on 7007');
});