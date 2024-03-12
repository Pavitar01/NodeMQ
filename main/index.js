import express from "express";
import bodyParser from "body-parser";
import { Producer } from "./Producers.js";
import * as dotenv from "dotenv";
dotenv.config();
const producer = new Producer();
const app = express();
app.use(bodyParser.json("application/json"));
app.post("/sendlog", async (req, res) => {
  await producer.publishNewMessage(req.body.logType, req.body.message);
  res.send({
    message: "hello",
  });
});

app.listen(4004, () => {
  console.log("server is listening");
});
