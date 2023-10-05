import { getFormattedTimeDifference } from '@utils/time';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Chat } from 'types/chat';

type Props = {
  chat: Chat;
};

export const ChatListItem: React.FC<Props> = ({ chat }) => {
  const {
    chatRoomId,
    thumbnailUrl,
    chatPartnerName,
    chatPartnerProfile,
    lastSendTime,
    lastSendMessage,
    newMessageCount,
  } = chat;
  const navigate = useNavigate();

  return (
    <StyledChatListItem onClick={() => navigate(`${chatRoomId}`)}>
      <ProfileImage src={chatPartnerProfile} />
      <ChatInfo>
        <NameAndTimestamp>
          <Name>{chatPartnerName}</Name>
          <Timestamp>{getFormattedTimeDifference(lastSendTime)}</Timestamp>
        </NameAndTimestamp>
        <LatestMessage>{lastSendMessage}</LatestMessage>
      </ChatInfo>
      {newMessageCount > 0 && <Badge>{newMessageCount}</Badge>}
      <ProductImage src={thumbnailUrl} />
    </StyledChatListItem>
  );
};

const StyledChatListItem = styled.li`
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
