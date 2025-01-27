import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSongChangeStore = defineStore('songChangeStore', () => {
  const changes = ref([])

  const addChange = (message) => {
    if (changes.value.length >= 10) {
      changes.value.pop()
    }
    changes.value.unshift({ message, timestamp: new Date().toLocaleString() }) // Add new change to the start
  }

  return { changes, addChange }
})
