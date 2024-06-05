import { Hono } from "hono";
import { getUser, listUsers, newUser, updateUsers } from "./users.controller";
import {zValidator} from "@hono/zod-validator";
import { userSchema } from "./validators";
export const userRouter = new Hono();

// get users route
userRouter.get("/users", listUsers)

//get one user
userRouter.get("/users/:id", getUser);

// using type context(when you receive data)

// create a new user
userRouter.post("/new-users", newUser);

// update users
userRouter.put("/users/:id", updateUsers);

