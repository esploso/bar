<template xmlns="http://www.w3.org/1999/html">
  <!-- Main modal -->
  <div
    :class="{ hidden: !store.toggleModal }"
    @click="store.toggleModal = !store.toggleModal"
    class="fixed top-0 right-0 left-0 bottom-0 z-[99] bg-gray-100 opacity-75 cursor-pointer"
  ></div>
  <div
    :class="{ hidden: !store.toggleModal }"
    class="fixed top-0 right-0 left-0 bottom-0 z-[100] max-w-md shadow-xl h-fit my-auto mx-auto"
  >
    <div class="flex items-center justify-center h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Product id: {{ props.id }}
          </h3>
          <button
            @click="store.toggleModal = !store.toggleModal"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-4 md:p-5">
          <div class="grid gap-4 mb-4 grid-cols-3">
            <div class="col-span-3 flex flex-row gap-2 w-full">
              <div class="w-1/2">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Name</label
                >
                <span
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >{{ drink.name }}</span
                >
              </div>
              <div class="w-1/2">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Category</label
                >
                <span
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  {{ drink.kategorija }}
                </span>
              </div>
            </div>
            <div class="col-span-2">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Product Description</label
              >
              <span
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >{{ drink.opis }}</span
              >
            </div>
            <div class="col-span-1 flex flex-col">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Ingredients</label
              >
              <span
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <span v-for="x in drink.sastojci" :key="x.id">{{ x.naziv }}<br /></span>
              </span>
              <div class="mt-4">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Price</label
                >
                <span
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  {{ drink.price }} rsd
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import store from '@/store/config.js'
import { onMounted, ref, watch } from 'vue'

const props = defineProps(['id'])
const drink = ref([])

const toggleModal = ref(false)

watch(toggleModal, async (modalState) => {
  if (modalState === true) {
    try {
      const response = await fetch('http://localhost:9000/kokteli/' + props.id)
      const data = await response.json()
      drink.value.name = data.naziv
      drink.value.price = data.cena
      drink.value.opis = data.opis
      drink.value.kategorija = data.Kategorija.naziv
      drink.value.sastojci = data.sastojci
      drink.value.id = data.id
    } catch (error) {
      console.error('Error fetching drinks:', error)
    }
  }
})

// Update toggleModal when store.toggleModal changes
watch(
  () => store.toggleModal,
  (newVal) => {
    toggleModal.value = newVal
  }
)
</script>
