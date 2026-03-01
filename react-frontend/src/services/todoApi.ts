import type {
  CreateTodoInput,
  Todo,
  TodoApiResponse,
  TodoStatus,
  UpdateTodoInput,
} from '@/types/todo';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

/** API: 0 = Pending, 1 = Completed */
function apiStatusToStatus(n: number): TodoStatus {
  return n === 1 ? 'completed' : 'pending'
}

function statusToApi(status: TodoStatus): number {
  return status === 'completed' ? 1 : 0
}

function mapApiToTodo(raw: TodoApiResponse): Todo {
  return {
    id: raw.id,
    title: raw.title,
    status: apiStatusToStatus(raw.status),
  }
}

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const finalUrl = `${API_BASE}${url}`
  try {
    const res = await fetch(finalUrl, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })
    if (!res.ok) {
      const error = await res
        .json()
        .catch(() => ({ message: res.statusText }))
      throw new Error(error.message ?? `HTTP ${res.status}`)
    }

    if(options?.method === 'DELETE')
      return undefined as T;

    return res.json()
  } catch (err) {
    if (err instanceof Error) throw err
    throw new Error(String(err))
  }
}

export const todoApi = {
  async list(): Promise<Todo[]> {
    const raw = await request<TodoApiResponse[]>('/getall')
    return raw.map(mapApiToTodo)
  },

  async get(id: string): Promise<Todo> {
    const raw = await request<TodoApiResponse>(`/${id}`)
    return mapApiToTodo(raw)
  },

  async create(input: CreateTodoInput): Promise<Todo> {
    const raw = await request<TodoApiResponse>('', {
      method: 'POST',
      body: JSON.stringify(input),
    })
    return mapApiToTodo(raw)
  },

  async update(id: string, input: UpdateTodoInput): Promise<Todo> {
    const body: Record<string, unknown> = { ...input }
    if (input.status !== undefined) {
      body.status = statusToApi(input.status)
    }
    const raw = await request<TodoApiResponse>(`/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
    })
    raw.id = id;
    return mapApiToTodo(raw)
  },

  async remove(id: string): Promise<void> {
    await request(`/${id}`, { method: 'DELETE' })
  },
}
