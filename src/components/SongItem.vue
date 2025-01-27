// src/components/SongItem.vue
<template>
  <div class="song-item card shadow-sm">
    <div class="card-body d-flex justify-content-between align-items-center">
      <div class="left-section d-flex align-items-center gap-3">
        <font-awesome-icon icon="fa-solid fa-angle-right" style="font-size: 1.5rem" />
        <div class="text-section">
          <h5 class="title mb-0">{{ song.title }}</h5>
          <small class="author text-muted">{{ song.author || 'Unknown' }}</small>
        </div>
      </div>
      <div class="right-section d-flex align-items-center gap-3">
        <div class="links">
          <span v-if="song.sourceText">{{ song.sourceText }}</span>
          <a
            v-if="song.sourceFile"
            :href="song.sourceFile"
            class="text-decoration-underline text-primary"
            download
            >pdf</a
          >
        </div>
        <RouterLink :to="{ name: 'EditSong', params: { id: song.id } }" class="btn btn-m"
          >Edit</RouterLink
        >
        <button @click="deleteSong" class="btn btn-danger">Delete</button>
        <RouterLink :to="{ name: 'Lyrics', params: { id: song.id } }" class="btn btn-lyrics btn-m"
          >Lyrics</RouterLink
        >
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

library.add(faAngleRight)

export default {
  props: {
    song: {
      type: Object,
      required: true,
    },
  },
  components: {
    FontAwesomeIcon,
  },
  methods: {
    deleteSong() {
      this.$emit('delete', this.song.id, this.song.title)
    },
  },
}
</script>

<style scoped>
.card-body {
  padding: 0.5rem 1rem;
}

.btn-lyrics {
  background-color: var(--primary-color);
  border-radius: 15px;
  font-weight: 600;
}

.btn-lyrics:hover,
.btn-lyrics:focus,
.btn-lyrics:active {
  background-color: var(--primary-color-hover);
}

.title {
  font-weight: bold;
  /* color: #212529; */
}

.author {
  font-size: 0.875rem;
  color: #6c757d;
}

.links {
  font-size: 0.875rem;
}

.links a {
  margin-left: 0.25rem;
}
</style>
