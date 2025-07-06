<template>
  <div>
    <Head>
      <Title>API Documentation | Craft Beer</Title>
      <Meta
        name="description"
        content="Documentation for the OpenBreweryDB API used in this application."
      />
    </Head>

    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        API Documentation
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        This application is powered by the OpenBreweryDB API. Learn about the
        available endpoints and how they're used.
      </p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        About OpenBreweryDB
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        OpenBreweryDB is an open-source, free-to-use API for public information
        on breweries, cideries, brewpubs, and bottleshops. The API is maintained
        by
        <a
          href="https://www.openbrewerydb.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-amber-600 dark:text-amber-400 hover:underline"
          >openbrewerydb.org</a
        >.
      </p>
      <div class="flex space-x-4">
        <a
          href="https://www.openbrewerydb.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors flex items-center"
        >
          Visit Official Site
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
        <a
          href="https://github.com/openbrewerydb/openbrewerydb"
          target="_blank"
          rel="noopener noreferrer"
          class="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md transition-colors flex items-center"
        >
          GitHub Repository
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>

    <div class="space-y-8">
      <!-- API Base URL -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          API Base URL
        </h2>
        <div
          class="bg-gray-100 dark:bg-gray-900 p-3 rounded-md font-mono text-sm mb-4"
        >
          https://api.openbrewerydb.org/v1
        </div>
        <p class="text-gray-600 dark:text-gray-400">
          All API requests in this application are made to this base URL.
        </p>
      </div>

      <!-- List Breweries Endpoint -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          List Breweries
        </h2>
        <div
          class="bg-gray-100 dark:bg-gray-900 p-3 rounded-md font-mono text-sm mb-4"
        >
          GET /breweries
        </div>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Returns a list of breweries with pagination support.
        </p>

        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Query Parameters
        </h3>
        <div class="overflow-x-auto">
          <table
            class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
          >
            <thead>
              <tr>
                <th
                  class="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Parameter
                </th>
                <th
                  class="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  class="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                >
                  by_city
                </td>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                >
                  string
                </td>
                <td class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  Filter breweries by city
                </td>
              </tr>
              <tr>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                >
                  by_state
                </td>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                >
                  string
                </td>
                <td class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  Filter breweries by state
                </td>
              </tr>
              <tr>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                >
                  by_country
                </td>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                >
                  string
                </td>
                <td class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  Filter breweries by country
                </td>
              </tr>
              <tr>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                >
                  by_type
                </td>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                >
                  string
                </td>
                <td class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  Filter by brewery type: micro, nano, regional, brewpub, large,
                  planning, bar, contract, proprietor, closed
                </td>
              </tr>
              <tr>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                >
                  page
                </td>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                >
                  integer
                </td>
                <td class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  Page number for pagination
                </td>
              </tr>
              <tr>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                >
                  per_page
                </td>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                >
                  integer
                </td>
                <td class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  Number of results per page (max 50)
                </td>
              </tr>
              <tr>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                >
                  sort
                </td>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                >
                  string
                </td>
                <td class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  Sort by field (e.g., name, type, city)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Get Single Brewery Endpoint -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Get Single Brewery
        </h2>
        <div
          class="bg-gray-100 dark:bg-gray-900 p-3 rounded-md font-mono text-sm mb-4"
        >
          GET /breweries/{id}
        </div>
        <p class="text-gray-600 dark:text-gray-400">
          Returns a single brewery by ID.
        </p>
      </div>

      <!-- Random Brewery Endpoint -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Random Brewery
        </h2>
        <div
          class="bg-gray-100 dark:bg-gray-900 p-3 rounded-md font-mono text-sm mb-4"
        >
          GET /breweries/random
        </div>
        <p class="text-gray-600 dark:text-gray-400">
          Returns a random brewery.
        </p>
      </div>

      <!-- Search Breweries Endpoint -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Search Breweries
        </h2>
        <div
          class="bg-gray-100 dark:bg-gray-900 p-3 rounded-md font-mono text-sm mb-4"
        >
          GET /breweries/search?query={search_term}
        </div>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Searches for breweries based on a search term.
        </p>

        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Query Parameters
        </h3>
        <div class="overflow-x-auto">
          <table
            class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
          >
            <thead>
              <tr>
                <th
                  class="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Parameter
                </th>
                <th
                  class="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  class="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                >
                  query
                </td>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                >
                  string
                </td>
                <td class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  Search term
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Autocomplete Endpoint -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Autocomplete
        </h2>
        <div
          class="bg-gray-100 dark:bg-gray-900 p-3 rounded-md font-mono text-sm mb-4"
        >
          GET /breweries/autocomplete?query={search_term}
        </div>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          Returns a list of breweries matching the search term for autocomplete
          suggestions.
        </p>

        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Query Parameters
        </h3>
        <div class="overflow-x-auto">
          <table
            class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
          >
            <thead>
              <tr>
                <th
                  class="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Parameter
                </th>
                <th
                  class="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  class="px-4 py-2 bg-gray-100 dark:bg-gray-900 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white"
                >
                  query
                </td>
                <td
                  class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400"
                >
                  string
                </td>
                <td class="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
                  Search term for autocomplete
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Metadata Endpoint -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Metadata
        </h2>
        <div
          class="bg-gray-100 dark:bg-gray-900 p-3 rounded-md font-mono text-sm mb-4"
        >
          GET /breweries/meta
        </div>
        <p class="text-gray-600 dark:text-gray-400">
          Returns metadata about the OpenBreweryDB dataset, including total
          counts and statistics.
        </p>
      </div>
    </div>

    <div class="mt-8 text-center">
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        Ready to explore breweries?
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <NuxtLink
          to="/breweries"
          class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors"
        >
          Browse Breweries
        </NuxtLink>
        <NuxtLink
          to="/search"
          class="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md transition-colors"
        >
          Search Breweries
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No specific script logic needed for this documentation page
</script>
