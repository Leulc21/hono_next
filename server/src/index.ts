import { Hono } from "hono";
import { cors } from "hono/cors";
import todoRoutes from "./routes/todoRoutes";
const app = new Hono();
app.use(
  "*",
  cors({
    origin: "*", // or restrict to your frontend domain
  })
);

app.get("/", (c) => c.text("Hello from Bun + Hono + Prisma!"));

// Mount todo routes on /todos
app.route("/todos", todoRoutes);

export default {
  port: 3000,
  fetch: app.fetch,
};
