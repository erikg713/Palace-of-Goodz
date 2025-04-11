// File: frontend/src/pages/HomePage.vue <template>

  <section class="max-w-6xl mx-auto py-8">
    <h2 class="text-2xl font-bold mb-6 text-center">Featured Goodz</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="product in featuredProducts"
        :key="product.id"
        class="bg-white rounded-xl shadow hover:shadow-lg p-4 flex flex-col"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-48 object-cover rounded"
        />
        <h3 class="text-lg font-semibold mt-4">{{ product.name }}</h3>
        <p class="text-gray-600 mt-1 line-clamp-2">{{ product.description }}</p>
        <p class="mt-2 font-bold">{{ product.price }} Π</p>
        <button
          class="mt-auto bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold py-2 px-4 rounded mt-4"
        >
          Buy with Pi
        </button>
      </div>
    </div>
  </section>
</template><script setup>
const featuredProducts = [
  {
    id: 1,
    name: 'Handcrafted Wooden Bowl',
    description: 'A unique artisan bowl carved from reclaimed wood.',
    price: 3.5,
    image: '/images/bowl.jpg'
  },
  {
    id: 2,
    name: 'Ceramic Tea Set',
    description: 'A traditional hand-painted tea set with four cups.',
    price: 5,
    image: '/images/tea-set.jpg'
  },
  {
    id: 3,
    name: 'Embroidered Throw Pillow',
    description: 'Colorful pillow with intricate embroidery patterns.',
    price: 2,
    image: '/images/pillow.jpg'
  }
];
</script><style scoped>
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
