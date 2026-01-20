import { Product } from "src/app/modules/products/models/product.model";

export interface ResponseData {
  message:  string,
  data: Product[]
}
