import CreateUser from '../features/users/CreateUser';

function Home() {
  return (
    <div className="my-10 mt-8">
      <h1 className="mb-4 text-center text-3xl font-semibold tracking-wider">
        The best pizza.
        <br />
        <span className="text-4xl text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
// #818cf8
