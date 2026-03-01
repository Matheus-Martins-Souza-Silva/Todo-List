import { ThemeToggle, TodoFilters, TodoForm, TodoList } from '@/components'
import { useTodos } from '@/hooks/useTodos'
import type { Todo } from '@/types/todo'

function App() {
  const {
    todos,
    allTodos,
    filter,
    setFilter,
    loading,
    error,
    addTodo,
    toggleTodo,
    updateTodo,
    removeTodo,
  } = useTodos({
    onError: (e) => console.error('Todo error:', e),
  })

  const counts = {
    all: allTodos.length,
    pending: allTodos.filter((t: Todo) => t.status === 'pending').length,
    completed: allTodos.filter((t: Todo) => t.status === 'completed').length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-primary-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800/95">
      <main className="mx-auto max-w-xl px-4 py-8 sm:py-14">
        <header className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between sm:items-start">
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-slate-800 dark:text-white sm:text-4xl">
              To-Do List
            </h1>
            <p className="mt-1.5 text-slate-500 dark:text-slate-400">
              Organize suas tarefas do dia a dia
            </p>
          </div>
          <ThemeToggle />
        </header>

        <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-card backdrop-blur-sm dark:border-slate-700 dark:bg-slate-800/80 dark:shadow-card-dark sm:p-6">
          <div className="space-y-5">
            <TodoForm
              onSubmit={(title) => addTodo({ title })}
              disabled={loading}
              placeholder="O que fazer?"
            />

            {error && (
              <div
                className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800 ring-1 ring-red-200 dark:bg-red-900/30 dark:text-red-200 dark:ring-red-800"
                role="alert"
              >
                {error.message}
              </div>
            )}

            <TodoFilters
              current={filter}
              onChange={(f) => setFilter(f)}
              counts={counts}
            />

            {loading ? (
              <div className="flex justify-center py-12" aria-busy="true">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
              </div>
            ) : (
              <TodoList
                todos={todos}
                onToggle={toggleTodo}
                onUpdate={(id, title) => updateTodo(id, {title: title, status: status})}
                onRemove={removeTodo}
                emptyMessage={
                  filter === 'all'
                    ? 'Nenhuma tarefa. Adicione uma acima.'
                    : `Nenhuma tarefa ${filter === 'pending' ? 'pendente' : 'concluída'}.`
                }
              />
            )}
          </div>
        </div>

        <footer className="mt-10 text-center text-sm text-slate-400 dark:text-slate-500">
          To-Do List
        </footer>
      </main>
    </div>
  )
}

export default App
