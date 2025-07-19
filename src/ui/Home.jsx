import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="font-logo text-brandBrown mb-8 text-2xl md:text-4xl">
        Delicious pizza,
        <br />
        <span className="text-brandYellow">Made with love for you.</span>
      </h1>

      {username === '' ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary" className="btn-primary">
          Continue ordering, {username}
        </Button>
      )}
    </div>
  );
}

export default Home;
