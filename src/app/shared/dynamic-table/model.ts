/*
 * The ColumnSettings interface consists of a primaryKey property which holds the * cell value, a header property which is used as the column header, and a format * of enum type PipeFormat to specify formatting. The PipeFormat could be
 * DEFAULT, CURRENCY OR DATE, other formats can be added in the future.
 */

import { PaginationType } from "./pagination/pagination.contants";

export interface ColumnSetting {
  primaryKey: string;
  header?: string;
  format?: PipeFormat;
  // alternativeKeys?: string[];
}

export interface ButtonSettings {
  title: string;
  func: any;
  class?: string[];
  params?: Object;
  condition?: any;
}

export interface ButtonDisplayCondition {
  prop: string;
  value: string;
  op: string;
}

export enum PipeFormat {
  DEFAULT, // 0
  CURRENCY, // 1
  DATE, // 2
  PERCENTAGE, // 3
}

export enum FilterFormat {
  TEXT_FIELD,
  SELECT,
  DATE,
}

export interface Filter {
  filterName: string;
  displayName: string;
  type: FilterFormat;
  defaultValue?: string | Date;
  options?: Map<string, string>;
}

export interface FilterFieldTag {
  text: string;
  id: string;
}

export interface PagerContent {
  pageIndex: number;
  totalElements: number;
  pageSize: number;
  currentPage?: number;
}

export interface IPagerContent {
  pageSize: number;
  pageIndex: number;
  currentPage: number;
  paginationType: PaginationType;
}

export type PaginationControl = "all" | "pagination" | "download";

export type ButtonState = "INVALID" | "VALID";
