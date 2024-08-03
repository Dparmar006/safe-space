import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { NextResponse } from "next/server";
export async function apiRequest<T>(
  url: string,
  method: Method,
  data?: any,
  rest?: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return await axios({
    url,
    method,
    data,
    ...rest,
  });
}

export interface ServerResponse<T> {
  message: string;
  data: T;
}

export const sendResponse = (status: number, message?: string, data?: any) => {
  return NextResponse.json(
    {
      data,
      message,
    },
    {
      status,
    }
  );
};
