import { describe, it, expect, vi, beforeEach } from "vitest";
import { useBreweryApi } from "../composables/useBreweryApi";
import type { BreweryType } from "../types/brewery";

// Mock the fetch function
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock the useRuntimeConfig function
vi.mock("#app", () => ({
  useRuntimeConfig: () => ({
    public: {
      apiBase: "https://api.openbrewerydb.org/v1",
    },
  }),
}));

describe("useBreweryApi", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("getBreweries", () => {
    it("should fetch breweries with correct parameters", async () => {
      // Mock successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: "1", name: "Test Brewery 1" },
            { id: "2", name: "Test Brewery 2" },
          ]),
      });

      const { getBreweries } = useBreweryApi();
      const params = { page: 1, per_page: 10, by_type: "micro" as BreweryType };
      const result = await getBreweries(params);

      // Check that fetch was called with the correct URL
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.openbrewerydb.org/v1/breweries?page=1&per_page=10&by_type=micro",
        expect.any(Object),
      );

      // Check the returned data
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("Test Brewery 1");
      expect(result[1].name).toBe("Test Brewery 2");
    });

    it("should handle errors when fetching breweries", async () => {
      // Mock error response
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
      });

      const { getBreweries } = useBreweryApi();

      // Check that the function throws an error
      await expect(getBreweries({})).rejects.toThrow(
        "Failed to fetch breweries: 500 Internal Server Error",
      );
    });
  });

  describe("getBrewery", () => {
    it("should fetch a single brewery by ID", async () => {
      // Mock successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: "123", name: "Test Brewery" }),
      });

      const { getBrewery } = useBreweryApi();
      const result = await getBrewery("123");

      // Check that fetch was called with the correct URL
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.openbrewerydb.org/v1/breweries/123",
        expect.any(Object),
      );

      // Check the returned data
      expect(result.id).toBe("123");
      expect(result.name).toBe("Test Brewery");
    });
  });

  describe("getRandomBrewery", () => {
    it("should fetch a random brewery", async () => {
      // Mock successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({ id: "random123", name: "Random Brewery" }),
      });

      const { getRandomBrewery } = useBreweryApi();
      const result = await getRandomBrewery();

      // Check that fetch was called with the correct URL
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.openbrewerydb.org/v1/breweries/random",
        expect.any(Object),
      );

      // Check the returned data
      expect(result.id).toBe("random123");
      expect(result.name).toBe("Random Brewery");
    });
  });

  describe("searchBreweries", () => {
    it("should search breweries with the provided query", async () => {
      // Mock successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: "1", name: "IPA Brewery" },
            { id: "2", name: "IPA Craft Beer" },
          ]),
      });

      const { searchBreweries } = useBreweryApi();
      const result = await searchBreweries("IPA");

      // Check that fetch was called with the correct URL
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.openbrewerydb.org/v1/breweries/search?query=IPA",
        expect.any(Object),
      );

      // Check the returned data
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("IPA Brewery");
      expect(result[1].name).toBe("IPA Craft Beer");
    });
  });

  describe("getAutocomplete", () => {
    it("should fetch autocomplete suggestions", async () => {
      // Mock successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve([
            { id: "1", name: "Dog" },
            { id: "2", name: "Dogfish Head" },
          ]),
      });

      const { getAutocomplete } = useBreweryApi();
      const result = await getAutocomplete("dog");

      // Check that fetch was called with the correct URL
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.openbrewerydb.org/v1/breweries/autocomplete?query=dog",
        expect.any(Object),
      );

      // Check the returned data
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe("Dog");
      expect(result[1].name).toBe("Dogfish Head");
    });
  });

  describe("getMetadata", () => {
    it("should fetch metadata about breweries", async () => {
      // Mock successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            total: 8000,
            city_count: 1500,
            type_count: {
              micro: 4000,
              brewpub: 2000,
              regional: 1000,
              other: 1000,
            },
          }),
      });

      const { getMetadata } = useBreweryApi();
      const result = await getMetadata();

      // Check that fetch was called with the correct URL
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.openbrewerydb.org/v1/breweries/meta",
        expect.any(Object),
      );

      // Check the returned data
      expect(result.total).toBe(8000);
      expect(result.city_count).toBe(1500);
      expect(result.type_count.micro).toBe(4000);
    });
  });
});
