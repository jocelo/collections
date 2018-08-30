module.exports = app =>{
  const threeDmodel = require('../controllers/threed.controller');

  app.post('/api/threeD', threeDmodel.create);

  app.put('/api/category/:catID', threeDmodel.update);
};