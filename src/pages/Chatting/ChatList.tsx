import styled, { css } from 'styled-components';

export const ChatList: React.FC = () => {
  return (
    <ChatListItems>
      <ChatListItem>
        <ProfileImage />
        <ChatInfo>
          <NameAndTimestamp>
            <Name>삼만보</Name>
            <Timestamp>4분 전</Timestamp>
          </NameAndTimestamp>
          <LatestMessage>
            안녕하세요! 한 가지 궁금한 점이 있어서 챗드렸습니다. 이게 메시지가
          </LatestMessage>
        </ChatInfo>
        <Badge>1</Badge>
        <ProductImage />
      </ChatListItem>
    </ChatListItems>
  );
};

const ChatListItems = styled.ul`
  ${({ theme: { colors } }) => css`
    width: 100%;
    display: flex;

    &:not(:last-child) {
      border-bottom: 0.8px solid ${colors.neutral.border};
    }
  `};
`;

const ChatListItem = styled.li`
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileImage = styled.img`
  ${({ theme: { radius, colors } }) => css`
    width: 48px;
    height: 48px;
    box-sizing: border-box;
    border-radius: ${radius.half};
    border: 1px solid ${colors.neutral.border};
    flex-shrink: 0;
  `};
`;

const ChatInfo = styled.div`
  width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex-grow: 1;
`;

const NameAndTimestamp = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Name = styled.div`
  ${({ theme: { fonts, colors } }) => css`
    ${fonts.display.strong16};
    color: ${colors.neutral.textStrong};
  `};
`;

const Timestamp = styled.div`
  ${({ theme: { fonts, colors } }) => css`
    ${fonts.display.default12};
    color: ${colors.neutral.textWeak};
  `};
`;

const LatestMessage = styled.div`
  ${({ theme: { fonts, colors } }) => css`
    height: 16px;
    ${fonts.display.default12};
    color: ${colors.neutral.text};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `};
`;

const Badge = styled.div`
  ${({ theme: { colors, radius, fonts } }) => css`
    width: 20px;
    height: 20px;
    margin-top: 1px;
    border-radius: ${radius.half};
    background-color: ${colors.accent.primary};
    ${fonts.display.default12};
    color: ${colors.neutral.background};
    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
  `};
`;

const ProductImage = styled.img`
  ${({ theme: { radius, colors } }) => css`
    width: 48px;
    height: 48px;
    box-sizing: border-box;
    border-radius: ${radius.small};
    border: 1px solid ${colors.neutral.border};
    flex-shrink: 0;
  `};
`;
