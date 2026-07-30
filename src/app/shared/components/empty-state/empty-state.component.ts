import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'sl-empty-state',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  template: `
    <div class="sl-empty">
      <div class="sl-empty__icon"><mat-icon>{{ icon }}</mat-icon></div>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      @if (ctaLabel && ctaLink) {
        <a [routerLink]="ctaLink" class="sl-empty__cta">{{ ctaLabel }}</a>
      }
    </div>
  `,
  styles: [
    `
      .sl-empty {
        text-align: center;
        padding: 64px 24px;
        max-width: 420px;
        margin: 0 auto;
      }
      .sl-empty__icon {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: var(--sl-green-50);
        color: var(--sl-green-700);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 18px;
      }
      .sl-empty__icon mat-icon {
        font-size: 30px;
        width: 30px;
        height: 30px;
      }
      .sl-empty h3 {
        font-size: 18px;
        margin-bottom: 8px;
      }
      .sl-empty p {
        color: var(--sl-ink-soft);
        font-size: 14px;
        margin-bottom: 20px;
      }
      .sl-empty__cta {
        display: inline-block;
        background: var(--sl-green-700);
        color: #fff;
        padding: 10px 22px;
        border-radius: var(--sl-radius-sm);
        font-weight: 600;
        font-size: 14px;
      }
    `,
  ],
})
export class EmptyStateComponent {
  @Input() icon = 'inbox';
  @Input() title = 'Rien à afficher pour le moment';
  @Input() description = '';
  @Input() ctaLabel?: string;
  @Input() ctaLink?: string;
}
