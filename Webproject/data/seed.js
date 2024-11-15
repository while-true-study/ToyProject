import mongoose from "mongoose";
import { DATABASE_URL } from "../env.js";
import data from "./mock.js";
import User from "../model/user.js";

mongoose.connect(DATABASE_URL);

await User.deleteMany({});
await User.insertMany(data);

mongoose.connection.close();
