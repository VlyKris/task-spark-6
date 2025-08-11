import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { CheckCircle, Circle, Clock } from "lucide-react";

export function TodoStats() {
  const allTodos = useQuery(api.todos.getTodos);
  const completedTodos = useQuery(api.todos.getTodosByStatus, { completed: true });
  const pendingTodos = useQuery(api.todos.getTodosByStatus, { completed: false });

  if (!allTodos || !completedTodos || !pendingTodos) {
    return null;
  }

  const stats = [
    {
      label: "Total",
      value: allTodos.length,
      icon: <Circle className="h-5 w-5" />,
      color: "text-blue-500",
    },
    {
      label: "Completed",
      value: completedTodos.length,
      icon: <CheckCircle className="h-5 w-5" />,
      color: "text-green-500",
    },
    {
      label: "Pending",
      value: pendingTodos.length,
      icon: <Clock className="h-5 w-5" />,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="p-4 rounded-lg border bg-card"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className={stat.color}>{stat.icon}</span>
            <span className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </span>
          </div>
          <div className="text-2xl font-bold">{stat.value}</div>
        </motion.div>
      ))}
    </div>
  );
}
