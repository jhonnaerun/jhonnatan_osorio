import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroArrowLeft } from '@ng-icons/heroicons/outline';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-navigate',
  imports: [NgIcon],
  providers: provideIcons({heroArrowLeft}),
  template: `
    <div (click)="location.back()"
      class="fixed top-4 left-8 z-50
            bg-base-100 shadow-lg rounded-2xl
            w-14 h-14
            flex items-center justify-center
            cursor-pointer
            hover:bg-base-200
            active:scale-95
            transition">
      <ng-icon
        name="heroArrowLeft"
        class="w-10 h-10"
      />
    </div>
  `,
})
export class BackNavigateComponent {
  public location = inject(Location);
}
