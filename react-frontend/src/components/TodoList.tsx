import type { Todo } from '@/types/todo'
import { TodoItem } from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onRemove: (id: string) => void
  emptyMessage?: string
}

export function TodoList({
  todos,
  onToggle,
  onUpdate,
  onRemove,
  emptyMessage = 'Nenhuma tarefa ainda.',
}: TodoListProps) {
  const handleUpdate = (id: string, title: string) => {
    onUpdate(id, title)
  }

  if (todos.length === 0) {
    return (
      <p className="rounded-xl bg-slate-100/80 px-4 py-8 text-center text-slate-500 dark:bg-slate-700/50 dark:text-slate-400" data-testid="todo-list-empty">
        {emptyMessage}
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-2" role="list" data-testid="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={handleUpdate}
          onRemove={onRemove}
        />
      ))}
    </ul>
  )
}
