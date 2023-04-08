export interface Device {
  createdOn: string;
  enrollmentStatus: string;
  id: number;
  identifier: string;
  isActive: boolean;
  merchant: string;
  modelName: string;
  operatingSystem: string;
  typeOfDevice: string;
  updatedOn: string;
  deviceType?: string;
  merchantId?: string;
}

export interface DashboardDevice {
  numberOfActiveDevice: number;
  numberOfInActiveDevice: number;
}
