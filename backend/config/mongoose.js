const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) =>
    console.log(
      `DB connection successful! with server : ${data.connection.host}`
    )
  ).catch((err) => console.log(err));
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

exports.default = db;
