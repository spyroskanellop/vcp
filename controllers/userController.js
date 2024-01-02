const User = require('../models/User');
const { hashSync, compareSync} = require('bcrypt');
const jwt = require('jsonwebtoken');
var passport = require('passport');
require('../config/passport');

const getAllUsers = (req, res) => {
  User.findAll()
    .then(users => {
      res.json({ status: 200, UsersList: users });
    })
    .catch(err => {
      res.json({ message: "Internal Server Error", status: 500 });
      console.log(err);
    });
}

const createNewUser = (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password,
    isActive: 1
  };

  User.create(userData).then(() => {
    console.log("Record successfully saved");
    res.json({ "message": "Record Successfully saved", "status": 200 });
  })
    .catch(err => {
      if (err) {
        res.json({ "message": "Internal Server Error", "status": 500 });
        console.log(err);
      }
    });

}

const updateUser = (req, res) => {
  var id = req.body.id;
  var userData = {
    username: req.body.username,
    password: req.body.password,
    isActive: req.body.isActive
  };

  User.findByPk(id).then((user) => {
    if (!user) {
      console.log("User not found");
    } else {
      user.update(userData);
      console.log("Record successfully updated");
      res.json({ message: "Record Successfully updated", status: 200 });
    }
  }).catch((err) => {
    if (err) {
      res.json({ message: "Internal Server Error", status: 500 });
      console.log(err);
    }
  });
}


const getUser = (req, res) => {
  var userId = req.params.id;

  User.findOne({ where: { id: userId } })
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.json({ message: "Internal Server Error", status: 500 });
      console.log(err);
    });
}

const deleteUser = (req, res) => {
  var deleteId = req.body.id;
  User.destroy({ where: { id: deleteId } })
    .then(() => {
      console.log("Record successfully deleted");
      res.json({ message: "Record Successfully deleted", status: 200 });
    })
    .catch(err => {
      res.end('{"message": "Internal Server Error", "status" : 500}');
      console.log(err);
    });;
}

const loginUser = (req, res) => {
  console.log("username: ", req.body.username);
  User.findOne({ username : req.body.username, password: req.body.password }).then( user => {
    if(!user){
      return res.json({message: "Could not find user", status: 401});
    }

    if(!compareSync(req.body.password, user.password)){
      return res.json({message: "Incorrect password", status: 401});
    }

    const payload = {
      username: user.username,
      id: user.id
    }
    
    const token = jwt.sign(payload, "secretOrPrivateKey", {expiresIn: "1d"});
    return res.json({message: "Logged in seccessfully", status: 200, token: "Bearer "+token});
  })
}

const getUserProtected = () => {  
  console.log("Inside controller");

  passport.authenticate('jwt', {session: false}), (req, res) => {
    
    return res.json({user: {
      id: req.user.id,
      username: req.user.username
    }, status: 200});
  }

}


module.exports = { getAllUsers, createNewUser, updateUser, getUser, deleteUser, loginUser, getUserProtected };