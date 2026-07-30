import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { catchError, of } from 'rxjs';
import { HeroSearchComponent } from '../../shared/components/hero-search/hero-search.component';
import { ListingCardComponent } from '../../shared/components/listing-card/listing-card.component';
import { ListingService } from '../../core/services/listing.service';
import { Listing } from '../../core/models/listing.model';
import { MOCK_LISTINGS } from '../listings/mock-listings';

@Component({
  selector: 'sl-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, HeroSearchComponent, ListingCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly listings = signal<Listing[]>([]);
  readonly loading = signal(true);

  readonly features = [
    {
      icon: 'verified_user',
      title: 'Terrains vérifiés',
      description: 'Tous nos terrains sont contrôlés et certifiés par nos techniciens agréés.',
    },
    {
      icon: 'gpp_good',
      title: 'Transactions sécurisées',
      description: 'Vos paiements et vos données sont protégés à chaque étape.',
    },
    {
      icon: 'support_agent',
      title: 'Accompagnement',
      description: "Notre équipe vous accompagne de l'audit jusqu'à la signature.",
    },
    {
      icon: 'workspace_premium',
      title: 'Meilleures opportunités',
      description: "Accédez en priorité aux meilleures offres du marché foncier.",
    },
  ];

  constructor(private listingService: ListingService) {}

  ngOnInit(): void {
    this.listingService
      .search({ page: 0, size: 8 })
      .pipe(catchError(() => of({ success: true, data: { content: MOCK_LISTINGS, totalElements: MOCK_LISTINGS.length, totalPages: 1, number: 0, size: 8 }, timestamp: '' })))
      .subscribe((res) => {
        this.listings.set(res.data.content);
        this.loading.set(false);
      });
  }
}
