<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8 col-12">
        <SongList :searchQuery="searchQuery" />
      </div>

      <div class="col-md-4 col-12">
        <RecentChanges />
      </div>
    </div>
  </div>
</template>

<script>
import SongList from '@/components/SongList.vue'
import RecentChanges from '@/components/RecentChanges.vue'

export default {
  props: {
    searchQuery: {
      type: String,
      required: false,
      default: '',
    },
  },
  components: {
    SongList,
    RecentChanges,
  },
}
</script>
