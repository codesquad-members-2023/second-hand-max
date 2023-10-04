import styled, { css } from 'styled-components';

export const Messages: React.FC = () => {
  return (
    <StyledMessages>
      <ReceivedMessage>
        안녕하세요! 한 가지 궁금한 점이 있어서 챗 드려요
      </ReceivedMessage>
      <SentMessage>네, 안녕하세요!</SentMessage>
      <SentMessage>어떤 점이 궁금하신가욤?</SentMessage>
    </StyledMessages>
  );
};

const StyledMessages = styled.div`
  padding: 12px 16px;
  flex-grow: 1;
`;

const Message = styled.div`
  ${({ theme: { radius, fonts } }) => css`
    width: fit-content;
    max-width: 256px;
    border-radius: ${radius.large};
    padding: 8px 16px;
    ${fonts.display.default16};
    margin-bottom: 8px;
  `};
`;

const ReceivedMessage = styled(Message)`
  ${({ theme: { colors } }) => css`
    background-color: ${colors.neutral.backgroundBold};
    color: ${colors.neutral.textStrong};
  `};
`;

const SentMessage = styled(Message)`
  ${({ theme: { colors } }) => css`
    background-color: ${colors.accent.primary};
    color: ${colors.neutral.background};
    margin-left: auto;
  `};
`;
