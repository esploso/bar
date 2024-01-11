// store.js
import { reactive } from 'vue'

// Create a reactive state object
const store = reactive({
  toggleModal: false,
  loggedIn: false,
  token: '',
  cart: [],
  api: '3000/api/',
  auth: '3000/auth/',
  admin: '3000/admin/'
})

export default store
