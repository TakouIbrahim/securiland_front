import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { catchError, forkJoin, of } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { AuditRequestService } from '../../../core/services/audit-request.service';
import { InterestService } from '../../../core/services/interest.service';
import { MessageService } from '../../../core/services/message.service';
import { AuditRequest } from '../../../core/models/audit-request.model';
import { StatusBadgeComponent } from '../../../shared/components/status-badge/status-badge.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

interface StatCard {
  label: string;
  value: number;
  icon: string;
  link: string;
}

@Component({
  selector: 'sl-dashboard-home',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule, StatusBadgeComponent, EmptyStateComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent implements OnInit {
  readonly loading = signal(true);
  readonly stats = signal<StatCard[]>([]);
  readonly recentRequests = signal<AuditRequest[]>([]);

  constructor(
    public auth: AuthService,
    private auditRequestService: AuditRequestService,
    private interestService: InterestService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    forkJoin({
      requests: this.auditRequestService.mine().pipe(catchError(() => of({ success: true, data: [], timestamp: '' }))),
      interests: this.interestService.mine().pipe(catchError(() => of({ success: true, data: [], timestamp: '' }))),
      unreadMessages: this.messageService.unread().pipe(catchError(() => of({ success: true, data: [], timestamp: '' }))),
    }).subscribe(({ requests, interests, unreadMessages }) => {
      this.recentRequests.set(requests.data.slice(0, 4));

      this.stats.set([
        { label: 'Demandes en cours', value: requests.data.filter((r) => !['CLOTURE', 'ANNULE'].includes(r.status)).length, icon: 'fact_check', link: '/app/demandes' },
        { label: 'Favoris', value: interests.data.filter((i) => i.status === 'ACTIF').length, icon: 'favorite', link: '/app/favoris' },
        { label: 'Messages non lus', value: unreadMessages.data.length, icon: 'chat_bubble', link: '/app/messages' },
        { label: 'Visites planifiées', value: 0, icon: 'event_available', link: '/app/visites' },
      ]);

      this.loading.set(false);
    });
  }
}
