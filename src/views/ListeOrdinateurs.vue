<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import OrdinateurCard from '../components/OrdinateurCard.vue'
import { useOrdinateurs } from '../stockage.js'

const router = useRouter()
const { ordinateurs, supprimer } = useOrdinateurs()

// Bonus : recherche, tri, compteur
const recherche = ref('')
const tri = ref('aucun')

const ordinateursAffiches = computed(() => {
  const mot = recherche.value.trim().toLowerCase()
  let liste = ordinateurs.value.filter(
    (o) => o.modele.toLowerCase().includes(mot) || o.processeur.toLowerCase().includes(mot),
  )
  if (tri.value === 'croissant') liste = [...liste].sort((a, b) => a.memoire - b.memoire)
  if (tri.value === 'decroissant') liste = [...liste].sort((a, b) => b.memoire - a.memoire)
  return liste
})

function ajouter() {
  router.push('/ordinateurs/ajouter')
}

function modifier(id) {
  router.push('/ordinateurs/modifier/' + id)
}

function confirmerSuppression(id) {
  if (confirm('Voulez-vous vraiment supprimer cet ordinateur ?')) {
    supprimer(id)
  }
}
</script>

<template>
  <header class="entete">
    <div>
      <h1>Parc informatique</h1>
      <p>Gestion des ordinateurs</p>
    </div>
    <button class="btn btn-vert" @click="ajouter">＋ Ajouter un ordinateur</button>
  </header>

  <div class="outils">
    <input v-model="recherche" type="text" placeholder="Rechercher par modèle ou processeur..." />
    <select v-model="tri">
      <option value="aucun">Tri : aucun</option>
      <option value="croissant">Mémoire croissante</option>
      <option value="decroissant">Mémoire décroissante</option>
    </select>
    <span class="compteur">{{ ordinateursAffiches.length }} ordinateur(s)</span>
  </div>

  <div v-if="ordinateursAffiches.length" class="grille">
    <OrdinateurCard
      v-for="o in ordinateursAffiches"
      :key="o.id"
      :ordinateur="o"
      @modifier="modifier"
      @supprimer="confirmerSuppression"
    />
  </div>
  <p v-else class="vide">Aucun ordinateur à afficher.</p>
</template>

<style scoped>
.outils { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin: 16px 0; }
.outils input { flex: 1; min-width: 220px; }
input, select {
  padding: 9px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 15px;
}
.compteur { font-weight: 600; color: #1d5fc4; }
.grille { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.vide { text-align: center; color: #6b7280; margin-top: 40px; }
</style>
