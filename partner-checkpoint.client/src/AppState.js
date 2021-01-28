import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  tasks: [],
  lists: [],
  boards: [],
  board: {},
  showModal: false,
  modalType: '',
  comments: [],
  task: {},
  list: {},
  dragging: false
})
