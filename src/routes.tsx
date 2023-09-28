import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SecondHand from '@components/SecondHand';
import PATH from '@constants/PATH';
import { SalesHistory } from '@pages/SalesHistory/index';
import Wishlist from '@pages/Wishlist';
import Chatting from '@pages/Chatting';
import MyAccount from '@pages/MyAccount';
import OAuthLoadingPage from '@pages/MyAccount/OAuthLoadingPage';
import { Home } from '@pages/Home/index';
import ProductDetail from '@components/ProductDetail';
import { NotFound } from '@pages/NotFound';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={PATH.BASE} element={<SecondHand />}>
          <Route path={''} element={<Home />}>
            <Route
              path={`${PATH.CATEGORY_ID}/:categoryId`}
              element={<Home />}
            />
          </Route>
          <Route
            path={`/${PATH.ITEM_DETAIL}/:id`}
            element={<ProductDetail />}
          />
          <Route path={PATH.SALES_HISTORY} element={<SalesHistory />} />
          <Route path={PATH.WISHLIST} element={<Wishlist />} />
          <Route path={PATH.CHATTING} element={<Chatting />} />
          <Route path={`${PATH.MY_ACCOUNT}/*`} element={<MyAccount />} />
          <Route path={'/*'} element={<NotFound />} />
        </Route>
        <Route
          path={`${PATH.MY_ACCOUNT}/${PATH.OAUTH_LOADING}`}
          element={<OAuthLoadingPage />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
