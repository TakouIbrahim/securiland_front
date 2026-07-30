import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { catchError, of } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { ListingService } from '../../../core/services/listing.service';
import { InterestService } from '../../../core/services/interest.service';
import { Listing } from '../../../core/models/listing.model';
import { MOCK_LISTINGS } from '../mock-listings';

interface ListingDocument {
  name: string;
  icon: string;
}

@Component({
  selector: 'sl-listing-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './listing-detail.component.html',
  styleUrl: './listing-detail.component.scss',
})
export class ListingDetailComponent implements OnInit {
  readonly listing = signal<Listing | null>(null);
  readonly loading = signal(true);
  readonly favorited = signal(false);
  readonly interestSent = signal(false);

  readonly documents: ListingDocument[] = [
    { name: 'Titre foncier.pdf', icon: 'picture_as_pdf' },
    { name: 'Plan de masse.pdf', icon: 'picture_as_pdf' },
    { name: 'Certificat de propriété.pdf', icon: 'picture_as_pdf' },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listingService: ListingService,
    private interestService: InterestService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    const mock = MOCK_LISTINGS.find((l) => l.id === id);

    this.listingService
      .getOne(id)
      .pipe(catchError(() => of(mock ? { success: true, data: mock, timestamp: '' } : null)))
      .subscribe((res) => {
        this.listing.set(res?.data ?? MOCK_LISTINGS[0]);
        this.loading.set(false);
      });
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR').format(price);
  }

  goToLogin(): void {
    this.router.navigate(['/connexion']);
  }

  toggleFavorite(): void {
    if (!this.auth.isAuthenticated()) {
      this.goToLogin();
      return;
    }
    const id = this.listing()?.id;
    if (!id) return;

    if (this.favorited()) {
      this.interestService.withdraw(id).subscribe(() => this.favorited.set(false));
    } else {
      this.interestService.express(id).subscribe(() => this.favorited.set(true));
    }
  }

  contactSeller(): void {
    if (!this.auth.isAuthenticated()) {
      this.goToLogin();
      return;
    }
    this.router.navigate(['/app/messages'], { queryParams: { listingId: this.listing()?.id } });
  }

  reserveVisit(): void {
    if (!this.auth.isAuthenticated()) {
      this.goToLogin();
      return;
    }
    this.router.navigate(['/app/visites'], { queryParams: { listingId: this.listing()?.id } });
  }
}
