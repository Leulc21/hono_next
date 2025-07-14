// pages/index.tsx or components/TodoList.tsx

"use client";
import { useQuery } from "@tanstack/react-query";

type Todo = {
  id: string;
  title: string;
  description?: string;
};

const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch("http://localhost:3000/todos");
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
};

export default function Todos() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos</p>;

  return (
    <ul>
      {data?.map((todo) => (
        <li key={todo.id}>
          {todo.title} — {todo.description}
        </li>
      ))}
    </ul>
  );
}
