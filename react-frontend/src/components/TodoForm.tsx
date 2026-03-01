import { useState, useRef, useEffect, type FormEvent, type ChangeEvent } from 'react'

interface TodoFormProps {
  onSubmit: (title: string) => Promise<unknown>
  disabled?: boolean
  placeholder?: string
}

export function TodoForm({
  onSubmit,
  disabled = false,
  placeholder = 'Nova tarefa...',
}: TodoFormProps) {
  const [value, setValue] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!submitting && !disabled) inputRef.current?.focus()
  }, [submitting, disabled])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || submitting || disabled) return
    setSubmitting(true)
    try {
      await onSubmit(trimmed)
      setValue('')
    } catch {
      // erro já tratado no hook
    } finally {
      setSubmitting(false)
      inputRef.current?.focus()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2" role="form" aria-label="Adicionar tarefa">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 placeholder-slate-400 transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:bg-slate-100 disabled:text-slate-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:placeholder-slate-400 dark:disabled:bg-slate-600 dark:disabled:text-slate-400"
        aria-label="Título da tarefa"
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={!value.trim() || submitting || disabled}
        className="rounded-xl bg-primary-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-offset-slate-800"
        aria-label="Adicionar"
      >
        {submitting ? (
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden />
        ) : (
          'Adicionar'
        )}
      </button>
    </form>
  )
}
