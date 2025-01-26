<template>
  <div class="container mt-5">
    <h2 class="text-center">Add New Song!</h2>

    <SongForm />
  </div>
</template>

<script>
import SongForm from '@/components/SongForm.vue'

export default {
  components: { SongForm },
}
</script>
