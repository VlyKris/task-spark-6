import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Calendar, Clock, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

interface TodoItemProps {
  todo: Doc<"todos">;
  onEdit: (todo: Doc<"todos">) => void;
}

const priorityColors = {
  high: "text-destructive border-destructive/50 bg-destructive/10",
  medium: "text-accent border-accent/50 bg-accent/10",
  low: "text-secondary border-secondary/50 bg-secondary/10",
};

export function TodoItem({ todo, onEdit }: TodoItemProps) {
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const handleToggle = async () => {
    try {
      await toggleTodo({ id: todo._id });
      toast.success(todo.completed ? "Todo marked as incomplete" : "Todo completed!");
    } catch (error) {
      toast.error("Failed to update todo");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo({ id: todo._id });
      toast.success("Todo deleted");
    } catch (error) {
      toast.error("Failed to delete todo");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 15px oklch(var(--primary)/0.4)",
        borderColor: "oklch(var(--primary))",
      }}
      className={`p-4 rounded-lg border bg-card/80 transition-all duration-200 ${
        todo.completed ? "opacity-40 bg-card/40" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={handleToggle}
          className="mt-1.5"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-2">
            <h3
              className={`font-medium break-all ${
                todo.completed ? "line-through text-muted-foreground" : ""
              }`}
            >
              {todo.title}
            </h3>
            <span
              className={`px-2 py-0.5 text-xs rounded-full border font-semibold ${
                priorityColors[todo.priority]
              }`}
            >
              {todo.priority}
            </span>
          </div>
          
          {todo.description && (
            <p
              className={`text-sm text-muted-foreground mb-2 whitespace-pre-wrap break-words ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.description}
            </p>
          )}
          
          {todo.dueDate && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>Due: {format(new Date(todo.dueDate), "MMM d, yyyy")}</span>
            </div>
          )}
          
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
            <Clock className="h-3.5 w-3.5" />
            <span>Created: {format(new Date(todo._creationTime), "MMM d, yyyy")}</span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="shrink-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(todo)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive focus:text-destructive focus:bg-destructive/20"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}