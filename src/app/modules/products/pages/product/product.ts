import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@Products/services/product.service';
import { FieldErrorComponent } from '@Shared/components/field-error/field-error.component';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';
import { Product } from '@Products/models/product.model';
import { ToastController } from '@Core/controllers/toast-controller';
import { BackNavigateComponent } from '@Shared/components/back-navigate/back-navigate.component';

@Component({
  imports: [
    ReactiveFormsModule,
    FieldErrorComponent,
    BackNavigateComponent
  ],
  templateUrl: './product.html'
})
export default class ProductComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private toast = inject(ToastController);

  public id = signal(this.route.snapshot.paramMap.get('id'));

  public title = !!this.id() ? 'Actualizar' : 'Registrar';

  public today = new Date().toISOString().split('T')[0];

  form: UntypedFormGroup = this.fb.group({
    id:  [{value: '', disabled: true}],
    name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo:  ['', Validators.required],
    date_release: ['', Validators.required],
    date_revision: [{value: '', disabled: true}, Validators.required]
  });

  product = injectQuery<Product | null>(() => ({
    queryKey: ['product', this.id()],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey as [string, string];
      const product = await this.productService.getProduct(id);

      !product ? this.Error() : this.setForm(product);

      return product;
    },
    enabled: !!this.id(),
    retry: false
  }));

  private change = this.form.get('date_release')?.valueChanges.subscribe((value: Date) => {
    const revision = new Date(value);
    revision.setFullYear(revision.getFullYear() + 1);
    this.form.get('date_revision')?.setValue(revision.toISOString().split('T')[0])
  });

  create = injectMutation(() => ({
    mutationFn: () => this.productService.createProduct(this.form.getRawValue()),
    onSuccess: () => {
      console.log('ddsdsd');
      this.toast.show('Producto creado correctamente.');
      this.router.navigate(['/products']);
    },
  }));

  update = injectMutation(() => ({
    mutationFn: () => this.productService.updateProduct(this.form.getRawValue()),
    onSuccess: () => {
      this.toast.show('Producto actualizado correctamente.');
      this.router.navigate(['/products']);
    },
  }));

  public handleNext(): void {
    if(this.create.isPending() || this.update.isPending()) return;
    !!this.id() ? this.update.mutate() : this.create.mutate();
  }

  private setForm(product: Product): void {
    this.form.setValue(product);
  }

  private Error(): void {
    this.toast.show('El id ingresado no existe.', 'error');
    this.router.navigate(['/products']);
  }

}
