<template>
  <div class="border rounded p-4 shadow flex items-center justify-between">
    <div>
      <h3 class="font-bold text-lg">{{ product.name }} - {{ product.price }}π</h3>
      <p class="text-xs text-purple-600 font-medium uppercase">{{ product.category }}</p>
      <p class="text-sm text-gray-600">{{ product.description }}</p>
    </div>
    <button
      @click="deleteProduct(product._id)"
      class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
    >
      Delete
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['delete-product']);

const deleteProduct = (id) => {
  emit('delete-product', id);
};
</script>

