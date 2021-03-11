const seeder = require('mongoose-seed')
const bcrypt = require('bcryptjs')
const path = require('path');
const {MONGO_URI} = require('../config/config')

const modelPath = path.join(__dirname, '..', 'db');

seeder.connect(MONGO_URI, function(){
  try {
    seeder.loadModels([
        path.join(modelPath, "../models/user.js"), 
        path.join(modelPath, "../models/club.js")
      ]);

    seeder.clearModels(['Users', 'Clubs'], function() {
 
      seeder.populateModels(data, function(err, done){
        if (err) {
          return console.log("seed err", err);
        }
    
        if (done) {
          return console.log("seed done", done);
        }
    
        seeder.disconnect()
      })
   
    });
    
  } catch (error) {
    console.log('Something went wrong', error);
  }
})

const data = [
  {
    'model': 'Users',
    'documents':[
      {
      "name": "julius",
      "email": "admin@test.com",
      "password": bcrypt.hashSync('j@1', 10),
    },
      {
      "name": "mike",
      "email": "m@test.com",
      "password": bcrypt.hashSync('mike', 10),
    },
      {
      "name": "philip",
      "email": "p@test.com",
      "password": bcrypt.hashSync('philip', 10),
    },
    ]
  },
  {
    'model': 'Clubs',
    'documents':[
      {
      "name": "barca",
      "admin_id": "604a34f1472339b4f83de3ed",
    },
      {
      "name": "everton",
      "admin_id": "604a34f1472339b4f83de3ed",
    },
      {
      "name": "bolton",
      "admin_id": "604a34f1472339b4f83de3ed",
    }
    ]
  }
]