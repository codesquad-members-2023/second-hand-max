import { css, styled } from 'styled-components';

export const SearchBar: React.FC = () => {
  return (
    <SearchBarWrapper>
      <SearchBarInput placeholder="동명(읍, 면)으로 검색(ex. 서초동)" />
    </SearchBarWrapper>
  );
};

const SearchBarWrapper = styled.div`
  padding: 0 16px;
`;

const SearchBarInput = styled.input`
  ${({ theme: { fonts, colors, radius } }) => css`
    width: 100%;
    box-sizing: border-box;
    border: 0px;
    color: ${colors.neutral.text};
    background-color: ${colors.neutral.backgroundBold};
    ${fonts.available.default16};
    border-radius: ${radius.small};
    padding: 8px;

    &::placeholder {
      color: ${colors.neutral.textWeak};
    }
  `}
`;
