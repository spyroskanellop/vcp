var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var passport = require('passport');
require('../config/passport');

router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

router.route('/:id')
  .get(userController.getUser);  

router.route('/login')
  .post(userController.loginUser);


router.get('/protected', passport.authenticate('jwt', { session: false }),
 (req, res) => {
    return res.json(
      {
        status: 200,
        user: {
          id: req.user.id,
          username: req.user.username
        }
      }
    );
});

module.exports = router;
