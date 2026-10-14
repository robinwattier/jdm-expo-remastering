# 🏎️ JDM EXPO — Frontend Remastering & Modern UI/UX

[![Live Demo](https://img.shields.io/badge/Demo-Live%20Website-rose?style=for-the-badge&logo=github)](https://robinwattier.github.io/jdm-expo-remastering/)
[![Status](https://img.shields.io/badge/Status-100%25%20Bug--Free-success?style=for-the-badge)](https://github.com/robinwattier/jdm-expo-remastering)
[![License](https://img.shields.io/badge/Design%20System-UI%2FUX%20Pro%20Max-informational?style=for-the-badge)](design-system/jdm-expo/MASTER.md)

> **Refonte complète de l'interface du premier exportateur japonais de véhicules sportifs et classiques JDM (Skyline GT-R, Hakosuka, RX-7, NSX, Supra).**  
> 🔗 **Démo en ligne :** [https://robinwattier.github.io/jdm-expo-remastering/](https://robinwattier.github.io/jdm-expo-remastering/)  
> Basé sur le site officiel [jdm-expo.com](https://jdm-expo.com/) avec une direction artistique contemporaine inspirée de *Singer*, *Speedhunters*, *Bring a Trailer* et *Hagerty*.

---

## ✨ Points Clés du Projet

- **Intégrité Totale des Données (100%) :** Préservation méticuleuse de l'ensemble des coordonnées du siège de Yatomi-shi (Nagoya), des numéros de référence châssis (`N.8522`, `N.8402`, etc.), des statuts d'inventaire (`ASK`, `SOLD`, `V-Spec`, `CRS`), des 6 fabricants authentiques et des formulaires.
- **Design System Dark Automotive (UI/UX Pro Max) :**
  - **Palette Dark Carbon :** Fond Deep Charcoal (`#0B0E14`), conteneurs Gunmetal satiné (`#141822`) avec bordures précises au micron (`rgba(255, 255, 255, 0.08)`).
  - **Accents Racing :** Rouge Crimson (`#E11D48`) pour les CTA d'action, tags `SOLD` et badges V-Spec.
  - **Typographie Tri-Stack :** `Space Grotesk` (Titres display motorsport) + `Inter` (Corps de texte haute lisibilité) + `JetBrains Mono` (Spécifications techniques, devises et numéros de stock).
- **Zéro Dépendance Lourde :** Développé en HTML5 sémantique, CSS moderne pur (variables CSS, Glassmorphism, CSS Grid) et JavaScript Vanilla modulaire et ultra-léger.

---

## 🚀 Fonctionnalités Implémentées

1. **Top Bar Utilité & Statuts en Direct :**
   - Double horloge mondiale synchronisée chaque seconde : heure de Tokyo (JST) et heure américaine (PST).
   - Indicateur dynamique d'ouverture des bureaux de Yatomi Head Office.
   - Convertisseur dynamique de devises (USD `$`, JPY `¥`, EUR `€`) mis à jour sur l'ensemble des cartes d'inventaire.
   - Accès rapide par téléphone direct (`+81-567-66-5730`) et email officiel (`info@jdm-expo.com`).

2. **Navigation Glassmorphism & Menu Mobile :**
   - Header fixe avec flou d'arrière-plan (`backdrop-filter: blur(20px)`) et ombre adaptative au scroll.
   - Mégamenus déroulants pour l'inventaire (`JDM Sports`, `JDM Classic`, `Non JDM`), l'accès aux enchères japonaises (*Japan Car Auction*), le profil d'entreprise et les réseaux sociaux.
   - Tiroir de navigation mobile plein écran tactile avec bouton burger et fermeture par geste ou touche Échap.

3. **Hero Slider Cinématographique :**
   - 4 slides authentiques en carrousel cinématique avec gestion de lecture automatique (pause au survol), contrôles manuels et support tactile (*swipe* mobile).
   - Module de recherche rapide et configurateur direct intégré en tête de page.

4. **Section Institutionnelle & Spotlight USA 25-Year Rule :**
   - Présentation des 36+ années d'héritage de JDM Expo au Japon central.
   - Cartouche explicatif sur l'éligibilité fédérale américaine (25-year rule) pour l'importation légale des Skyline GT-R R32, R33, R34 (1999+), Hakosuka KPGC10, NSX, RX-7 et Supra.

5. **Grille d'Inventaire Interactive :**
   - Cartes de véhicules haute-fidélité avec images réelles, badges de statuts, spécifications détaillées (moteur, boîte de vitesses, châssis).
   - Filtrage instantané par catégorie, constructeur et recherche textuelle sans rechargement de page.
   - Tri dynamique par prix croissant, décroissant ou référence.

6. **Modal d'Inspection & Inquiry :**
   - Clic sur n'importe quel véhicule ou sur son bouton d'action pour ouvrir une fenêtre modale d'inspection avec formulaire d'inquiry pré-rempli.

7. **Barre d'Outils Flottante :**
   - Accès rapide téléphone, e-mail direct, tiroir de message express et bouton de retour haut de page fluide.

---

## 🛠️ Structure des Fichiers

```text
jdm-expo-remastering/
├── index.html                   # Document HTML5 sémantique et accessible
├── styles.css                   # Feuille de style CSS moderne (Dark Automotive)
├── app.js                       # Micro-scripts JavaScript (Vanilla)
├── prompt.md                    # Cahier des charges et consignes du projet
├── .gitignore                   # Fichiers exclus du suivi de version
├── README.md                    # Documentation complète
└── design-system/
    └── jdm-expo/
        └── MASTER.md            # Spécifications globales du Design System
```

---

## 💻 Démarrage Local

Pour prévisualiser le site localement, lancez un serveur HTTP simple :

```bash
# Avec Python 3
python -m http.server 8085

# Ou avec Node.js
npx serve -l 8085
```

Puis ouvrez votre navigateur à l'adresse : **[http://localhost:8085](http://localhost:8085)**

---

## 📄 Licence & Crédits

- Tous les contenus, marques, logos et photographies originales sont la propriété de **JDM EXPO Co., Ltd. Japan**.
- Remasterisation UI/UX Frontend conçue avec soin pour Robin Wattier.
