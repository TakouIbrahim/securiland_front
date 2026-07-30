import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

/** Affiche une notification (snackbar) lisible pour toute erreur HTTP renvoyee par l'API. */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error) => {
      const message = error?.error?.message || 'Une erreur est survenue. Veuillez reessayer.';
      snackBar.open(message, 'Fermer', { duration: 5000, panelClass: 'sl-snackbar-error' });
      return throwError(() => error);
    })
  );
};
