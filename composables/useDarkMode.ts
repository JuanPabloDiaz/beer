export const useDarkMode = () => {
  const colorMode = useState<'light' | 'dark'>('color-mode', () => 'light');
  
  const isDarkMode = computed(() => colorMode.value === 'dark');
  
  const toggleDarkMode = () => {
    colorMode.value = colorMode.value === 'light' ? 'dark' : 'light';
    applyColorMode();
    
    // Save preference to localStorage
    if (process.client) {
      localStorage.setItem('color-mode', colorMode.value);
    }
  };
  
  const applyColorMode = () => {
    if (process.client) {
      document.documentElement.classList.toggle('dark', isDarkMode.value);
    }
  };
  
  // Initialize on client-side
  onMounted(() => {
    // Check for saved preference or system preference
    const savedMode = localStorage.getItem('color-mode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode) {
      colorMode.value = savedMode as 'light' | 'dark';
    } else if (systemPrefersDark) {
      colorMode.value = 'dark';
    }
    
    applyColorMode();
  });
  
  return {
    isDarkMode,
    toggleDarkMode
  };
};
