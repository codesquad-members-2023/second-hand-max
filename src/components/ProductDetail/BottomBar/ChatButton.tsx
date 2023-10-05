import { ProductDetail } from 'types/product';
import ButtonStyle from '@components/Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PATH from '@constants/PATH';

type Props = Pick<ProductDetail, 'title' | 'seller' | 'isSeller' | 'price'> & {
  thumbnailUrl: string;
  itemId: string;
  chatRoomCount?: number;
  chatRoomId?: number | null;
};

export const ChatButton: React.FC<Props> = ({
  title,
  thumbnailUrl,
  price,
  seller,
  isSeller,
  itemId,
  chatRoomCount,
  chatRoomId,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {isSeller ? (
        <Button
          $flexible="Flexible"
          $type="Contained"
          onClick={() => navigate(PATH.CHATS)}
        >
          {`대화 중인 채팅방${chatRoomCount ? ` + ${chatRoomCount}` : ``}`}
        </Button>
      ) : (
        <Button
          $flexible="Flexible"
          $type="Contained"
          onClick={() => {
            if (chatRoomId) {
              navigate(`/chatting/${chatRoomId}`);

              return;
            }

            navigate(`/chatting/new-chat`, {
              state: {
                title,
                thumbnailUrl,
                price,
                itemId,
                seller,
              },
            });
          }}
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
