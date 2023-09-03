import { css, styled } from 'styled-components';

import { getFormattedTimeDifference } from '@utils/time';
import Product from 'types/Product';
import Icons from '@design/Icons';
import { useContext } from 'react';
import { AppStateDispatchContext } from 'contexts/AppContext';
import ActionType from '@constants/ActionType';
import { AppStateContext } from '../../contexts/AppContext';

const ListItem: React.FC<Product> = (product) => {
  const {
    itemId,
    thumbnailUrl,
    title,
    tradingRegion,
    createdAt,
    price,
    status,
    chatCount,
    wishCount,
  } = product;
  const state = useContext(AppStateContext);
  const dispatch = useContext(AppStateDispatchContext);

  if (!dispatch) {
    return null;
  }

  return (
    <Container>
      <figure>
        <img
          src="data:image/jpeg;base64,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"
          alt={title}
        />
        <figcaption className="blind">{title}</figcaption>
      </figure>
      <article>
        <h3>{title}</h3>
        <dl>
          <div className="location-and-timestamp">
            <dt className="blind">동네이름</dt>
            <dd className="location">{tradingRegion}</dd>

            <dt className="blind">생성시간</dt>
            <dd className="timestamp">
              {getFormattedTimeDifference(createdAt)}
            </dd>
          </div>

          <div className="status-and-price">
            <dt className="blind">상태</dt>
            <dd className="status">{status}</dd>

            <dt className="blind">가격</dt>
            <dd className="price">{price.toLocaleString('ko')}원</dd>
          </div>

          <div className="chat-and-like-history">
            <Chat count={chatCount} />
            <Like count={wishCount} />
          </div>
        </dl>
      </article>
      <button
        onClick={() => {
          dispatch({ type: ActionType.DETAIL, payload: product });
          console.log(state);
        }}
      >
        <span className="blind">{title} 상세보기</span>
      </button>
    </Container>
  );
};

const Container = styled.li`
  ${({ theme: { fonts, colors, radius } }) => css`
    position: relative;
    padding: 16px 0;
    display: flex;
    gap: 16px;

    border-bottom: 1px solid ${colors.neutral.border};

    &:last-child {
      border: 0;
    }

    & > figure {
      height: 120px;
      width: 120px;
      margin: 0;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        box-sizing: border-box;
        border: 1px solid ${colors.neutral.border};
        border-radius: ${radius.small};
      }
    }
    & > article {
      flex-grow: 1;

      & > h3 {
        ${fonts.display.default16}
      }

      & > dl {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .status-and-price {
        display: flex;
        align-items: center;
        gap: 4px;

        .status {
          ${fonts.display.default12};
          background-color: ${colors.accent.secondary};
          border-radius: ${radius.small};
          padding: 3px 8px;
          color: ${colors.accent.text};
        }

        .price {
          ${fonts.display.strong16}
        }
      }

      .location-and-timestamp {
        display: flex;
        ${fonts.display.default12};
        color: ${colors.neutral.textWeak};
      }

      .location {
        &::after {
          content: '・';
          display: inline-block;
        }
      }
      .status-and-price {
        display: flex;
        gap: 4px;
      }

      .chat-and-like-history {
        position: absolute;
        right: 0;
        bottom: 0;
        display: flex;
        gap: 4px;
      }
    }

    button {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  `}
`;

const Chat: React.FC<{ count: number }> = ({ count }) => {
  return (
    <History>
      <dt className="blind">현재 대화중인 메세지 개수</dt>
      <dd className="chat-history">
        <Icons.Message width={16} height={16} />
        <span>{count}</span>
      </dd>
    </History>
  );
};

const Like: React.FC<{ count: number }> = ({ count }) => {
  return (
    <History>
      <dt className="blind">관심개수</dt>
      <dd className="like-history">
        <Icons.Heart width={16} height={16} />
        <span>{count}</span>
      </dd>
    </History>
  );
};

const History = styled.div`
  ${({ theme: { fonts, colors } }) => css`
    color: ${colors.neutral.textWeak};
    stroke: ${colors.neutral.textWeak};
    ${fonts.display.default12}
    & > dd {
      display: flex;
      align-items: center;
    }
  `}
`;

export default ListItem;
