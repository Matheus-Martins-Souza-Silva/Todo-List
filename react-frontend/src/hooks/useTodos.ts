import { todoClient } from '@/services'
import type { CreateTodoInput, Todo, UpdateTodoInput } from '@/types/todo'
import { useCallback, useEffect, useRef, useState } from 'react'

type FilterStatus = 'all' | 'pending' | 'completed'

interface UseTodosOptions {
  onError?: (error: Error) => void
}

export function useTodos(options: UseTodosOptions = {}) {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<FilterStatus>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const onErrorRef = useRef(options.onError)
  onErrorRef.current = options.onError

  const fetchTodos = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await todoClient.list()
      setTodos(data)
    } catch (err) {
      const e = err instanceof Error ? err : new Error(String(err))
      setError(e)
      onErrorRef.current?.(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const addTodo = useCallback(
    async (input: CreateTodoInput) => {
      setError(null)
      try {
        const created = await todoClient.create(input)
        setTodos((prev: Todo[]) => [created, ...prev])
        return created
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err))
        setError(e)
        onErrorRef.current?.(e)
        throw e
      }
    },
    []
  )

  const toggleTodo = useCallback(
    async (id: string) => {
      const todo = todos.find((t: Todo) => t.id === id)
      if (!todo) return
      const newStatus = todo.status === 'completed' ? 'pending' : 'completed'
      setError(null)
      try {
        const updated = await todoClient.update(id, { title: todo.title, status: newStatus })
        setTodos((prev: Todo[]) =>
          prev.map((t: Todo) => (t.id === id ? updated : t))
        )
        return updated
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err))
        setError(e)
        onErrorRef.current?.(e)
        throw e
      }
    },
    [todos]
  )

  const updateTodo = useCallback(
    async (id: string, input: UpdateTodoInput) => {
      setError(null)
      try {
        const updated = await todoClient.update(id, input)
        setTodos((prev: Todo[]) =>
          prev.map((t: Todo) => (t.id === id ? updated : t))
        )
        return updated
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err))
        setError(e)
        onErrorRef.current?.(e)
        throw e
      }
    },
    []
  )

  const removeTodo = useCallback(
    async (id: string) => {
      setError(null)
      try {
        await todoClient.remove(id)
        setTodos((prev: Todo[]) => prev.filter((t: Todo) => t.id !== id))
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err))
        setError(e)
        onErrorRef.current?.(e)
        throw e
      }
    },
    []
  )

  const filteredTodos = todos.filter((t: Todo) => {
    if (filter === 'all') return true
    return t.status === filter
  })

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter,
    loading,
    error,
    addTodo,
    toggleTodo,
    updateTodo,
    removeTodo,
    refetch: fetchTodos,
  }
}
