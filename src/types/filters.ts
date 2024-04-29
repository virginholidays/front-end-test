export interface SelectedFilters {
  price:  string[] | null;
  facilities: string[] | null;
  starRating: string[] | null;
};

export interface Filter {
  name: string;
  count: number;
}
