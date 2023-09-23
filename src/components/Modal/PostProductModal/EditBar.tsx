import BottomBar from '@components/BottomBar';
import Icons from '@design/Icons';
import styled from 'styled-components';

import { useUserStore } from 'stores/useUserStore';

export const EditBar: React.FC = () => {
  const currentRegion = useUserStore(({ currentRegion }) => currentRegion);

  return (
    <StyleEditBar>
      <Icons.MapPinFilled />
      <div>{currentRegion.addressName}</div>
    </StyleEditBar>
  );
};

const StyleEditBar = styled(BottomBar)`
  padding: 16px;
  gap: 8px;
  user-select: none;
`;
