/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { getItem } from "./localStroage";
// import { ResponseLoginDto } from "@/pages";

import { VITE_APP_BE_URL, generateSecret, generateSignature } from "./utils";

import {
  ApiResponse,
  ErrorResponse,
  RefresTokenInterFace,
  ResponseLoginDto,
} from "../../interface";
// import Axios from "axios";

const errorRegex =
  /Unauthorized|Invalid token|Invalid signature|Token Tidak Ditemukan/i;
class ApiInstance {
  public axios: AxiosInstance;
  public datauser = getItem<ResponseLoginDto>("userdata");
  public timestamp = new Date().toISOString();
  public signature = generateSignature(this.timestamp);
  public secret = generateSecret();

  constructor() {
    this.axios = axios.create({
      baseURL: VITE_APP_BE_URL,
      // timeout: 120000,
      headers: {
        "Content-Type": "application/json",
        timestamp: this.timestamp,
        signature: this.signature,
        user_id: this.datauser?.user_id,
        Authorization: this.datauser.access_token
          ? `Bearer ${this.datauser.access_token}`
          : undefined,
      },
    });
  }
  public async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.axios.get<ApiResponse<T>>(endpoint);
      return response.data;
    } catch (error) {
      return this.handleError<T>(error);
    }
  }
  public async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.axios.put<ApiResponse<T>>(endpoint, data);
      return response.data;
    } catch (error) {
      return this.handleError<T>(error);
    }
  }
  public async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await this.axios.delete<ApiResponse<T>>(endpoint);
      return response.data;
    } catch (error) {
      return this.handleError<T>(error);
    }
  }
  public async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    try {
      const response = await this.axios.post<ApiResponse<T>>(endpoint, data);
      return response.data;
    } catch (error) {
      return this.handleError<T>(error);
    }
  }

  private handleError<T>(error: any): ApiResponse<T> {
    if (axios.isAxiosError(error)) {
      const errResponse = error as AxiosError<ErrorResponse>;

      if (errResponse.response) {
        const { data } = errResponse.response;
        const message = data && data.message ? data.message : "Unknown error";

        if (/Token is Expired/i.test(message)) {
          this.refreshToken();
        }

        if (errorRegex.test(message)) {
          // this.logout();
        }

        throw new Error(message);
      } else if (errResponse.request) {
        throw new Error(errResponse.message);
      } else {
        throw new Error(errResponse.message);
      }
    } else {
      throw new Error("Tidak Terhubung Ke Server");
    }
  }

  // private logout = async () => {
  //   setTimeout(() => {
  //     localStorage.clear();
  //     window.location.reload();
  //   }, 3000);
  // };

  private refreshToken = async (): Promise<RefresTokenInterFace> => {
    try {
      const url = `${VITE_APP_BE_URL}/auth/refresh`;
      const timestamp = new Date().toISOString();
      const signature = generateSignature(timestamp);
      const datauser = getItem<ResponseLoginDto>("userdata");

      if (!datauser) {
        throw new Error("User data not found");
      }

      const config: AxiosRequestConfig = {
        headers: {
          timestamp: timestamp,
          signature: signature,
          Accept: "application/json",
          user_id: datauser.user_id,
          Authorization: `Bearer ${datauser.access_token || ""}`,
        },
      };

      const bodyValue = {
        user_id: datauser.user_id,
        refresh_token: datauser.refresh_token,
      };

      const response: AxiosResponse<RefresTokenInterFace> = await axios.post(
        url,
        bodyValue,
        config,
      );
      return response.data; // Mengembalikan access token baru
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to refresh token",
        );
      } else {
        throw new Error(error.message || "Failed to connect to server");
      }
    }
  };
}

export const apiInstance = new ApiInstance();
