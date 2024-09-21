import mongoose from "mongoose";
import { UserSchema } from "./UserSchema.js";

export const UserCollection = new mongoose.model("User", UserSchema);
