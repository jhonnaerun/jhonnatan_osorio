import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./modules/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'products',
    loadChildren: () => import('./modules/products/').then(m => m.PRODUCTS_RUOTES)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
