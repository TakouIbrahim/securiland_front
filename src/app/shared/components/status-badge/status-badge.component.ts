import { CommonModule } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';

type Tone = 'success' | 'warning' | 'danger' | 'neutral' | 'info';

const STATUS_MAP: Record<string, { label: string; tone: Tone }> = {
  // Audit
  BROUILLON: { label: 'Brouillon', tone: 'neutral' },
  SOUMIS: { label: 'Soumis', tone: 'info' },
  EN_ATTENTE_PAIEMENT: { label: 'En attente de paiement', tone: 'warning' },
  PAYE: { label: 'Payé', tone: 'info' },
  ASSIGNE: { label: 'Technicien affecté', tone: 'info' },
  EN_TRAITEMENT: { label: 'En traitement', tone: 'info' },
  EN_ATTENTE_COMPLEMENT: { label: 'Complément requis', tone: 'warning' },
  COMPLETE: { label: 'Complété', tone: 'info' },
  RAPPORT_EN_COURS: { label: 'Rapport en cours', tone: 'info' },
  RAPPORT_GENERE: { label: 'Rapport disponible', tone: 'success' },
  CLOTURE: { label: 'Clôturé', tone: 'success' },
  ANNULE: { label: 'Annulé', tone: 'danger' },
  // Listing
  EN_ATTENTE_VALIDATION: { label: 'En attente de validation', tone: 'warning' },
  EN_MODERATION: { label: 'En modération', tone: 'warning' },
  ACTIVE: { label: 'Publiée', tone: 'success' },
  REJETEE: { label: 'Rejetée', tone: 'danger' },
  DESACTIVEE: { label: 'Désactivée', tone: 'neutral' },
  SUSPENDUE: { label: 'Suspendue', tone: 'danger' },
  // Paiement
  PENDING: { label: 'En attente', tone: 'warning' },
  SUCCESS: { label: 'Réussi', tone: 'success' },
  FAILED: { label: 'Échoué', tone: 'danger' },
  REFUNDED: { label: 'Remboursé', tone: 'neutral' },
};

@Component({
  selector: 'sl-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="sl-status" [class]="'sl-status--' + tone()">{{ label() }}</span>`,
  styles: [
    `
      .sl-status {
        display: inline-flex;
        align-items: center;
        padding: 4px 11px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
      }
      .sl-status--success { background: #e3f3ea; color: #1e5c46; }
      .sl-status--warning { background: #fbf1dc; color: #9a6c15; }
      .sl-status--danger { background: #fbe8e7; color: #b3413c; }
      .sl-status--info { background: #e8eef8; color: #2d5da8; }
      .sl-status--neutral { background: #eef0ee; color: #5a655f; }
    `,
  ],
})
export class StatusBadgeComponent {
  @Input({ required: true }) set status(value: string) {
    this.statusSignal.set(value);
  }

  private statusSignal = signal('');

  readonly label = computed(() => STATUS_MAP[this.statusSignal()]?.label ?? this.statusSignal());
  readonly tone = computed(() => STATUS_MAP[this.statusSignal()]?.tone ?? 'neutral');
}
