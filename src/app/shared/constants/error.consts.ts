import { CurrencyPipe } from "@angular/common";

export type ErrorMessageFunction = (params: Record<string, unknown>, pipe: CurrencyPipe) => string;
type ErrorMessage = Record<string, ErrorMessageFunction>

export const ERROR_MESSAGES_LIST: ErrorMessage = {
  required: () => 'El campo es requerido.',
  email: () => 'El usuario no tiene un correo electrónico válido.',
  minlength: (params) => `La cantidad mínima de caracteres es ${String(params?.['requiredLength'] ?? 'NA')}.`,
  maxlength: (params) => `La cantidad maxima de caracteres es ${String(params?.['requiredLength'] ?? 'NA')}.`,
};
