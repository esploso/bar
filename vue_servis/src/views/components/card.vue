<template>
  <div class="flex flex-col relative mr-5 text-center mb-11 lg:mr-16">
    <div class="inline-block mb-4 relative shrink-0 rounded-[.95rem] group">
      <img
        class="inline-block shrink-0 rounded-[.95rem] w-[150px] h-[150px]"
        :src="strDrinkThumb || placeholderImage"
        alt="cocktail image"
      />
      <!-- Icons for hover effect -->
      <div
        v-if="strDrinkThumb"
        class="absolute overflow-hidden select-none top-0 right-0 left-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <div class="flex flex-row justify-center items-center align-middle h-full gap-2">
          <img
            src="/info.png"
            @click="showInfo"
            alt="22"
            class="w-12 h-12 bg-white p-2 rounded-full cursor-pointer"
          />
          <div class="relative">
            <img
              :src="addToCartImage"
              @click="showAddToCart = !showAddToCart"
              alt="22"
              class="w-12 h-12 bg-white p-2 rounded-full cursor-pointer"
            />
            <div
              :class="{ hidden: !showAddToCart }"
              class="absolute justify-center items-center gap-2 -end-8 w-fit px-4 py-2 flex flex-row bg-white mt-1"
            >
              <div class="relative">
                <div
                  @click="minus"
                  class="absolute inset-y-0 start-0.5 flex items-center ps-3 cursor-pointer"
                >
                  <img src="/minus.png" alt="minus" class="w-4 h-4" />
                </div>
                <input
                  type="text"
                  v-model="qty"
                  disabled
                  class="block px-4 w-24 text-sm text-center text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  autocomplete="off"
                />
                <div
                  @click="plus"
                  class="absolute inset-y-0 end-3 flex items-center cursor-pointer"
                >
                  <img src="/plus.png" alt="plus" class="w-4 h-4" />
                </div>
              </div>
              <button
                @click="addToCart"
                class="bg-green-700 hover:bg-green-800 h-fit w-fit focus:ring-4 focus:outline-none focus:ring-green-300 rounded-full text-sm p-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <svg
                  class="w-4 h-4"
                  fill="#ffffff"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="223px"
                  height="223px"
                  viewBox="-4.54 -4.54 54.48 54.48"
                  xml:space="preserve"
                  stroke="#ffffff"
                  transform="rotate(0)"
                  stroke-width="3.132738"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke="#CCCCCC"
                    stroke-width="0.09080400000000001"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <path
                        d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"
                      ></path>
                    </g>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <a
        href="javascript:void(0)"
        class="text-dark font-semibold hover:text-primary text-[1.25rem] transition-colors duration-200 ease-in-out"
        >{{ props.name }}</a
      >
      <span class="block font-medium text-muted">{{ props.price }} rsd</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import store from '@/store/config.js'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()
const strDrinkThumb = ref('')
const placeholderImage = '/drink.png' // Replace with your placeholder image URL
const props = defineProps(['price', 'name', 'id'])
const emits = defineEmits()
const qty = ref(0)

// Fetch data from the API on component mount
onMounted(async () => {
  try {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    const data = await response.json()

    const cocktail = data.drinks[0]
    strDrinkThumb.value = cocktail.strDrinkThumb
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  qty.value = store.cart[props.id] || 0
})

const showInfo = () => {
  emits('show-info', { id: props.id })
}
const showAddToCart = ref(false)
const plus = () => {
  if (qty.value < 1000) {
    qty.value = qty.value + 1
  }
}
const minus = () => {
  if (qty.value > 0) {
    qty.value = qty.value - 1
  }
}
const addToCart = () => {
  store.cart[props.id] = qty.value
  localStorage.setItem('cart',JSON.stringify(store.cart))
  let instance = $toast.success('Added to cart!')
}

const addToCartImage = computed(() => {
  return showAddToCart.value ? '/add-cart.png' : '/add.png'
})
</script>
