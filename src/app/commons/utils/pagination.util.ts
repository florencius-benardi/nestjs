interface PaginatedResponse<T> {
  data:
    | {
        data: T[];
        current_page: number;
        per_page: number;
        last_page: number;
        total: number;
      }
    | undefined;
  message: string | undefined;
  status: boolean;
}

export function buildPaginationResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
  message: string,
): PaginatedResponse<T> {
  const totalPages = Math.ceil(total / limit);

  return {
    data: {
      data: data,
      current_page: page,
      per_page: limit,
      total: total,
      last_page: totalPages,
    },
    message,
    status: true,
  };
}
