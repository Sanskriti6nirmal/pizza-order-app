import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="px-4 py-8 text-center">
      <h1 className="mb-4 text-2xl font-bold text-red-600">
        Oops! Something went wrong 😢
      </h1>
      <p className="mb-6 text-stone-700">{error.data || error.message}</p>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
