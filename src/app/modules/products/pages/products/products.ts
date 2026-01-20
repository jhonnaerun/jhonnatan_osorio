import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HeaderComponent } from '@Shared/components/header/header.component';
import { heroMagnifyingGlass, heroPencil, heroPlus, heroTrash } from '@ng-icons/heroicons/outline';
import { ProductService } from '@Products/services/product.service';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { Product } from '@Products/models/product.model';
import { GET_PRODUCTS } from '@Core/constants/query-keys';
import { Router } from '@angular/router';

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
  private queryClient = inject(QueryClient);
  public router = inject(Router);

  private deleteModal = viewChild<ElementRef<HTMLDialogElement>>('my_modal');
  private toastDelete = viewChild<ElementRef<HTMLDivElement>>('toastDelete');
  public selectedProduct: Product | undefined;

  products = injectQuery(() => ({
    queryKey: [GET_PRODUCTS],
    queryFn: () => this.productService.getProducts()
  }));

  deleteProduct = injectMutation(() => ({
    mutationFn: (id: string) => this.productService.deleteProduct(id),
    onSuccess: () => {
      this.queryClient.invalidateQueries({queryKey: [GET_PRODUCTS]});
      this.showToast();
    },
  }));

  public openDeleteModal(product: Product):void {
    this.selectedProduct = product;
    const modal = this.deleteModal()?.nativeElement;
    modal?.showModal();
  }

  public nextDelete():void {
    this.deleteProduct.mutate(this.selectedProduct!.id);
  }

  private showToast():void {
    const toast = this.toastDelete()?.nativeElement;
    toast?.classList.remove('hidden');

    setTimeout(() => {
      toast?.classList.add('hidden');
    }, 3000);
  }



}
