import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-4 text-center">
      {/* FULL overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 max-w-2xl text-white">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl">
          🍕 Mom’s Homemade Pizza
        </h1>
        <p className="mb-8 text-lg text-yellow-100 md:text-2xl">
          Delicious. Handmade. Straight from Mom’s oven to your door.
        </p>

        {username === '' ? (
          <CreateUser />
        ) : (
          <Button to="/menu" type="primary">
            Continue ordering, {username}
          </Button>
        )}

        <div className="mt-6">
          <Button to="/menu" type="secondary">
            View Menu
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
