import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { catchError, of } from 'rxjs';
import { MessageService } from '../../../core/services/message.service';
import { AuthService } from '../../../core/services/auth.service';
import { ChatMessage } from '../../../core/models/message.model';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'sl-messages',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, EmptyStateComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.scss',
})
export class MessagesComponent implements OnInit {
  readonly loading = signal(true);
  readonly threads = signal<ChatMessage[]>([]);
  readonly listingIdFromQuery = signal<string | null>(null);
  draft = '';

  constructor(private messageService: MessageService, public auth: AuthService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.listingIdFromQuery.set(this.route.snapshot.queryParamMap.get('listingId'));

    this.messageService
      .unread()
      .pipe(catchError(() => of({ success: true, data: [], timestamp: '' })))
      .subscribe((res) => {
        this.threads.set(res.data);
        this.loading.set(false);
      });
  }
}
