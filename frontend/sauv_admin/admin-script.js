/**
 * Script JavaScript pour l'interface d'administration
 * Gestion des interactions, modales, et fonctionnalités
 */

class AdminInterface {
    constructor() {
        this.modal = null;
        this.currentSection = null;
        this.isLoading = false;
        
        this.init();
    }

    /**
     * Initialisation de l'interface
     */
    init() {
        this.setupEventListeners();
        this.setupModal();
        this.initializeCards();
        this.setupKeyboardShortcuts();
        
        console.log('Interface d\'administration initialisée');
    }

    /**
     * Configuration des écouteurs d'événements
     */
    setupEventListeners() {
        // Écouteurs pour les cartes
        document.querySelectorAll('.admin-stats-card').forEach(card => {
            card.addEventListener('click', (e) => this.handleCardClick(e));
            card.addEventListener('mouseenter', (e) => this.handleCardHover(e));
            card.addEventListener('mouseleave', (e) => this.handleCardLeave(e));
        });

        // Écouteurs pour les boutons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.admin-btn-primary, .admin-btn-secondary, .admin-btn-danger, .admin-btn-success')) {
                this.handleButtonClick(e);
            }
        });

        // Écouteur pour le redimensionnement de la fenêtre
        window.addEventListener('resize', () => this.handleResize());
    }

    /**
     * Configuration de la modale
     */
    setupModal() {
        this.modal = document.getElementById('modal');
        const closeButton = document.getElementById('close-modal');
        
        if (closeButton) {
            closeButton.addEventListener('click', () => this.closeModal());
        }

        // Fermer la modale en cliquant sur l'arrière-plan
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }
    }

    /**
     * Initialisation des cartes avec animations
     */
    initializeCards() {
        const cards = document.querySelectorAll('.admin-stats-card');
        
        cards.forEach((card, index) => {
            // Animation d'apparition décalée
            setTimeout(() => {
                card.classList.add('admin-fade-in');
            }, index * 100);

            // Ajout des données de configuration
            const modalType = card.getAttribute('data-modal');
            if (modalType) {
                card.dataset.section = modalType;
            }
        });
    }

    /**
     * Gestion du clic sur une carte
     */
    handleCardClick(event) {
        const card = event.currentTarget;
        const section = card.dataset.modal || card.dataset.section;
        
        if (this.isLoading) return;
        
        // Animation de clic
        card.style.transform = 'translateY(-2px) scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);

        // Ouvrir la modale correspondante
        if (section) {
            this.openModal(section, card);
        }
    }

    /**
     * Gestion du survol des cartes
     */
    handleCardHover(event) {
        const card = event.currentTarget;
        const icon = card.querySelector('.admin-card-icon i');
        
        if (icon) {
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
    }

    /**
     * Gestion de la sortie du survol des cartes
     */
    handleCardLeave(event) {
        const card = event.currentTarget;
        const icon = card.querySelector('.admin-card-icon i');
        
        if (icon) {
            icon.style.transform = '';
        }
    }

    /**
     * Ouverture de la modale
     */
    openModal(section, card) {
        if (!this.modal) return;

        this.currentSection = section;
        
        // Configuration du contenu de la modale
        this.configureModalContent(section, card);
        
        // Affichage de la modale
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Animation d'ouverture
        setTimeout(() => {
            const modalCard = this.modal.querySelector('.admin-modal-card');
            if (modalCard) {
                modalCard.style.transform = 'translateY(0) scale(1)';
                modalCard.style.opacity = '1';
            }
        }, 10);

        // Événement personnalisé
        this.dispatchEvent('modalOpened', { section, card });
    }

    /**
     * Configuration du contenu de la modale
     */
    configureModalContent(section, card) {
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const modalIcon = document.getElementById('modal-icon');

        // Configuration basée sur la section
        const sectionConfig = this.getSectionConfig(section);
        
        if (modalTitle) modalTitle.textContent = sectionConfig.title;
        if (modalDescription) modalDescription.textContent = sectionConfig.description;
        if (modalIcon) {
            modalIcon.setAttribute('data-lucide', sectionConfig.icon);
            // Recharger les icônes Lucide
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    }

    /**
     * Configuration des sections
     */
    getSectionConfig(section) {
        const configs = {
            home: {
                title: 'Page d\'Accueil',
                description: 'Gestion du contenu de la page d\'accueil',
                icon: 'home'
            },
            bar: {
                title: 'Bar',
                description: 'Gestion des boissons et du stock',
                icon: 'wine'
            },
            membre: {
                title: 'Membres',
                description: 'Gestion des utilisateurs et rôles',
                icon: 'users'
            },
            typeMembre: {
                title: 'Types de Membre',
                description: 'Gérer les types et droits des membres',
                icon: 'shield'
            },
            evenement: {
                title: 'Événements',
                description: 'Gestion des événements et calendrier',
                icon: 'calendar'
            },
            equipe: {
                title: 'Équipes',
                description: 'Gestion des équipes de pétanque',
                icon: 'users'
            },
            resultat: {
                title: 'Résultats',
                description: 'Gestion des résultats et classements',
                icon: 'bar-chart-3'
            },
            concours: {
                title: 'Concours',
                description: 'Gestion des concours de pétanque',
                icon: 'trophy'
            },
            loto: {
                title: 'Loto',
                description: 'Gestion des lotos et tirages',
                icon: 'gift'
            }
        };

        return configs[section] || {
            title: 'Gestion',
            description: 'Section d\'administration',
            icon: 'settings'
        };
    }

    /**
     * Fermeture de la modale
     */
    closeModal() {
        if (!this.modal) return;

        const modalCard = this.modal.querySelector('.admin-modal-card');
        
        // Animation de fermeture
        if (modalCard) {
            modalCard.style.transform = 'translateY(-20px) scale(0.95)';
            modalCard.style.opacity = '0';
        }

        setTimeout(() => {
            this.modal.classList.add('hidden');
            document.body.style.overflow = '';
            this.currentSection = null;
        }, 300);

        // Événement personnalisé
        this.dispatchEvent('modalClosed', { section: this.currentSection });
    }

    /**
     * Gestion des clics sur les boutons
     */
    handleButtonClick(event) {
        const button = event.target;
        
        if (this.isLoading) return;

        // Animation du bouton
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);

        // Gestion selon le type de bouton
        if (button.classList.contains('admin-btn-primary')) {
            this.handlePrimaryAction(button);
        } else if (button.classList.contains('admin-btn-secondary')) {
            this.handleSecondaryAction(button);
        } else if (button.classList.contains('admin-btn-danger')) {
            this.handleDangerAction(button);
        }
    }

    /**
     * Actions principales
     */
    handlePrimaryAction(button) {
        this.showLoading(button);
        
        // Simulation d'une action
        setTimeout(() => {
            this.hideLoading(button);
            this.showNotification('Action réalisée avec succès', 'success');
        }, 1500);
    }

    /**
     * Actions secondaires
     */
    handleSecondaryAction(button) {
        if (button.textContent.includes('Annuler')) {
            this.closeModal();
        }
    }

    /**
     * Actions dangereuses
     */
    handleDangerAction(button) {
        if (confirm('Êtes-vous sûr de vouloir effectuer cette action ?')) {
            this.handlePrimaryAction(button);
        }
    }

    /**
     * Affichage du chargement
     */
    showLoading(element) {
        this.isLoading = true;
        element.disabled = true;
        
        const originalText = element.textContent;
        element.dataset.originalText = originalText;
        
        element.innerHTML = `
            <span class="admin-spinner mr-2"></span>
            Chargement...
        `;
    }

    /**
     * Masquage du chargement
     */
    hideLoading(element) {
        this.isLoading = false;
        element.disabled = false;
        
        const originalText = element.dataset.originalText || 'Action';
        element.textContent = originalText;
    }

    /**
     * Affichage des notifications
     */
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `admin-notification admin-alert admin-alert-${type} fixed top-4 right-4 z-50 max-w-sm`;
        notification.innerHTML = `
            <div class="flex items-center justify-between">
                <span>${message}</span>
                <button class="ml-4 text-current opacity-70 hover:opacity-100" onclick="this.parentElement.parentElement.remove()">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Recharger les icônes Lucide
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Animation d'apparition
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 10);

        // Suppression automatique
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    }

    /**
     * Raccourcis clavier
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Échap pour fermer la modale
            if (e.key === 'Escape' && this.modal && !this.modal.classList.contains('hidden')) {
                this.closeModal();
            }
            
            // Ctrl+S pour sauvegarder (empêcher le comportement par défaut)
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                const saveButton = document.querySelector('.admin-btn-primary');
                if (saveButton && !this.isLoading) {
                    saveButton.click();
                }
            }
        });
    }

    /**
     * Gestion du redimensionnement
     */
    handleResize() {
        // Ajustements responsive si nécessaire
        const cards = document.querySelectorAll('.admin-stats-card');
        const isSmallScreen = window.innerWidth < 768;
        
        cards.forEach(card => {
            if (isSmallScreen) {
                card.classList.add('mobile-optimized');
            } else {
                card.classList.remove('mobile-optimized');
            }
        });
    }

    /**
     * Dispatch d'événements personnalisés
     */
    dispatchEvent(eventName, detail = {}) {
        const event = new CustomEvent(`admin:${eventName}`, {
            detail: { ...detail, timestamp: Date.now() }
        });
        document.dispatchEvent(event);
    }

    /**
     * Méthodes utilitaires publiques
     */
    
    /**
     * Mise à jour du compteur d'une carte
     */
    updateCardCount(section, count) {
        const card = document.querySelector(`[data-modal="${section}"]`);
        if (card) {
            const countElement = card.querySelector('.admin-stats-card-number');
            if (countElement) {
                countElement.textContent = count;
                
                // Animation de mise à jour
                countElement.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    countElement.style.transform = '';
                }, 200);
            }
        }
    }

    /**
     * Ajout d'une nouvelle carte dynamiquement
     */
    addCard(config) {
        const grid = document.querySelector('.admin-cards-grid');
        if (!grid) return;

        const cardHTML = `
            <div class="admin-stats-card" data-modal="${config.section}">
                <div class="admin-stats-card-header">
                    <div class="admin-stats-card-info">
                        <div class="admin-card-icon">
                            <i data-lucide="${config.icon}"></i>
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900">
                                ${config.title}
                            </h3>
                            <p class="text-sm text-gray-500">
                                ${config.description}
                            </p>
                        </div>
                    </div>
                    <div class="admin-stats-card-count">
                        <div class="admin-stats-card-number">
                            ${config.count || 0}
                        </div>
                    </div>
                </div>
                <div class="admin-stats-card-footer">
                    <span class="admin-stats-card-action">
                        Cliquer pour gérer →
                    </span>
                </div>
            </div>
        `;

        grid.insertAdjacentHTML('beforeend', cardHTML);
        
        // Réinitialiser les événements pour la nouvelle carte
        const newCard = grid.lastElementChild;
        newCard.addEventListener('click', (e) => this.handleCardClick(e));
        newCard.addEventListener('mouseenter', (e) => this.handleCardHover(e));
        newCard.addEventListener('mouseleave', (e) => this.handleCardLeave(e));

        // Recharger les icônes Lucide
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Animation d'apparition
        setTimeout(() => {
            newCard.classList.add('admin-fade-in');
        }, 10);
    }

    /**
     * Suppression d'une carte
     */
    removeCard(section) {
        const card = document.querySelector(`[data-modal="${section}"]`);
        if (card) {
            card.style.transform = 'scale(0.8)';
            card.style.opacity = '0';
            setTimeout(() => {
                card.remove();
            }, 300);
        }
    }
}

// Initialisation de l'interface d'administration
document.addEventListener('DOMContentLoaded', () => {
    window.adminInterface = new AdminInterface();
});

// Fonctions utilitaires globales
window.AdminUtils = {
    /**
     * Formatage des nombres
     */
    formatNumber: (num) => {
        return new Intl.NumberFormat('fr-FR').format(num);
    },

    /**
     * Formatage des dates
     */
    formatDate: (date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    /**
     * Validation d'email
     */
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    /**
     * Génération d'ID unique
     */
    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    /**
     * Debounce pour les recherches
     */
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Export pour les modules ES6 si nécessaire
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AdminInterface, AdminUtils };
}