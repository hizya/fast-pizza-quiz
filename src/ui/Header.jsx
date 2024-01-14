import { Link, useLocation } from 'react-router-dom';
import SearchOrder from '../features/order/SearchOrder';
import UserName from '../features/users/UserName';
import { useSelector } from 'react-redux';

function Header() {
  const location=useLocation();
  const username=useSelector(state=>state.user.username);
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest">
        Fast React Pizza Go.
      </Link>
      <SearchOrder />
      {location.pathname!=='/'&&username&&<UserName />}
    </header>
  );
}

export default Header;
