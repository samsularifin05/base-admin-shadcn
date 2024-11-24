export interface dataSignatur {
  APP_KEY: string;
  TOKEN: string;
  timestamp: number;
}

export interface LocalStorageItem<T> {
  nama: string;
  data: T;
}

export interface MetaInterFace {
  limit: number;
  page: number;
  total: number;
}

export interface ApiResponse<T> {
  status: number;
  data: T;
  message: string;
  count: number;
}
export interface ErrorResponse {
  status: number;
  message: string;
}
export interface RefresTokenInterFace {
  access_token: string;
  refresh_token: string;
}

export interface ResponseLoginDto {
  user_id: string;
  password: string;
  token: string;
  access_token: string;
  refresh_token: string;
  level: string;
  user_name: string;
}
