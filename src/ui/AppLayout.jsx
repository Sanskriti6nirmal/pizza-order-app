import Header from './Header';
import Loader from './Loader';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation, useLocation } from 'react-router-dom';

function AppLayout() {
  const navigation = useNavigation();
  const location = useLocation();
  const isLoading = navigation.state === 'loading';

  const isHome = location.pathname === '/';

  return (
    <div
      className={`grid h-screen grid-rows-[auto_1fr_auto] ${
        isHome ? "bg-[url('/images/hero-pizza.jpg')] bg-cover bg-center" : ''
      }`}
    >
      {isLoading && (
        <Loader message="Loading your delicious pizzas, please wait..." />
      )}

      <Header />

      <div className="overflow-auto">
        <main className="relative mx-auto h-full w-full">
          <Outlet />
        </main>
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
