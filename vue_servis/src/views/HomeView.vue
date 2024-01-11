<script setup>
import { ref, onMounted, computed } from 'vue'
import Card from '@/views/components/Card.vue'
import Modal from '@/views/components/Modal.vue'
import store from '@/store/config.js'

const drinks = ref([])
const itemsPerPage = 10
const currentPage = ref(1)

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:'+store.api+'kokteli')

    const data = await response.json()

    drinks.value = data.map((drink) => ({
      name: drink.naziv,
      price: drink.cena,
      id: drink.id
    }))
  } catch (error) {
    console.error('Error fetching drinks:', error)
  }
})

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
          <div class="mb-9">
            <h1 class="mb-2 text-[1.75rem] font-semibold text-dark">Our drinks</h1>
          </div>
          <div class="flex flex-wrap w-full">
            <Card
              @show-info="openModal"
              v-for="drink in displayedDrinks"
              :key="drink.id"
              :id="drink.id"
              :name="drink.name"
              :price="drink.price"
            />
          </div>
          <div class="mt-4">
            <button @click="currentPage--" :disabled="currentPage === 1">Previous</button>
            <span class="mx-2">Page {{ currentPage }}</span>
            <button @click="currentPage++" :disabled="currentPage * itemsPerPage >= drinks.length">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal :id="modalId" />
</template>
