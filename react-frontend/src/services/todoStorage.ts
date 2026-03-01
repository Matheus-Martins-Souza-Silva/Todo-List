import type { Todo, CreateTodoInput, UpdateTodoInput } from '@/types/todo'

const STORAGE_KEY = 'todo-list-items'

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function saveTodos(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

function generateId() {
  return crypto.randomUUID?.() ?? `id-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export const todoStorage = {
  async list(): Promise<Todo[]> {
    return Promise.resolve(loadTodos())
  },

  async get(id: string): Promise<Todo> {
    const todo = loadTodos().find((t) => t.id === id)
    if (!todo) throw new Error('Todo não encontrado')
    return todo
  },

  async create(input: CreateTodoInput): Promise<Todo> {
    const todos = loadTodos()
    const now = new Date().toISOString()
    const created: Todo = {
      id: generateId(),
      title: input.title.trim(),
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    }
    todos.unshift(created)
    saveTodos(todos)
    return created
  },

  async update(id: string, input: UpdateTodoInput): Promise<Todo> {
    const todos = loadTodos()
    const index = todos.findIndex((t) => t.id === id)
    if (index === -1) throw new Error('Todo não encontrado')
    const updated = {
      ...todos[index],
      ...input,
      updatedAt: new Date().toISOString(),
    }
    todos[index] = updated
    saveTodos(todos)
    return updated
  },

  async remove(id: string): Promise<void> {
    const todos = loadTodos().filter((t) => t.id !== id)
    saveTodos(todos)
  },
}
