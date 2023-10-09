import { Dropdown } from '@components/Dropdown';
import { useDropdownContext } from '@components/Dropdown/useDropdownContext';
import Icons from '@design/Icons';
import { useProductDeleteMutation } from '@hooks/queries/useProductDeleteMutation';
import { useProductStatusMutation } from '@hooks/queries/useProductStatusMutation';
import styled, { css } from 'styled-components';

type Props = {
  itemId: number;
};

export const DropdownMenu: React.FC<Props> = ({ itemId }) => {
  const { isDropdownOpen, closeDropdown } = useDropdownContext();
  const { mutate: changeProductStatus } = useProductStatusMutation();
  const { mutate: deleteProduct } = useProductDeleteMutation();

  return (
    <>
      <Dropdown.Indicator>
        <Icons.Dots />
      </Dropdown.Indicator>
      {isDropdownOpen && (
        <Dropdown.Menus alignDirection="right">
          <Dropdown.MenuItem onClick={closeDropdown}>
            게시글 수정
          </Dropdown.MenuItem>
          <Dropdown.MenuItem
            onClick={() => {
              changeProductStatus({ itemId, status: '판매중' });
              closeDropdown();
            }}
          >
            판매 중 상태로 전환
          </Dropdown.MenuItem>
          <Dropdown.MenuItem
            onClick={() => {
              changeProductStatus({ itemId, status: '판매완료' });
              closeDropdown();
            }}
          >
            판매 완료 상태로 전환
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

const DeleteOption = styled.div`
  ${({ theme: { colors } }) => css`
    color: ${colors.system.warning};
  `};
`;
