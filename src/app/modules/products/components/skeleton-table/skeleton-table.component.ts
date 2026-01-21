import { Component } from '@angular/core';

@Component({
  selector: 'app-skeleton-table',
  imports: [],
  template: `
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
      <div class="w-full sm:max-w-xs">
        <div class="skeleton h-10 w-full"></div>
      </div>

      <div class="skeleton h-10 w-40"></div>
    </div>

    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Fecha de liberación</th>
            <th>Fecha de reestructuración</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          @for (i of [1,2,3,4]; track i) {
          <tr>
            <td>
              <div class="skeleton w-10 h-10 rounded"></div>
            </td>

            <td>
              <div class="skeleton h-4 w-32"></div>
            </td>

            <td>
              <div class="skeleton h-4 w-48"></div>
            </td>

            <td>
              <div class="skeleton h-4 w-28"></div>
            </td>

            <td>
              <div class="skeleton h-4 w-28"></div>
            </td>

            <td>
              <div class="flex justify-center gap-4">
                <div class="skeleton h-5 w-5"></div>
                <div class="skeleton h-5 w-5"></div>
              </div>
            </td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  `,
})
export class SkeletonTableComponent {

}
