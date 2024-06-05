import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import "dotenv/config"
import { userRouter } from './users/users.router'

const app = new Hono()

// default route
app.get('/', (c) => {
  return c.text('Hello Tiff this is Hono!')
})
app.get('/okay', (c) => {
  return c.text('Hello Tiff 😙😙😙')
})
app.notFound((c) => {
  return c.text('Not Found 😔', 404)
})
// custom routes
app.route("/", userRouter) // here we passed the default route
app.route("/users:id", userRouter) // here we passed the users route
// new user
app.route("/new-users", userRouter)

const port = 3000
console.log(`Server is running on port ${port}`)

// starts your application  entry point of the API 
serve({
  fetch: app.fetch,
  port
})

// serve({
//   fetch: app.fetch,
//   port:Number(process.env.PORT)
// }) // if you want to use env variable for port you define it here.
// 
// })