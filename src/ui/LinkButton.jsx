import { Link, useNavigate } from 'react-router-dom';

function LinkButton({ children, to }) {
  const navigate = useNavigate();

  // Updated color to match a warmer, friendly Indian palette (e.g., maroon or deep yellow)
  const className =
    'text-sm text-yellow-600 hover:text-yellow-700 hover:underline';

  if (to === '-1')
    return (
      <button className={className} onClick={() => navigate(-1)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
