import { fetchClients, addClient, updateClient, deleteClient } from '../api.js';

// Variables globales
let clients = [];
let filteredClients = [];
let currentEditingClient = null;

// Éléments DOM
const clientsContainer = document.getElementById('clients-container');
const noClientsMessage = document.getElementById('no-clients-message');
const formContainer = document.getElementById('client-form-container');
const clientForm = document.getElementById('client-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const searchInput = document.getElementById('search-input');
const typeFilter = document.getElementById('type-filter');
const addClientBtn = document.getElementById('add-client-btn');
const closeFormBtn = document.getElementById('close-form-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Compteurs
const clientsCount = document.getElementById('clients-count');
const prospectsCount = document.getElementById('prospects-count');
const totalCount = document.getElementById('total-count');

// Fonction pour charger les clients
async function loadClients() {
    try {
        clients = await fetchClients();
        filteredClients = [...clients];
        updateStats();
        displayClients();
    } catch (error) {
        console.error('Erreur lors du chargement des clients:', error);
        showError('Erreur lors du chargement des clients');
    }
}

// Fonction pour mettre à jour les statistiques
function updateStats() {
    const clientsNumber = clients.filter(c => c.type === 'client').length;
    const prospectsNumber = clients.filter(c => c.type === 'prospect').length;
    
    clientsCount.textContent = clientsNumber;
    prospectsCount.textContent = prospectsNumber;
    totalCount.textContent = clients.length;
}

// Fonction pour afficher les clients
function displayClients() {
    if (filteredClients.length === 0) {
        clientsContainer.style.display = 'none';
        noClientsMessage.classList.remove('hidden');
        return;
    }
    
    clientsContainer.style.display = 'grid';
    noClientsMessage.classList.add('hidden');
    
    clientsContainer.innerHTML = filteredClients.map(client => createClientCard(client)).join('');
    
    // Ajouter les event listeners pour les actions
    addClientActionListeners();
}

// Fonction pour créer une carte client
function createClientCard(client) {
    const fullName = `${client.prenom || ''} ${client.nom || ''}`.trim();
    const address = [client.adresse, client.ville, client.code_postal].filter(Boolean).join(', ');
    
    return `
        <div class="client-card ${client.type}" data-client-id="${client.id}">
            <div class="client-header">
                <div class="flex items-center justify-between">
                    <span class="client-type-badge ${client.type}">
                        ${client.type === 'client' ? 'Client' : 'Prospect'}
                    </span>
                    <span class="client-status-badge ${client.statut || 'actif'}">
                        ${client.statut === 'inactif' ? 'Inactif' : 'Actif'}
                    </span>
                </div>
            </div>
            
            <div class="client-body">
                <h3 class="client-name">${fullName || 'Nom non renseigné'}</h3>
                <p class="client-email">${client.email || 'Email non renseigné'}</p>
                
                <div class="client-info">
                    ${client.telephone ? `<div><strong>Tél:</strong> ${client.telephone}</div>` : ''}
                    ${address ? `<div><strong>Adresse:</strong> ${address}</div>` : ''}
                    ${client.pays && client.pays !== 'France' ? `<div><strong>Pays:</strong> ${client.pays}</div>` : ''}
                    ${client.notes ? `<div><strong>Notes:</strong> ${client.notes}</div>` : ''}
                </div>
            </div>
            
            <div class="client-actions">
                <button class="action-btn edit-btn" data-action="edit" data-client-id="${client.id}" title="Modifier">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.5 2.50023C18.8978 2.10243 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.10243 21.5 2.50023C21.8978 2.89804 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.10243 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="action-btn delete-btn" data-action="delete" data-client-id="${client.id}" title="Supprimer">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M10 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14 11V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

// Fonction pour ajouter les event listeners aux actions des clients
function addClientActionListeners() {
    document.querySelectorAll('[data-action="edit"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const clientId = parseInt(btn.dataset.clientId);
            editClient(clientId);
        });
    });
    
    document.querySelectorAll('[data-action="delete"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const clientId = parseInt(btn.dataset.clientId);
            confirmDeleteClient(clientId);
        });
    });
}

// Fonction pour filtrer les clients
function filterClients() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const typeFilterValue = typeFilter.value;
    
    filteredClients = clients.filter(client => {
        const matchesSearch = !searchTerm || 
            (client.nom && client.nom.toLowerCase().includes(searchTerm)) ||
            (client.prenom && client.prenom.toLowerCase().includes(searchTerm)) ||
            (client.email && client.email.toLowerCase().includes(searchTerm));
        
        const matchesType = typeFilterValue === 'all' || client.type === typeFilterValue;
        
        return matchesSearch && matchesType;
    });
    
    displayClients();
}

// Fonction pour ouvrir le formulaire d'ajout
function openAddForm() {
    currentEditingClient = null;
    formTitle.textContent = 'Ajouter un client/prospect';
    submitBtn.textContent = 'Ajouter';
    clientForm.reset();
    document.getElementById('pays').value = 'France';
    formContainer.classList.remove('hidden');
    document.getElementById('nom').focus();
}

// Fonction pour ouvrir le formulaire de modification
function editClient(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    currentEditingClient = client;
    formTitle.textContent = 'Modifier le client/prospect';
    submitBtn.textContent = 'Modifier';
    
    // Remplir le formulaire
    Object.keys(client).forEach(key => {
        const input = document.getElementById(key);
        if (input) {
            input.value = client[key] || '';
        }
    });
    
    formContainer.classList.remove('hidden');
    document.getElementById('nom').focus();
}

// Fonction pour fermer le formulaire
function closeForm() {
    formContainer.classList.add('hidden');
    currentEditingClient = null;
    clientForm.reset();
}

// Fonction pour confirmer la suppression
function confirmDeleteClient(clientId) {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;
    
    const fullName = `${client.prenom || ''} ${client.nom || ''}`.trim();
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${fullName || 'ce client'} ?`)) {
        handleDeleteClient(clientId);
    }
}

// Fonction pour gérer la suppression
async function handleDeleteClient(clientId) {
    try {
        await deleteClient(clientId);
        await loadClients();
        showSuccess('Client supprimé avec succès');
    } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        showError('Erreur lors de la suppression du client');
    }
}

// Fonction pour gérer la soumission du formulaire
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(clientForm);
    const clientData = Object.fromEntries(formData.entries());
    
    // Validation basique
    if (!clientData.nom || !clientData.prenom || !clientData.email) {
        showError('Veuillez remplir tous les champs obligatoires');
        return;
    }
    
    try {
        if (currentEditingClient) {
            // Modification
            await updateClient(currentEditingClient.id, clientData);
            showSuccess('Client modifié avec succès');
        } else {
            // Ajout
            await addClient(clientData);
            showSuccess('Client ajouté avec succès');
        }
        
        closeForm();
        await loadClients();
    } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
        showError('Erreur lors de la sauvegarde du client');
    }
}

// Fonctions pour afficher les messages
function showSuccess(message) {
    // Implémentation simple avec alert, peut être améliorée avec des toasts
    alert(message);
}

function showError(message) {
    // Implémentation simple avec alert, peut être améliorée avec des toasts
    alert(message);
}

// Event listeners
addClientBtn.addEventListener('click', openAddForm);
closeFormBtn.addEventListener('click', closeForm);
cancelBtn.addEventListener('click', closeForm);
clientForm.addEventListener('submit', handleFormSubmit);
searchInput.addEventListener('input', filterClients);
typeFilter.addEventListener('change', filterClients);

// Fermer le formulaire avec Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !formContainer.classList.contains('hidden')) {
        closeForm();
    }
});

// Charger les clients au chargement de la page
loadClients();
