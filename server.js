const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./server-config/database.config');
const mongoose = require('mongoose');

const app = express();
const PORT = 8088;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url)
.then(()=>{
	console.log(' > Succesfully connected to the database');
})
.catch((err)=>{
	console.log('Could not connect o the DB... exiting now');
	console.log('===== ERROR =====');
	console.log(err);
	process.exit();
});

require('./server/routes/category.routes')(app);
require('./server/routes/collection.routes')(app);
require('./server/routes/threed.routes')(app);

app.get('/api', (req, res)=> {
	res.json({status:'ok', message:'Welcome to collections API v0.06.18'});
});

app.listen(PORT, ()=>{
	console.log(` > Server is listening on port ${PORT}`);
})