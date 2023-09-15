import Button from '@components/Button';
import Icons from '@design/Icons';
import { css, styled } from 'styled-components';

type Props = {
  addressName: string;
  onDeleteButtonClick: () => void;
};

export const AddedRegionItem: React.FC<Props> = ({
  addressName,
  onDeleteButtonClick,
}) => {
  return (
    <Region>
      <span>{addressName}</span>
      <DeleteButton onClick={onDeleteButtonClick}>
        <Icons.CircleXFilled />
      </DeleteButton>
    </Region>
  );
};

const Region = styled.li`
  ${({ theme: { fonts, colors, radius } }) => css`
    padding: 16px;
    border-radius: ${radius.medium};
    background-color: ${colors.accent.primary};
    box-sizing: border-box;
    color: ${colors.accent.text};
    ${fonts.available.strong16};
    display: flex;
    justify-content: space-between;
    align-items: center;

    svg {
      fill: ${colors.accent.text};
      stroke: ${colors.accent.text};
      cursor: pointer;
    }
  `}
`;

const DeleteButton = styled(Button)`
  padding: 0;
`;
