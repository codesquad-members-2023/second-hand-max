import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SecondHand from '@components/SecondHand';
import Home from '@pages/Home';
import PATH from '@constants/PATH';
import SalesHistory from '@pages/SalesHistory';
import Wishlist from '@pages/Wishlist';
import Chatting from '@pages/Chatting';
import MyAccount from '@pages/MyAccount';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={PATH.BASE} element={<SecondHand />}>
          <Route index element={<Home />} />
          <Route path={PATH.SALES_HISTORY} element={<SalesHistory />} />
          <Route path={PATH.WISHLIST} element={<Wishlist />} />
          <Route path={PATH.CHATTING} element={<Chatting />} />
          <Route path={`${PATH.MY_ACCOUNT}/*`} element={<MyAccount />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
