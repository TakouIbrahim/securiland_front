import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'sl-settings',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatIconModule, MatButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  emailNotifications = signal(true);
  smsNotifications = signal(false);
  twoFactorEnabled = signal(false);

  constructor(public auth: AuthService) {}
}
