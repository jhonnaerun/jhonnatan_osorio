import { Routes } from "@angular/router";


export const PRODUCTS_RUOTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/products/products')
  }
]
