export interface ApiResponse<T> {
  status: "success";
  data: T;
}

export interface ApiErrorResponse {
  status: "error" | "fail";
  message: string;
}
