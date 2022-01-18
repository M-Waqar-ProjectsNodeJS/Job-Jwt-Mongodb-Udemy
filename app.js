require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDb = require("./db/dbConfig");
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandler");

const userRoute = require("./routes/users");
const jobRoute = require("./routes/jobs");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));

app.use("/api/user", userRoute);
app.use("/api/job", jobRoute);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT;
const start = async () => {
  try {
    const url = process.env.MONGO_URI;
    await connectDb(url);
    app.listen(port, () => {
      console.log(`Server is listening on Port:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
