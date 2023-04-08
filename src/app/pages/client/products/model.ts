export interface Product {
  id: number;
  createdOn: Date;
  updatedOn: Date;
  name: string;
  code: string;
  description: string;
  price: number;
  stockTrackingEnabled: boolean;
  actionOnLowStock: string;
  lowStockAction?: string;
  isActive: boolean;
  categoryName: string;
  minimumStock: number;
  productCategoryId: number;
  canExpire: boolean;
  stockQuantity: number;
  quantity?: number;
  imageUrls: string[];
}

export interface ProductCategory {
  createdOn: Date;
  description: string;
  id: number;
  isActive: boolean;
  merchantId: number;
  merchantName: string;
  name: string;
  updatedOn: Date;
}

export interface BulkUpdateResponse {
  failureMessage: string[];
  numberOfFailed: number;
  numberOfSuccess: number;
  productViewModels: string[];
  successMessage: string[];
}

export interface Stock {
  store: string;
  product: string;
  quantity: number;
  minimumStock: number;
  expiryDate: string;
  lowStock: boolean
}
