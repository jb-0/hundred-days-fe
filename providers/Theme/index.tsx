import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeBaseProvider, StorageManager, ColorMode, extendTheme, useTheme, useContrastText } from 'native-base';
import { DefaultTheme } from '../../Types/Theme';
import { IThemeContext } from '../../Types/ThemeContext';

// Define the colorModeManager,
// here we are using react-native-async-storage (https://react-native-async-storage.github.io/async-storage/)
const colorModeManager: StorageManager = {
  get: async () => {
    try {
      let val = await AsyncStorage.getItem('@color-mode');
      return val === 'dark' ? 'dark' : 'light';
    } catch (e) {
      return 'dark';
    }
  },
  set: async (value: ColorMode) => {
    try {
      await AsyncStorage.setItem('@color-mode', value);
    } catch (e) {
      console.log(e);
    }
  },
};

// extend the theme
const customTheme = extendTheme({
  useSystemColorMode: false,
  initialColorMode: 'dark',
});

// Create context for passing things that build on the theme, add some defaults
export const ThemeContext = React.createContext<IThemeContext>({
  bgColorScheme: '',
  textColorScheme: '',
  btnColorScheme: '',
  colorScheme: 'dark',
  setColorScheme: () => null,
});

const ThemeContextWrapper: React.FunctionComponent = ({ children }) => {
  const { colors }: DefaultTheme = useTheme();
  const [colorScheme, setColorScheme] = React.useState<ColorMode>('dark');

  // Define re-usable colour schemes
  const bgColorScheme = colorScheme === 'light' ? colors.white : colors.coolGray[800];
  const textColorScheme =
    colorScheme === 'light' ? useContrastText(colors.white) : useContrastText(colors.coolGray[800]);
  const btnColorScheme = colorScheme === 'light' ? colors.coolGray[800] : colors.coolGray[200];

  // Set initial context
  const context = {
    bgColorScheme,
    textColorScheme,
    btnColorScheme,
    colorScheme,
    setColorScheme,
  };

  // On load retrieve the saved colour mode
  React.useEffect(() => {
    (async () => {
      const storedColorMode: ColorMode = (await colorModeManager.get()) || 'dark';
      setColorScheme(storedColorMode);
    })();
  }, []);

  // Each time the user selects a colour update the storage location if it has changed
  React.useEffect(() => {
    (async () => {
      const colorMode = await colorModeManager.get();

      if (colorMode !== colorScheme) {
        colorModeManager.set(colorScheme);
      }
    })();
  }, [colorScheme]);

  return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
};

const ThemeProvider: React.FunctionComponent = ({ children }) => {
  return (
    <NativeBaseProvider colorModeManager={colorModeManager} theme={customTheme}>
      <ThemeContextWrapper>{children}</ThemeContextWrapper>
    </NativeBaseProvider>
  );
};

export default ThemeProvider;
