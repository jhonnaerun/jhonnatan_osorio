import { Routes } from "@angular/router";


export const PRODUCTS_RUOTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/products/products')
  },
  {
    path: 'product',
    loadComponent: () => import('./pages/product/product')
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product/product')
  }
]
