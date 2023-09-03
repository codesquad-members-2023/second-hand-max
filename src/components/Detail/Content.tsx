import Icons from '@design/Icons';
import { getFormattedTimeDifference } from '@utils/time';
import { css, styled } from 'styled-components';
import Product from 'types/Product';

const Content: React.FC<Product> = ({
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
  return (
    <Container>
      <SellerInfo>
        <dt>판매자 정보</dt>
        <dd>판매자 닉네임</dd>
      </SellerInfo>
      <Status>
        <dt className="blind">상태</dt>
        <dd>
          <select name="status" id="status">
            <option value="판매중">판매중</option>
          </select>
          <label htmlFor="status" className="maker">
            <Icons.ChevronDown />
          </label>
        </dd>
      </Status>
      <div>
        <dt className="blind">상품</dt>
        <dd>
          <Info>
            <dt className="blind">제목</dt>
            <Title>{title}</Title>
            <LocationAndTimestamp>
              <dt className="blind">동네이름</dt>
              <Location>{tradingRegion}</Location>

              <dt className="blind">생성시간</dt>
              <dd className="timestamp">
                {getFormattedTimeDifference(createdAt)}
              </dd>
            </LocationAndTimestamp>

            <dt className="blind">설명</dt>
            <Description>...</Description>
            {/* chat-like-view-history */}
            <ChatLikeViewHistory>
              <div>
                <dt>
                  채팅 <span className="blind">수</span>
                </dt>
                <dd>{chatCount}</dd>
              </div>
              <div>
                <dt>
                  관심 <span className="blind">수</span>
                </dt>
                <dd>{wishCount}</dd>
              </div>
              <div>
                <dt>
                  조회 <span className="blind">수</span>
                </dt>
                <dd>0</dd>
              </div>
            </ChatLikeViewHistory>
          </Info>
        </dd>
      </div>
    </Container>
  );
};

const SellerInfo = styled.div`
  ${({ theme: { colors, radius, fonts } }) => css`
    padding: 16px;
    display: flex;
    justify-content: space-between;
    background: ${colors.neutral.backgroundWeak};
    border-radius: ${radius.medium};
    & > dt {
      ${fonts.available.default16}
    }
    & > dd {
      ${fonts.available.strong16}
    }
  `}
`;

const Status = styled.div`
  ${({ theme: { colors, radius, fonts } }) => css`
    & > dd {
      display: inline-flex;
      align-items: center;
      border: 1px solid ${colors.neutral.border};
      border-radius: ${radius.medium};
      & > select {
        ${fonts.available.default12}
        border-radius: ${radius.medium};
        padding: 8px 16px;
        padding-right: 40px;
        appearance: none;
        border: 0;
        background-color: transparent;
        option {
          ${fonts.available.default12}
        }
      }
      & > .maker {
        position: relative;
        height: 24px;
        display: inline-flex;
        & > svg {
          position: absolute;
          z-index: -1;
          top: 0;
          right: 16px;
          stroke: ${colors.neutral.text};
        }
      }
    }
  `}
`;

const Info = styled.dl`
  min-height: 300px;
  position: relative;
  margin-bottom: 80px;
`;

const Title = styled.dd`
  ${({ theme }) => theme.fonts.display.strong20}
`;

const LocationAndTimestamp = styled.div`
  ${({ theme: { colors, fonts } }) => css`
    display: flex;
    ${fonts.display.default12};
    color: ${colors.neutral.textWeak};
  `}
`;

const Location = styled.dd`
  &::after {
    content: '・';
    display: inline-block;
  }
`;

const Description = styled.dd`
  min-height: 200px;
`;

const ChatLikeViewHistory = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  ${({ theme }) => theme.fonts.display.default12}
  display: flex;
  gap: 8px;
  & > div {
    display: flex;
    gap: 4px;
  }
`;

const Container = styled.dl`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default Content;
