import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AddSongView from '@/views/AddSongView.vue'
import EditSongView from '@/views/EditSongView.vue'
import LyricsView from '@/views/LyricsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/add',
      name: 'AddSong',
      component: AddSongView,
    },
    {
      path: '/edit/:id',
      name: 'EditSong',
      component: EditSongView,
      props: true,
    },
    {
      path: '/lyrics/:id',
      name: 'Lyrics',
      component: LyricsView,
      props: true,
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView,
    },
  ],
})

export default router
