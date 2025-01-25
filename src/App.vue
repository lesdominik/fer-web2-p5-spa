<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <RouterLink to="/">
      <h1><span class="primary-text">Song</span>Notes</h1>
    </RouterLink>

    <!-- <nav>
      <RouterLink to="/add">Add new</RouterLink>
    </nav> -->
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 2rem;
}

header a {
  font-size: 1.5rem;
  margin: 0;
  text-align: center;
  color: var(--color-text);
}

h1 .primary-text,
a h1 {
  font-weight: bold;
}

.primary-text {
  color: var(--primary-color);
}

nav {
  align-self: flex-end;
}

nav a {
  font-size: 1.5rem;
  font-weight: bold;
  background-color: var(--primary-color);
  color: var(--color-background);
  padding: 0.5rem 1rem;
  border-radius: 10px;
}

nav a:hover {
  background-color: var(--primary-color-hover);
}
</style>
