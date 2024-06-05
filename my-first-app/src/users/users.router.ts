import { Hono } from "hono";
import {type Context} from "hono";

export const userRouter = new Hono();

const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
  // Add more users here..
];

// get all users
userRouter.get("/users", (c) => {
  return c.json(users, 200);
});

//get one user
userRouter.get("/users/:id", (c) => {
  const id = Number(c.req.param("id"));
  console.log(id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }
  return c.json(user, 200);
});

// using type context(when you receive data)

// create a new user
userRouter.post("/new-users", async (c: Context) => {
    const newUser = await c.req.json();
    console.log(newUser)
    users.push(newUser);
    return c.json(newUser, 201);
})

//update a user

userRouter.put("/users/:id", async (c: Context) => {
  const id = Number(c.req.param("id"));
  const user = await c.req.json();
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
      return c.text("User not found", 404);
  }
  users[index] = user;
  // const foundUser = users.find((user) => user.id === id);
  // if (!foundUser) {
  //     return c.text("User not found", 404);
  // }
  // Object.assign(foundUser, user);  //update the user
  return c.json(user, 200);
})
