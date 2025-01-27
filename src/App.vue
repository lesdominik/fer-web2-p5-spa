<template>
  <header class="d-flex align-items-center justify-content-between mb-3">
    <RouterLink to="/">
      <img src="@/assets/songnotes_cropped.png" alt="logo" height="100px" />
    </RouterLink>

    <transition name="fade">
      <div v-if="isHomePage" class="d-flex align-items-center gap-3">
        <input
          type="text"
          name="searchBar"
          class="form-control"
          placeholder="Search..."
          v-model="searchQuery"
          @input="onSearch"
          style="max-width: 500px"
        />
        <RouterLink to="/add">
          <font-awesome-icon
            icon="fa-solid fa-circle-plus"
            style="color: #ffd369; font-size: 3rem"
          />
        </RouterLink>
      </div>
    </transition>
  </header>
  <RouterView :searchQuery="searchQuery" />
</template>

<script>
import { computed } from 'vue'
import { useRoute, RouterView, RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'

// Add the icon to the library
library.add(faCirclePlus)

export default {
  data() {
    return {
      searchQuery: '',
    }
  },
  setup() {
    const route = useRoute()

    // Check if the current route is Home
    const isHomePage = computed(() => route.name === 'Home')

    return {
      isHomePage,
    }
  },
  methods: {
    onSearch() {
      this.$emit('search', this.searchQuery) // Emits search query for Home.vue to handle
    },
  },
  components: {
    FontAwesomeIcon,
  },
}
</script>

<style scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}
</style>
