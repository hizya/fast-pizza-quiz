import { useSelector } from 'react-redux';
import CreateUser from '../features/users/CreateUser';
import Button from './Button';

function Home() {

  const username=useSelector(state=>state.user.username);

  return (
    <div className="my-10 text-center">
      <h1 className="mb-8 px-4 text-xl font-semibold tracking-widest sm:mb-6 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username?<Button type='primary' to='/menu'>continue ordering, {username}</Button>:<CreateUser />}
    </div>
  );
}

export default Home;
// #818cf8
