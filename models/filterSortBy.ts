export interface FilterSortBy {
  orderBy?: "asc" | "desc";
  take?: number;
  role?: "PUBLIC" | "ADMIN" | "USER" | "";
}
