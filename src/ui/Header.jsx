import { Link } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';

function Header() {
  return (
    <header className="bg-yellow-400">
      <Link to="/" className="text-gray-800">
        Fast React Pizza Go.
      </Link>
      <SearchOrder />
      <p className="text-gray-800">jonas</p>
    </header>
  );
}

export default Header;
