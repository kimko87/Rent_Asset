// schema for mongoose of how the user supose to be.

const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
  },
  assetOwner: {
    type: Boolean,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  favorites: Array

});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, assetOwner: this.assetOwner }, config.get('jwtKey'));
  return token;
};

const User = mongoose.model('User', userSchema);

// joi validation
function validateUser(user) {

  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    assetOwner: Joi.boolean().required()
  });

  return schema.validate(user);
}

function validateFavorites(data) {
  const schema = Joi.object({
    favorites: Joi.array().min(1).required(),
  });

  return schema.validate(data);
}



exports.User = User;
exports.validate = validateUser;
exports.validateFavorites = validateFavorites;


