<template>
  <div class="container mt-5">
    <h2 class="text-center">Edit song details</h2>
    <div v-if="loading">Loading...</div>
    <SongForm v-else :id="id" :existingSong="song" />
  </div>
</template>

<script>
import SongForm from '@/components/SongForm.vue'
import { database } from '@/firebase/firebaseConfig'
import { ref as dbRef, get } from 'firebase/database'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  components: {
    SongForm,
  },

  data() {
    return {
      song: null,
      loading: true, 
    }
  },

  async mounted() {
    await this.loadSongData()
  },

  methods: {
    async loadSongData() {
      const songRef = dbRef(database, `songs/${this.id}`)
      const snapshot = await get(songRef)
      if (snapshot.exists()) {
        this.song = snapshot.val()
      } else {
        console.error('Song not found!')
      }
      this.loading = false
    },
  },
}
</script>

