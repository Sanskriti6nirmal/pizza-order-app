import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

function Header() {
  return (
    <header className="bg-brandYellow flex items-center justify-between border-b border-stone-300 px-6 py-4 uppercase">
      <Link
        to="/"
        className="font-logo text-brandBrown text-2xl tracking-widest"
      >
        Mom’s Homemade Pizza
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
