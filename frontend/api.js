// Adresse de base de ton API backend (à adapter selon ton serveur)
const API_BASE = "http://localhost:3000/api";

// Fonction pour récupérer les clients depuis le backend
export async function fetchClients() {
    try {
        const response = await fetch('http://localhost:3000/api/clients');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des clients');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur API clients:', error);
        throw error;
    }
}

// Fonction pour ajouter un nouveau client
export async function addClient(clientData) {
    try {
        const response = await fetch('http://localhost:3000/api/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientData)
        });
        
        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout du client');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erreur API ajout client:', error);
        throw error;
    }
}

// Fonction pour modifier un client existant
export async function updateClient(clientId, clientData) {
    try {
        const response = await fetch(`http://localhost:3000/api/clients/${clientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(clientData)
        });
        
        if (!response.ok) {
            throw new Error('Erreur lors de la modification du client');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erreur API modification client:', error);
        throw error;
    }
}

// Fonction pour supprimer un client
export async function deleteClient(clientId) {
    try {
        const response = await fetch(`http://localhost:3000/api/clients/${clientId}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression du client');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Erreur API suppression client:', error);
        throw error;
    }
}

// Fonction pour récupérer les devis depuis le backend
export async function fetchDevis() {
    try {
        const response = await fetch('http://localhost:3000/api/devis');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des devis');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur API devis:', error);
        throw error;
    }
}

// Fonction pour récupérer les factures depuis le backend
export async function fetchFactures() {
    try {
        const response = await fetch('http://localhost:3000/api/factures');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des factures');
        }
        return await response.json();
    } catch (error) {
        console.error('Erreur API factures:', error);
        throw error;
    }
}
