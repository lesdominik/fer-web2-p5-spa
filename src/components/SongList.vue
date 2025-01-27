<template>
  <div class="song-list">
    <div class="container">
      <div v-if="loading" class="text-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else>
        <div v-if="songs.length" class="row">
          <div v-for="song in filteredSongs" :key="song.id" class="col-12 mb-3 p-0">
            <SongItem :song="song" @delete="deleteSong" />
          </div>
        </div>
        <div v-else class="text-center text-muted">No songs available.</div>
      </div>
    </div>
  </div>
</template>

<script>
import SongItem from './SongItem.vue'
import { database } from '@/firebase/firebaseConfig'
import { ref as dbRef, get, query, orderByChild, remove } from 'firebase/database'
import { useSongChangeStore } from '@/stores/songChangeStore'

export default {
  components: { SongItem },
  props: {
    searchQuery: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      songs: [],
      loading: true,
    }
  },
  setup() {
    const songChangeStore = useSongChangeStore()

    return { songChangeStore }
  },
  computed: {
    filteredSongs() {
      const query = this.searchQuery.toLowerCase()
      return this.songs.filter((song) => {
        const titleMatch = song.title.toLowerCase().includes(query)
        const authorMatch = song.author.toLowerCase().includes(query)
        const lyricsMatch = song.lyrics.toLowerCase().includes(query)
        return titleMatch || authorMatch || lyricsMatch
      })
    },
  },
  methods: {
    async fetchSongs() {
      this.loading = true
      try {
        const songsQuery = query(dbRef(database, 'songs'), orderByChild('title'))
        const snapshot = await get(songsQuery)

        if (snapshot.exists()) {
          // Convert the Firebase object to an array of songs
          this.songs = Object.entries(snapshot.val()).map(([id, song]) => ({
            id,
            ...song,
          }))

          this.songs.sort((a, b) =>
            a.title.localeCompare(b.title, undefined, { sensitivity: 'base' }),
          )
        } else {
          this.songs = []
        }
      } catch (error) {
        console.error('Error fetching songs:', error)
      } finally {
        this.loading = false
      }
    },

    async deleteSong(songId, songTitle) {
      try {
        const songRef = dbRef(database, `songs/${songId}`)
        await remove(songRef)

        this.songs = this.songs.filter((song) => song.id !== songId)
        this.songChangeStore.addChange(`Deleted song: ${songTitle}`)
      } catch (error) {
        console.error('Error deleting song:', error)
      }
    },
  },
  mounted() {
    this.fetchSongs()
  },
}
</script>

<style scoped>
.spinner-border {
  color: var(--primary-color);
}
</style>
