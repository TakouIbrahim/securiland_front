import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { catchError, of } from 'rxjs';
import { PaymentService } from '../../../core/services/payment.service';
import { Payment } from '../../../core/models/payment.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'sl-payments',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, EmptyStateComponent],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss',
})
export class PaymentsComponent implements OnInit {
  readonly loading = signal(true);
  readonly payments = signal<Payment[]>([]);

  private readonly referenceLabels: Record<string, string> = {
    AUDIT: "Audit foncier",
    LISTING_BOOST: 'Mise en avant annonce',
    SUBSCRIPTION: 'Abonnement Premium',
    PROFESSIONAL_DIRECTORY: 'Annuaire professionnel',
  };

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.paymentService
      .mine()
      .pipe(catchError(() => of({ success: true, data: [], timestamp: '' })))
      .subscribe((res) => {
        this.payments.set(res.data);
        this.loading.set(false);
      });
  }

  label(payment: Payment): string {
    return this.referenceLabels[payment.referenceType] ?? payment.referenceType;
  }

  formatAmount(amount: number, currency: string): string {
    return `${new Intl.NumberFormat('fr-FR').format(amount)} ${currency}`;
  }
}
