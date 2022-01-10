// endpoints for all what is relevant to the user
const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const auth = require('../middleware/auth');

// endpoint for reciving all the user details exept the password
router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});


// endpoint for registering new user
router.post('/', async (req, res) => {

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('This email is already registered');

  user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.send(_.pick(user, ['_id', 'name', 'email']));

});


// endpoint for saving the user favforites cards
router.post('/favorites', async (req, res) => {
  const filter = { _id: req.body.userId };
  const update = { favorites: req.body.cardId };
  let user = await User.findOneAndUpdate(filter, { $addToSet: update });
  res.send(_.pick(user, ['_id', 'name', 'favorites']));
});

router.get('/favorites', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
})

module.exports = router;