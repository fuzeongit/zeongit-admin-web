export interface Pagination<T> {
  items: T[]
  meta: PaginationMeta
}

export interface PaginationMeta {
  currentPage: number
  empty: boolean
  first: boolean
  itemCount: number
  itemsPerPage: number
  last: boolean
  totalItems: number
  totalPages: number
}
