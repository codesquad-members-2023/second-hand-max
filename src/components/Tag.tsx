import { css, styled } from 'styled-components';

export type TagType = {
  title: string;
  isSelected: boolean;
  onClick: () => void;
};

export const Tag: React.FC<TagType> = ({ title, isSelected, onClick }) => {
  return (
    <StyledTag onClick={onClick} $isSelected={isSelected}>
      {title}
    </StyledTag>
  );
};

const StyledTag = styled.button<{ $isSelected: boolean }>`
  ${({ theme: { fonts, colors }, $isSelected }) => css`
    height: 32px;
    padding: 0px 16px;
    border-radius: 50px;
    border: 1px solid ${$isSelected ? 'none' : colors.neutral.border};
    background: ${$isSelected ? colors.accent.primary : colors.accent.text};
    color: ${$isSelected ? colors.accent.text : colors.accent.textWeak};
    ${fonts.display.default12};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `};
`;
