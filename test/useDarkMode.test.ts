import { describe, it, expect, vi, beforeEach } from "vitest";
import { useDarkMode } from "../composables/useDarkMode";
import { ref, computed } from "vue";

// Mock Vue composables
vi.mock("vue", () => ({
  ref: vi.fn(),
  computed: vi.fn((fn) => ({ value: fn() })),
  onMounted: vi.fn((cb) => cb()),
}));

// Mock Nuxt useState
vi.mock("#app", () => ({
  useState: vi.fn((_, initializer) => ref(initializer())),
}));

describe("useDarkMode", () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value.toString();
      }),
      clear: vi.fn(() => {
        store = {};
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      key: vi.fn((index: number) => Object.keys(store)[index] || null),
      length: 0,
    };
  })();

  // Mock document methods
  document.documentElement.classList.toggle = vi.fn();

  // Mock window.matchMedia
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
    localStorageMock.clear();

    // Reset document class
    vi.mocked(document.documentElement.classList.add).mockReset();
    vi.mocked(document.documentElement.classList.remove).mockReset();
  });

  it("should initialize with localStorage value if present", () => {
    // Set dark mode in localStorage
    localStorageMock.setItem("color-mode", "dark");

    // Initialize dark mode
    const { isDarkMode } = useDarkMode();

    // Check that dark mode is enabled
    expect(isDarkMode.value).toBe(true);
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith(
      "dark",
      true,
    );
  });

  it("should initialize with system preference if no localStorage value", () => {
    // Mock system preference for dark mode
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // Initialize dark mode
    const { isDarkMode } = useDarkMode();

    // Check that dark mode is enabled based on system preference
    expect(isDarkMode.value).toBe(true);
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith(
      "dark",
      true,
    );
  });

  it("should toggle dark mode", () => {
    // Initialize with light mode
    localStorageMock.setItem("color-mode", "light");

    // Initialize dark mode
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    // Check initial state
    expect(isDarkMode.value).toBe(false);

    // Toggle dark mode
    toggleDarkMode();

    // Check that dark mode is now enabled
    expect(isDarkMode.value).toBe(true);
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith(
      "dark",
      true,
    );
    expect(localStorageMock.setItem).toHaveBeenCalledWith("color-mode", "dark");

    // Toggle dark mode again
    toggleDarkMode();

    // Check that dark mode is now disabled
    expect(isDarkMode.value).toBe(false);
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith(
      "dark",
      false,
    );
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "color-mode",
      "light",
    );
  });

  // The useDarkMode composable doesn't have enableDarkMode method
  it("should apply dark mode when initialized with dark mode", () => {
    // Initialize with dark mode
    localStorageMock.setItem("color-mode", "dark");

    // Initialize dark mode
    const { isDarkMode } = useDarkMode();

    // Check that dark mode is enabled
    expect(isDarkMode.value).toBe(true);
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith(
      "dark",
      true,
    );
  });

  // The useDarkMode composable doesn't have disableDarkMode method
  it("should apply light mode when initialized with light mode", () => {
    // Initialize with light mode
    localStorageMock.setItem("color-mode", "light");

    // Initialize dark mode
    const { isDarkMode } = useDarkMode();

    // Check that dark mode is disabled
    expect(isDarkMode.value).toBe(false);
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith(
      "dark",
      false,
    );
  });
});
