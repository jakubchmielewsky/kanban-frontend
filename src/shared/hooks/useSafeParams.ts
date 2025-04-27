import { useParams } from "react-router-dom";

export function useSafeParams<T extends Record<string, string>>() {
  const params = useParams() as unknown as Partial<T>;

  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      throw new Error(`Param "${key}" not found in URL.`);
    }
  }

  return params as { [K in keyof T]: string };
}
