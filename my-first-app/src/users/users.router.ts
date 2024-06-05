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
  const id = c.req.param("id");
  console.log(id);
  const user = users.find((user) => user.id === parseInt(id, 10));
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


