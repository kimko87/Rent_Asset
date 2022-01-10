const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Card, validateCard, generateRandomNumber } = require("../models/card");
const auth = require("../middleware/auth");

router.get("/all-assets", auth, async (req, res) => {
  const cards = await Card.find({});
  res.send(cards);

})

router.get("/my-assets", auth, async (req, res) => {
  console.log(req.user);
  if (!req.user.assetOwner) return res.status(401).send("Access Denied.");

  const cards = await Card.find({ user_id: req.user._id });
  res.send(cards);

});

router.delete("/:id", auth, async (req, res) => {
  const card = await Card.findOneAndRemove({
    _id: req.params.id,
    user_id: req.user._id,
  });
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(card);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateCard(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  let card = await Card.findOneAndUpdate({ _id: req.params.id }, req.body);
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");

  card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(card);
});

router.get('/:id', auth, async (req, res) => {
  const card = await Card.findOne({ _id: req.params.id, user_id: req.user._id });
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(card);
});

router.get('/favorites/:id', auth, async (req, res) => {
  const card = await Card.findOne({ _id: req.params.id });
  if (!card)
    return res.status(404).send("The card with the given ID was not found.");
  res.send(card);
})

router.post("/", auth, async (req, res) => {

  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let card = new Card({
    assetName: req.body.assetName,
    assetDescription: req.body.assetDescription,
    assetAddress: req.body.assetAddress,
    assetPhone: req.body.assetPhone,
    assetImage: req.body.assetImage ? req.body.assetImage : 'https://cdn.pixabay.com/photo/2017/02/22/09/26/icon-2088906_960_720.png',
    assetNumber: await generateRandomNumber(Card),
    user_id: req.user._id,
  });

  let post = await card.save();
  res.send(post);
});

module.exports = router;
