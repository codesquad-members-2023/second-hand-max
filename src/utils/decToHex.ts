export const decToHex = (opacity: number) => {
  if (!(0 <= opacity && opacity <= 1)) {
    throw new Error(
      'decToHex 함수의 opacity 값은 0에서 1까지만 입력해야 합니다.',
    );
  }

  return Math.floor(opacity * 255)
    .toString(16)
    .toUpperCase()
    .padStart(2, '0');
};
