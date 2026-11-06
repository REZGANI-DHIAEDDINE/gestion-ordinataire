// Récupère toutes les images du dossier assets/images
const images = import.meta.glob('./assets/images/*', { eager: true, import: 'default' })

export function resoudreImage(photo) {
  if (!photo) return images['./assets/images/defaut.svg']
  // URL ou image importée depuis l'ordinateur (data:)
  if (/^(https?:|data:)/.test(photo)) return photo
  return images['./assets/images/' + photo] || images['./assets/images/defaut.svg']
}
