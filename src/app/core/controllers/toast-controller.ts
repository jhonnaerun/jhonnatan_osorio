import { ElementRef, Injectable, signal, viewChild } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning';

@Injectable({
  providedIn: 'root',
})
export class ToastController {

  message = signal<string | null>(null);
  type = signal<ToastType>('success');
  hiden = signal<boolean>(true);

  show(message: string, type: ToastType = 'success') {
    this.message.set(message);
    this.type.set(type);
    this.hiden.set(false);

    setTimeout(() => {
      this.hiden.set(true);
    }, 3000);
  }
}
