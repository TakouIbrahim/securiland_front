# SecuriLand — Frontend (Angular 17 + Angular Material)

Interface web de la plateforme SECURILAND : vitrine publique (recherche de terrains,
fiches détaillées) et espace connecté (tableau de bord, favoris, demandes d'audit,
messagerie, paiements). Design calqué sur la maquette fournie (palette vert forêt / or).

## 1. Installation

```bash
cd securiland-frontend
npm install
```

> Ce projet a été généré à la main (sans accès réseau au moment de la génération),
> donc il n'a pas encore été compilé. Au premier `npm install` + `ng serve`, corrige
> les éventuelles erreurs de version mineure de dépendances si `npm` te le signale
> (tout est calé sur Angular 17.3 / Angular Material 17.3).

## 2. Lancer en développement

```bash
npm start
# ou : ng serve
```

L'application est servie sur **http://localhost:4200** — ce qui correspond exactement
à l'origine autorisée par défaut dans le CORS du backend Spring Boot
(`CORS_ORIGINS=http://localhost:4200`).

## 3. Connexion au backend

L'URL de l'API est centralisée dans :
```
src/app/core/api.config.ts
```
Par défaut : `http://localhost:8080/api/v1` (le backend SECURILAND généré précédemment).
Lance le backend (`docker compose up -d` puis `SecurilandApplication`) avant de tester
les flux réels (inscription, connexion, publication d'annonce, etc.).

**Mode démo sans backend** : la page d'accueil, la liste des terrains et la fiche détail
retombent automatiquement sur des données de démonstration (`mock-listings.ts`) si l'API
n'est pas joignable, pour que tu puisses juger le design indépendamment du backend.

## 4. Structure du projet

```
src/app/
 ├── core/
 │   ├── models/         Interfaces TypeScript (miroir des DTOs Spring Boot)
 │   ├── services/        AuthService, ListingService, InterestService, ...
 │   ├── interceptors/     JWT (authInterceptor), erreurs (errorInterceptor)
 │   └── guards/           authGuard (espace connecté), guestGuard (login/register)
 ├── layouts/
 │   ├── public-layout/    Header + <router-outlet> + Footer (site vitrine)
 │   └── app-layout/       Sidebar verte + <router-outlet> (espace connecté)
 ├── shared/components/
 │   ├── header/ footer/           Site public
 │   ├── hero-search/               Bannière de recherche (page d'accueil)
 │   ├── listing-card/              Carte terrain (badge Titré, favoris, prix...)
 │   ├── sidebar-nav/                Sidebar du tableau de bord
 │   ├── status-badge/               Pastille de statut (audit/annonce/paiement)
 │   └── empty-state/                État vide réutilisable
 └── features/
     ├── home/                      Page d'accueil (hero + grille + "pourquoi nous")
     ├── listings/
     │   ├── listing-list/          Page /terrains (recherche + filtres)
     │   ├── listing-detail/        Fiche terrain — 2 variantes visiteur/connecté
     │   └── listing-publish/       Formulaire "Publier un terrain"
     ├── auth/ (login, register)
     └── dashboard/ (dashboard-home, favorites, my-audit-requests, visits,
                     messages, payments, profile, settings)
```

## 5. Design — ce qui a été repris de la maquette

- Palette : vert forêt profond (`--sl-green-700` à `900`, sidebar/CTA principaux) +
  or/moutarde (`--sl-gold-500/600`, labels "Titré" et CTA "Publier maintenant").
- Typographie : **Poppins** (titres, identité) + **Inter** (texte courant, formulaires).
- Sidebar du tableau de bord : fidèle à la maquette (avatar + nom, item actif en or,
  badge de messages non lus, encart promo "Publiez votre terrain" en bas).
- Fiche terrain à deux variantes strictement conformes à la maquette :
  - **Visiteur** : carte de localisation verrouillée + bouton "Se connecter pour voir plus".
  - **Connecté** : carte complète, bloc propriétaire/agence avec badge vérifié,
    téléphone + boutons WhatsApp/appel, liste de documents téléchargeables,
    bouton "Réserver une visite".

## 6. Ce qui reste à brancher / affiner

- Le composant carte (`sl-detail__map`) affiche une image statique — à remplacer par
  une vraie carte interactive (Leaflet / Google Maps) si besoin.
- L'envoi de messages dans `MessagesComponent` a l'UI mais n'appelle pas encore
  `MessageService.send(...)` (à finaliser une fois le fil de discussion réel choisi).
- Les paiements (`PaymentsComponent`, `listing-publish` → boost) n'ouvrent pas encore
  de widget Stripe/Mobile Money réel — l'appel `PaymentService.initiate(...)` est prêt
  côté service, il manque l'UI de redirection/confirmation.
- Pas de tests unitaires (Jasmine/Karma) generés dans ce squelette.
- Photos : les visuels utilisent des images Unsplash de démonstration — à remplacer
  par les vraies photos/uploads une fois le stockage de fichiers branché côté backend.
