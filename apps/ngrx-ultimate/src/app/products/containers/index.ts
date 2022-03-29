import { ProductItemComponent } from './product-item/product-item.component';
import { ProductsComponent } from './products/products.component';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const containers: any[] = [ProductsComponent, ProductItemComponent];

export * from './products/products.component';
export * from './product-item/product-item.component';
