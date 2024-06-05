import { Hono } from "hono";
import {type Context} from "hono";

export const userRouter = new Hono();

const users = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
  {id:3, name:"Tiff Nyawe", email: "mwanikitiffany@gmail.com"},
  {id:4, name:"kim Jay", email: "mwanikitiffany25@hotmail.com"},
  {id:5, name:"Tyla Wambui", email: "mwanikitiffany@example.com"},
];

// get all users
export const listUsers = async (c: Context) => {
    return c.json(users);
  };

//get one user
export const getUser = (c: Context) => {
  const id = c.req.param("id");
  console.log(id);
  const user = users.find((user) => user.id === parseInt(id, 10));
  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }
  return c.json(user, 200);
};

// create a new user
export const newUser = async (c: Context) => {
    const newUser = await c.req.json();
    console.log(newUser)
    users.push(newUser);
    return c.json(newUser, 201);
};

// update users
export const updateUsers = async (c: Context) => {
  const id = c.req.param("id");
  const updatedUser = await c.req.json();
  const index = users.findIndex((user) => user.id === parseInt(id, 10));
  if (index === -1) {
    return c.json({ error: "User not found" }, 404);
    }
    users[index] = { ...users[index], ...updatedUser };
    return c.json(users[index], 200);
  };


// using type context(when you receive data)