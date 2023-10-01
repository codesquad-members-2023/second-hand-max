import styled, { css } from 'styled-components';

export const ChatList: React.FC = () => {
  return (
    <ChatListItems>
      <ProfileImage />
    </ChatListItems>
  );
};

const ChatListItems = styled.div`
  ${({ theme: { colors } }) => css`
    padding: 16px;

    &:not(:last-child) {
      border-bottom: 0.8px solid ${colors.neutral.border};
    }
  `};
`;

const ProfileImage = styled.img`
  ${({ theme: { radius, colors } }) => css`
    width: 48px;
    height: 48px;
    box-sizing: border-box;
    border-radius: ${radius.half};
    border: 1px solid ${colors.neutral.border};
  `};
`;
