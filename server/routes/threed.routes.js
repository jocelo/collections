module.exports = app =>{
  const threeD = require('../controllers/threed.controller');

  app.post('/api/threeD', threeD.create);

  app.put('/api/category/:catID', threeD.update);
};