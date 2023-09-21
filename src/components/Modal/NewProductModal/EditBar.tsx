import BottomBar from '@components/BottomBar';
import Icons from '@design/Icons';
import { useUserStore } from 'stores/useUserStore';
import styled from 'styled-components';

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
`;
