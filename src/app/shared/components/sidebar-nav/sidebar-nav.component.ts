import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from '../../../core/services/message.service';

interface NavItem {
  label: string;
  icon: string;
  link: string;
  exact?: boolean;
}

@Component({
  selector: 'sl-sidebar-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule, MatButtonModule],
  templateUrl: './sidebar-nav.component.html',
  styleUrl: './sidebar-nav.component.scss',
})
export class SidebarNavComponent {
  @Output() closeMobile = new EventEmitter<void>();

  readonly unreadCount = signal(0);

  readonly navItems: NavItem[] = [
    { label: 'Tableau de bord', icon: 'space_dashboard', link: '/app/tableau-de-bord', exact: true },
    { label: 'Mes favoris', icon: 'favorite_border', link: '/app/favoris' },
    { label: 'Mes demandes', icon: 'fact_check', link: '/app/demandes' },
    { label: 'Mes visites', icon: 'event_available', link: '/app/visites' },
    { label: 'Messages', icon: 'chat_bubble_outline', link: '/app/messages' },
    { label: 'Paiements', icon: 'account_balance_wallet', link: '/app/paiements' },
    { label: 'Mon profil', icon: 'person_outline', link: '/app/profil' },
    { label: 'Paramètres', icon: 'settings', link: '/app/parametres' },
  ];

  constructor(public auth: AuthService, private messageService: MessageService) {
    this.messageService.unread().subscribe({
      next: (res) => this.unreadCount.set(res.data.length),
      error: () => this.unreadCount.set(0),
    });
  }

  get initials(): string {
    const email = this.auth.currentEmail() ?? '';
    return email.charAt(0).toUpperCase();
  }

  logout(): void {
    this.auth.logout();
  }
}
