export interface Entity<T> {
  id: string;
  domain: T
}

export interface Page<T> {
  data: Entity<T>[],
  pageNumber: number
  pageSize: number
  totalElements: number
  totalPages: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}