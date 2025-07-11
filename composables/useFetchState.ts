import { ref } from "vue";
import type { Ref } from "vue";

interface FetchState<T> {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  fetch: (...args: any[]) => Promise<void>;
}

export function useFetchState<T, Args extends any[]>(
  fetchFn: (...args: Args) => Promise<T>,
): FetchState<T> {
  const data = ref<T | null>(null) as Ref<T | null>;
  const loading = ref<boolean>(false) as Ref<boolean>;
  const error = ref<Error | null>(null) as Ref<Error | null>;

  const fetch = async (...args: Args): Promise<void> => {
    loading.value = true;
    error.value = null;

    try {
      data.value = await fetchFn(...args);
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err));
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    fetch,
  };
}
