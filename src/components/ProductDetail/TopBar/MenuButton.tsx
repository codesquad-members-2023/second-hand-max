import Icons from '@design/Icons';
import styled, { css } from 'styled-components';
import { Dropdown } from '@components/Dropdown';
import { useProductDeleteMutation } from '@hooks/queries/useProductDeleteMutation';
import { useDropdownContext } from '@components/Dropdown/useDropdownContext';

type Props = {
  itemId: string;
};

export const MenuButton: React.FC<Props> = (props) => {
  return (
    <StyledMenuButton>
      <Dropdown>
        <ProductActionDropdown {...props} />
      </Dropdown>
    </StyledMenuButton>
  );
};

const ProductActionDropdown: React.FC<Props> = ({ itemId }) => {
  const { isDropdownOpen, closeDropdown } = useDropdownContext();
  const { mutate: deleteProduct } = useProductDeleteMutation();

  return (
    <>
      <Dropdown.Indicator>
        <Icons.Dots />
      </Dropdown.Indicator>

      {isDropdownOpen && (
        <Dropdown.Menus alignDirection="right">
          <Dropdown.MenuItem
            onClick={() => {
              closeDropdown();
            }}
          >
            게시글 수정
          </Dropdown.MenuItem>
          <Dropdown.MenuItem
            onClick={() => {
              deleteProduct(itemId);
              closeDropdown();
            }}
          >
            <DeleteOption>삭제</DeleteOption>
          </Dropdown.MenuItem>
        </Dropdown.Menus>
      )}
    </>
  );
};

const StyledMenuButton = styled.button`
  ${({ theme: { colors } }) => css`
    position: relative;
    background: none;
    padding: 8px;
    stroke: ${colors.accent.text};
    fill: ${colors.accent.text};
  `};
`;

const DeleteOption = styled.div`
  ${({ theme: { colors } }) => css`
    color: ${colors.system.warning};
  `};
`;
