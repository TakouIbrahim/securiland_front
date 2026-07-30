import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { InterestService } from '../../../core/services/interest.service';
import { ListingService } from '../../../core/services/listing.service';
import { Listing } from '../../../core/models/listing.model';
import { ListingCardComponent } from '../../../shared/components/listing-card/listing-card.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { MOCK_LISTINGS } from '../../listings/mock-listings';

@Component({
  selector: 'sl-favorites',
  standalone: true,
  imports: [CommonModule, ListingCardComponent, EmptyStateComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent implements OnInit {
  readonly loading = signal(true);
  readonly listings = signal<Listing[]>([]);

  constructor(private interestService: InterestService, private listingService: ListingService) {}

  ngOnInit(): void {
    this.interestService
      .mine()
      .pipe(catchError(() => of({ success: true, data: [], timestamp: '' })))
      .subscribe((res) => {
        const activeIds = res.data.filter((i) => i.status === 'ACTIF').map((i) => i.listingId);

        if (activeIds.length === 0) {
          // Demo : si aucun favori reel (API non connectee), on affiche 2 exemples pour la demonstration visuelle.
          this.listings.set(MOCK_LISTINGS.slice(0, 2));
          this.loading.set(false);
          return;
        }

        let remaining = activeIds.length;
        const results: Listing[] = [];
        activeIds.forEach((id) => {
          this.listingService.getOne(id).subscribe({
            next: (r) => {
              results.push(r.data);
              if (--remaining === 0) {
                this.listings.set(results);
                this.loading.set(false);
              }
            },
            error: () => {
              if (--remaining === 0) {
                this.listings.set(results);
                this.loading.set(false);
              }
            },
          });
        });
      });
  }
}
