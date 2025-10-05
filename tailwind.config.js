// Configuration de base pour Tailwind CSS
module.exports = {
    // On indique à Tailwind où chercher les classes utilisées
    content: [
        "./frontend/**/*.html", // Tous les fichiers HTML dans frontend
        "./frontend/**/*.js", // Tous les fichiers JS dans frontend
    ],
    theme: {
        extend: {}, // Tu pourras personnaliser ici plus tard (couleurs, tailles, etc.)
    },
    plugins: [], // Tu peux ajouter des plugins Tailwind ici si besoin
};
