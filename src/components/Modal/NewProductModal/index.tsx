import { FullScreenModalSheet } from '../FullScreenModalSheet';
import { Main } from './Main';
import { EditBar } from './EditBar';

export const NewProductModal: React.FC = () => {
  return (
    <FullScreenModalSheet>
      <Main />
      <EditBar />
    </FullScreenModalSheet>
  );
};
