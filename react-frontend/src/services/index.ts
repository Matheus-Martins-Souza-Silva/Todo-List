import { todoApi } from './todoApi'
import { todoStorage } from './todoStorage'

const useBackend = import.meta.env.VITE_USE_BACKEND === 'true'

export const todoClient = todoApi
export { todoApi, todoStorage }
