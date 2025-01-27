<template>
  <form @submit.prevent="handleSubmit">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="mb-3">
          <label for="title" class="form-label">Song Title *</label>
          <input
            id="title"
            class="form-control"
            v-model="form.title"
            @blur="validateTitle"
            :class="{ 'is-invalid': errors.title }"
            required
          />
          <div v-if="errors.title" class="invalid-feedback">
            {{ errors.title }}
          </div>
        </div>

        <div class="mb-3">
          <label for="author" class="form-label">Author</label>
          <input id="author" class="form-control" v-model="form.author" />
        </div>

        <div class="mb-3">
          <label for="categoriesDropdown" class="form-label">Categories</label>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle w-100"
              type="button"
              id="categoriesDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select Categories
            </button>
            <ul class="dropdown-menu w-100" aria-labelledby="categoriesDropdown">
              <li v-for="(category, index) in categories" :key="index" class="dropdown-item">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :id="'category-' + index"
                    :value="category"
                    v-model="selectedCategories"
                  />
                  <label class="form-check-label" :for="'category-' + index">
                    {{ category }}
                  </label>
                </div>
              </li>

              <li><hr class="dropdown-divider" /></li>

              <li class="dropdown-item d-flex">
                <input
                  name="addCategory"
                  type="text"
                  class="form-control me-2"
                  v-model="newCategory"
                  placeholder="Add new category"
                  @keyup.enter="addCategory"
                />
                <button class="btn btn-sm btn-primary" type="button" @click="addCategory">
                  Add
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div class="mb-3">
          <label for="sourceText" class="form-label">Album</label>
          <input id="sourceText" class="form-control" v-model="form.sourceText" />
          <!-- <input
            id="sourceFile"
            type="file"
            class="form-control mt-2"
            @change="handleFileUpload"
            accept=".pdf"
            
          /> -->
        </div>

        <div class="mb-3">
          <label for="youtube" class="form-label">YouTube Link</label>
          <input id="youtube" class="form-control" v-model="form.youtubeLink" />
        </div>

        <div class="mb-3">
          <label for="lyrics" class="form-label">Lyrics</label>
          <textarea id="lyrics" class="form-control" v-model="form.lyrics"></textarea>
        </div>

        <div class="d-flex justify-content-between">
          <RouterLink to="/" class="btn btn-secondary">Cancel</RouterLink>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { database, storage } from '@/firebase/firebaseConfig'
import { ref as dbRef, push, get, update } from 'firebase/database'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useSongChangeStore } from '@/stores/songChangeStore'

export default {
  props: {
    id: {
      type: String,
    },
    existingSong: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      form: {
        title: this.existingSong.title || '',
        author: this.existingSong.author || '',
        categories: this.existingSong.categories || [],
        sourceText: this.existingSong.sourceText || '',
        sourceFile: null,
        youtubeLink: this.existingSong.youtubeLink || '',
        lyrics: this.existingSong.lyrics || '',
      },
      categories: [],
      newCategory: '',
      selectedCategories: this.existingSong.categories || [],
      errors: {
        title: '',
      },
    }
  },
  setup() {
    const songChangeStore = useSongChangeStore()

    return { songChangeStore }
  },
  methods: {
    handleFileUpload(event) {
      this.form.sourceFile = event.target.files[0]
    },

    capitalizeTitle(title) {
      if (!title) return ''
      return title.charAt(0).toUpperCase() + title.slice(1)
    },

    async uploadFile(file) {
      const fileRef = storageRef(storage, `songs/${file.name}`)
      await uploadBytes(fileRef, file)
      return getDownloadURL(fileRef)
    },

    async validateTitle() {
      if (!this.form.title.trim()) {
        this.errors.title = 'Title is required.'
        return false
      }

      const snapshot = await get(dbRef(database, 'songs'))
      if (snapshot.exists()) {
        const songs = snapshot.val()
        const isDuplicate = Object.values(songs).some(
          (song) => song.title.toLowerCase() === this.form.title.toLowerCase(),
        )

        if (isDuplicate) {
          this.errors.title = 'A song with this title already exists.'
          return false
        }
      }

      this.errors.title = ''
      return true
    },

    async handleSubmit() {
      if (!this.form.title) {
        alert('Please provide all required fields.')
        return
      }

      if (!this.form.author) this.form.author = 'unknown'

      const formattedTitle = this.capitalizeTitle(this.form.title)

      let fileURL = ''
      if (this.form.sourceFile) {
        fileURL = await this.uploadFile(this.form.sourceFile)
      }

      const newSong = {
        title: formattedTitle,
        author: this.form.author,
        categories: this.selectedCategories,
        sourceText: this.form.sourceText,
        sourceFile: fileURL,
        youtubeLink: this.form.youtubeLink,
        lyrics: this.form.lyrics,
      }

      if (this.id) {
        await update(dbRef(database, `songs/${this.id}`), newSong)
        this.songChangeStore.addChange(`Updated song: ${formattedTitle}`)
      } else {
        await push(dbRef(database, 'songs'), newSong)
        this.songChangeStore.addChange(`Added new song: ${formattedTitle}`)
      }

      const categoriesRef = dbRef(database, 'categories')
      const snapshot = await get(categoriesRef)

      const existingCategories = snapshot.exists() ? Object.values(snapshot.val()) : []

      for (const category of this.selectedCategories) {
        if (!existingCategories.includes(category)) {
          await push(dbRef(database, 'categories'), category)
        }
      }

      this.$router.push('/')
    },

    async loadCategories() {
      const categoriesRef = dbRef(database, 'categories')
      const snapshot = await get(categoriesRef)

      if (snapshot.exists()) {
        this.categories = Object.values(snapshot.val())
      } else {
        this.categories = []
      }
    },

    addCategory() {
      if (this.newCategory.trim() && !this.categories.includes(this.newCategory)) {
        this.categories.push(this.newCategory.trim())
        this.newCategory = ''
      }
    },
  },
  mounted() {
    this.loadCategories()
  },
}
</script>

<style scoped>
.dropdown-item:active {
  background-color: inherit;
  color: inherit;
}
</style>
