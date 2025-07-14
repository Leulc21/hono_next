import { Hono } from "hono";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
} from "../controllers/todoController";

const todoRoutes = new Hono();

todoRoutes.get("/", async (c) => {
  const todos = await getAllTodos();
  return c.json(todos);
});

todoRoutes.get("/:id", async (c) => {
  const id = c.req.param("id");
  const todo = await getTodoById(id);
  if (!todo) return c.notFound();
  return c.json(todo);
});

todoRoutes.post("/", async (c) => {
  const body = await c.req.json();
  const todo = await createTodo(body);
  return c.json(todo, 201);
});

todoRoutes.put("/:id", async (c) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const updated = await updateTodo(id, body);
  return c.json(updated);
});

todoRoutes.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await deleteTodo(id);
  return c.json({ message: "Todo deleted successfully." });
});

export default todoRoutes;
