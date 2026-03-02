export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

export interface FunctionResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export type ApiResponse<T> = T;
