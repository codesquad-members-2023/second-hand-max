import { ProductDetail } from 'types/product';
import ButtonStyle from '@components/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PATH from '@constants/PATH';

type Props = Pick<ProductDetail, 'isSeller'> & {
  itemId: string;
};

export const ChatButton: React.FC<Props> = ({ isSeller, itemId }) => {
  const navigate = useNavigate();

  return (
    <>
      {isSeller ? (
        <Button
          $flexible="Flexible"
          $type="Contained"
          onClick={() => navigate(PATH.CHATS)}
        >
          대화 중인 채팅방
        </Button>
      ) : (
        <Button
          $flexible="Flexible"
          $type="Contained"
          onClick={() => navigate(`/chatting/${itemId}`)}
        >
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
