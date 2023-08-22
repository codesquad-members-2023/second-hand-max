import { decToHex } from '@utils/decToHex';

const typographyDefaultValue = {
  $regular: {
    '24': '400 24px/32px Noto Sans KR',
    '20': '400 20px/32px Noto Sans KR',
    '16': '400 16px/24px Noto Sans KR',
    '12': '400 12px/16px Noto Sans KR',
    '10': '400 10px/16px Noto Sans KR',
  },

  $bold: {
    '24': '700 24px/32px Noto Sans KR',
    '20': '700 20px/32px Noto Sans KR',
    '16': '700 16px/24px Noto Sans KR',
    '12': '700 12px/16px Noto Sans KR',
    '10': '700 10px/16px Noto Sans KR',
  },
};

const typographySystem = {
  display: {
    strong20: typographyDefaultValue.$bold[20],
    strong16: typographyDefaultValue.$bold[16],
    default16: typographyDefaultValue.$regular[16],
    default12: typographyDefaultValue.$regular[12],
  },
  available: {
    strong16: typographyDefaultValue.$bold[16],
    strong12: typographyDefaultValue.$bold[12],
    strong10: typographyDefaultValue.$bold[10],
    default16: typographyDefaultValue.$regular[16],
    default12: typographyDefaultValue.$regular[12],
  },
  enabled: {
    strong16: typographyDefaultValue.$bold[16],
    strong10: typographyDefaultValue.$bold[10],
  },
};

const colorDefaultValue = {
  $white: '#FFFFFF',
  $gray50: '#FAFAFA',
  $gray100: `#F9F9F9${decToHex(0.8)}`,
  $gray200: `#F5F5F5${decToHex(0.7)}`,
  $gray300: `#B3B3B3${decToHex(0.12)}`,
  $gray400: '#EFEFF0',
  $gray500: `#B3B3B3${decToHex(0.39)}`,
  $gray600: `#000000${decToHex(0.2)}`,
  $gray700: `#3C3C43${decToHex(0.36)}`,
  $gray800: `#3C3C43${decToHex(0.6)}`,
  $gray900: '#3C3C43',
  $black: '#000000',
  $mint: '#00C7BE',
  $orange: '#FF9500',
  $red: '#FF3B30',
};

const lightModeColorPalette = {
  neutral: {
    text: colorDefaultValue.$gray900,
    textWeak: colorDefaultValue.$gray800,
    textStrong: colorDefaultValue.$black,
    background: colorDefaultValue.$white,
    backgroundWeak: colorDefaultValue.$gray50,
    backgroundBold: colorDefaultValue.$gray400,
    backgroundBlur: colorDefaultValue.$gray100,
    border: colorDefaultValue.$gray500,
    borderStrong: colorDefaultValue.$gray700,
    overlay: colorDefaultValue.$gray600,
  },
  accent: {
    text: colorDefaultValue.$white,
    textWeak: colorDefaultValue.$black,
    primary: colorDefaultValue.$orange,
    secondary: colorDefaultValue.$mint,
  },
  system: {
    warning: colorDefaultValue.$red,
    background: colorDefaultValue.$white,
    backgroundWeak: colorDefaultValue.$gray200,
  },
};

export const theme = {
  fonts: typographySystem,
  colors: lightModeColorPalette,
};
