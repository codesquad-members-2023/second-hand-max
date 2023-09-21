import { Header } from './Header';
import { CategoryList } from './CategoryList';
import { FullScreenModalSheet } from '../FullScreenModalSheet';

export const CategoryModal: React.FC = () => {
  return (
    <FullScreenModalSheet>
      <Header />
      <CategoryList />
    </FullScreenModalSheet>
  );
};
