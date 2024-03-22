require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app.js");

const PORT = process.env.PORT;
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log(`Database Connected!`);
  });


app.listen(PORT, () => {
  console.log(`Server running on port : ${PORT}`);
});
