import { ProductDetail } from 'types/product';
import ButtonStyle from '@components/Button';
import styled from 'styled-components';

type Props = Pick<ProductDetail, 'isSeller'>;

export const ChatButton: React.FC<Props> = ({ isSeller }) => {
  return (
    <>
      {isSeller ? (
        <Button $flexible="Flexible" $type="Contained">
          대화 중인 채팅방
        </Button>
      ) : (
        <Button $flexible="Flexible" $type="Contained">
          채팅하기
        </Button>
      )}
    </>
  );
};

const Button = styled(ButtonStyle)`
  padding: 8px 16px;
  ${({ theme: { fonts } }) => fonts.available.strong12};
`;
