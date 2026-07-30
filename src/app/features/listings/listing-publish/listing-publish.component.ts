import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListingService } from '../../../core/services/listing.service';

@Component({
  selector: 'sl-listing-publish',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './listing-publish.component.html',
  styleUrl: './listing-publish.component.scss',
})
export class ListingPublishComponent {
  readonly submitting = signal(false);

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    price: [null as number | null, [Validators.required, Validators.min(1)]],
    city: ['', Validators.required],
    district: ['', Validators.required],
    latitude: [null as number | null, Validators.required],
    longitude: [null as number | null, Validators.required],
    titleType: ['Résidentiel', Validators.required],
    surfaceArea: [null as number | null],
  });

  constructor(private fb: FormBuilder, private listingService: ListingService, private router: Router, private snackBar: MatSnackBar) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.listingService.create(this.form.getRawValue() as any).subscribe({
      next: () => {
        this.submitting.set(false);
        this.snackBar.open('Annonce soumise pour modération.', 'Fermer', { duration: 4000 });
        this.router.navigate(['/app/tableau-de-bord']);
      },
      error: () => {
        this.submitting.set(false);
      },
    });
  }
}
