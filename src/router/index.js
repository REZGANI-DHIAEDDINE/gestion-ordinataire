import { createRouter, createWebHistory } from 'vue-router'
import ListeOrdinateurs from '../views/ListeOrdinateurs.vue'
import EditOrdinateur from '../views/EditOrdinateur.vue'

const routes = [
  { path: '/', redirect: '/ordinateurs' },
  { path: '/ordinateurs', name: 'liste', component: ListeOrdinateurs },
  { path: '/ordinateurs/ajouter', name: 'ajouter', component: EditOrdinateur },
  { path: '/ordinateurs/modifier/:id', name: 'modifier', component: EditOrdinateur },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
