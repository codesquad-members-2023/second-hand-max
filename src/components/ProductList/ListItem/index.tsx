import { css, styled } from 'styled-components';
import { getFormattedTimeDifference } from '@utils/time';
import Icons from '@design/Icons';
import noThumbnailImage from '@assets/no-thumbnail-image.png';
import PATH from '@constants/PATH';
import { useNavigate } from 'react-router-dom';
import { ProductListItem } from 'types/product';
import { Dropdown } from '@components/Dropdown';
import { DropdownMenu } from './DropdownMenu';

const ListItem: React.FC<ProductListItem> = ({
  itemId,
  thumbnailUrl,
  title,
  tradingRegion,
  createdAt,
  price,
  status,
  chatCount,
  wishCount,
}) => {
  const navigate = useNavigate();

  return (
    <ListItemContainer
      onClick={() => navigate(`/${PATH.ITEM_DETAIL}/${itemId}`)}
    >
      <ThumbnailFigure>
        <img
          className="thumbnail-image"
          src={thumbnailUrl || noThumbnailImage}
          alt={title}
        />
        <figcaption className="blind">{title}</figcaption>
      </ThumbnailFigure>
      <InfoContainer>
        <Information>
          <div className="title-and-more">
            <div className="title">{title}</div>
            <StyledMenuButton onClick={(event) => event.stopPropagation()}>
              <Dropdown>
                <DropdownMenu itemId={itemId} />
              </Dropdown>
            </StyledMenuButton>
          </div>

          <div className="location-and-timestamp">
            <div className="blind">동네 이름</div>
            <div className="location">{tradingRegion}</div>

            <div className="blind">생성시간</div>
            <div className="timestamp">
              {getFormattedTimeDifference(createdAt)}
            </div>
          </div>

          <div className="state-and-price">
            {status !== '판매중' && (
              <div className="state-badge">
                <div className="blind">상태</div>
                <div className="text">{status}</div>
              </div>
            )}

            <div className="blind">가격</div>
            <div className="price">
              {price === 0 || price === null
                ? '나눔'
                : `${price.toLocaleString('ko')}원`}
            </div>
          </div>
        </Information>

        <div className="chat-and-like-history">
          {chatCount > 0 && <Chat count={chatCount} />}
          {wishCount > 0 && <Like count={wishCount} />}
        </div>
      </InfoContainer>
    </ListItemContainer>
  );
};

const Chat: React.FC<{ count: number }> = ({ count }) => {
  return (
    <History>
      <div className="blind">현재 대화중인 메세지 개수</div>
      <div className="chat-history">
        <Icons.Message width={16} height={16} />
        <span>{count}</span>
      </div>
    </History>
  );
};

const Like: React.FC<{ count: number }> = ({ count }) => {
  return (
    <History>
      <div className="blind">관심개수</div>
      <div className="like-history">
        <Icons.Heart width={16} height={16} />
        <span>{count}</span>
      </div>
    </History>
  );
};

const ListItemContainer = styled.li`
  ${({ theme: { colors } }) => css`
    padding: 16px 0;
    display: flex;
    gap: 16px;
    cursor: pointer;

    &:not(:last-child) {
      border-bottom: 1px solid ${colors.neutral.border};
    }
  `}
`;

const ThumbnailFigure = styled.figure`
  ${({ theme: { colors, radius } }) => css`
    height: 120px;
    width: 120px;
    flex-shrink: 0;

    .thumbnail-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      box-sizing: border-box;
      border: 1px solid ${colors.neutral.border};
      border-radius: ${radius.small};
    }
  `}
`;

const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .chat-and-like-history {
    display: flex;
    justify-content: flex-end;
    gap: 4px;
  }
`;

const Information = styled.div`
  ${({ theme: { colors, radius, fonts } }) => css`
    display: flex;
    flex-direction: column;
    gap: 4px;

    .title-and-more {
      display: flex;
      justify-content: space-between;

      .title {
        width: 160px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        ${fonts.display.default16};
      }
    }

    .location-and-timestamp {
      display: flex;
      ${fonts.display.default12};
      color: ${colors.neutral.textWeak};
    }

    .state-and-price {
      display: flex;
      gap: 4px;

      .state-badge {
        border-radius: ${radius.small};
        padding: 3px 8px;
        background-color: ${colors.accent.secondary};

        .text {
          ${fonts.display.default12};
          color: ${colors.accent.text};
        }
      }

      .price {
        ${fonts.display.strong16};
      }
    }

    .location {
      &::after {
        content: '・';
        display: inline-block;
      }
    }

    .state-and-price {
      display: flex;
      gap: 4px;
    }
  `}
`;

const StyledMenuButton = styled.button`
  ${({ theme: { colors } }) => css`
    padding: 0;
    stroke: ${colors.neutral.textStrong};
    fill: ${colors.neutral.textStrong};
  `};
`;

const History = styled.div`
  ${({ theme: { fonts, colors } }) => css`
    color: ${colors.neutral.textWeak};
    stroke: ${colors.neutral.textWeak};
    ${fonts.display.default12};

    .chat-history,
    .like-history {
      display: flex;
      align-items: center;
    }
  `}
`;

export default ListItem;
