import styled from 'styled-components';
import { usePostProductModalStore } from '../usePostProductModalStore';

export const PriceInput: React.FC = () => {
  const price = usePostProductModalStore(({ price }) => price);
  const setPrice = usePostProductModalStore(({ setPrice }) => setPrice);

  return (
    <StyledPriceInput
      placeholder={'가격(선택사항)'}
      type="number"
      value={price}
      onChange={({ target }) => setPrice(target.value)}
    />
  );
};

const StyledPriceInput = styled.input``;
