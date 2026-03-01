type Filter = 'all' | 'pending' | 'completed'

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'pending', label: 'Pendentes' },
  { value: 'completed', label: 'Concluídas' },
]

interface TodoFiltersProps {
  current: Filter
  onChange: (filter: Filter) => void
  counts?: { all: number; pending: number; completed: number }
}

export function TodoFilters({ current, onChange, counts }: TodoFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar tarefas">
      {filters.map(({ value, label }) => {
        const count = counts?.[value]
        const isSelected = current === value
        return (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(value)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${
              isSelected
                ? 'bg-primary-600 text-white shadow-sm dark:bg-primary-500'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-600 dark:hover:ring-slate-500'
            }`}
          >
            {label}
            {count !== undefined && (
              <span className="ml-1.5 opacity-90">({count})</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
