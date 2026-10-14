# MISSION : Refonte Frontend & UI/UX Moderne du site JDM EXPO (https://jdm-expo.com/)

## 1. Contexte & Objectif
Tu es un Développeur Frontend Senior & Designer UI/UX expert en design automobile contemporain et typographie JDM/Motorsport (inspiré de marques comme Singer, Speedhunters, Bring a Trailer, Hagerty).
Le site actuel de **JDM Expo** souffre d'un design daté du début des années 2010 (Magento/tableaux, boutons non réactifs, typographies génériques, navigation encombrée, manque d'immersion visuelle).

**Ton objectif :** Réécrire et moderniser entièrement le code (HTML5 sémantique + CSS moderne / Tailwind CSS / React ou HTML/CSS vanilla selon la stack demandée), en **conservant 100% du contenu brut, des textes, des métadonnées et de la structure logique de la page source HTML fournie**, tout en transformant l'interface en une expérience haut de gamme, moderne et fluide sur mobile, tablette et desktop.

---

## 2. Règles Strictes de Préservation des Données
1. **Intégrité des données :** Tu ne dois inventer ni supprimer aucun contenu clé. Conserve l'intégralité des informations :
   - Coordonnées de contact (+81-567-66-5730, info@jdm-expo.com, Yatomi-shi Head Office, Skype, LINE ID, WhatsApp).
   - Textes institutionnels ("Welcome to JDM EXPO Co. Ltd. Japan", les 36+ années d'expérience, mentions d'import USA/25-year rule).
   - Structure des menus et liens (Vehicle Inventory: JDM Sports, JDM Classic, Non JDM ; Japan Car Auction ; Company Profile ; USA JDM Imports ; How to Buy ; FAQ ; Blog).
   - Liste des fabricants (Toyota, Nissan, Mazda, Mitsubishi, Subaru, Honda).
   - Listing des véhicules (Titres complets, badges/statuts : "ASK", "SOLD", "V-Spec", codes châssis/références N.8343, N.8522, etc.).
   - Formulaires (Newsletter, Inscription/Contact, Sélecteur rapide par constructeur).

---

## 3. Direction Artistique & UI / UX Guidelines

### Palette de Couleurs
- **Dark Mode Automotive & High Contrast :**
  - Fond primaire : Deep Charcoal / Carbon (`#0B0E14` ou `#0F1117`).
  - Cartes et conteneurs : Gunmetal satiné (`#181C24`) avec bordures fines subtiles (`rgba(255, 255, 255, 0.08)`).
  - Accent JDM / Racing : Rouge Racing discret (`#E11D48` ou `#DC2626`) pour les CTA principaux, tags "SOLD" ou badges V-Spec.
  - Typographie : Blanc pur (`#F9FAFB`) pour les titres, gris neutre clair (`#9CA3AF`) pour le texte courant et les labels techniques.

### Typographie
- Titres & Chiffres : Police sans-serif géométrique, moderne et dynamique (ex: *Syne*, *Space Grotesk*, *Cabinet Grotesque* ou *Montserrat 700/800* en majuscules avec un léger letter-spacing).
- Corps de texte : Police ultra-lisible (ex: *Inter*, *Plus Jakarta Sans*).
- Badges & Spécifications : Monospace moderne (*JetBrains Mono* ou *Space Mono*) pour les identifiants techniques (N.8343, GT-R R34, CRS).

### Composants & Layout
1. **Header & Navigation :**
   - Barre supérieure fine ("Top bar") avec statut des bureaux (Tokyo/PST), contact rapide et devise/langue.
   - Navbar principale moderne "Glassmorphism" (légère transparence au scroll avec `backdrop-blur`).
   - Mégamenu épuré pour l'inventaire et menu burger mobile fluide plein écran ou panneau latéral (drawer).
2. **Hero Section (Bannière d'impact) :**
   - Slider ou bannière cinématique plein écran avec overlay sombre dégradé pour sublimer les photos des GT-R / classiques.
   - Barre de recherche/filtre rapide intégrée ("Quick Search by Maker / Model") façon configurateur haut de gamme.
3. **Grille d'Inventaire (Latest Arrivals / Featured Cars) :**
   - Grille responsive CSS Grid (`grid-template-columns: repeat(auto-fill, minmax(300px, 1fr))`).
   - Cartes de véhicules au format 16:9 ou 4:3 avec effet de zoom doux au survol (`scale-105`), badge d'état élégant (ex: pillule discrète "V-SPEC II", badge rouge "SOLD", badge ambre "PRICE: ASK").
   - Bouton "View Details" ou carte entièrement cliquable avec micro-interactions haptiques/visuelles.
4. **Logos Constructeurs (Inventory by Manufacturers) :**
   - Affichage minimaliste monochrome des logos constructeurs avec passage en couleur ou surbrillance au survol.
5. **Formulaires & Footer :**
   - Newsletter et formulaire de contact reformatés avec des inputs épurés, bords arrondis modernes (rounded-xl) et retours d'état ergonomiques.
   - Footer structuré en colonnes claires avec liens sociaux, mentions légales et rappel des badges de confiance (expédition mondiale, inspection).

---

## 4. Contraintes Techniques & Responsive Design
- **Mobile First :**
  - 100% optimisé pour mobile (< 640px), tablette (768px - 1024px) et écrans larges (1440px+).
  - Cibles tactiles d'au moins 44x44px.
  - Aucun débordement horizontal (`overflow-x: hidden`).
- **Performance & Accessibilité :**
  - Balises sémantiques strictes (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<footer>`).
  - Utilisation d'images responsives avec `srcset` ou `loading="lazy"`.
  - Contrastes WCAG AA validés.

---

## 5. Livrables Attendus
Génère le code complet, prêt à l'emploi et impeccablement indenté :
1. **Code HTML5 complet** intégrant l'intégralité des données du site d'origine.
2. **Feuille de style CSS moderne** (ou classes utilitaires Tailwind CSS v3/v4 selon le choix).
3. **Micro-scripts JavaScript (vanilla)** pour gérer le menu mobile, le filtre de constructeur et les interactions de cartes sans dépendances lourdes.