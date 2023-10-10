import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'generate',
  },
  {
    path: 'generate',
    loadComponent: () =>
      import('./generate/generate.component').then((m) => m.GenerateComponent),
  },
];
