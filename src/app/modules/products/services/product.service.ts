import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '@Products/models/product.model';
import { ResponseData } from '@Core/models/response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private url = environment.url;


  public getPorducts(): Promise<Product[]> {
    const observable = this.http.get<ResponseData>(`${this.url}/bp/products`);

    return lastValueFrom(observable.pipe(map(response => response.data)));
  }

}
