import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/discover'
    },
    {
        path: '/discover',
        name: 'Discover',
        component: () => import('../views/Discover.vue')
    },
    {
        path: '/playlists',
        name: 'Playlists',
        component: () => import('../views/Playlists.vue')
    },
    {
        path: '/playlist',
        name: 'Playlist',
        component: () => import('../views/Playlist.vue')
    },
    {
        path: '/songs',
        name: 'Songs',
        component: () => import('../views/Songs.vue')
    },
    {
        path: '/mvs',
        name: 'Mvs',
        component: () => import('../views/Mvs.vue')
    },
    {
        path: '/mv',
        name: 'Mv',
        component: () => import('../views/Mv.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
