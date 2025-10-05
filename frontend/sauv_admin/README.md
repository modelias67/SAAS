# Template d'Administration - Pétanque Noveant

Ce dossier contient un template réutilisable pour créer des interfaces d'administration avec le design des cartes utilisé dans la page Admin de l'application Pétanque Noveant.

## Fichiers inclus

### 📄 `admin-template.html`
Template HTML principal contenant :
- Structure complète de la page d'administration
- Grille de cartes avec design moderne
- Modale de démonstration
- Intégration Tailwind CSS et Lucide Icons
- Responsive design

### 🎨 `admin-styles.css`
Fichier CSS personnalisé avec :
- Variables CSS pour les couleurs et ombres
- Styles pour les cartes d'administration
- Animations et transitions
- Styles pour modales, formulaires, boutons
- Design responsive complet
- Classes utilitaires pour badges, alertes, tableaux

### ⚡ `admin-script.js`
Script JavaScript complet avec :
- Classe `AdminInterface` pour la gestion des interactions
- Gestion des modales et animations
- Système de notifications
- Raccourcis clavier
- Méthodes utilitaires
- API pour ajouter/supprimer des cartes dynamiquement

## 🚀 Utilisation

### Installation simple
1. Copiez les fichiers dans votre projet
2. Ouvrez `admin-template.html` dans votre navigateur
3. Personnalisez selon vos besoins

### Intégration dans un projet existant
```html
<!-- Dans votre HTML -->
<link rel="stylesheet" href="path/to/admin-styles.css">
<script src="path/to/admin-script.js"></script>
```

## 🎯 Fonctionnalités

### Cartes d'administration
- **Design moderne** : Cartes avec ombres, animations au survol
- **Icônes Lucide** : Icônes vectorielles modernes
- **Compteurs** : Affichage du nombre d'éléments
- **Responsive** : Adaptation automatique mobile/desktop

### Interactions
- **Clics sur cartes** : Ouverture de modales correspondantes
- **Animations** : Transitions fluides et professionnelles
- **Raccourcis clavier** : Échap pour fermer, Ctrl+S pour sauvegarder
- **Notifications** : Système d'alertes intégré

### Modales
- **Ouverture fluide** : Animation d'apparition
- **Contenu dynamique** : Configuration automatique selon la section
- **Fermeture** : Clic extérieur, bouton X, ou Échap

## 🛠️ Personnalisation

### Couleurs
Modifiez les variables CSS dans `admin-styles.css` :
```css
:root {
    --primary-color: #425e9b;
    --primary-light: #5a7bc4;
    --primary-dark: #2d4373;
}
```

### Ajouter une nouvelle carte
```javascript
window.adminInterface.addCard({
    section: 'nouvelle-section',
    title: 'Nouvelle Section',
    description: 'Description de la section',
    icon: 'settings',
    count: 0
});
```

### Mettre à jour un compteur
```javascript
window.adminInterface.updateCardCount('membre', 50);
```

## 📱 Responsive Design

Le template s'adapte automatiquement :
- **Desktop** : Grille 4 colonnes
- **Tablette** : Grille 2-3 colonnes  
- **Mobile** : Grille 1 colonne
- **Modales** : Adaptation de la taille et padding

## 🎨 Classes CSS disponibles

### Cartes
- `.admin-stats-card` : Carte principale
- `.admin-card-icon` : Container d'icône
- `.admin-stats-card-number` : Compteur

### Boutons
- `.admin-btn-primary` : Bouton principal
- `.admin-btn-secondary` : Bouton secondaire
- `.admin-btn-danger` : Bouton de suppression
- `.admin-btn-success` : Bouton de validation

### Formulaires
- `.admin-form-input` : Champ de saisie
- `.admin-form-textarea` : Zone de texte
- `.admin-form-select` : Liste déroulante

### Alertes
- `.admin-alert-success` : Alerte de succès
- `.admin-alert-warning` : Alerte d'avertissement
- `.admin-alert-error` : Alerte d'erreur
- `.admin-alert-info` : Alerte d'information

## 🔧 API JavaScript

### Méthodes principales
```javascript
// Ouvrir une modale
adminInterface.openModal('section-name', cardElement);

// Fermer la modale
adminInterface.closeModal();

// Afficher une notification
adminInterface.showNotification('Message', 'success', 3000);

// Mettre à jour un compteur
adminInterface.updateCardCount('section', newCount);
```

### Événements personnalisés
```javascript
// Écouter l'ouverture d'une modale
document.addEventListener('admin:modalOpened', (e) => {
    console.log('Modale ouverte:', e.detail.section);
});

// Écouter la fermeture d'une modale
document.addEventListener('admin:modalClosed', (e) => {
    console.log('Modale fermée:', e.detail.section);
});
```

## 🌟 Fonctionnalités avancées

### Animations
- Apparition décalée des cartes au chargement
- Transitions fluides au survol
- Animations de clic avec feedback visuel
- Modales avec animation d'ouverture/fermeture

### Accessibilité
- Navigation au clavier
- Rôles ARIA appropriés
- Contrastes respectés
- Focus visible

### Performance
- CSS optimisé avec variables
- JavaScript modulaire
- Chargement différé des icônes
- Animations GPU-accélérées

## 📋 Exemple d'intégration

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mon Interface Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <link rel="stylesheet" href="admin-styles.css">
</head>
<body>
    <!-- Votre contenu ici -->
    <div class="admin-main-container">
        <!-- Cartes d'administration -->
    </div>
    
    <script src="admin-script.js"></script>
</body>
</html>
```

## 🤝 Support

Ce template est basé sur le design de l'application Pétanque Noveant et utilise :
- **Tailwind CSS** pour les styles utilitaires
- **Lucide Icons** pour les icônes
- **JavaScript Vanilla** pour les interactions

Pour toute question ou personnalisation, référez-vous au code source de la page Admin originale.