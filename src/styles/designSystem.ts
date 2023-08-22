import { css } from 'styled-components';

const typographyDefaultValue = {
  $regular: {
    24: css`
      font-weight: 400;
      font-size: 24px;
      line-height: 32px;
    `,

    20: css`
      font-weight: 400;
      font-size: 20px;
      line-height: 32px;
    `,

    16: css`
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
    `,

    12: css`
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
    `,

    10: css`
      font-weight: 400;
      font-size: 10px;
      line-height: 16px;
    `,
  },

  $bold: {
    24: css`
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
    `,

    20: css`
      font-weight: 700;
      font-size: 20px;
      line-height: 32px;
    `,

    16: css`
      font-weight: 700;
      font-size: 16px;
      line-height: 24px;
    `,

    12: css`
      font-weight: 700;
      font-size: 12px;
      line-height: 16px;
    `,

    10: css`
      font-weight: 700;
      font-size: 10px;
      line-height: 16px;
    `,
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
  $white: 'rgba(255, 255, 255, 1)',
  $gray50: 'rgba(250, 250, 250, 1)',
  $gray100: 'rgba(249, 249, 249, 0.8)',
  $gray200: 'rgba(245, 245, 245, 0.7)',
  $gray300: 'rgba(179, 179, 179, 0.12)',
  $gray400: 'rgba(239, 239, 240, 1)',
  $gray500: 'rgba(179, 179, 179, 0.39)',
  $gray600: 'rgba(0, 0, 0, 0.2)',
  $gray700: 'rgba(60, 60, 67, 0.36)',
  $gray800: 'rgba(60, 60, 67, 0.6)',
  $gray900: 'rgba(60, 60, 67, 1)',
  $black: 'rgba(0, 0, 0, 1)',
  $mint: 'rgba(0, 199, 190, 1)',
  $orange: 'rgba(255, 149, 0, 1)',
  $red: 'rgba(255, 59, 48, 1)',
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
