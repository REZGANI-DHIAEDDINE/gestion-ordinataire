import { ref } from 'vue'
import { ordinateursInitiaux } from './assets/ordinateurs-initiaux.js'

const CLE = 'ordinateurs'

function charger() {
  const brut = localStorage.getItem(CLE)
  if (brut === null) {
    // Première utilisation : on enregistre les exemples
    localStorage.setItem(CLE, JSON.stringify(ordinateursInitiaux))
    return [...ordinateursInitiaux]
  }
  try {
    return JSON.parse(brut)
  } catch {
    return []
  }
}

// Tableau réactif partagé par toutes les pages
const ordinateurs = ref(charger())

function sauvegarder() {
  localStorage.setItem(CLE, JSON.stringify(ordinateurs.value))
}

export function useOrdinateurs() {
  function trouver(id) {
    return ordinateurs.value.find((o) => o.id === Number(id))
  }

  function ajouter(ordi) {
    const maxId = ordinateurs.value.reduce((m, o) => Math.max(m, o.id), 0)
    ordinateurs.value.push({ ...ordi, id: maxId + 1 })
    sauvegarder()
  }

  function modifier(id, donnees) {
    const index = ordinateurs.value.findIndex((o) => o.id === Number(id))
    if (index !== -1) {
      ordinateurs.value[index] = { ...donnees, id: Number(id) }
      sauvegarder()
    }
  }

  function supprimer(id) {
    ordinateurs.value = ordinateurs.value.filter((o) => o.id !== id)
    sauvegarder()
  }

  return { ordinateurs, trouver, ajouter, modifier, supprimer }
}
