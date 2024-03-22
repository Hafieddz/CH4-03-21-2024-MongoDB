require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const Customer = require("../models/customerModel");

const DB = process.env.DATABASE;
const customers = JSON.parse(fs.readFileSync(`${__dirname}/customers.json`, "utf-8"));

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log(`Database Connected!`);
  });

const importData = async () => {
  try {
    await Customer.create(customers);
    console.log("Data imported successfully!");
  } catch (error) {
    console.error(error.message);
  }
  process.exit()
};

const clearData = async () => {
  try {
    await Customer.deleteMany();
    console.log("Data deleted successfully!");
  } catch (error) {
    console.error(error.message);
  }
  process.exit()
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  clearData();
}
