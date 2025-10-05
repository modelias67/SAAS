// On sélectionne toutes les cartes de la page d'accueil
document.querySelectorAll(".feature-card, .card").forEach((card) => {
    // Pour chaque carte, on écoute le clic
    card.addEventListener("click", () => {
        // On récupère le chemin vers la page cible (ex: clients/clients.html)
        const activityPath = card.dataset.activity;

        // On redirige vers cette page
        window.location.href = `/frontend/${activityPath}`;
    });
});
