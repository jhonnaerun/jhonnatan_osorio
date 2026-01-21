import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, lastValueFrom, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '@Products/models/product.model';
import { ResponseData } from '@Core/models/response.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private url = environment.url;


  public getProducts(): Promise<Product[]> {
    const observable = this.http.get<ResponseData>(`${this.url}/bp/products`);

    return lastValueFrom(observable.pipe(delay(1000),map(response => response.data as Product[])));
  }

  public getProduct(id: string): Promise<Product | null> {
    const observable = this.http.get<Product>(`${this.url}/bp/products/${id}`);

    return lastValueFrom(observable.pipe(catchError(() => of(null))));
  }

  public createProduct(product: Product): Promise<ResponseData> {
    product.id = uuidv4();
    const observable = this.http.post<ResponseData>(`${this.url}/bp/products`, product);

    return lastValueFrom(observable.pipe(delay(1000)));
  }

  public updateProduct(product: Product): Promise<ResponseData> {
    const observable = this.http.put<ResponseData>(`${this.url}/bp/products/${product.id}`, product);

    return lastValueFrom(observable.pipe(delay(1000)));
  }

  public deleteProduct(id: string): Promise<{message:string}> {
    const observable = this.http.delete<{message:string}>(`${this.url}/bp/products/${id}`);

    return lastValueFrom(observable.pipe(delay(1000)));
  }


}
