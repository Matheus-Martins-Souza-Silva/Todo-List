export type TodoStatus = 'pending' | 'completed'

/** Formato retornado pela API: status 0 = Pending, 1 = Completed; sem datas. */
export interface TodoApiResponse {
  id: string
  title: string
  status: number
}

export interface Todo {
  id: string
  title: string
  status: TodoStatus
  createdAt?: string
  updatedAt?: string
}

export interface CreateTodoInput {
  title: string
}

export interface UpdateTodoInput {
  title: string
  status?: TodoStatus
}
