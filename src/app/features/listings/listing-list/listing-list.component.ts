import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { catchError, of } from 'rxjs';
import { ListingCardComponent } from '../../../shared/components/listing-card/listing-card.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { ListingService } from '../../../core/services/listing.service';
import { Listing } from '../../../core/models/listing.model';
import { MOCK_LISTINGS } from '../mock-listings';

@Component({
  selector: 'sl-listing-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule, MatCheckboxModule, ListingCardComponent, EmptyStateComponent],
  templateUrl: './listing-list.component.html',
  styleUrl: './listing-list.component.scss',
})
export class ListingListComponent implements OnInit {
  readonly listings = signal<Listing[]>([]);
  readonly loading = signal(true);
  readonly page = signal(0);
  readonly totalPages = signal(1);
  readonly pageSize = 8;

  city = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  certifiedOnly = false;

  constructor(private route: ActivatedRoute, private listingService: ListingService) {}

  ngOnInit(): void {
    const qp = this.route.snapshot.queryParamMap;
    this.city = qp.get('city') ?? '';
    this.maxPrice = qp.get('maxPrice') ? Number(qp.get('maxPrice')) : null;
    this.fetch();
  }

  fetch(): void {
    this.loading.set(true);
    this.listingService
      .search({
        city: this.city || undefined,
        minPrice: this.minPrice ?? undefined,
        maxPrice: this.maxPrice ?? undefined,
        certifiedOnly: this.certifiedOnly,
        page: this.page(),
        size: this.pageSize,
      })
      .pipe(
        catchError(() =>
          of({
            success: true,
            data: { content: MOCK_LISTINGS, totalElements: MOCK_LISTINGS.length, totalPages: 1, number: 0, size: this.pageSize },
            timestamp: '',
          })
        )
      )
      .subscribe((res) => {
        this.listings.set(res.data.content);
        this.totalPages.set(res.data.totalPages || 1);
        this.loading.set(false);
      });
  }

  applyFilters(): void {
    this.page.set(0);
    this.fetch();
  }

  resetFilters(): void {
    this.city = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.certifiedOnly = false;
    this.applyFilters();
  }

  nextPage(): void {
    if (this.page() + 1 < this.totalPages()) {
      this.page.update((p) => p + 1);
      this.fetch();
    }
  }

  prevPage(): void {
    if (this.page() > 0) {
      this.page.update((p) => p - 1);
      this.fetch();
    }
  }
}
