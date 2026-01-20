import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HeaderComponent } from '@Shared/components/header/header.component';
import { heroMagnifyingGlass, heroPencil, heroPlus, heroTrash } from '@ng-icons/heroicons/outline';
import { ProductService } from '@Products/services/product.service';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-products',
  imports: [
    HeaderComponent,
    NgIcon
  ],
  providers: provideIcons({heroMagnifyingGlass, heroPlus, heroPencil, heroTrash}),
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export default class Products {
  private productService = inject(ProductService);

  products = injectQuery(() => ({
    queryKey: ['products'],
    queryFn: () => this.productService.getPorducts()
  }))

}
