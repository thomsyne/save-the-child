export interface Shop {
  active: boolean;
  address: string;
  createdOn: string;
  description: string;
  id: number;
  merchant: string;
  name: string;
  systemName: string;
  updatedOn: string;
}

export interface ShopInventory {
  actionOnLowStock: string;
  categoryName: string;
  code: string;
  createdOn: string;
  description: string;
  expiryDate: string;
  id: number;
  imageUrl: string;
  isActive: false
  lowStock: false
  minimumStock: number;
  name: string;
  price: number;
  quantity: string;
  stockTrackingEnabled: boolean;
  updatedOn: string;
}
