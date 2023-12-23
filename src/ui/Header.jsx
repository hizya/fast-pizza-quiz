import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/users/UserName';

function Header() {
  return (
    <header className="border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Go.
      </Link>
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
