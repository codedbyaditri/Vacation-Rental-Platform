const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("connected to DB");

  await initDB(); // ⭐ call AFTER connection
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "695eec438c5131b6c4a5537a",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

main().catch((err) => {
  console.log(err);
});
