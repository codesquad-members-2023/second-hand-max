import Button from '@components/Button';
import Icons from '@design/Icons';
import { css, styled } from 'styled-components';

type Props = {
  onClick: () => void;
};

export const AddRegionButton: React.FC<Props> = ({ onClick }) => {
  return (
    <StyledButton $flexible="Fixed" $type="Outline" onClick={onClick}>
      <Icons.Plus />
      <span>위치 추가</span>
    </StyledButton>
  );
};

const StyledButton = styled(Button)`
  ${({ theme: { fonts, colors } }) => css`
    width: 100%;
    stroke: ${colors.neutral.textStrong};
    ${fonts.available.strong16};
  `};
`;
