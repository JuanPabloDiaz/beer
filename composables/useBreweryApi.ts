import type {
  Brewery,
  BreweryMetadata,
  BrewerySearchParams,
  AutocompleteResult,
} from "~/types/brewery";

export const useBreweryApi = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  /**
   * Fetch a list of breweries with optional search parameters
   */
  const getBreweries = async (
    params: BrewerySearchParams = {},
  ): Promise<Brewery[]> => {
    try {
      return await $fetch<Brewery[]>(`${apiBase}/breweries`, {
        params,
      });
    } catch (error) {
      console.error("Error fetching breweries:", error);
      throw error;
    }
  };

  /**
   * Fetch a single brewery by ID
   */
  const getBrewery = async (id: string): Promise<Brewery> => {
    try {
      return await $fetch<Brewery>(`${apiBase}/breweries/${id}`);
    } catch (error) {
      console.error(`Error fetching brewery with ID ${id}:`, error);
      throw error;
    }
  };

  /**
   * Get a random brewery
   */
  const getRandomBrewery = async (): Promise<Brewery> => {
    try {
      const breweries = await $fetch<Brewery[]>(`${apiBase}/breweries/random`);
      return breweries[0]; // API returns an array with a single brewery
    } catch (error) {
      console.error("Error fetching random brewery:", error);
      throw error;
    }
  };

  /**
   * Search breweries by query string
   */
  const searchBreweries = async (query: string): Promise<Brewery[]> => {
    try {
      return await $fetch<Brewery[]>(`${apiBase}/breweries/search`, {
        params: { query },
      });
    } catch (error) {
      console.error(`Error searching breweries with query "${query}":`, error);
      throw error;
    }
  };

  /**
   * Get autocomplete results for a query
   */
  const getAutocomplete = async (
    query: string,
  ): Promise<AutocompleteResult[]> => {
    try {
      return await $fetch<AutocompleteResult[]>(
        `${apiBase}/breweries/autocomplete`,
        {
          params: { query },
        },
      );
    } catch (error) {
      console.error(
        `Error getting autocomplete results for query "${query}":`,
        error,
      );
      throw error;
    }
  };

  /**
   * Get metadata about breweries
   */
  const getMetadata = async (): Promise<BreweryMetadata> => {
    try {
      // Fetch the metadata from the v1 API
      const response = await $fetch<any>(`${apiBase}/breweries/meta`);

      // Transform the v1 API response to match the expected BreweryMetadata interface
      const transformedData: BreweryMetadata = {
        total: response.total || 0,
        count: response.total?.toString() || "0",
        city_count: Object.keys(response.by_state || {}).length || 0,
        state_count: Object.keys(response.by_state || {}).length || 0,
        country_count: 1, // Default to 1 as the v1 API doesn't provide country count
        type_count: response.by_type || {},
      };

      return transformedData;
    } catch (error) {
      console.error("Error fetching brewery metadata:", error);
      throw error;
    }
  };

  return {
    getBreweries,
    getBrewery,
    getRandomBrewery,
    searchBreweries,
    getAutocomplete,
    getMetadata,
  };
};
