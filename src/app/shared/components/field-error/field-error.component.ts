import { Component, inject, input } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { ERROR_MESSAGES_LIST, ErrorMessageFunction } from '@Shared/constants/error.consts';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'field-error',
  standalone: true,
  imports: [],
  providers: [CurrencyPipe],
  template: `
  @if(errorMessage) {
    <p class="mt-1 text-xs text-red-500">{{ errorMessage }}</p>
  }
  `
})
export class FieldErrorComponent {
  readonly formContainer = inject(ControlContainer, { skipSelf: true });
  private readonly currency = inject(CurrencyPipe);

  public controlName = input.required<string>();

  private get control(): AbstractControl | null {
    if (!this.controlName) return null;
    return this.formContainer?.control?.get(this.controlName()) ?? null;
  }

  public get errorMessage(): string | null {
    const control = this.control;
    if (!control || !control.touched || !control.errors) return null;

    const firstErrorKey = Object.keys(control.errors)[0];
    const params = control.errors[firstErrorKey];

    const messageFn: ErrorMessageFunction | undefined = ERROR_MESSAGES_LIST[firstErrorKey];
    if (messageFn) {
      return messageFn(params, this.currency);
    }

    return 'Campo inválido';
  }

}
