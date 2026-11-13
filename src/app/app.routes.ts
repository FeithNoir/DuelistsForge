import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/forge/forge').then((module) => module.ForgePage),
  },
  { path: '**', redirectTo: '' },
];
