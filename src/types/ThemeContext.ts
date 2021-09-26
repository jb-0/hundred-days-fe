import { ColorMode } from 'native-base';

export interface IThemeContext {
  bgColorScheme: any;
  textColorScheme: any;
  btnColorScheme: any;
  colorScheme: ColorMode;
  setColorScheme: React.Dispatch<React.SetStateAction<ColorMode>>;
}
