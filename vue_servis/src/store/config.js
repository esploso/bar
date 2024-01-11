// store.js
import { reactive } from 'vue'

// Create a reactive state object
const store = reactive({
  toggleModal: false,
  loggedIn: false,
  token: '',
  cart: [],
  api: 'https://zinjos-bar.onrender.com/api/',
  auth: 'https://zinjos-bar.onrender.com/auth/',
  admin: 'https://zinjos-bar.onrender.com/admin/'
})

export default store
