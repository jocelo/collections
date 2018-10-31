module.exports = app =>{
  const image = require('../controllers/image.controller');

  app.get('/api/pictures/:collectionId', image.getAll);

  app.post('/api/picture', image.add);

  app.put('/api/picture', image.update);
};