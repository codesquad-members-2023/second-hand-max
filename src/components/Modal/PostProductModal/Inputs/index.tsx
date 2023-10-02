import styled from 'styled-components';
import { PictureList } from '../PictureList';
import { TitleInput } from './TitleInput';
import { CategorySelector } from './CategorySelector';
import { PriceInput } from './PriceInput';
import { ContentInput } from './ContentInput';

export const Inputs: React.FC = () => {
  return (
    <StyledInputs>
      <PictureList />
      <TitleInput />
      <CategorySelector />
      <PriceInput />
      <ContentInput />
    </StyledInputs>
  );
};

const StyledInputs = styled.div`
  margin: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
`;
