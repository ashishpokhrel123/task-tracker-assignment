const express = require("express");

const ApiError = require("./utils/ApiError");
const httpStatus = require("http-status");
const config = require("./config/key");
const routes = require("./routes/");
const cors = require("cors");

const { errorConverter, errorHandler } = require("./middleware/error");
const app = express();

const port = config.port;

app.use(express.json());

app.options("*", cors());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

//send back 404 error if request not found
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not Found"));
});

//convert error to  ApiError
app.use(errorConverter);

//handling error
app.use(errorHandler);

// connecting to server

app.listen(port, function () {
  console.log(`Server is listening on http://localhost:${port}`);
});

module.exports = app;
