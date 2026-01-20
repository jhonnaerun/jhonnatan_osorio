import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, UntypedFormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '@Products/services/product.service';
import { FieldErrorComponent } from '@Shared/components/field-error/field-error.component';
import { injectMutation } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-product',
  imports: [
    ReactiveFormsModule,
    FieldErrorComponent
  ],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export default class Product {
  private fb = inject(FormBuilder);
  private productSeervice = inject(ProductService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private id = signal(this.route.snapshot.paramMap.get('id'));

  public today = new Date().toISOString().split('T')[0];

  form: UntypedFormGroup = this.fb.group({
    id:  [{value: '', disabled: true}],
    name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo:  ['', Validators.required],
    date_release: ['', Validators.required],
    date_revision: [{value: '', disabled: true}, Validators.required]
  });

  private change = this.form.get('date_release')?.valueChanges.subscribe((value: Date) => {
    const revision = new Date(value);
    console.log(this.id());
    revision.setFullYear(revision.getFullYear() + 1);
    this.form.get('date_revision')?.setValue(revision.toISOString().split('T')[0])
  });

  create = injectMutation(() => ({
    mutationFn: () => this.productSeervice.createProduct(this.form.getRawValue()),
    onSuccess: () => this.router.navigate(['/products'])
  }));

  public handleNext(): void {
    if(this.create.isPending()) return;
    this.create.mutate();
  }

}
