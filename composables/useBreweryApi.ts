import type { Brewery, BreweryMetadata, BrewerySearchParams, AutocompleteResult } from '~/types/brewery';

export const useBreweryApi = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  /**
   * Fetch a list of breweries with optional search parameters
   */
  const getBreweries = async (params: BrewerySearchParams = {}): Promise<Brewery[]> => {
    try {
      return await $fetch<Brewery[]>(`${apiBase}/breweries`, {
        params,
      });
    } catch (error) {
      console.error('Error fetching breweries:', error);
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
      console.error('Error fetching random brewery:', error);
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
  const getAutocomplete = async (query: string): Promise<AutocompleteResult[]> => {
    try {
      return await $fetch<AutocompleteResult[]>(`${apiBase}/breweries/autocomplete`, {
        params: { query },
      });
    } catch (error) {
      console.error(`Error getting autocomplete results for query "${query}":`, error);
      throw error;
    }
  };

  /**
   * Get metadata about breweries
   */
  const getMetadata = async (): Promise<BreweryMetadata> => {
    try {
      return await $fetch<BreweryMetadata>(`${apiBase}/breweries/meta`);
    } catch (error) {
      console.error('Error fetching brewery metadata:', error);
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
