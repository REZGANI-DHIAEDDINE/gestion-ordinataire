<script setup>
import { resoudreImage } from '../imageUtil.js'

defineProps({
  ordinateur: { type: Object, required: true },
})

const emit = defineEmits(['modifier', 'supprimer'])
</script>

<template>
  <div class="carte">
    <img :src="resoudreImage(ordinateur.photo)" :alt="ordinateur.modele" />
    <h3>{{ ordinateur.modele }}</h3>
    <p>Processeur : {{ ordinateur.processeur }}</p>
    <p>Mémoire : {{ ordinateur.memoire }} Go</p>
    <p>Disque : {{ ordinateur.disque }} Go</p>
    <p>Carte graphique : {{ ordinateur.carteGraphique }}</p>
    <div class="actions">
      <button class="btn btn-bleu" @click="emit('modifier', ordinateur.id)">✎ Modifier</button>
      <button class="btn btn-rouge" @click="emit('supprimer', ordinateur.id)">🗑 Supprimer</button>
    </div>
  </div>
</template>

<style scoped>
.carte {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 14px;
  display: flex;
  flex-direction: column;
}
img { width: 100%; height: 160px; object-fit: contain; }
h3 { margin: 10px 0 8px; }
p { margin: 3px 0; font-size: 14px; }
.actions { display: flex; gap: 8px; margin-top: auto; padding-top: 12px; }
.actions .btn { flex: 1; }
</style>
