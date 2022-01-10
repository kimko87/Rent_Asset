const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const users = require("./routes/users");
const auth = require("./routes/auth");
const cards = require("./routes/cards");

mongoose
  .connect("mongodb://localhost/rent_asset", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Successfuly connected to MongoDB..."))
  .catch(err => console.error(err));

// when uploading to real server, the middleware of cors need to be deleted!!!!!!!!
app.use(cors());
app.use(express.json());

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/cards", cards);


const port = 3900;
http.listen(port, () => console.log(`Listening on port ${port}...`));
