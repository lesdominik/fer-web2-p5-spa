<script setup>
import { useSongChangeStore } from '../stores/songChangeStore';

const songChangeStore = useSongChangeStore();
</script>

<template>
  <div class="w-100 p-3">
    <h5>Recent Changes</h5>
    <ul class="list-group">
      <li v-for="(change, index) in songChangeStore.changes" :key="index" class="list-group-item">
        <strong>{{ change.timestamp }}:</strong> {{ change.message }}
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
