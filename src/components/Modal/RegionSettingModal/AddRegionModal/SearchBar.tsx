import { FormEvent, useRef } from 'react';
import { css, styled } from 'styled-components';

type Props = {
  updateSearchWord: (word: string) => void;
};

const SEARCH_WORD_INPUT_NAME = 'search-word';

export const SearchBar: React.FC<Props> = ({ updateSearchWord }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const onSearchSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!formRef.current) {
      return;
    }

    const searchWord = new FormData(formRef.current)
      .get(SEARCH_WORD_INPUT_NAME)
      ?.toString();

    if (!searchWord) {
      return;
    }

    updateSearchWord(searchWord);
  };

  return (
    <SearchBarWrapper ref={formRef} onSubmit={onSearchSubmit}>
      <SearchBarInput
        placeholder="동명(읍, 면)으로 검색(ex. 서초동)"
        name={SEARCH_WORD_INPUT_NAME}
      />
    </SearchBarWrapper>
  );
};

const SearchBarWrapper = styled.form`
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
