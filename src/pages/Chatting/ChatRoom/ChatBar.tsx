import BottomBar from '@components/BottomBar';
import Button from '@components/Button';
import Icons from '@design/Icons';
import styled, { css } from 'styled-components';

type Props = {
  onSendMessage: (message: string) => void;
};

export const ChatBar: React.FC<Props> = ({ onSendMessage }) => {
  return (
    <StyledChatBar>
      <MessageForm
        onSubmit={(event) => {
          event.preventDefault();

          const message = event.currentTarget.message.value;
          onSendMessage(message);
        }}
      >
        <MessageSendField name="message" placeholder="내용을 입력하세요" />
        <SendButton>
          <Icons.Send />
        </SendButton>
      </MessageForm>
    </StyledChatBar>
  );
};

const StyledChatBar = styled(BottomBar)`
  ${({ theme: { colors } }) => css`
    border-top: 0.8px solid ${colors.neutral.border};
    padding: 16px;
  `};
`;

const MessageForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MessageSendField = styled.input`
  ${({ theme: { colors, radius, fonts } }) => css`
    height: 100%;
    box-sizing: border-box;
    caret-color: ${colors.accent.secondary};
    border-radius: ${radius.large};
    border: 1px solid ${colors.neutral.border};
    padding: 4px 12px;
    flex-grow: 1;
    ${fonts.available.default16};

    &::placeholder {
      color: ${colors.neutral.textWeak};
    }
  `};
`;

const SendButton = styled(Button)`
  ${({ theme: { colors, radius } }) => css`
    width: 32px;
    height: 32px;
    border-radius: ${radius.half};
    background-color: ${colors.accent.primary};

    svg {
      width: 16px;
      height: 16px;
      stroke: ${colors.neutral.background};
    }
  `};
`;
