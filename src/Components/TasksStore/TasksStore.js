import { create } from "zustand";
import { devtools } from 'zustand/middleware'
import axios from "axios";


const url = 'https://6427517846fd35eb7c3e1a54.mockapi.io/tasks'
let useTaskStore = create(devtools((set,get) => ({
  tasks: [],
  task: {},
  addPages: false,
  edditPages: false,
  showConfirmationModal: false,
  selectedTaskId: null,
  
  showAddTask: () => set(({addPages: true})),
  backClick: () => set(({addPages: false, edditPages: false,})),
  showDeleteConfirmationModal: (el) => {set(({showConfirmationModal: true, selectedTaskId: el}))},
  hideConfirmationModal: () => set(({showConfirmationModal: false})),
  edditTask: async (id) => {
    const {data} = await axios.get(`${url}/${id}`)
    set({task: data})
    set({edditPages: true, allTasks: false})
  },
  // зберігаємо завдання, змінити назву inputHandler
  inputHandler: (name, value) => {
    set(state => {
      const newTask = {...state.task}
      
      if(name === 'task') {
        newTask.name = value
      } 
      if(name === 'description') {
        newTask.comment = value
      } 
      return { task: newTask}
    })
  },

  // додаємо нове завдання в масив завдань і в бд
  addTask: async () => {
    const newTask = {...get().task}
    try {
      await axios.post(url, newTask)
      set(({ addPages: false,}))

    } catch (error) {
      console.log(error)
    }
  },
  // отримуємо з бд наші завдання 
  getTasks: async() => {
    const {data} = await axios.get(url)
    
    set(({tasks: data}))
  },
  // видаляємо задачу по id 
  deleteTask: async () => {
    const id = get().selectedTaskId
    await axios.delete(`${url}/${id}`)
    get().getTasks();
    get().hideConfirmationModal();
  },
  // Змінюємо задачу 
  onChangeTask: async() => {
    const id = get().task.id
    const newTask = get().task
    console.log(id)
    console.log(newTask)
    await axios.put(`${url}/${id}`, newTask)
    get().getTasks();
    set(({edditPages: false, allTasks: true,}))
  }
})))


export default useTaskStore