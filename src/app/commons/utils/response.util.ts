interface BuilderResponse<T> {
  data: T;
  message: string | undefined;
  status: boolean;
}

export function buildResponse<T>(
  data: T,
  status: boolean,
  message: string,
): BuilderResponse<T> {
  return {
    data,
    message,
    status,
  };
}
