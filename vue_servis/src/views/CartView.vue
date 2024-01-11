<script setup>
import { ref, onMounted, computed } from 'vue'
import Modal from '@/views/components/Modal.vue'
import store from '@/store/config.js'
import CartCard from '@/views/components/CartCard.vue'
import {useToast} from "vue-toast-notification";
import {jwtDecode} from "jwt-decode";
const $toast = useToast();

const drinks = ref([])
const itemsPerPage = 10
const currentPage = ref(1)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:' + store.api + 'kokteli')
    const data = await response.json()

    // Filter drinks where store.cart[key] !== null
    drinks.value = data
        .filter((drink) => {
          const key = drink.id;
          return store.cart.hasOwnProperty(key) && store.cart[key] !== null;
        })
        .map((drink) => ({
          name: drink.naziv,
          price: drink.cena,
          id: drink.id,
        }));
  } catch (error) {
    console.error('Error fetching drinks:', error)
  }
})
const removedItem = (payload) => {
  drinks.value = drinks.value.filter((drink) => drink.id !== payload.id);
}
const checkout = async () => {
  try {
    const jwtToken = localStorage.getItem('jwtToken');
    const body = {
      user: jwtToken ? jwtDecode(jwtToken) : null,
      cart: store.cart
    };

    const response = await fetch('http://localhost:' + store.api + 'narudzbina/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    console.log(data)
    $toast.success('Successful checkout!');
    emptyCart()
  } catch (e) {
    $toast.error('Unsuccessful checkout!');
  }
}
const emptyCart = () => {
  localStorage.removeItem('cart')
  store.cart = []
  $toast.success('Emptied cart!')
}

const displayedDrinks = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return drinks.value.slice(startIndex, endIndex)
})

const modalId = ref('')
const openModal = (payload) => {
  modalId.value = payload.id
  store.toggleModal = true
}

</script>

<template>
  <div class="flex flex-wrap mb-5">
    <div class="w-full max-w-screen-xl mb-6 mx-auto">
      <div class="flex-auto px-6">
        <div>
          <div class="mb-9 flex justify-between">
            <h1 class="mb-2 text-[1.75rem] font-semibold text-dark">Cart:</h1>
            <div class="gap-2 flex items-center">
              <button v-if="store.cart.length > 0"
                  @click="emptyCart"
                  class="h-fit w-fit text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                Empty cart
              </button>
              <button v-if="store.cart.length > 0 && store.loggedIn"
                  @click="checkout"
                  class="text-white h-fit w-fit  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >Checkout</button
              >
            </div>
          </div>
          <div v-if="store.cart.length > 10" class="my-4">
            <button @click="currentPage--" :disabled="currentPage === 1">Previous</button>
            <span class="mx-2">Page {{ currentPage }}</span>
            <button @click="currentPage++" :disabled="currentPage * itemsPerPage >= drinks.length">
              Next
            </button>
          </div>
          <div v-if="drinks.length > 0" class="flex flex-wrap flex-col w-full gap-4">
            <CartCard
              @show-info="openModal"
              @removed-item="removedItem"
              v-for="drink in displayedDrinks"
              :key="drink.id"
              :id="drink.id"
              :name="drink.name"
              :price="drink.price"
            />
          </div>
          <div v-if="store.cart.length === 0">
            Cart is empty.
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal :id="modalId" />
</template>
