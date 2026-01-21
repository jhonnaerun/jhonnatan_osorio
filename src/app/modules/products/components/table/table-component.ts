import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GET_PRODUCTS } from '@Core/constants/query-keys';
import { ToastController } from '@Core/controllers/toast-controller';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroPencil, heroTrash } from '@ng-icons/heroicons/outline';
import { Product } from '@Products/models/product.model';
import ProductsComponent from '@Products/pages/products/products';
import { ProductService } from '@Products/services/product.service';
import { injectMutation, QueryClient } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-table',
  imports: [NgIcon],
  providers: provideIcons({heroPencil, heroTrash}),
  templateUrl: './table-component.html'
})
export class TableComponent {
  private parent = inject(ProductsComponent);
  private productService = inject(ProductService);
  private queryClient = inject(QueryClient);
  private toast = inject(ToastController);
  public router = inject(Router);

  products = this.parent.filteredProducts || [];

  private deleteModal = viewChild<ElementRef<HTMLDialogElement>>('my_modal');
  public selectedProduct: Product | undefined;

  deleteProduct = injectMutation(() => ({
    mutationFn: (id: string) => this.productService.deleteProduct(id),
    onSuccess: () => {
      this.queryClient.invalidateQueries({queryKey: [GET_PRODUCTS]});
      this.toast.show('producto eliminado.', 'success');
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

}
