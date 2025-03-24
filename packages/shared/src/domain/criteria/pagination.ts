export interface QueryPage {
  page?: string;
  take?: string;
  nextToken?: string;
}

export interface PaginationResponse {
  nextToken?: string;
  take: number;
}

export interface PaginationSearchResponse extends PaginationResponse {
  page: number;
  total: number;
  totalPages: number;
}
