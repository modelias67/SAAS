import { fetchFactures } from "../api.js";

async function afficherFactures() {
    const factures = await fetchFactures();
    const liste = document.getElementById("facture-list");

    factures.forEach((item) => {
        const li = document.createElement("li");
        li.className = "facture-item";
        li.textContent = `Facture #${item.id} - ${item.client} - ${item.total} €`;
        liste.appendChild(li);
    });
}

afficherFactures();
