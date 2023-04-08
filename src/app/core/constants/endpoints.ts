import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class Config {
  // AUTHr
  clientId = "71b6729d-1668-481d-8a68-a26612c729bf";
  getXToken = "/api/access-control/v2/getToken";
  gaAdminLogin = "/api/accelerex-ecr/user-management/v1/identity/externalLogin";
  storeAdminLogin = "/api/accelerex-ecr/user-management/v1/identity/login";
  recoverPin = "/api/accelerex-ecr/user-management/v1/identity/recoverPin";
  sendOTP = "/api/accelerex-ecr/user-management/v1/identity/resetPin";
  completeUserReg =
    "/api/accelerex-ecr/user-management/v1/identity/activateUser";

  resetAnpPassword =
    "/api/accelerex-ecr/anp-helpers/v1/helpers/createMerchantPassword";
  resetAnpPin = "/api/accelerex-ecr/anp-helpers/v1/helpers/createMerchantPin";

  // ONBOARDING
  onboardMerchant =
    "/api/accelerex-ecr/merchant-management/v1/merchants/onboard";
  onboardingCatlog =
    "/api/accelerex-ecr/merchant-management/v1/merchants/onboarding-catalog";

  // UTILITY
  documentService = "/api/document-service/documents/v1/upload";
  documentUpload = "/api/accelerex-ecr/document-management/v1/document";
  publicDocumentUpload =
    "/api/accelerex-ecr/document-management/v1/document/public";
  publicV2DocumentUpload =
    "/api/accelerex-ecr/document-management/v2/document/public";
  auditService = "/api/audit-log/logs/v2/search";
  multipleImageUpload =
    "/api/accelerex-ecr/document-management/v1/document/multipleupload";
  getUploadedFile = "/api/accelerex-ecr/document-management/v1/document";

  // PRODUCTS
  products = "/api/accelerex-ecr/product-management/v2/products";
  productBulkUpload =
    "/api/accelerex-ecr/product-management/v2/products/upload";
  getAllProducts = "/api/accelerex-ecr/product-management/v2/products/search";
  uploadTemplateHeaders =
    "/api/accelerex-ecr/product-management/v2/products/template";
  getProductCategories = "/api/accelerex-ecr/category-management/v1/categories";
  addCategory = "/api/accelerex-ecr/category-management/v1/categories";
  deleteProducts = "/api/accelerex-ecr/product-management/v2/products/deleteInBulk"
  //   /api/accelerex-ecr/product-management/v2/products/search METHOD GET
  // /api/accelerex-ecr/product-management/v2/products/template METHOD GET

  // INENTORY
  inventories = "/api/accelerex-ecr/inventory-management/v2/Inventory";
  updateInventory =
    "/api/accelerex-ecr/inventory-management/v2/Inventory/updateStock";
  singleInventory =
    "/api/accelerex-ecr/inventory-management/v2/Inventory/stock";
  // /api/accelerex-ecr/inventory-management/v2/Inventory/search METHOD GET

  // CUSTOMERS
  getAllCustomers =
    "/api/accelerex-ecr/customer-management/v1/customers/search";
  getCustomerOrders = "/api/accelerex-ecr/customer-management/v1/customers";
  getOrderData = "/api/accelerex-ecr/order-management/v1/orders";
  customer = "/api/accelerex-ecr/customer-management/v1/customers";

  // DEVICES
  getAllDevices = "/api/accelerex-ecr/device-management/v1/devices/search";
  addDevice = "/api/accelerex-ecr/device-management/v1/devices";
  fetchDeviceStatus =
    "/api/accelerex-ecr/device-management/v1/devices/FetchDeviceStatus";

  //REPORTS
  getBillings = "/api/accelerex-ecr/merchant-management/v1/merchants";
  getAdminBillings = "/api/accelerex-ecr/merchant-management/v1/invoice";
  getSalesReports = "/api/accelerex-ecr/order-management/v1/orders/search";
  getSettlementsReports =
    "/api/accelerex-ecr/settlement-management/v1/settlements/search";
  settlementRequery =
    "/api/accelerex-ecr/settlement-management/v1/settlements/SettlementTSQ";
  cancelInvoice = "/api/accelerex-ecr/merchant-management/v1/invoice/cancel";
  subscriptionsDashboard =
    "/api/accelerex-ecr/report-management/v1/reports/admin/subscription";
  merchantDashboard =
    "/api/accelerex-ecr/report-management/v2/reports/admin/merchant";
  adminSalesReport =
    "/api/accelerex-ecr/report-management/v1/reports/admin/summary";
  merchantSalesPaymentMethodDashboard =
    "/api/accelerex-ecr/merchant-management/v1/merchants";
  adminSalesPaymentMethodDashboard =
    "/api/accelerex-ecr/report-management/v1/reports/admin/paymentMethodSummary";
  getPaymentStatus =
  "/api/accelerex-ecr/merchant-management/v1/invoice/getstatus"
  getVirtualPaymentStatus =
    "/api/accelerex-ecr/merchant-management/v1/invoice/transferInvoiceProcess"
  getCorporateOrders =
    "/api/accelerex-ecr/order-management/v1/orders/searchCorporateOrderQuery"

  //SETTLEMENT
  manualCardSettlement =
    "/api/accelerex-ecr/settlement-management/v1/settlements/manualcardsettlement"

  //SHOPS
  getShopInventory = "/api/accelerex-ecr/store-management/v1/stores";
  getShopTransactions = "/api/accelerex-ecr/store-management/v1/stores";
  getAllShops = "/api/accelerex-ecr/store-management/v1/stores/search";
  store = "/api/accelerex-ecr/store-management/v1/stores";

  // USERS
  getRoles = "/api/accelerex-ecr/user-management/v1/roles/search";
  addRole = "/api/accelerex-ecr/user-management/v1/roles";
  getCashierReports = "/api/accelerex-ecr/merchant-management/v1/merchants";
  getAllSettlementSummary =
    "/api/accelerex-ecr/settlement-management/v1/settlements/summary";
  getAllStaffs = "/api/accelerex-ecr/user-management/v1/users/search";
  getStaffLogs = "/api/audit-log/logs/v2/search";
  addStaff = "/api/accelerex-ecr/user-management/v1/users";
  permissions = "/api/accelerex-ecr/user-management/v1/permissions";
  changePin = "/api/accelerex-ecr/user-management/v1/identity/changePin";
  resendMerchantActivationEmail =
    "/api/accelerex-ecr/user-management/v1/identity/resendActivationToken";

  // DISPUTES
  getComplaints = "/api/accelerex-ecr/dispute-management/v1/disputes/search";
  createComplaint = "/api/accelerex-ecr/dispute-management/v1/disputes";

  // MERCHANTS
  getMerchants = "/api/accelerex-ecr/merchant-management/v1/merchants/search";
  getSingleMerchant = "/api/accelerex-ecr/merchant-management/v1/merchants";
  generateOTP = "/api/accelerex-ecr/merchant-management/v1/otp/generate";
  activateLeaseMerchant =
    "/api/accelerex-ecr/merchant-management/v1/merchants/lease/approve";
  getMerchantSalesReport =
    "/api/accelerex-ecr/merchant-management/v1/merchants/";
  updateInvoicePayment =
    "/api/accelerex-ecr/merchant-management/v1/invoice/ManualInvoicePayment";

  // SUBSCRIPTION
  getSubscriptions =
    "/api/accelerex-ecr/subscription-management/v1/subscriptions/search";
  allSubscriptions =
    "/api/accelerex-ecr/subscription-management/v1/subscriptions";

  // DASHBOARD
  topProductByQty =
    "/api/accelerex-ecr/report-management/v1/reports/mostSoldProductByQuantity";
  topProductByValue =
    "/api/accelerex-ecr/report-management/v1/reports/mostSoldProductByValue";
  topCashier = "/api/accelerex-ecr/report-management/v1/reports/topCashier";
  topCustomer = "/api/accelerex-ecr/report-management/v1/reports/topCustomer";
  transactions = "/api/accelerex-ecr/report-management/v1/reports/transaction";

  // Pay Now
  initiatePayment =
    "/api/accelerex-ecr/merchant-management/v1/invoice/initiatepayment";
  payAhead = "/api/accelerex-ecr/merchant-management/v1/invoice";

  // PAYMENT
  virtualTransfer =
    '/api/accelerex-ecr/merchant-management/v1/invoice/transferInvoicePayment'
  virtualTransferStatus =
    '/api/accelerex-ecr/virtualPayment-management/v1/virtualPayment/status'

  // ENTITIES
  getSingleEntity =
    "/api/accelerex-ecr/corporate-entity-management/v1/corporate-entities/get";
  getEntitiesList =
    "/api/accelerex-ecr/corporate-entity-management/v1/corporate-entities/list";
  addEntity =
    "/api/accelerex-ecr/corporate-entity-management/v1/corporate-entities/create";
  updateEntity =
    "/api/accelerex-ecr/corporate-entity-management/v1/corporate-entities/update";

  //Banks
  getBanksList = "/api/accelerex-ecr/bank-management/v1/banks/list";
  addBank = "/api/accelerex-ecr/bank-management/v1/banks/create";

  getAuditLogs = "/api/accelerex-ecr/audit-management/v1/audits/search";
  getLogDetail = "/api/accelerex-ecr/audit-management/v1/audits/get-by-id";
}
