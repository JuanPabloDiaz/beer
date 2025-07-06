export interface Brewery {
  id: string;
  name: string;
  brewery_type: BreweryType;
  address_1?: string;
  address_2?: string;
  address_3?: string;
  city?: string;
  state_province?: string;
  postal_code?: string;
  country?: string;
  longitude?: string;
  latitude?: string;
  phone?: string;
  website_url?: string;
  state?: string;
  street?: string;
}

export type BreweryType =
  | "micro"
  | "nano"
  | "regional"
  | "brewpub"
  | "large"
  | "planning"
  | "bar"
  | "contract"
  | "proprietor"
  | "closed";

export interface BrewerySearchParams {
  by_city?: string;
  by_state?: string;
  by_name?: string;
  by_type?: BreweryType;
  by_postal?: string;
  by_country?: string;
  by_dist?: string;
  page?: number;
  per_page?: number;
  sort?: "asc" | "desc";
}

export interface BreweryMetadata {
  total: number;
  count: string;
  city_count: number;
  state_count: number;
  country_count: number;
  type_count: Record<BreweryType, number>;
}

export interface AutocompleteResult {
  id: string;
  name: string;
}
