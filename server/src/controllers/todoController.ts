import prisma from "../utils/prismaClient";

export async function getAllTodos() {
  return await prisma.todo.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getTodoById(id: string) {
  return await prisma.todo.findUnique({ where: { id } });
}

export async function createTodo(data: {
  title: string;
  description?: string;
}) {
  return await prisma.todo.create({ data });
}

export async function updateTodo(
  id: string,
  data: { title?: string; description?: string }
) {
  return await prisma.todo.update({
    where: { id },
    data,
  });
}

export async function deleteTodo(id: string) {
  return await prisma.todo.delete({ where: { id } });
}
