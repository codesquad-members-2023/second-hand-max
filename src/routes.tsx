import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SecondHand from '@components/SecondHand';
import PATH from '@constants/PATH';
import SalesHistory from '@pages/SalesHistory';
import Wishlist from '@pages/Wishlist';
import Chatting from '@pages/Chatting';
import MyAccount from '@pages/MyAccount';
import OAuthLoadingPage from '@pages/MyAccount/OAuthLoadingPage';
import ProductDetail from '@components/ProductDetail';
import { Home } from '@pages/Home/index';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={PATH.BASE} element={<SecondHand />}>
          <Route path={''} element={<Home />}>
            <Route path={`${PATH.ITEM_DETAIL}/*`} element={<ProductDetail />} />
          </Route>
          <Route path={PATH.SALES_HISTORY} element={<SalesHistory />} />
          <Route path={PATH.WISHLIST} element={<Wishlist />} />
          <Route path={PATH.CHATTING} element={<Chatting />} />
          <Route path={`${PATH.MY_ACCOUNT}/*`} element={<MyAccount />} />
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
