import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface HeroSearchFilters {
  city: string;
  titleType: string;
  minSurface: number | null;
  maxPrice: number | null;
  quickTag: string | null;
}

@Component({
  selector: 'sl-hero-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss',
})
export class HeroSearchComponent {
  @Output() search = new EventEmitter<HeroSearchFilters>();

  readonly quickTags = ['Titré', 'Loti', 'Résidentiel', 'Commercial', 'Agricole'];
  activeTag: string | null = null;

  filters: HeroSearchFilters = {
    city: '',
    titleType: '',
    minSurface: null,
    maxPrice: null,
    quickTag: null,
  };

  constructor(private router: Router) {}

  selectTag(tag: string): void {
    this.activeTag = this.activeTag === tag ? null : tag;
    this.filters.quickTag = this.activeTag;
  }

  onSearch(): void {
    this.search.emit(this.filters);
    this.router.navigate(['/terrains'], {
      queryParams: {
        city: this.filters.city || null,
        type: this.filters.titleType || null,
        minSurface: this.filters.minSurface || null,
        maxPrice: this.filters.maxPrice || null,
        tag: this.filters.quickTag || null,
      },
    });
  }
}
