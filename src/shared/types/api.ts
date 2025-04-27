export interface ApiResponse<T> {
  status: "success" | "error" | "fail";
  data?: T;
}
