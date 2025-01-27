<template>
  <div v-if="loading" class="text-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <div v-else class="container mt-4">
    <h2>{{ song.title }} - Lyrics</h2>
    <pre>{{ song.lyrics }}</pre>
    <div class="mt-3">
      <RouterLink to="/" class="btn btn-secondary">Back to Song List</RouterLink>
    </div>
  </div>
</template>

<script>
import { ref as dbRef, get } from 'firebase/database'
import { database } from '@/firebase/firebaseConfig'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      song: null,
      loading: true,
    }
  },

  methods: {
    async getSongById(songId) {
      const snapshot = await get(dbRef(database, `songs/${songId}`))
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        throw new Error('Song not found')
      }
    },

    async fetchSong() {
      try {
        this.song = await this.getSongById(this.id)
      } catch (error) {
        console.error('Error fetching song details:', error)
      } finally {
        this.loading = false
      }
    },
  },

  mounted() {
    this.fetchSong()
  },
}
</script>
