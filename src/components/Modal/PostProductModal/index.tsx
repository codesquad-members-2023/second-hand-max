import { FullScreenModalSheet } from '../FullScreenModalSheet';
import { EditBar } from './EditBar';
import { Title } from './Title';
import { Inputs } from './Inputs';

export const PostProductModal: React.FC = () => {
  return (
    <FullScreenModalSheet>
      <Title />
      <Inputs />
      <EditBar />
    </FullScreenModalSheet>
  );
};
