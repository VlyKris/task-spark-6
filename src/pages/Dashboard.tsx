// TODO: THIS IS THE DEFAULT DASHBOARD PAGE THAT THE USER WILL SEE AFTER AUTHENTICATION. ADD MAIN FUNCTIONALITY HERE.
// This is the entry point for users who have just signed in

import { TodoForm } from "@/components/todos/TodoForm";
import { TodoItem } from "@/components/todos/TodoItem";
import { TodoStats } from "@/components/todos/TodoStats";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserButton } from "@/components/auth/UserButton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useAuth } from "@/hooks/use-auth";
import { Protected } from "@/lib/protected-page";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { CheckCircle, Filter, Plus } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Doc<"todos"> | null>(null);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");

  const allTodos = useQuery(api.todos.getTodos);
  const completedTodos = useQuery(api.todos.getTodosByStatus, { completed: true });
  const pendingTodos = useQuery(api.todos.getTodosByStatus, { completed: false });

  const getFilteredTodos = () => {
    switch (filter) {
      case "completed":
        return completedTodos || [];
      case "pending":
        return pendingTodos || [];
      default:
        return allTodos || [];
    }
  };

  const handleEdit = (todo: Doc<"todos">) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTodo(null);
  };

  const filteredTodos = getFilteredTodos();

  return (
    <Protected>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10"
        >
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">TodoFlow</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {user?.name || user?.email}!
                </p>
              </div>
            </div>
            <UserButton />
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          <TodoStats />

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={filter} onValueChange={(value: "all" | "completed" | "pending") => setFilter(value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Todos</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Todo
            </Button>
          </motion.div>

          {/* Todo List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-3"
          >
            {filteredTodos.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <CheckCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  {filter === "all" 
                    ? "No todos yet" 
                    : filter === "completed" 
                    ? "No completed todos" 
                    : "No pending todos"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {filter === "all" 
                    ? "Create your first todo to get started!" 
                    : filter === "completed" 
                    ? "Complete some todos to see them here." 
                    : "All caught up! No pending todos."}
                </p>
                {filter === "all" && (
                  <Button onClick={() => setShowForm(true)} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Your First Todo
                  </Button>
                )}
              </motion.div>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem key={todo._id} todo={todo} onEdit={handleEdit} />
              ))
            )}
          </motion.div>
        </main>

        {/* Todo Form Dialog */}
        <TodoForm
          open={showForm}
          onOpenChange={handleFormClose}
          todo={editingTodo}
        />
      </div>
    </Protected>
  );
}