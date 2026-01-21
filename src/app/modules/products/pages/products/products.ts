import { Component, computed, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HeaderComponent } from '@Shared/components/header/header.component';
import { heroMagnifyingGlass, heroPlus } from '@ng-icons/heroicons/outline';
import { ProductService } from '@Products/services/product.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { GET_PRODUCTS } from '@Core/constants/query-keys';
import { Router } from '@angular/router';
import { SkeletonTableComponent } from '@Products/components/skeleton-table/skeleton-table.component';
import { TableComponent } from '@Products/components/table/table-component';

@Component({
  selector: 'app-products',
  imports: [
    NgIcon,
    HeaderComponent,
    SkeletonTableComponent,
    TableComponent
  ],
  providers: provideIcons({heroPlus, heroMagnifyingGlass}),
  templateUrl: './products.html'
})
export default class ProductsComponent {
  private productService = inject(ProductService);
  public router = inject(Router);

  search = signal('');

  products = injectQuery(() => ({
    queryKey: [GET_PRODUCTS],
    queryFn: () => this.productService.getProducts()
  }));

  filteredProducts = computed(() => {
    const term = this.search().toLowerCase();

    if (!term) return this.products.data() ?? [];

    return (this.products.data() ?? []).filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  });

}
