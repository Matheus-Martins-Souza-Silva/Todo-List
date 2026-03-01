import type { Todo } from '@/types/todo'
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type KeyboardEvent } from 'react'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onUpdate: (id: string, title: string) => void
  onRemove: (id: string) => void
}

export function TodoItem({ todo, onToggle, onUpdate, onRemove }: TodoItemProps) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editing) inputRef.current?.focus()
  }, [editing])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = editValue.trim()
    if (trimmed && trimmed !== todo.title) {
      onUpdate(todo.id, trimmed)
    } else {
      setEditValue(todo.title)
    }
    setEditing(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setEditValue(todo.title)
      setEditing(false)
      inputRef.current?.blur()
    }
  }

  return (
    <li
      className="group flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200/80 transition hover:ring-slate-300 dark:bg-slate-700/80 dark:ring-slate-600 dark:hover:ring-slate-500"
      data-testid="todo-item"
    >
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-700 ${
          todo.status === 'completed'
            ? 'border-primary-500 bg-primary-500'
            : 'border-slate-300 bg-white hover:border-slate-400 dark:border-slate-500 dark:bg-slate-600 dark:hover:border-slate-400'
        }`}
        aria-label={todo.status === 'completed' ? 'Marcar como pendente' : 'Marcar como concluída'}
        aria-pressed={todo.status === 'completed'}
      >
        {todo.status === 'completed' && (
          <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {editing ? (
        <form onSubmit={handleSubmit} className="min-w-0 flex-1">
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
            onBlur={() => handleSubmit({ preventDefault: () => {} } as FormEvent)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-slate-800 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-500 dark:bg-slate-600 dark:text-slate-100"
            aria-label="Editar tarefa"
          />
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setEditing(true)}
          className={`min-w-0 flex-1 text-left text-slate-800 transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded px-1 -mx-1 dark:text-slate-200 dark:focus:ring-offset-slate-700 ${
            todo.status === 'completed' ? 'text-slate-500 line-through dark:text-slate-400' : ''
          }`}
        >
          {todo.title}
        </button>
      )}

      <button
        type="button"
        onClick={() => onRemove(todo.id)}
        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 opacity-0 group-hover:opacity-100 dark:hover:bg-red-900/40 dark:hover:text-red-400 dark:focus:ring-offset-slate-700"
        aria-label="Remover tarefa"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </li>
  )
}
