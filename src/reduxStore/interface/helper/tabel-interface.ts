import { TablePaginationConfig } from "antd";
import { ChangeEvent } from "react";

export interface TableColumn {
  title?: string;
  dataIndex: string;
  key: string;
}

interface CustomTablePaginationConfig extends TablePaginationConfig {
  q?: string;
}
export interface TableMasterProps {
  dataSource: any;
  id?: string;
  columns: TableColumn[];
  formName?: string;
  title?: string;
  addButtonTitle?: string;
  addButtonTitle2?: string;
  rowKey: string;
  isLoading?: boolean;
  scrollX?: boolean;
  total?: number;
  loading?: boolean;
  disabledPagenation?: boolean;
  disabledSearch?: boolean;
  rowSelection?: any;
  changePagenation?: (row: CustomTablePaginationConfig) => void;
  onAddButtonClick?: () => void;
  onAddButtonClick2?: () => void;
  searchText?: string;
  expandable?: any;
  width?: number;
  footer?: any;
  summary?: any;
  handleSearch?: (row: ChangeEvent<HTMLInputElement>) => void;
}

export interface InterFaceFormDataUser {
  email: string;
  password: string;
}
export interface SearchInterface {
  skip?: number;
  limit?: number;
  q?: string;
  status_valid?: boolean;
}

export interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

export interface TabelInterFace<T> {
  data: T[];
  count: number;
}
