import express, { Request, Response } from "express";
import { URLController } from "./controller/URLController";
import { MongoConnection } from "./database/MongoConnection";

const app = express();
const port = 3000;

app.use(express.json());

const database = new MongoConnection();
database.connect();

const urlController = new URLController();
app.post("/shorten", urlController.shorten)

app.get("/:hash", urlController.redirect)

app.listen(port, () => {
    console.log("Server running 🔥🔥 on port: " + port)
})