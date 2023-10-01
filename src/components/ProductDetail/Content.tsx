import Icons from '@design/Icons';
import { useProductStatusMutation } from '@hooks/queries/useProductStatusMutation';
import { getFormattedTimeDifference } from '@utils/time';
import { ChangeEvent } from 'react';
import { css, styled } from 'styled-components';
import { ProductDetail, ProductStatus } from 'types/product';

const Content: React.FC<{
  data: Omit<ProductDetail, 'imageUrls' | 'price'>;
  itemId: string;
}> = ({
  data: {
    isSeller,
    seller,
    status,
    title,
    categoryName,
    createdAt,
    content,
    chatCount,
    wishCount,
    viewCount,
  },
  itemId,
}) => {
  const { mutate: changeProductStatus } = useProductStatusMutation();

  return (
    <Container>
      <SellerInfo>
        <dt>판매자 정보</dt>
        <dd>{seller}</dd>
      </SellerInfo>
      {isSeller && (
        <Status>
          <dt className="blind">상태</dt>
          <dd>
            <select
              name="status"
              id="status"
              defaultValue={status}
              onChange={({ target }: ChangeEvent<HTMLSelectElement>) => {
                changeProductStatus({
                  itemId,
                  status: target.value as ProductStatus,
                });
              }}
            >
              <option value="판매중">판매중</option>
              <option value="예약중">예약중</option>
              <option value="판매완료">판매완료</option>
            </select>
            <label htmlFor="status" className="maker">
              <Icons.ChevronDown />
            </label>
          </dd>
        </Status>
      )}
      <div>
        <dt className="blind">상품</dt>
        <dd>
          <Info>
            <dt className="blind">제목</dt>
            <Title>{title}</Title>
            <LocationAndTimestamp>
              <dt className="blind">카테고리</dt>
              <Location>{categoryName}</Location>

              <dt className="blind">생성시간</dt>
              <dd className="timestamp">
                {getFormattedTimeDifference(createdAt)}
              </dd>
            </LocationAndTimestamp>

            <dt className="blind">설명</dt>
            <Description>{content}</Description>

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
                <dd>{viewCount}</dd>
              </div>
            </ChatLikeViewHistory>
          </Info>
        </dd>
      </div>
    </Container>
  );
};

const Container = styled.dl`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
`;

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
          pointer-events: none;
          position: absolute;
          top: 0;
          right: 16px;
          stroke: ${colors.neutral.text};
        }
      }
    }
  `}
`;

const Info = styled.dl`
  position: relative;
`;

const Title = styled.dd`
  ${({ theme }) => theme.fonts.display.strong20};
  margin-bottom: 8px;
`;

const LocationAndTimestamp = styled.div`
  ${({ theme: { colors, fonts } }) => css`
    display: flex;
    ${fonts.display.default12};
    color: ${colors.neutral.textWeak};
    margin-bottom: 16px;
  `}
`;

const Location = styled.dd`
  &::after {
    content: '・';
    display: inline-block;
  }
`;

const Description = styled.dd`
  margin-bottom: 16px;
`;

const ChatLikeViewHistory = styled.div`
  ${({ theme }) => theme.fonts.display.default12};
  display: flex;
  gap: 8px;

  & > div {
    display: flex;
    gap: 4px;
  }
`;

export default Content;
