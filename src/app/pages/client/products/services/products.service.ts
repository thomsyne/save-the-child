import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Config, TableDataResponse } from "@ga/core";

import { environment } from "src/environments/environment.dev";
import { Product, ProductCategory } from "../model";
import { Observable, of } from "rxjs";
import { catchError, shareReplay } from "rxjs/operators";
import { BulkUpdateResponse } from "..";

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(private httpClient: HttpClient, private config: Config) { }

  getAllProducts(
    offset: number,
    limit: number,
    options: {
      name: any;
      code: any;
      categoryId: any;
    }
  ): Observable<TableDataResponse<Product>> {
    let params = new HttpParams();

    if (offset) params = params.append("pageIndex", offset);

    if (limit) params = params.append("pageSize", limit);

    if (options.name) params = params.append("Name", options.name);

    if (options.code) params = params.append("Code", options.code);

    if (options.categoryId)
      params = params.append("CategoryId", options.categoryId);

    return this.httpClient
      .get<TableDataResponse<Product>>(
        `${BASE_URL}${this.config.getAllProducts}`,
        {
          params,
        }
      )
      .pipe(
        catchError(() => of({ data: [] } as TableDataResponse<Product>)),
        shareReplay()
      );
  }

  getCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<ProductCategory[]>(`${BASE_URL}${this.config.getProductCategories}`)
      .pipe(catchError(() => of([] as ProductCategory[])));
  }

  fetchCategoriesBySearch(
    offset: number,
    limit: number,
    options: {
      name: any;
    }
  ): Observable<TableDataResponse<ProductCategory>> {
    let params = new HttpParams();
    if (offset) params = params.append("pageIndex", offset);
    if (limit) params = params.append("pageSize", limit);
    if (options.name) params = params.append("Name", options.name);

    return this.httpClient
      .get<TableDataResponse<ProductCategory>>(
        `${BASE_URL}${this.config.getProductCategories}/search`,
        { params }
      )
      .pipe(
        catchError(() =>
          of({ data: [] } as TableDataResponse<ProductCategory>)
        ),
        shareReplay()
      );
  }

  createProduct(form: Partial<Product>) {
    return this.httpClient.post(`${BASE_URL}${this.config.products}`, form);
  }

  updateProduct(productId: number, form: Partial<Product>) {
    return this.httpClient.put(`${BASE_URL}${this.config.products}/${productId}`, form);
  }

  fetchSingleProduct(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${BASE_URL}${this.config.products}/${productId}`);
  }

  createProductCategory(form: Partial<ProductCategory>) {
    return this.httpClient.post(`${BASE_URL}${this.config.addCategory}`, form);
  }

  updateProductCategory(catId: number, form: Partial<ProductCategory>) {
    return this.httpClient.put(`${BASE_URL}${this.config.addCategory}/${catId}`, form);
  }

  multipleImageService(fileData: FormData): Observable<
    {
      documentLink: string;
      url: string;
    }[]
  > {
    return this.httpClient.post<
      {
        documentLink: string;
        url: string;
      }[]
    >(`${BASE_URL}${this.config.multipleImageUpload}`, fileData);
  }

  // Product bulk upload
  productBulkUpload(file: FormData): Observable<BulkUpdateResponse> {
    return this.httpClient.post<BulkUpdateResponse>(
      `${BASE_URL}${this.config.productBulkUpload}`,
      file,
      // {
      //   reportProgress: true,
      //   observe: "events",
      // }
    );
  }

  // Get upload template headers
  getUploadTemplateHeaders(): Observable<{ headers: string; }> {
    return this.httpClient.get<{ headers: string; }>(
      `${BASE_URL}${this.config.uploadTemplateHeaders}`
    );
  }

  updateProductStatus(data) {
    return this.httpClient.post(
      `${BASE_URL}${this.config.inventories}/updateStock`, data
    );
  }

  deleteProductsBulk(productIds: number[]) {
    return this.httpClient.delete(
      `${BASE_URL}${this.config.deleteProducts}`, {
        body: {productIds}
      }
    );
  }
}
