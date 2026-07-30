import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public-layout/public-layout.component').then((m) => m.PublicLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
        title: 'SecuriLand — Terrains vérifiés et sécurisés',
      },
      {
        path: 'terrains',
        loadComponent: () =>
          import('./features/listings/listing-list/listing-list.component').then((m) => m.ListingListComponent),
        title: 'SecuriLand — Tous les terrains',
      },
      {
        path: 'terrains/:id',
        loadComponent: () =>
          import('./features/listings/listing-detail/listing-detail.component').then(
            (m) => m.ListingDetailComponent
          ),
        title: 'SecuriLand — Détail du terrain',
      },
      {
        path: 'connexion',
        canActivate: [guestGuard],
        loadComponent: () => import('./features/auth/login/login.component').then((m) => m.LoginComponent),
        title: 'Connexion — SecuriLand',
      },
      {
        path: 'inscription',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./features/auth/register/register.component').then((m) => m.RegisterComponent),
        title: 'Créer un compte — SecuriLand',
      },
    ],
  },
  {
    path: 'app',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/app-layout/app-layout.component').then((m) => m.AppLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'tableau-de-bord' },
      {
        path: 'tableau-de-bord',
        loadComponent: () =>
          import('./features/dashboard/dashboard-home/dashboard-home.component').then(
            (m) => m.DashboardHomeComponent
          ),
        title: 'Tableau de bord — SecuriLand',
      },
      {
        path: 'favoris',
        loadComponent: () =>
          import('./features/dashboard/favorites/favorites.component').then((m) => m.FavoritesComponent),
        title: 'Mes favoris — SecuriLand',
      },
      {
        path: 'demandes',
        loadComponent: () =>
          import('./features/dashboard/my-audit-requests/my-audit-requests.component').then(
            (m) => m.MyAuditRequestsComponent
          ),
        title: 'Mes demandes — SecuriLand',
      },
      {
        path: 'visites',
        loadComponent: () =>
          import('./features/dashboard/visits/visits.component').then((m) => m.VisitsComponent),
        title: 'Mes visites — SecuriLand',
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('./features/dashboard/messages/messages.component').then((m) => m.MessagesComponent),
        title: 'Messages — SecuriLand',
      },
      {
        path: 'paiements',
        loadComponent: () =>
          import('./features/dashboard/payments/payments.component').then((m) => m.PaymentsComponent),
        title: 'Paiements — SecuriLand',
      },
      {
        path: 'publier',
        loadComponent: () =>
          import('./features/listings/listing-publish/listing-publish.component').then(
            (m) => m.ListingPublishComponent
          ),
        title: 'Publier un terrain — SecuriLand',
      },
      {
        path: 'profil',
        loadComponent: () =>
          import('./features/dashboard/profile/profile.component').then((m) => m.ProfileComponent),
        title: 'Mon profil — SecuriLand',
      },
      {
        path: 'parametres',
        loadComponent: () =>
          import('./features/dashboard/settings/settings.component').then((m) => m.SettingsComponent),
        title: 'Paramètres — SecuriLand',
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
