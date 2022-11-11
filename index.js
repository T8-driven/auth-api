import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import joi from "joi";
import bcrypt from "bcrypt";

const userSchema = joi.object({
  name: joi.string().required().min(3).max(100),
  password: joi.string().required(),
  email: joi.string().email().required(),
});

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
} catch (err) {
  console.log(err);
}

const db = mongoClient.db("authDb");
const userCollection = db.collection("users");


app.listen(4000, () => {
  console.log(`Server running in port: ${4000}`);
});
