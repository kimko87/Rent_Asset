const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const _ = require("lodash");

const cardSchema = new mongoose.Schema({
  assetName: { type: String, required: true, minlength: 2, maxlength: 255 },
  assetDescription: { type: String, required: true, minlength: 2, maxlength: 1024 },
  assetAddress: { type: String, required: true, minlength: 2, maxlength: 400 },
  assetPhone: { type: String, required: true, minlength: 9, maxlength: 10 },
  assetImage: { type: String, required: true, minlength: 11, maxlength: 1024 },
  assetNumber: { type: String, required: true, minlength: 3, maxlength: 999999999, unique: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Card = mongoose.model("Card", cardSchema);

async function generateRandomNumber(Card) {
  while (true) {
    let randomNumber = _.random(1000, 999999999);
    let card = await Card.findOne({ assetNumber: randomNumber });
    if (!card) return String(randomNumber);
  }
}

function validateCard(card) {
  const schema = Joi.object({
    assetName: Joi.string().min(2).max(255).required(),
    assetDescription: Joi.string().min(2).max(1024).required(),
    assetAddress: Joi.string().min(2).max(400).required(),
    assetPhone: Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),
    assetImage: Joi.string().min(11).max(1024).allow("")

  });

  return schema.validate(card);
}

exports.Card = Card;
exports.generateRandomNumber = generateRandomNumber;
exports.validateCard = validateCard;
