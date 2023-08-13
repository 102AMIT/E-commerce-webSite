const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./backend/config/.env" });
const db = require("./config/mongoose");

// Handle Uncaught Exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Uncaught Exception");
  process.exit(1);
});

const server = app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Error when server start");
  }
  console.log("Server is running on port: ", process.env.PORT);
});

// Unhandled Promise Rejection if any error in database connection and it's closed the server if error is found

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
