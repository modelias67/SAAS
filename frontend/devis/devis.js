import { fetchDevis } from "../api.js";

async function afficherDevis() {
    const devis = await fetchDevis();
    const liste = document.getElementById("devis-list");

    devis.forEach((item) => {
        const li = document.createElement("li");
        li.className = "devis-item";
        li.textContent = `Devis #${item.id} - ${item.client} - ${item.montant} €`;
        liste.appendChild(li);
    });
}

afficherDevis();
