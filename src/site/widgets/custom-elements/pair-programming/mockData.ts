export interface Developer {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  status: "available" | "busy";
}

export const developers: Developer[] = [
  { id: "1", name: "Alice", avatar: "https://via.placeholder.com/40", skills: ["React", "TypeScript"], status: "available" },
  { id: "2", name: "Bob", avatar: "https://via.placeholder.com/40", skills: ["Node.js", "GraphQL"], status: "busy" },
  { id: "3", name: "Charlie", avatar: "https://via.placeholder.com/40", skills: ["Python", "Django"], status: "available" }
];

export const tasks = ['Task 1', 'Task 2', 'Task 3'];
