const express = require("express");

const Arena = require("bull-arena");
const Bull = require("bull");

var morgan = require("morgan");

const app = express();
const port = 5000;

const redisConfig = {
  host: "localhost",
  port: 6379,
};

const appConfig = Arena(
  {
    // All queue libraries used must be explicitly imported and included.
    Bull,
    queues: [
      {
        name: "business-logic-service-queue",
        hostId: "Busines-Logic-Service",
        type: "bull",
        redis: redisConfig,
      },
      // Add Queue 2
      //   {
      //     name: "business-logic-service-queue",
      //     hostId: "calculate-from-x-to-y-from-job-service",
      //     type: "bull",
      //     redis: redisConfig,
      //   },
    ],
  },
  {
    disableListen: true,
  }
);

console.log("redisConfig" + redisConfig);

app.use(morgan("combined"));
app.use("/", appConfig);

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
