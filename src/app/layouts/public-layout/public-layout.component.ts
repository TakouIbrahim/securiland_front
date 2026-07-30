import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'sl-public-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <sl-header></sl-header>
    <main class="sl-public-main">
      <router-outlet></router-outlet>
    </main>
    <sl-footer></sl-footer>
  `,
  styles: [
    `
      .sl-public-main {
        min-height: 60vh;
      }
    `,
  ],
})
export class PublicLayoutComponent {}
