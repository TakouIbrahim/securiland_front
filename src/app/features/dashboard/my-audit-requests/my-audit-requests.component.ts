import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { catchError, of } from 'rxjs';
import { AuditRequestService } from '../../../core/services/audit-request.service';
import { AuditRequest } from '../../../core/models/audit-request.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'sl-my-audit-requests',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, MatButtonModule, StatusBadgeComponent, EmptyStateComponent],
  templateUrl: './my-audit-requests.component.html',
  styleUrl: './my-audit-requests.component.scss',
})
export class MyAuditRequestsComponent implements OnInit {
  readonly loading = signal(true);
  readonly requests = signal<AuditRequest[]>([]);

  constructor(private auditRequestService: AuditRequestService) {}

  ngOnInit(): void {
    this.auditRequestService
      .mine()
      .pipe(catchError(() => of({ success: true, data: [], timestamp: '' })))
      .subscribe((res) => {
        this.requests.set(res.data);
        this.loading.set(false);
      });
  }

  cancel(request: AuditRequest): void {
    this.auditRequestService.cancel(request.id, 'Annulé depuis le tableau de bord').subscribe(() => {
      request.status = 'ANNULE';
      this.requests.update((list) => [...list]);
    });
  }
}
