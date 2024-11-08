import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const token = localStorage.getItem('access')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "fullLayout",
      component: () => import('../layout/fullLayout.vue'),
      meta: {
        auth: true
      },
      children: [
        {
          path: '/',
          name: 'Minha Biblioteca',
          component: HomeView
        },
        {
          path: '/:genre',
          name: 'genre',
          component: () => import('../views/GenreView.vue'),
        },
        {
          path: '/artist/:id',
          name: 'artist',
          component: () => import('../views/ArtistDetailView.vue'),
        
        },
        {
          path: '/artistpainel',
          name: 'artistpainel',
          component: () => import('../views/ArtistPainelView.vue')
        },
        {
          path: '/playlist/:id',
          name: 'playlist',
          component: () => import('../views/PlaylistDetailView.vue')
        },
        {
          path: '/CommunityHome',
          name: 'CommunityHome',
          component: () => import('../views/CommunityView.vue')
        },
      ],
    },
    {
      path: "/",
      name: "blankLayout",
      component: () => import('../layout/blankLayout.vue'),
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
          meta:{
            auth: false
          }
        },
        {
          path: '/sign-up',
          name: 'sign-up',
          component: () => import('../views/auth/SignView.vue'),
          meta:{
            auth: false
          }
        },
        {
          path: '/plans',
          name: 'artist',
          component: () => import('../views/PlansView.vue'),
          meta:{
            auth: true
          }
        },
        {
          path: '/beanartist',
          name: 'beartist',
          component: () => import('../views/BeAnArtistView.vue')
        },
        {
          path: '/artistpainel',
          name: 'artistpainel',
          component: () => import('../views/ArtistPainelView.vue')
        },
        {
          path: '/plans/payments',
          name: 'payments',
          component: () => import('../views/PaymentsView.vue'),
          meta:{
            auth: true
          }
        },
        {
          path: '/navigation',
          name: 'Navegar',
          component: () => import('../views/NavigationView.vue')
        },
        {
          path: '/historico',
          name: 'Historico',  
          component: () => import('../views/HistoryView.vue'),
          
        },
        { 
          path: '/:pathMatch(.*)*', 
          name: 'NotFound', 
          component: ()=> import('../views/NotFound.vue'),
        },
        {
          path: '/beanartist',
          name: 'beartist',
          component: () => import('../views/BeAnArtistView.vue')
        },
        
      ]
    },
  ]
})
export default router