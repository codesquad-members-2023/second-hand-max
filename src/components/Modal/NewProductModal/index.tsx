import { FullScreenModalSheet } from '../FullScreenModalSheet';
import { Main } from './Main';
import { Title } from './Title';
import { EditBar } from './EditBar';

export const NewProductModal: React.FC = () => {
  return (
    <FullScreenModalSheet>
      {/* {isCategoryOpen && <CategoryListModal />} */}
      <Title />
      <Main />
      <EditBar />
    </FullScreenModalSheet>
  );
};
