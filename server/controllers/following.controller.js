const Following = require('../models/following.model');

exports.getFollowers = (req, res) => {
  res.status(200).send({message:'all is good'});
}

exports.getDefaultUsers = (req, res) => {
  res.status(200).send(JSON.stringify({topUsers: [{
        id: 1001,
        img: 'poe.png',
        name: 'E. APoe',
        following: true,
        collections: [
          { catid: 10, category: 'books', ammount: '15' },
          { catid: 11, category: 'music albums', ammount: '80' },
          { catid: 12, category: 'headphones', ammount: '10' },
          { catid: 13, category: 'cassettes', ammount: '256' },
          { catid: 14, category: 'movies', ammount: '56' }
        ]
      },{
        id: 1002,
        img: 'einstein.png',
        name: 'A. Stein',
        following: false,
        collections: [
          { catid: 15, category: 'articles', ammount: '89' },
          { catid: 16, category: 'snes games', ammount: '15' },
          { catid: 17, category: 'gba games', ammount: '16' },
          { catid: 18, category: 'magazines', ammount: '95' },
          { catid: 19, category: 'books', ammount: '56' },
          { catid: 20, category: 'game cube games', ammount: '34' },
          { catid: 21, category: 'musix albums', ammount: '33' },
          { catid: 22, category: 'psx games', ammount: '108' }
        ]
      },{
        id: 1003,
        img: 'house.png',
        name: 'Gre. Ouse',
        following: false,
        collections: [
          { catid: 23, category: 'music albums', ammount: '365' },
          { catid: 24, category: 'music dvd', ammount: '253' },
          { catid: 25, category: 'vinil records', ammount: '408' }
        ]
      },{
        id: 1004,
        img: 'white.png',
        name: 'Heis. Berg',
        following: false,
        collections: [
          { catid: 26, category: 'books', ammount: '15' },
          { catid: 27, category: 'magazines', ammount: '80' },
          { catid: 28, category: 'vhs', ammount: '10' },
          { catid: 29, category: '', ammount: '56' }
        ]
      },{
        id: 1005,
        img: 'bean.png',
        name: 'Bean',
        following: true,
        collections: [
          { catid: 30, category: 'books', ammount: '154' },
          { catid: 31, category: 'gba games', ammount: '25' },
          { catid: 32, category: 'gb color games', ammount: '18' },
          { catid: 33, category: '3ds games', ammount: '32' },
          { catid: 34, category: 'xbox games', ammount: '10' },
          { catid: 35, category: 'xbox one games', ammount: '7' },
          { catid: 36, category: 'xbox 360 games', ammount: '3' },
          { catid: 37, category: 'psx games', ammount: '55' },
          { catid: 38, category: 'ps2 games', ammount: '19' },
          { catid: 39, category: 'ps3 games', ammount: '31' },
          { catid: 40, category: 'ps4 games', ammount: '14' },
        ]
      }]}))
}

exports.addFollower = (req, res) => {
  
  if (!req.body) {
    return res.status(400).send({
      message: "Missing details for following model creation"
    });
  }

  const followModel = new Following({
    user_id: req.body.userId,
    following_user_id: req.body.userFollowingId
  });
  res.status(200).send({msg: 'sall good'});
}

exports.removeFollower = (req, res) => {
  
  if (!req.body) {
    return res.status(400).send({
      message: "Missing details for following model creation"
    });
  }

  const followModel = new Following({
    user_id: req.body.userId,
    following_user_id: req.body.userFollowingId
  });
  res.status(200).send({msg: 'sall good'});
}

/*

exports.follow = (req, res) => {

  res.send('this is the new shit');
  if (!req.body) {
    return res.status(400).send({
      message: "Missing details for following model creation"
    });
  }

  // add an entry to the Images collection
  const followModel = new Following({
    user_id: req.body.userId,
    following_user_id: req.body.userFollowingId
  });

  followModel.save()
  .then(data=>{
    res.send(data);
  })
  .catch(err=>{
    res.status(500).send({
      message: err.message || "Error while saving the following model."
    });
  });
}

exports.following = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Missing details while trying to follow someone"
    })
  }
}

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Missing details for following model update"
    });
  }

  console.log('req.body', req.body);
  console.log('req.params', req.params);
}

*/