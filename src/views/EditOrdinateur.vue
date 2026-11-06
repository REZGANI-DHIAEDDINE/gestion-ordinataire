<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrdinateurs } from '../stockage.js'
import { resoudreImage } from '../imageUtil.js'

const route = useRoute()
const router = useRouter()
const { trouver, ajouter, modifier } = useOrdinateurs()

// Mode déterminé par la route : /modifier/:id => modification
const modeModification = computed(() => route.params.id !== undefined)

const formulaire = ref({
  modele: '',
  processeur: '',
  memoire: '',
  disque: '',
  carteGraphique: '',
  photo: '',
})
const erreurs = ref([])

if (modeModification.value) {
  const existant = trouver(route.params.id)
  if (existant) {
    formulaire.value = { ...existant } // copie : on ne modifie pas l'original avant "Enregistrer"
  } else {
    router.replace('/ordinateurs')
  }
}

function choisirImage(event) {
  const fichier = event.target.files[0]
  if (!fichier) return
  const lecteur = new FileReader()
  lecteur.onload = () => {
    formulaire.value.photo = lecteur.result
  }
  lecteur.readAsDataURL(fichier)
}

function valider() {
  const f = formulaire.value
  const liste = []
  if (!f.modele.trim()) liste.push('Le modèle est obligatoire.')
  if (!f.processeur.trim()) liste.push('Le processeur est obligatoire.')
  if (!(Number(f.memoire) > 0)) liste.push('La mémoire doit être strictement positive.')
  if (!(Number(f.disque) > 0)) liste.push('Le disque doit être strictement positif.')
  erreurs.value = liste
  return liste.length === 0
}

function enregistrer() {
  if (!valider()) return
  const donnees = {
    ...formulaire.value,
    modele: formulaire.value.modele.trim(),
    processeur: formulaire.value.processeur.trim(),
    memoire: Number(formulaire.value.memoire),
    disque: Number(formulaire.value.disque),
  }
  if (modeModification.value) {
    modifier(route.params.id, donnees)
  } else {
    ajouter(donnees)
  }
  router.push('/ordinateurs')
}

function annuler() {
  router.push('/ordinateurs')
}
</script>

<template>
  <header class="entete">
    <h1>{{ modeModification ? 'Modifier un ordinateur' : 'Ajouter un ordinateur' }}</h1>
    <button class="btn btn-gris" @click="annuler">← Retour à la liste</button>
  </header>

  <div class="contenu">
    <div class="photo">
      <img :src="resoudreImage(formulaire.photo)" alt="Aperçu" />
      <label class="btn btn-gris">
        Choisir une image
        <input type="file" accept="image/*" hidden @change="choisirImage" />
      </label>
      <small>(ou indiquer un nom de fichier)</small>
    </div>

    <form class="formulaire" @submit.prevent="enregistrer">
      <div v-if="erreurs.length" class="erreurs">
        <p v-for="e in erreurs" :key="e">{{ e }}</p>
      </div>

      <label>Modèle *</label>
      <input v-model="formulaire.modele" type="text" />

      <label>Processeur *</label>
      <input v-model="formulaire.processeur" type="text" />

      <div class="ligne">
        <div>
          <label>Mémoire (Go) *</label>
          <input v-model="formulaire.memoire" type="number" min="1" />
        </div>
        <div>
          <label>Disque (Go) *</label>
          <input v-model="formulaire.disque" type="number" min="1" />
        </div>
      </div>

      <label>Carte graphique</label>
      <input v-model="formulaire.carteGraphique" type="text" />

      <label>Photo (nom ou chemin)</label>
      <input v-model="formulaire.photo" type="text" placeholder="ex : dell.svg" />

      <div class="boutons">
        <button type="button" class="btn btn-gris" @click="annuler">Annuler</button>
        <button type="submit" class="btn btn-bleu">💾 Enregistrer</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.contenu {
  display: flex;
  gap: 24px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-top: 16px;
  flex-wrap: wrap;
}
.photo { width: 240px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
.photo img { width: 100%; height: 170px; object-fit: contain; border: 1px solid #e5e7eb; border-radius: 8px; }
.photo small { color: #6b7280; }
.formulaire { flex: 1; min-width: 280px; display: flex; flex-direction: column; gap: 6px; }
label { font-weight: 600; margin-top: 8px; }
input[type='text'], input[type='number'] {
  width: 100%;
  padding: 9px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 15px;
  background: #f9fafb;
}
.ligne { display: flex; gap: 16px; }
.ligne > div { flex: 1; }
.boutons { display: flex; justify-content: flex-end; gap: 10px; margin-top: 16px; }
.erreurs { background: #fee2e2; color: #b91c1c; border-radius: 6px; padding: 8px 12px; }
.erreurs p { margin: 3px 0; }
</style>
