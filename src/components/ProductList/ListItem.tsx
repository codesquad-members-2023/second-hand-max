import { css, styled } from 'styled-components';
import { getFormattedTimeDifference } from '@utils/time';
import Product from 'types/Product';
import Icons from '@design/Icons';
import sample from '../../assets/sample.jpg';

const ListItem: React.FC<Product> = (product) => {
  const {
    // itemId,
    // thumbnailUrl,
    title,
    tradingRegion,
    createdAt,
    price,
    status,
    chatCount,
    wishCount,
  } = product;

  return (
    <Container>
      <figure>
        <img src={sample} alt={title} />
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
      <button>
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
